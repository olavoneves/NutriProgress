# Day 8 — Module Analytics (MongoDB) + Observabilidade
**Data:** 2026-05-28 20:30
**Branch:** `develop` — **MERGEADO** via PR #12 (squash → HEAD `d9a6229`)

## Estado herdado (Days 1–7)
- Days 1–7 em `develop`. Working tree do Day 8 implementada na sessão anterior (sem commit) e finalizada/validada/commitada nesta.
- Stack: Spring Boot 4.0.2 / Java 21 / PostgreSQL + RabbitMQ. Agora também **MongoDB** (analytics).

## Escopo implementado

### Module Analytics (MongoDB)
Novo módulo `modules/analytics/` (multi-store: JPA + Mongo no mesmo app):

```
modules/analytics/
├── controller/AnalyticsController.java        (5 endpoints /analytics/*)
├── document/{AnalyticsEvent,DashboardPreference,BusinessMetrics}.java
├── dto/{EventTrackDTO,AnalyticsSummaryDTO,DashboardPreferenceDTO,BusinessMetricsDTO}.java
├── listener/AnalyticsEventListener.java       (filas dedicadas)
├── repository/{AnalyticsEvent,DashboardPreference,BusinessMetrics}Repository.java
└── service/{AnalyticsService,DashboardService,MetricsService}.java
```

- `AnalyticsService.track(...)` — `@Async("analyticsExecutor")`, engole exceções (analytics nunca quebra o fluxo principal).
- `DashboardService` — preferências de dashboard com defaults (widgets + chart prefs); upsert por `nutritionistId`.
- `MetricsService` — Counters Micrometer (`nutriprogress.logins/patients/evaluations.*`), `@Scheduled` diário (cron meia-noite) calculando métricas de negócio (MRR, distribuição de planos), série histórica.

### Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/analytics/track` | JWT | Registra evento de uso do frontend |
| GET | `/analytics/summary` | JWT | Métricas de uso (últimos 30 dias) |
| GET | `/analytics/dashboard/preferences` | JWT | Preferências (cria default se não existir) |
| PUT | `/analytics/dashboard/preferences` | JWT | Salva preferências |
| GET | `/analytics/business` | JWT | MRR + distribuição de planos + histórico |

### Mensageria — filas dedicadas de analytics
Adicionadas ao `RabbitMQConfig`: `nutriprogress.analytics.{user,patient,evaluation,subscription}` ligadas a `user.#`/`patient.#`/`evaluation.#`/`subscription.#`, com DLQ única (`analytics.dead`).
- **Por quê dedicadas:** o exchange de eventos é topic → cada fila ligada à mesma routing key recebe sua própria cópia. Reaproveitar as filas de notificação tornaria analytics e notification **consumidores concorrentes** (dividiriam as mensagens). Filas separadas = pub/sub correto.
- **Bônus:** binding `subscription.#` é novo — o `SubscriptionChangedEvent` (publicado pelo billing no Day 7) antes não tinha fila e era descartado silenciosamente. Agora analytics o consome.

### Observabilidade
- `pom.xml`: `spring-boot-starter-data-mongodb`, `spring-boot-starter-actuator`, `spring-boot-starter-aspectj`, `micrometer-registry-prometheus`, `logstash-logback-encoder 8.0`.
- Actuator + Prometheus expostos: `/actuator/health`, `/actuator/info`, `/actuator/prometheus`, metrics, loggers. Liberados no `SecurityConfig`.
- Health indicators customizados: `DatabaseHealthIndicator` (Postgres + Mongo `ping`) e `RabbitMQHealthIndicator` (`@Component("databases"/"rabbitMQ")`).
- `logback-spring.xml`: JSON (Logstash) no profile `prod`, legível nos demais; arquivos `logs/*.log` (gitignored).
- `AsyncConfig` (`@EnableAsync` + `@EnableScheduling` + executors analytics/notification), `ObservabilityConfig` (`TimedAspect`).
- `MongoConfig`: auto-config do Boot + único bean `mongoTemplate` que remove o campo `_class` (sem estender `AbstractMongoClientConfiguration`).

## Decisões de adaptação ao prompt

- **`ApiResponse.ok()` (não `.success()`)** e nutricionista via `findByUserEmail().id()` (não cast `UserDetails`) — padrão do projeto.
- **`MongoConfig` sem `AbstractMongoClientConfiguration`:** a versão do prompt sobrescrevia `mongoTemplate(MongoClient, ...)` com assinatura diferente → geraria **dois beans `mongoTemplate`**. Trocado por bean único sobre o `MongoDatabaseFactory` auto-configurado.
- **Filas dedicadas (acima):** o prompt anexava os listeners de analytics às filas de notificação (bug de consumidores concorrentes).
- **`MetricsService` — avaliações do mês:** o prompt usava `countByNutritionistIdAndCreatedAtAfter(null, ...)` (= `WHERE id = null` → sempre 0). Trocado por `countByCreatedAtBetween(monthStart, now)`.
- **`auto-index-creation: false`:** com `true`, o Spring Data cria índices no refresh do contexto, **conectando no Mongo e quebrando o startup/CI sem Mongo**. Voltou ao default `false` (a app sobe sem Mongo; `DashboardService` já faz upsert).
- **Spring Boot 4 — nomes:** starter de AOP é **`spring-boot-starter-aspectj`** (não `aop`); API de health em **`org.springframework.boot.health.contributor`** (não `actuator.health`).
- Analytics é **MongoDB-only → nenhuma migration Flyway nova** (Hibernate `validate` inalterado).

## Arquivos criados/alterados
- **Novos:** `modules/analytics/**` (16), `config/{Mongo,Async,Observability}Config.java`, `health/{Database,RabbitMQ}HealthIndicator.java`, `logback-spring.xml`.
- **Alterados:** `RabbitMQConfig` (filas/bindings/DLQ analytics), `SecurityConfig` (actuator permitAll), repos `Nutritionist`/`Patient`/`Evaluation` (`countByCreatedAtBetween`/`countBySubscriptionPlan`), `pom.xml`, `application.yml`, `application-dev.yml` (health details), `docker-compose.yml` (serviço `mongo`), `server/.gitignore` (`logs/`).

## Validação
- `./mvnw verify` com Postgres (:5434) + Mongo (:27017) → **BUILD SUCCESS, 31 testes, 0 falhas** (inclui `contextLoads`).
- `contextLoads` **sem Mongo** (container parado) → **passa** (confirma que a app sobe sem Mongo; valida o fix do `auto-index-creation`).
- CI: **Backend verde** (PR #12); **Frontend vermelho** = lint ESLint pré-existente em `client/` (`@types/index.d.ts`, `useMediaQuery.ts`), não relacionado ao Day 8.
- **Gotcha de ambiente:** existe um env var de usuário persistente `DB_PASSWORD=Futsal1#` (de outro projeto) que sobrescreve `${DB_PASSWORD:postgres}`. Para rodar o `verify` local apontando ao container nutriprogress: setar `DB_URL` (porta 5434) **e** `DB_PASSWORD=postgres` na sessão.

## Próximo passo (Day 9)
Candidatos: relatórios PDF, frontend (dashboard/analytics/billing), Grafana dashboards (Prometheus já exporta), ou deploy CI/CD (Render/Railway). Pendência menor: corrigir o lint do frontend para destravar a CI.
