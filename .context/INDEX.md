# NutriProgress — Índice de Contexto

> Pasta oculta para contexto de sessão. Cada arquivo .md tem data, hora e descrição.
> Leia este índice primeiro, depois os arquivos relevantes para se situar rapidamente.

## Arquivos

| Arquivo | Data | Descrição |
|---|---|---|
| [day11-frontend-setup](2026-06-01_2000_day11-frontend-setup.md) | 2026-06-01 20:00 | **Estado atual** — Day 11: Setup frontend React 19+Vite 7+SWC, Design System (tokens/theme/GlobalStyles), PWA, AuthContext completo (reducer+login real), todos os packages instalados |
| [day9-security-lgpd-tests](2026-05-30_1130_day9-security-lgpd-tests.md) | 2026-05-30 11:30 | Day 9: rate limiting, security headers, audit log MongoDB, módulo LGPD, TestContainers + testes de integração |
| [day8-analytics-observability](2026-05-28_2030_day8-analytics-observability.md) | 2026-05-28 20:30 | Day 8: module analytics (MongoDB), observabilidade (Actuator/Prometheus/Logback), health checks |
| [day7-billing-stripe](2026-05-27_0930_day7-billing-stripe.md) | 2026-05-27 09:30 | Day 7: module billing, Stripe, correção DLQ completa |
| [day6-messaging-rabbitmq](2026-05-26_2000_day6-messaging-rabbitmq.md) | 2026-05-26 20:00 | Day 6: RabbitMQ + eventos de domínio + módulo notification (gateway adiado) |
| [day3-user-nutritionist](2026-05-23_0900_day3-user-nutritionist.md) | 2026-05-23 09:00 | Day 3: CRUD User + Nutritionist, perfil /me, stats, limites de plano |
| [day2-auth](2026-05-22_0900_day2-auth.md) | 2026-05-22 09:00 | Day 2: módulo auth, JWT, Google OAuth implementados |
| [project-overview](2026-05-21_2200_project-overview.md) | 2026-05-21 22:00 | Day 1 — stack, estrutura, fundação |
| [architecture](2026-05-21_2200_architecture.md) | 2026-05-21 22:00 | Padrões arquiteturais, segurança, banco |
| [git-workflow](2026-05-21_2100_git-workflow.md) | 2026-05-21 21:00 | Workflow de branches, convenção de commits, CI/CD |

## Estado Atual do Projeto

- **Branch ativa:** `main` — Day 11 mergeado (PR #17→#18, commit `d7dfa96`)
- **Days 1–10:** backend completo (auth/JWT, User+Nutritionist, Patient, Evaluation, RabbitMQ, billing/Stripe, analytics MongoDB, segurança avançada+LGPD+testes, CI/CD+Docker+Render). PRs #1–#16 mergeados.
- **Day 11:** Setup frontend React 19 + Vite 7 + SWC. Design System, PWA, AuthContext com reducer. Build ✅ sem erros TS.
- **Frontend:** `client/` — componentes UI/Layout/Common completos, hooks, lib/api, routes, utils, features com stubs. **Próximo:** implementar as features reais (auth pages, dashboard, patients, evaluations).
- **Backend build:** ✅ `mvnw test` → 44 testes, 0 falhas (1 contextLoads sem DB local — esperado).
- **Frontend build:** ✅ `npm run build` → sem erros; `npm run dev` → :3000.
- **Maven:** usar o wrapper `server/mvnw.cmd` (não há `mvn` no PATH); Java 21.
- **Docker:** desligado por padrão; containers `nutriprogress-db` (Postgres :5434) e `nutriprogress-mongo` (:27017).
- **Env gotcha backend:** var de usuário `DB_PASSWORD=Futsal1#` (outro projeto) sobrescreve o default; p/ `verify` local setar `DB_URL` (:5434) **e** `DB_PASSWORD=postgres`.
- **Env gotcha frontend:** `vite.config.js` antigo pode bloquear aliases novos — se aliases não resolverem, deletar arquivos `.js/.d.ts` na raiz do client/.
