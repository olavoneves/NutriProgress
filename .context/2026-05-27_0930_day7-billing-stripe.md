# Day 7 — Module Billing + Stripe + Correção DLQ
**Data:** 2026-05-27 09:30
**Branch:** `develop` — **MERGEADO** via PR #11 (squash → HEAD `f633df0`)

## Estado herdado (Days 1–6)
- Days 1–6 mergeados em `develop` (HEAD anterior `b4a88f6`). Working tree limpa no início do Day 7.
- Pendência conhecida do Day 6: DLQ de evento (user/patient/evaluation) declarada nos args da fila mas sem beans ou bindings correspondentes.

## Escopo implementado

### Correção DLQ (Day 6)
Adicionados ao `RabbitMQConfig.java`:
- Beans: `userEventsDLQ`, `patientEventsDLQ`, `evaluationEventsDLQ`
- Bindings: `userEventsDlqBinding`, `patientEventsDlqBinding`, `evaluationEventsDlqBinding`
- Constantes de nome: `USER_EVENTS_DLQ`, `PATIENT_EVENTS_DLQ`, `EVALUATION_EVENTS_DLQ`

Topologia completa agora:
```
nutriprogress.events (topic)  ──► nutriprogress.events.user     ──DLX──► nutriprogress.events.user.dlq
                               ──► nutriprogress.events.patient  ──DLX──► nutriprogress.events.patient.dlq
                               ──► nutriprogress.events.evaluation ──DLX──► nutriprogress.events.evaluation.dlq
                               ──► nutriprogress.notifications   ──DLX──► nutriprogress.notifications.dlq
```

### Module Billing
Novo módulo em `modules/billing/` com a seguinte estrutura:

```
modules/billing/
├── controller/BillingController.java      (4 endpoints REST)
├── dto/{SubscriptionDTO,PlanLimitsDTO,CheckoutResponseDTO,CreateCheckoutRequest}.java
├── entity/{Subscription,Payment,SubscriptionStatus,PaymentStatus}.java
├── exception/BillingException.java
├── mapper/SubscriptionMapper.java
├── repository/{SubscriptionRepository,PaymentRepository}.java
├── service/{BillingService,StripeService,PlanLimitService}.java
└── webhook/StripeWebhookHandler.java
```

## Entidades

### Subscription
- `id` (UUID PK), `nutritionist_id` (FK), `plan` (SubscriptionPlan enum), `status` (SubscriptionStatus)
- `stripe_subscription_id`, `stripe_customer_id`, `amount`, `payment_method`
- `current_period_start/end`, `canceled_at`, `trial_ends_at`
- Estende `AuditableEntity`

### Payment
- `id`, `subscription_id` (FK, nullable), `nutritionist_id` (FK), `amount`, `status`
- `stripe_payment_intent_id`, `stripe_invoice_id`, `metadata` (JSONB), `paid_at`, `error_message`
- Estende `AuditableEntity`

## Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/billing/subscription` | JWT | Assinatura atual + limites do plano |
| POST | `/billing/checkout` | JWT | Cria Checkout Session no Stripe (retorna URL + sessionId) |
| POST | `/billing/cancel` | JWT | Cancela assinatura ao fim do período |
| POST | `/billing/webhook/stripe` | Público (sem JWT) | Recebe eventos do Stripe |

## Limites por plano (PlanLimitService)

| Plano | Pacientes | exportPdf | advancedCharts | customDashboard | multiUser | prioritySupport |
|-------|-----------|-----------|----------------|-----------------|-----------|-----------------|
| FREE | 5 | ✗ | ✗ | ✗ | ✗ | ✗ |
| STARTER | 20 | ✓ | ✗ | ✗ | ✗ | ✗ |
| PRO | 50 | ✓ | ✓ | ✓ | ✗ | ✗ |
| PREMIUM | ilimitado | ✓ | ✓ | ✓ | ✓ | ✓ |

## Fluxo Stripe

1. **Novo checkout:** `POST /billing/checkout` → `StripeService.createCheckoutSession` → URL de redirect
2. **Webhook `checkout.session.completed`:** `StripeWebhookHandler` → `BillingService.activateSubscription` → cria `Subscription` + atualiza `Nutritionist.subscriptionPlan` + publica `SubscriptionChangedEvent`
3. **Renovação (`invoice.payment_succeeded`):** busca plano pelo `stripeSubscriptionId` no nosso banco (`findPlanByStripeSubscriptionId`) → `activateSubscription` atualiza período sem criar nova subscription
4. **Cancelamento:** `POST /billing/cancel` → `StripeService.cancelSubscription(cancelAtPeriodEnd=true)` + status LOCAL = CANCELED

## Decisões de adaptação ao prompt

- **`findNutritionistByStripeCustomerId`:** prompt usava `findAll()` + stream → trocado para query derivada `findByStripeCustomerId(customerId)` (sem N+1)
- **Renovação vs. nova subscription:** prompt sempre criava nova subscription; código final verifica se já existe subscription com o `stripeSubscriptionId` → atualiza período em vez de criar duplicatas
- **`handleInvoicePaymentSucceeded`:** prompt buscava plano do metadata Stripe (não confiável em renovações) → trocado para `billingService.findPlanByStripeSubscriptionId` (fonte de verdade = nosso banco)
- **`ApiResponse.ok()` (não `.success()`):** padrão do projeto
- **Controller pattern:** `authentication.getName()` → `findByUserEmail()` (não cast de `UserDetails`)
- **`JacksonJsonMessageConverter` sem ObjectMapper:** mantido padrão existente (Jackson 3, Boot 4)
- **`@Slf4j` no RabbitMQConfig:** não adicionado (sem log necessário no config)

## Arquivos criados/alterados

### Novos (24 arquivos)
- `modules/billing/**` (17 arquivos)
- `db/migration/V6__create_subscriptions_table.sql`
- `db/migration/V7__create_payments_table.sql`

### Alterados (5 arquivos)
- `config/RabbitMQConfig.java` (+DLQ beans/bindings para user/patient/evaluation)
- `config/SecurityConfig.java` (`/billing/webhook/stripe` no `permitAll`)
- `shared/exception/GlobalExceptionHandler.java` (`BillingException` → 400)
- `pom.xml` (`stripe-java 24.3.0`)
- `application.yml` (`stripe.*` config + `app.url`)

## Validação
- `./mvnw compile` → **BUILD SUCCESS** (115 arquivos compilados)
- `./mvnw test` (unit only) → **30 testes, 0 falhas**
- Flyway V6+V7 ainda não validados com Postgres real (próxima sessão com Docker)

## Próximo passo (Day 8)
Candidatos: dashboard/analytics, relatórios PDF, frontend billing, ou CI/CD no Render/Railway.
