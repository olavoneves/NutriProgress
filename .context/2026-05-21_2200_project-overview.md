# Project Overview — NutriProgress
**Data:** 2026-05-21 22:00 (pós-Day 1 da refatoração)
**Descrição:** Stack, estrutura modular e estado atual após reconstrução da fundação

---

## O que é

SaaS para nutricionistas gerenciarem pacientes e acompanharem evolução corporal (avaliações antropométricas), com billing/assinaturas.

**Repositório:** https://github.com/olavoneves/NutriProgress.git

---

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Spring Boot 4.0.2, Java 21, Maven |
| Banco | **PostgreSQL 16**, Flyway, JPA/Hibernate 7 |
| Segurança | Spring Security 6 + JWT (Auth0 java-jwt 4.5.1) — stub no Day 1, implementação no Day 2 |
| Email | Spring Mail (Day 2+) |
| Docs API | springdoc-openapi (Swagger UI em `/swagger-ui.html`) |
| Frontend | React 19, TypeScript 5.9, Vite 7, Styled Components, React Router 7, Axios |

**Stack futura (ainda não configurada):** MongoDB (analytics), Redis (cache), RabbitMQ (mensageria)

---

## Estrutura

```
anthropometric-assessment/
├── .context/         ← contexto de sessão (este diretório)
├── .github/workflows/ ← CI (PostgreSQL service) + Release
├── client/           ← Frontend React/TypeScript
└── server/           ← Backend Spring Boot
    └── src/main/java/com/nutriprogress/
        ├── NutriProgressApplication.java
        ├── config/    (DatabaseConfig, SecurityConfig, SwaggerConfig)
        ├── shared/
        │   ├── audit/      (AuditableEntity, AuditorAwareImpl)
        │   ├── dto/        (ApiResponse, PageResponse, ErrorResponse)
        │   ├── exception/  (GlobalExceptionHandler + custom exceptions)
        │   └── util/       (DateUtils, ValidationUtils)
        └── modules/
            ├── user/         (entity + repository)
            ├── nutritionist/ (entity + repository)
            ├── patient/      (entity + repository)
            └── evaluation/   (entity + repository)
```

> **Importante:** `evaluation` (não `avaliation`). Renomeado na refatoração para alinhar com o frontend e padronizar em inglês.

---

## Banco de Dados (Migrations Flyway)

Reescritas em PostgreSQL no Day 1:

| Migration | Tabela |
|---|---|
| V1 | users |
| V2 | nutritionists |
| V3 | patients |
| V4 | evaluations (com trigger para auto-incrementar `evaluation_number` por paciente) |

**Migrations V5+ (billing, refresh_tokens, etc.):** descartadas — serão recriadas em Days futuros (billing module, auth module).

---

## Estado Atual (após Day 1)

### ✅ Concluído
- Estrutura modular em `com.nutriprogress`
- 4 entidades base + AuditableEntity + Auditing JPA
- Repositories básicos (JpaRepository)
- 4 migrations PostgreSQL
- Application YAML (dev/prod profiles)
- SecurityConfig stub (permitAll — auth real no Day 2)
- GlobalExceptionHandler + DTOs comuns
- Swagger configurado
- Build compila com sucesso

### ⏳ Próximos Days (do roadmap)
- **Day 2:** Autenticação JWT + Google OAuth (módulo `auth/`)
- **Day 3:** DTOs + bean validation
- **Day 4-5:** Controllers + Services completos (CRUDs)
- **Day 6:** RabbitMQ
- **Day 8:** MongoDB (analytics)
- **Day 9+:** Billing, notifications, export PDF

---

## Variáveis de Ambiente

**Backend (Day 1):**
```
SPRING_PROFILE              # dev | prod (default: dev)
DB_USERNAME                 # postgres
DB_PASSWORD                 # postgres
DATABASE_URL                # apenas em prod (URL completa)
JWT_SECRET                  # chave de assinatura JWT (Day 2+)
PORT                        # 8080 (default)
SHOW_SQL                    # false (default)
```

**Frontend:**
```
VITE_API_BASE_URL           # /api (dev) | https://api.nutriprogress.com (prod)
VITE_APP_NAME               # NutriProgress
VITE_APP_VERSION            # 0.1.0
```
