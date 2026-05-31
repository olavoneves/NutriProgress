# NutriProgress — Índice de Contexto

> Pasta oculta para contexto de sessão. Cada arquivo .md tem data, hora e descrição.
> Leia este índice primeiro, depois os arquivos relevantes para se situar rapidamente.

## Arquivos

| Arquivo | Data | Descrição |
|---|---|---|
| [day9-security-lgpd-tests](2026-05-30_1130_day9-security-lgpd-tests.md) | 2026-05-30 11:30 | **Estado atual** — Day 9: rate limiting, security headers, audit log MongoDB, módulo LGPD, TestContainers + testes de integração |
| [day8-analytics-observability](2026-05-28_2030_day8-analytics-observability.md) | 2026-05-28 20:30 | Day 8: module analytics (MongoDB), observabilidade (Actuator/Prometheus/Logback), health checks |
| [day7-billing-stripe](2026-05-27_0930_day7-billing-stripe.md) | 2026-05-27 09:30 | Day 7: module billing, Stripe, correção DLQ completa |
| [day6-messaging-rabbitmq](2026-05-26_2000_day6-messaging-rabbitmq.md) | 2026-05-26 20:00 | Day 6: RabbitMQ + eventos de domínio + módulo notification (gateway adiado) |
| [day3-user-nutritionist](2026-05-23_0900_day3-user-nutritionist.md) | 2026-05-23 09:00 | Day 3: CRUD User + Nutritionist, perfil /me, stats, limites de plano |
| [day2-auth](2026-05-22_0900_day2-auth.md) | 2026-05-22 09:00 | Day 2: módulo auth, JWT, Google OAuth implementados |
| [project-overview](2026-05-21_2200_project-overview.md) | 2026-05-21 22:00 | Day 1 — stack, estrutura, fundação |
| [architecture](2026-05-21_2200_architecture.md) | 2026-05-21 22:00 | Padrões arquiteturais, segurança, banco |
| [git-workflow](2026-05-21_2100_git-workflow.md) | 2026-05-21 21:00 | Workflow de branches, convenção de commits, CI/CD |

## Estado Atual do Projeto

- **Branch ativa:** `feature/day9-security-lgpd-tests` — PR #13 → `develop` (CI rodando após fix de regressão)
- **Days 1–9:** foundation, auth/JWT, User+Nutritionist, Patient, Evaluation, RabbitMQ/mensageria, billing/Stripe, analytics(MongoDB)/observabilidade, **segurança avançada+LGPD+testes de integração**. PRs #1–#12 mergeados; PR #13 pendente.
- **Day 9 — destaque:** Rate limiting (bucket4j 8.7.0), security headers, audit log (MongoDB), módulo LGPD (export/anonimização/exclusão de conta), TestContainers + 4 testes de integração. Fix: evaluationNumber nulo (entityManager.refresh pós-trigger), UUID codec MongoDB.
- **Build:** ✅ `mvnw test` (Mockito) → 30 testes, 0 falhas. Testes de integração requerem Docker (TestContainers).
- **CI Frontend:** vermelha (ESLint pré-existente em `client/`, não-bloqueante). CI Backend: a verificar após último push.
- **Env gotcha:** var de usuário `DB_PASSWORD=Futsal1#` (outro projeto) sobrescreve o default; p/ `verify` local setar `DB_URL` (:5434) **e** `DB_PASSWORD=postgres`.
- **Maven:** usar o wrapper `server/mvnw.cmd` (não há `mvn` no PATH); Java 21.
- **Docker:** desligado por padrão; containers `nutriprogress-db` (Postgres :5434) e `nutriprogress-mongo` (:27017).
- **Rate limiting:** desativado em `application-test.yml` (`app.rate-limiting.enabled: false`). Ativo por default em prod.
