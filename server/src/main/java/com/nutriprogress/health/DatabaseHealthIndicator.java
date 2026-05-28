package com.nutriprogress.health;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component("databases")
@RequiredArgsConstructor
public class DatabaseHealthIndicator implements HealthIndicator {

    private final JdbcTemplate jdbcTemplate;
    private final MongoTemplate mongoTemplate;

    @Override
    public Health health() {
        boolean postgresOk = checkPostgres();
        boolean mongoOk    = checkMongo();

        if (postgresOk && mongoOk) {
            return Health.up()
                    .withDetail("postgresql", "UP")
                    .withDetail("mongodb", "UP")
                    .build();
        }

        return Health.down()
                .withDetail("postgresql", postgresOk ? "UP" : "DOWN")
                .withDetail("mongodb", mongoOk ? "UP" : "DOWN")
                .build();
    }

    private boolean checkPostgres() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return true;
        } catch (Exception e) {
            log.error("PostgreSQL health check falhou: {}", e.getMessage());
            return false;
        }
    }

    private boolean checkMongo() {
        try {
            mongoTemplate.getDb().runCommand(new Document("ping", 1));
            return true;
        } catch (Exception e) {
            log.error("MongoDB health check falhou: {}", e.getMessage());
            return false;
        }
    }
}
