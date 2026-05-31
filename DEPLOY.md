# NutriProgress API — Deploy Guide

## Pré-requisitos

- Docker + Docker Compose
- Java 21+
- Conta no Render (render.com)
- Conta no Docker Hub

## Desenvolvimento Local

### 1. Clonar e configurar

```bash
git clone https://github.com/olavoneves/NutriProgress.git
cd NutriProgress
cp .env.example .env
# Editar .env com seus valores
```

### 2. Subir infraestrutura completa

```bash
docker-compose up -d postgres mongodb rabbitmq redis mailhog
```

### 3. Rodar a API

```bash
cd server
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### 4. Verificar

```bash
curl http://localhost:8080/health
curl http://localhost:8080/health/ping
# RabbitMQ UI: http://localhost:15672 (nutriprogress/nutriprogress123)
# MailHog UI:  http://localhost:8025
# Swagger:     http://localhost:8080/swagger-ui.html
```

### 5. Build Docker local

```bash
# A partir da raiz do projeto
docker build -t nutriprogress-api ./server
docker run -p 8080:8080 --env-file .env nutriprogress-api
```

## Deploy Produção (Render)

### 1. Criar serviços externos

- **PostgreSQL**: Render Managed Database (starter) — criado automaticamente via `render.yaml`
- **MongoDB**: MongoDB Atlas (free tier) → `MONGODB_URI`
- **RabbitMQ**: CloudAMQP (little lemur — free) → `RABBITMQ_HOST`, `RABBITMQ_USER`, `RABBITMQ_PASS`
- **Redis**: Redis Cloud (free tier) → `REDIS_HOST`, `REDIS_PASSWORD`

### 2. Configurar Render via IaC

```bash
# Instalar Render CLI
npm install -g @render-oss/render-cli

# Deploy via render.yaml
render deploy
```

Ou manualmente:
1. Criar novo Web Service no Render
2. Conectar repositório GitHub (`olavoneves/NutriProgress`)
3. Docker → Dockerfile path: `./server/Dockerfile`, Context: `./server`
4. Configurar variáveis de ambiente (ver `.env.example`)
5. Health check path: `/health/ping`

### 3. CI/CD GitHub Actions

```
Push para main → CI testa → Build Docker → Deploy Render
```

Secrets necessários no GitHub (Settings → Secrets and variables → Actions):

| Secret | Descrição |
|--------|-----------|
| `DOCKERHUB_USERNAME` | Usuário Docker Hub |
| `DOCKERHUB_TOKEN` | Access token Docker Hub |
| `RENDER_API_KEY` | API key do Render |
| `RENDER_SERVICE_ID` | ID do serviço no Render |
| `APP_URL` | URL da app (ex: https://nutriprogress-api.onrender.com) |

### 4. Verificar produção

```bash
curl https://nutriprogress-api.onrender.com/health
curl https://nutriprogress-api.onrender.com/health/ping
```

## Variáveis de Ambiente

Ver `.env.example` para a lista completa com descrições.

## Troubleshooting

### App não sobe no Render
- Verificar logs no dashboard do Render
- Confirmar que `DATABASE_URL` está configurado (vem do banco gerenciado)
- Checar se Flyway migrations rodaram (`ddl-auto: validate`)

### RabbitMQ connection refused
- Verificar `RABBITMQ_HOST`, `RABBITMQ_USER`, `RABBITMQ_PASS`
- Confirmar `RABBITMQ_VHOST=nutriprogress`

### MongoDB auth failed
- Confirmar `authSource=admin` na URI
- Verificar usuário/senha do Atlas

### Health check falha no Render
- Endpoint `/health/ping` deve responder 200 sem autenticação
- Verificar SecurityConfig: `/health/ping` está no `permitAll()`
