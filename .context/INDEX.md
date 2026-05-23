# NutriProgress — Índice de Contexto

> Pasta oculta para contexto de sessão. Cada arquivo .md tem data, hora e descrição.
> Leia este índice primeiro, depois os arquivos relevantes para se situar rapidamente.

## Arquivos

| Arquivo | Data | Descrição |
|---|---|---|
| [day3-user-nutritionist](2026-05-23_0900_day3-user-nutritionist.md) | 2026-05-23 09:00 | **Estado atual** — Day 3: CRUD User + Nutritionist, perfil /me, stats, limites de plano |
| [day2-auth](2026-05-22_0900_day2-auth.md) | 2026-05-22 09:00 | Day 2: módulo auth, JWT, Google OAuth implementados |
| [project-overview](2026-05-21_2200_project-overview.md) | 2026-05-21 22:00 | Day 1 — stack, estrutura, fundação |
| [architecture](2026-05-21_2200_architecture.md) | 2026-05-21 22:00 | Padrões arquiteturais, segurança, banco |
| [git-workflow](2026-05-21_2100_git-workflow.md) | 2026-05-21 21:00 | Workflow de branches, convenção de commits, CI/CD |

## Estado Atual do Projeto

- **Branch ativa:** `feature/day3-user-nutritionist` (a partir de `develop`)
- **Day 1 + Day 2 mergeados:** `develop` tem foundation + auth (PR #2 e #3). `main` intocada.
- **Day 3 implementado:** CRUD User + Nutritionist, perfil `/me`, stats, limites de plano, auditoria com UUID real
- **Próximo:** PR `feature/day3-user-nutritionist` → `develop`, depois Day 4 (provável módulo Patient)
- **Build:** ✅ `mvn clean compile` passa | ✅ `NutritionistServiceTest` (3 testes)
- **Maven:** não está no PATH; usar o bundled do IntelliJ: `C:\Program Files\JetBrains\IntelliJ IDEA Community Edition 2025.1.1.1\plugins\maven\lib\maven3\bin\mvn.cmd` (JAVA_HOME=`C:\Program Files\Java\jdk-21`)
