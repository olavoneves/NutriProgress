package com.nutriprogress.health.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/health")
@RequiredArgsConstructor
public class HealthController {

    private final JdbcTemplate jdbcTemplate;
    private final MongoTemplate mongoTemplate;

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> checks = new HashMap<>();
        boolean healthy = true;

        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            checks.put("postgresql", Map.of("status", "UP", "message", "Connected"));
        } catch (Exception e) {
            log.error("PostgreSQL health check failed: {}", e.getMessage());
            checks.put("postgresql", Map.of("status", "DOWN", "message", e.getMessage()));
            healthy = false;
        }

        try {
            mongoTemplate.getDb().runCommand(new Document("ping", 1));
            checks.put("mongodb", Map.of("status", "UP", "message", "Connected"));
        } catch (Exception e) {
            log.error("MongoDB health check failed: {}", e.getMessage());
            checks.put("mongodb", Map.of("status", "DOWN", "message", e.getMessage()));
            healthy = false;
        }

        response.put("status", healthy ? "UP" : "DEGRADED");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("version", "1.0.0");
        response.put("checks", checks);

        return healthy
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(503).body(response);
    }

    @GetMapping("/ping")
    public ResponseEntity<Map<String, String>> ping() {
        return ResponseEntity.ok(Map.of(
                "status", "pong",
                "timestamp", LocalDateTime.now().toString()
        ));
    }
}
