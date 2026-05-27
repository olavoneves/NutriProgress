# NutriProgress — Índice de Contexto

> Pasta oculta para contexto de sessão. Cada arquivo .md tem data, hora e descrição.
> Leia este índice primeiro, depois os arquivos relevantes para se situar rapidamente.

## Arquivos

| Arquivo | Data | Descrição |
|---|---|---|
| [day7-billing-stripe](2026-05-27_0930_day7-billing-stripe.md) | 2026-05-27 09:30 | **Estado atual** — Day 7: module billing, Stripe, correção DLQ completa |
| [day6-messaging-rabbitmq](2026-05-26_2000_day6-messaging-rabbitmq.md) | 2026-05-26 20:00 | Day 6: RabbitMQ + eventos de domínio + módulo notification (gateway adiado) |
| [day3-user-nutritionist](2026-05-23_0900_day3-user-nutritionist.md) | 2026-05-23 09:00 | Day 3: CRUD User + Nutritionist, perfil /me, stats, limites de plano |
| [day2-auth](2026-05-22_0900_day2-auth.md) | 2026-05-22 09:00 | Day 2: módulo auth, JWT, Google OAuth implementados |
| [project-overview](2026-05-21_2200_project-overview.md) | 2026-05-21 22:00 | Day 1 — stack, estrutura, fundação |
| [architecture](2026-05-21_2200_architecture.md) | 2026-05-21 22:00 | Padrões arquiteturais, segurança, banco |
| [git-workflow](2026-05-21_2100_git-workflow.md) | 2026-05-21 21:00 | Workflow de branches, convenção de commits, CI/CD |

## Estado Atual do Projeto

- **Branch ativa:** `develop` (Days 1–7 mergeados em `main`; HEAD `f633df0`).
- **Days 1–7:** foundation, auth/JWT, User+Nutritionist, Patient, Evaluation, RabbitMQ/mensageria, billing/Stripe. PRs #1–#11 (squash merges).
- **Day 7 — destaque:** DLQ completa para todas as filas de evento; module billing com Stripe Checkout + Webhooks; controle de planos FREE/STARTER/PRO/PREMIUM.
- **Próximo:** Day 8 (candidatos: dashboard/analytics, relatórios PDF, frontend billing, CI/CD deploy).
- **Build:** ✅ `./mvnw compile` + 30 testes unitários. `contextLoads` (via `verify`) exige Postgres. CI frontend vermelha (lint pré-existente, não-bloqueante).
- **Maven:** usar o wrapper `server/mvnw.cmd` (não há `mvn` no PATH); Java 21.
- **Docker:** desligado por padrão; só necessário p/ rodar a app ou o `verify` completo. Portas 5432/5433 ocupadas por outro projeto → usar override `DB_PORT`/`DB_URL`.
- **Stripe:** variáveis `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_STARTER/PRO/PREMIUM` não configuradas localmente (placeholders). Para testar webhooks: `stripe listen --forward-to localhost:8080/billing/webhook/stripe`.
