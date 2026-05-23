# Day 3 — Módulos User + Nutritionist (CRUD)
**Data:** 2026-05-23 09:00
**Branch:** `feature/day3-user-nutritionist` (a partir de `develop`)

## Estado herdado (Day 1 + Day 2)
- Day 1 (`refact/day1-foundation`) e Day 2 (`feature/auth-jwt`, PR #3) **mergeados** em `develop`.
- `main` intocada. Working tree limpa no início do Day 3.
- Pendência conhecida (Day 1): `mvn test` falha por falta de `application-test.yml` (H2/TestContainers). Não bloqueia testes unitários puros com Mockito.

## Decisões de adaptação ao prompt do Day 3
O prompt original assumiu padrões que **divergem** do código real. Ajustes feitos:
- **NÃO** criado `AuditingConfig`: `@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")` já existe em `config/DatabaseConfig`. Criar outro causaria bean duplicado.
- **DTOs como `record` + `@Builder`** (convenção do projeto, ex.: `LoginResponse`), não classes Lombok `@Data`.
- **`ApiResponse.ok()/.fail()`** (record), não `.success()`.
- **`ErrorResponse`** é record; handler usa helper `build()`. Exceptions "not found" estendem `ResourceNotFoundException` (já tratada → 404), evitando handlers duplicados.
- **`PatientRepository` e `EvaluationRepository` já existiam** → apenas adicionados métodos `count*`.
- **`Evaluation` tem `nutritionist` direto** → contagem por nutricionista direta no repo.
- **`UserRepository`** usa `findByEmailIgnoreCase` (não `findByEmail`).
- **Controller `/me`** usa `authentication.getName()` (principal = `UserDetails` com username=email), sem cast.
- **`AuditorAwareImpl`** melhorado: resolve UUID do usuário autenticado via `UserRepository` (injeção `@Lazy` para evitar ciclo no bootstrap), retorna `Optional.empty()` defensivamente.

## Arquivos criados/alterados
### Novos
- `modules/user/dto/UserDTO.java`
- `modules/user/dto/UpdateUserRequest.java`
- `modules/user/exception/UserNotFoundException.java`
- `modules/user/service/UserService.java`
- `modules/nutritionist/dto/NutritionistDTO.java`
- `modules/nutritionist/dto/NutritionistProfileDTO.java`
- `modules/nutritionist/dto/NutritionistStatsDTO.java`
- `modules/nutritionist/dto/UpdateNutritionistRequest.java`
- `modules/nutritionist/exception/NutritionistNotFoundException.java`
- `modules/nutritionist/exception/SubscriptionLimitExceededException.java`
- `modules/nutritionist/mapper/NutritionistMapper.java`
- `modules/nutritionist/service/NutritionistService.java`
- `modules/nutritionist/controller/NutritionistController.java`
- `modules/nutritionist/service/NutritionistServiceTest.java` (test)

### Alterados
- `modules/nutritionist/repository/NutritionistRepository.java` (+ findByUserEmail)
- `modules/patient/repository/PatientRepository.java` (+ count*)
- `modules/evaluation/repository/EvaluationRepository.java` (+ count*)
- `shared/audit/AuditorAwareImpl.java` (resolve UUID real)
- `shared/exception/GlobalExceptionHandler.java` (+ handler 402)

## Endpoints novos
| Método | Path | Descrição | Acesso |
|---|---|---|---|
| GET | `/nutritionists/me` | Perfil completo da nutricionista logada + stats | autenticado |
| PUT | `/nutritionists/me` | Atualiza dados da nutricionista logada | autenticado |
| GET | `/nutritionists/{id}` | Busca por ID | ADMIN |

## Limites de pacientes por plano
FREE=5, STARTER=20, PRO=50, PREMIUM=ilimitado (-1).

## Próximo passo
- PR `feature/day3-user-nutritionist` → `develop`.
- Day 4 (provável): módulo Patient (CRUD + paginação).
- Ainda pendente: `application-test.yml` para destravar `mvn test` completo no CI.
