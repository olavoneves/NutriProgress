# ============================================================
# STAGE 1: Build
# ============================================================
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

COPY pom.xml .
COPY .mvn/ .mvn/
COPY mvnw .

RUN chmod +x mvnw && \
    ./mvnw dependency:go-offline -B --no-transfer-progress

COPY src ./src

RUN ./mvnw clean package \
    -DskipTests \
    -B \
    --no-transfer-progress \
    -Dspring.profiles.active=prod

# ============================================================
# STAGE 2: Runtime
# ============================================================
FROM eclipse-temurin:21-jre-alpine AS runtime

RUN addgroup -S nutriprogress && \
    adduser -S nutriprogress -G nutriprogress

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

COPY scripts/start.sh scripts/healthcheck.sh ./scripts/
RUN chmod +x scripts/start.sh scripts/healthcheck.sh

RUN mkdir -p /app/logs && \
    chown -R nutriprogress:nutriprogress /app

USER nutriprogress

EXPOSE 8080

HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=60s \
            --retries=3 \
    CMD ./scripts/healthcheck.sh

ENTRYPOINT ["./scripts/start.sh"]
