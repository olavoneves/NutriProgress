# NutriProgress — Índice de Contexto

> Pasta oculta para contexto de sessão. Cada arquivo .md tem data, hora e descrição.
> Leia este índice primeiro, depois os arquivos relevantes para se situar rapidamente.

## Arquivos

| Arquivo | Data | Descrição |
|---|---|---|
| [day2-auth](2026-05-22_0900_day2-auth.md) | 2026-05-22 09:00 | **Estado atual** — Day 2: módulo auth, JWT, Google OAuth implementados |
| [project-overview](2026-05-21_2200_project-overview.md) | 2026-05-21 22:00 | Day 1 — stack, estrutura, fundação |
| [architecture](2026-05-21_2200_architecture.md) | 2026-05-21 22:00 | Padrões arquiteturais, segurança, banco |
| [git-workflow](2026-05-21_2100_git-workflow.md) | 2026-05-21 21:00 | Workflow de branches, convenção de commits, CI/CD |

## Estado Atual do Projeto

- **Branch ativa:** `feature/auth-jwt` (a partir de `develop`, ainda sem commit do Day 2)
- **Day 1 mergeado:** `refact/day1-foundation` → `develop` → `release` (PR #2). `main` intocada.
- **Day 2 implementado:** módulo `auth/` completo (JWT + Google OAuth + Security)
- **Próximo:** commit do Day 2, PR `feature/auth-jwt` → `develop`, depois Day 3 (DTOs + validation)
- **Build:** ✅ `mvn clean compile` passa
