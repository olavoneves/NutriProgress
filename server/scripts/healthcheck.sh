#!/bin/sh
PORT=${PORT:-8080}
MAX_RETRIES=3
RETRY_DELAY=2

check_health() {
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        --max-time 5 \
        "http://localhost:${PORT}/actuator/health")

    if [ "$response" = "200" ]; then
        return 0
    else
        return 1
    fi
}

i=1
while [ $i -le $MAX_RETRIES ]; do
    if check_health; then
        echo "Health check passed"
        exit 0
    fi
    echo "Health check attempt $i/$MAX_RETRIES failed"
    sleep $RETRY_DELAY
    i=$((i + 1))
done

echo "Health check failed after $MAX_RETRIES attempts"
exit 1
