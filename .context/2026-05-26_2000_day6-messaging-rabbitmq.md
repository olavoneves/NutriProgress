# Day 6 — Mensageria assíncrona (RabbitMQ + eventos de domínio)
**Data:** 2026-05-26 20:00
**Branch:** `feature/day6-messaging-rabbitmq` (a partir de `develop`) — **MERGEADO** via PR #10 (squash → HEAD `17a2e0d`)

## Estado herdado (Days 1–5)
- Days 1–5 mergeados em `develop` (HEAD anterior `4735567`). Working tree limpa no início do Day 6.
- `spring-boot-starter-mail` já estava no `pom` (de algum dia anterior), porém sem uso.

## Escopo: o que entrou vs. o que foi adiado
O prompt do Day 6 pedia **API Gateway + Rate Limiting + Logging + RabbitMQ + notificações**. Decisão (aprovada pelo usuário):
- **IMPLEMENTADO:** metade de mensageria (RabbitMQ, eventos de domínio, módulo notification, e-mail, DLQ de notificação).
- **ADIADO:** API Gateway / rate-limiting / filtros de logging. Motivo: **Spring Cloud Gateway exige WebFlux/Netty** e é incompatível com o stack servlet atual (`spring-boot-starter-webmvc`); o prompt também não trazia código para essa parte; CORS já existe no `SecurityConfig`.

## Decisões de adaptação ao prompt
- **Jackson 3 (Boot 4):** o prompt usava `Jackson2JsonMessageConverter` + injeção de `ObjectMapper` (Jackson 2). No Boot 4 o primário é Jackson 3 (`tools.jackson`) e **não há bean `ObjectMapper` Jackson 2** → usado **`JacksonJsonMessageConverter`** (no-arg; Jackson 3 trata `java.time` nativamente).
- **Listener factory** criada via `SimpleRabbitListenerContainerFactoryConfigurer` (`org.springframework.boot.amqp.autoconfigure`) para herdar properties (`auto-startup`, retry, `default-requeue-rejected`).
- **Subir sem broker nos testes:** profile `test` seta `spring.rabbitmq.listener.simple.auto-startup: false`; `spring.mail.host` ganhou default em `application.yml` (senão o bean `JavaMailSender` não é criado e o `contextLoads` falha).
- **Entity `Notification`** usa `@Getter/@Setter` (padrão do projeto), não `@Data`.
- **Pulados** `NotificationDTO` e `EvaluationReminderEmail.html` do prompt (nenhum código os usa → seriam código morto).
- Migration nova é **V5** (sequência seguia em V5).

## Arquivos criados/alterados
### Novos
- `config/RabbitMQConfig.java`
- `shared/event/DomainEvent.java`, `shared/event/EventPublisher.java`
- `shared/event/events/{UserRegistered,PatientCreated,EvaluationCreated,SubscriptionChanged}Event.java`
- `modules/notification/entity/{Notification,NotificationType}.java`
- `modules/notification/repository/NotificationRepository.java`
- `modules/notification/dto/EmailDTO.java`
- `modules/notification/service/{EmailService,NotificationService}.java`
- `modules/notification/listener/{User,Patient,Evaluation}EventListener.java`
- `db/migration/V5__create_notifications_table.sql`
- `templates/email/{welcome,patient-created}.html`
- `docker-compose.yml` (raiz: serviços `db` + `rabbitmq`, portas via `DB_PORT`/`RABBITMQ_PORT`/`RABBITMQ_MGMT_PORT`)
- `shared/event/EventPublisherTest.java` (test)

### Alterados
- `pom.xml` (+ `spring-boot-starter-amqp`, `spring-boot-starter-thymeleaf`)
- `modules/auth/service/AuthService.java` (publica `UserRegisteredEvent` no `register`)
- `modules/patient/service/PatientService.java` (publica `PatientCreatedEvent` no `create`)
- `modules/evaluation/service/EvaluationService.java` (publica `EvaluationCreatedEvent` no `create`)
- `application.yml` (+ rabbitmq, mail c/ host default, thymeleaf)
- `application-dev.yml` (`url` via `${DB_URL:...}` p/ override de porta)
- `application-test.yml` (listeners off)
- `PatientServiceTest`/`EvaluationServiceTest` (mock de `EventPublisher`; `User` no nutritionist)

## Topologia RabbitMQ
- Exchanges: `nutriprogress.events` (topic), `nutriprogress.dlx` (direct).
- Filas: `nutriprogress.notifications` (+ `.dlq`), `nutriprogress.events.{user,patient,evaluation}`.
- Routing keys = `getEventType()` (ex.: `user.registered`, `patient.created`, `evaluation.created`); bindings `user.#`/`patient.#`/`evaluation.#`/`notification.#`.

## Validação
- `./mvnw verify` → **BUILD SUCCESS, 31 testes** (incl. `contextLoads` com Postgres real em Docker na porta 5434; Flyway aplica V5, Hibernate `validate` confere a tabela).
- RabbitMQ **não** é necessário para `verify` (listeners off no profile `test`).

## Imperfeições conhecidas (fiéis ao prompt, não-bloqueantes)
- Filas de evento têm `x-dead-letter` apontando para routing keys **sem DLQ vinculada** (só `notification` tem DLQ real) → eventos dead-lettered seriam descartados.
- `NotificationService` engole exceção de envio (marca `FAILED`) → o `throw` do listener p/ DLQ não dispara em falha de e-mail.

## Próximo passo
- Day 7 (provável): billing/assinaturas ou dashboard/relatórios.
- Considerar: DLQ real para as filas de evento; publicar eventos após commit (`@TransactionalEventListener`) em vez de dentro da transação.
