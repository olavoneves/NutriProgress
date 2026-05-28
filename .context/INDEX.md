# NutriProgress — Índice de Contexto

> Pasta oculta para contexto de sessão. Cada arquivo .md tem data, hora e descrição.
> Leia este índice primeiro, depois os arquivos relevantes para se situar rapidamente.

## Arquivos

| Arquivo | Data | Descrição |
|---|---|---|
| [day8-analytics-observability](2026-05-28_2030_day8-analytics-observability.md) | 2026-05-28 20:30 | **Estado atual** — Day 8: module analytics (MongoDB), observabilidade (Actuator/Prometheus/Logback), health checks |
| [day7-billing-stripe](2026-05-27_0930_day7-billing-stripe.md) | 2026-05-27 09:30 | Day 7: module billing, Stripe, correção DLQ completa |
| [day6-messaging-rabbitmq](2026-05-26_2000_day6-messaging-rabbitmq.md) | 2026-05-26 20:00 | Day 6: RabbitMQ + eventos de domínio + módulo notification (gateway adiado) |
| [day3-user-nutritionist](2026-05-23_0900_day3-user-nutritionist.md) | 2026-05-23 09:00 | Day 3: CRUD User + Nutritionist, perfil /me, stats, limites de plano |
| [day2-auth](2026-05-22_0900_day2-auth.md) | 2026-05-22 09:00 | Day 2: módulo auth, JWT, Google OAuth implementados |
| [project-overview](2026-05-21_2200_project-overview.md) | 2026-05-21 22:00 | Day 1 — stack, estrutura, fundação |
| [architecture](2026-05-21_2200_architecture.md) | 2026-05-21 22:00 | Padrões arquiteturais, segurança, banco |
| [git-workflow](2026-05-21_2100_git-workflow.md) | 2026-05-21 21:00 | Workflow de branches, convenção de commits, CI/CD |

## Estado Atual do Projeto

- **Branch ativa:** `develop` (HEAD `d9a6229` — Day 8 mergeado via PR #12). Days 1–7 também em `main`.
- **Days 1–8:** foundation, auth/JWT, User+Nutritionist, Patient, Evaluation, RabbitMQ/mensageria, billing/Stripe, analytics(MongoDB)/observabilidade. PRs #1–#12 (squash merges).
- **Day 8 — destaque:** module analytics em MongoDB (eventos, dashboard prefs, métricas de negócio/MRR), filas RabbitMQ dedicadas (+binding `subscription.#`), Actuator/Prometheus, health checks (Postgres/Mongo/RabbitMQ), Logback JSON.
- **Próximo:** Day 9 (candidatos: relatórios PDF, frontend, Grafana, CI/CD deploy). Pendência: lint frontend.
- **Build:** ✅ `./mvnw verify` (Postgres :5434 + Mongo :27017) → 31 testes, 0 falhas. App sobe **sem** Mongo (`auto-index-creation=false`). CI Backend verde; Frontend vermelha (lint ESLint pré-existente em `client/`, não-bloqueante).
- **Env gotcha:** var de usuário `DB_PASSWORD=Futsal1#` (outro projeto) sobrescreve o default; p/ `verify` local setar `DB_URL` (:5434) **e** `DB_PASSWORD=postgres`.
- **Maven:** usar o wrapper `server/mvnw.cmd` (não há `mvn` no PATH); Java 21.
- **Docker:** desligado por padrão; só necessário p/ rodar a app ou o `verify` completo. Portas 5432/5433 ocupadas por outro projeto → usar override `DB_PORT`/`DB_URL`.
- **Stripe:** variáveis `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_STARTER/PRO/PREMIUM` não configuradas localmente (placeholders). Para testar webhooks: `stripe listen --forward-to localhost:8080/billing/webhook/stripe`.
