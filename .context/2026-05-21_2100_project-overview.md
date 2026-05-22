# Project Overview — NutriProgress
**Data:** 2026-05-21 21:00  
**Descrição:** Stack, estrutura geral, estado atual e itens incompletos

---

## O que é

Plataforma SaaS para nutricionistas gerenciarem pacientes e avaliações antropométricas. Inclui assinaturas/billing.

**Repositório:** https://github.com/olavoneves/NutriProgress.git

---

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Spring Boot 4.0.2, Java 21, Maven |
| Segurança | Spring Security 6, JWT (Auth0 java-jwt 4.5.1) |
| Banco | MySQL 8, Flyway migrations, JPA/Hibernate |
| Email | Spring Mail + Gmail SMTP |
| Frontend | React 19, TypeScript 5.9, Vite 7, Styled Components |
| Roteamento | React Router DOM 7 |
| HTTP Client | Axios com interceptors de refresh token |

---

## Estrutura de Diretórios

```
anthropometric-assessment/
├── .context/         ← contexto de sessão (este diretório)
├── .github/
│   └── workflows/    ← CI/CD (criado em 2026-05-21)
├── client/           ← Frontend React/TypeScript
└── server/           ← Backend Spring Boot
```

### Backend — Domínios

```
br.com.api.server/
├── shared/security/   # JWT filter, config, handlers
├── auth/              # Login, refresh, logout, forgot-password, email-verify
├── user/              # CRUD de usuários
├── nutritionist/      # Perfil do nutricionista
├── patient/           # Cadastro e gestão de pacientes
├── avaliation/        # Avaliações antropométricas
└── billing/           # Planos, assinaturas, pagamentos
```

### Frontend — Features

```
client/src/
├── features/auth/        # Login/Register (TODO: formulários)
├── features/dashboard/   # Dashboard principal
├── features/patients/    # Listagem/form de pacientes (placeholder)
├── features/evaluations/ # Avaliações (placeholder)
├── features/profile/     # Perfil do usuário (placeholder)
├── store/auth/           # AuthContext + token management
└── lib/api/              # Axios + interceptors de refresh
```

---

## Banco de Dados — Migrações Flyway (V1–V10)

| Migration | Tabela |
|---|---|
| V1 | users |
| V2 | nutritionists |
| V3 | patients |
| V4 | plans |
| V5 | subscriptions |
| V6 | payments |
| V7 | avaliations (avaliações antropométricas) |
| V8 | refresh_tokens |
| V9 | password_reset_tokens |
| V10 | email_verification_tokens |

---

## Estado Atual — O que está feito

### Backend (COMPLETO)
- [x] Autenticação JWT completa (login, refresh, logout, logoutAll)
- [x] Forgot Password (email + reset token)
- [x] Email Verification (token)
- [x] Segurança stateless com filtros
- [x] Todas as migrations de banco (V1–V10)
- [x] Modelos/entidades e DTOs para todos os domínios
- [x] Repositories JPA para todos os domínios

### Backend (INCOMPLETO/VAZIO)
- [ ] RegisterUserController — vazio
- [ ] PatientController (criação) — vazio
- [ ] Services de patient, nutritionist, avaliation, billing — vazios
- [ ] Pasta shared/exceptions — vazia

### Frontend (COMPLETO)
- [x] Estrutura de rotas (públicas/protegidas)
- [x] AuthContext com gestão de tokens
- [x] Interceptors de refresh automático com queue
- [x] Tipos TypeScript completos
- [x] Temas, layout base, componentes UI

### Frontend (INCOMPLETO/TODO)
- [ ] Formulários de Login e Register
- [ ] Listagem e CRUD de pacientes
- [ ] Listagem e CRUD de avaliações
- [ ] Página de perfil

---

## Variáveis de Ambiente (servidor)

```
DATASOURCE_USERNAME
DB_PASSWORD
JWT_TOKEN_SECRET
JWT_ACCESS_TOKEN_EXPIRATION   # minutos (ex: 15)
JWT_REFRESH_TOKEN_EXPIRATION  # minutos (ex: 10080 = 7 dias)
EMAIL_BIOGURT                 # Gmail remetente
SENHA_LD                      # App password Gmail
```
