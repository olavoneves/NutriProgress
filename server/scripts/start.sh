#!/bin/sh
set -e

echo "============================================"
echo "  NutriProgress API - Starting..."
echo "  Profile: ${SPRING_PROFILES_ACTIVE:-prod}"
echo "  Port: ${PORT:-8080}"
echo "============================================"

JVM_OPTS="\
  -server \
  -XX:+UseContainerSupport \
  -XX:MaxRAMPercentage=75.0 \
  -XX:InitialRAMPercentage=50.0 \
  -XX:+UseG1GC \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/app/logs/heap-dump.hprof \
  -Djava.security.egd=file:/dev/./urandom \
  -Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:-prod} \
  -Dserver.port=${PORT:-8080}"

exec java $JVM_OPTS -jar app.jar
