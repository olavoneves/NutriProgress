# Day 9 — Segurança Avançada + LGPD + Testes de Integração

**Data:** 2026-05-30  
**Branch:** `feature/day9-security-lgpd-tests` → PR #13 → `develop`  
**Commits:** `211ec45` (Day 9) + `790e597` (fix evaluationNumber + UUID codec)  
**Testes unitários:** 30/30 passando (Mockito, sem DB)  
**CI Backend:** rodando (fix de regressão pós-push)  
**CI Frontend:** vermelha (ESLint pré-existente, não-bloqueante)

---

## O que foi implementado

### Segurança
- **`com.nutriprogress.security.RateLimitingConfig`** — bucket4j 8.7.0: 3 buckets (login: 5/15min por IP, público: 20/min por IP, autenticado: 100/min por userId)
- **`com.nutriprogress.security.RateLimitingFilter`** — `OncePerRequestFilter`; usa `ObjectMapper` próprio (Jackson 2, não bean); desativável via `app.rate-limiting.enabled: false` (test profile tem `false`)
- **`com.nutriprogress.security.SecurityAuditFilter`** — `ContentCachingResponseWrapper`; audita `/auth/*`, `/lgpd/*`, `/billing/checkout|cancel` e todos os erros ≥ 400
- **`com.nutriprogress.config.SecurityHeadersConfig`** — `FilterRegistrationBean` com ordem `HIGHEST_PRECEDENCE`; headers: X-Frame-Options DENY, CSP, HSTS, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- **`SecurityConfig`** atualizado — `rateLimitingFilter` injetado + adicionado `addFilterAfter(rateLimitingFilter, JwtAuthenticationFilter.class)` e `addFilterAfter(securityAuditFilter, RateLimitingFilter.class)`

### Auditoria (MongoDB)
- **`modules/audit/document/AuditLog`** — `@Document(collection = "audit_logs")`, compound index `{user_id, timestamp}`
- **`modules/audit/repository/AuditLogRepository`** — `MongoRepository<AuditLog, String>`
- **`modules/audit/service/AuditService`** — `@Async` (executor default Spring Boot); overloads: `log(UUID userId, UUID nutritionistId, ..., String httpMethod, String endpoint, String ipAddress, String userAgent, Integer statusCode)` + `log(UUID userId, ..., Map metadata)`; NOT recebe `HttpServletRequest` (request pode fechar antes do async executar)
- **`modules/audit/aspect/AuditAspect`** — `@Aspect @Component`; audita PatientService (create/findById/update/archive) e EvaluationService (create); usa `authentication.getName()` → `findByUserEmail()` → `nutritionist.userId()`/`nutritionist.id()`
- **`MongoConfig`** atualizado — `@EnableMongoRepositories(basePackages = {"modules.analytics.repository", "modules.audit.repository"})`

### LGPD
- **`modules/lgpd/dto/DataExportDTO`** — `@Data @Builder`; campos: nutritionistId, exportedAt, personalData, professionalData, subscriptions, payments, aggregatedStats
- **`modules/lgpd/dto/AnonymizationRequestDTO`** — `@Data`; campos: patientId (required), permanentDelete (default false), reason
- **`modules/lgpd/service/DataAnonymizationService`** — `anonymizePatient()` + `permanentlyDeletePatient()`; `orElseThrow` com ternário (não nested throw)
- **`modules/lgpd/service/LgpdService`** — `exportPersonalData()` + `anonymizePatient()` + `requestAccountDeletion()`; usa dirty-checking do Hibernate para salvar User (não precisa de userRepository.save separado)
- **`modules/lgpd/controller/LgpdController`** — `GET /lgpd/export`, `POST /lgpd/anonymize-patient`, `DELETE /lgpd/account`; padrão: `authentication.getName()` → `findByUserEmail()` → `nutritionist.id()`; usa `ApiResponse.ok()` (não `.success()`)

### Testes
- **`TestContainersConfig`** — `@TestConfiguration`, 3 beans com `@ServiceConnection`: PostgreSQL 16-alpine, MongoDB 7-jammy, RabbitMQ 3.13-management-alpine; versão explícita `1.20.4` (Spring Boot 4 BOM não gerencia automaticamente)
- **`AuthIntegrationTest`** / **`PatientIntegrationTest`** / **`EvaluationIntegrationTest`** / **`SecurityIntegrationTest`** — `@SpringBootTest @AutoConfigureMockMvc @ActiveProfiles("test") @Import(TestContainersConfig.class) @Transactional`
- **`application-test.yml`** atualizado — mail localhost, stripe mock, `app.rate-limiting.enabled: false`, `uuid-representation: standard`

---

## Correções aplicadas ao template Day 9

| Problema no template | Correção |
|---|---|
| `@AutoConfigureMockMvc` package antigo | `org.springframework.boot.webmvc.test.autoconfigure` (Spring Boot 4) |
| `ApiResponse.success()` | `ApiResponse.ok()` |
| `ErrorResponse.builder()` | construtor posicional do record `new ErrorResponse(status, error, message, path, null, ts)` |
| `NutritionistDTO.getId()`/`.getUserId()` | `.id()`/`.userId()` (record accessor) |
| `AuditService.log()` com `HttpServletRequest @Async` | extrai strings antes da chamada; service recebe plain types |
| `orElseThrow({ throw ExA; throw ExB; })` | ternário `() -> cond ? new ExA() : new ExB()` |
| Modules testcontainers sem versão | `testcontainers.version=1.20.4` (propriedade explícita) |
| `Bandwidth.classic()` / `Refill.greedy()` | `Bandwidth.builder().capacity(n).refillGreedy(n, duration).build()` |
| `ObjectMapper` injetado no filter | `private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule())` (padrão do projeto) |

---

## Bugs corrigidos

### evaluationNumber nulo na resposta (bug pré-existente do Day 5)
- **Causa:** trigger PostgreSQL `set_evaluation_number()` seta o campo no banco, mas Hibernate não lê de volta automaticamente (entidade em cache tem null)
- **Fix:** `EvaluationService.create()` injeta `EntityManager` via `@PersistenceContext` (não entra no construtor `@RequiredArgsConstructor`); após `save()`: `entityManager.flush()` (executa INSERT → trigger dispara) + `entityManager.refresh(evaluation)` (SELECT de volta → lê o valor)
- **Unit test:** `EvaluationServiceTest` injeta o `@Mock EntityManager` via `ReflectionTestUtils.setField()` no `@BeforeEach` (Mockito não injeta `@PersistenceContext` após constructor injection)

### UUID codec MongoDB (AuditLog)
- **Causa:** driver MongoDB 4.x requer `uuidRepresentation` explícito para codificar `java.util.UUID` como BSON
- **Fix:** `spring.data.mongodb.uuid-representation: standard` em `application.yml` e `application-test.yml`

---

## Gotchas e pontos de atenção

- `@AutoConfigureMockMvc` no Spring Boot 4 está em `org.springframework.boot.webmvc.test.autoconfigure` (não no pacote antigo `org.springframework.boot.test.autoconfigure.web.servlet`)
- `AuditService` usa `@Async` sem executor nomeado → usa o executor padrão do Spring Boot (configurado via `spring.task.execution.*`)
- `@Transactional` nos integration tests faz rollback após cada `@Test` (Hibernate flush automático dentro da transação)
- Rate limiting desabilitado no profile `test` (`app.rate-limiting.enabled: false`) — sem isso, os 5 logins/15min por IP seriam atingidos nos @BeforeEach dos testes
- `EvaluationIntegrationTest` roda em ~0.5s (reusa contexto Spring do `AuthIntegrationTest` via Spring test cache)

---

## Estado dos PRs

- **PR #13** (`feature/day9-security-lgpd-tests` → `develop`): aberto, CI rodando
- **Após merge do #13:** abrir PR `develop` → `release`, depois `release` → `main` (workflow obrigatório)
- **Frontend:** ESLint falha pré-existente em `client/` — não relacionada ao Day 9, não-bloqueante para o backend

---

## Próximo: Day 10 (candidatos)

- Relatórios PDF (JasperReports ou iText)
- Frontend React (telas principais: dashboard, patients, evaluations)
- Grafana + dashboards de observabilidade
- CI/CD deploy (Render.com backend + Vercel frontend)
- Fix lint ESLint do frontend (pré-existente)
