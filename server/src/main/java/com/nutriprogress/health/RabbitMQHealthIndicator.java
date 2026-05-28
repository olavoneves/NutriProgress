package com.nutriprogress.health;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;

@Slf4j
@Component("rabbitMQ")
@RequiredArgsConstructor
public class RabbitMQHealthIndicator implements HealthIndicator {

    private final ConnectionFactory connectionFactory;

    @Override
    public Health health() {
        try {
            connectionFactory.createConnection().close();
            return Health.up()
                    .withDetail("host", connectionFactory.getHost())
                    .withDetail("port", connectionFactory.getPort())
                    .withDetail("status", "Connected")
                    .build();
        } catch (Exception e) {
            log.error("RabbitMQ health check falhou: {}", e.getMessage());
            return Health.down()
                    .withDetail("error", e.getMessage())
                    .withDetail("status", "Disconnected")
                    .build();
        }
    }
}
