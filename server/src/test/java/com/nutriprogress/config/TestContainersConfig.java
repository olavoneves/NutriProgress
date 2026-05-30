package com.nutriprogress.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.RabbitMQContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
public class TestContainersConfig {

    @Bean
    @ServiceConnection
    public PostgreSQLContainer<?> postgresContainer() {
        return new PostgreSQLContainer<>(DockerImageName.parse("postgres:16-alpine"))
                .withDatabaseName("nutriprogress_test")
                .withUsername("test")
                .withPassword("test");
    }

    @Bean
    @ServiceConnection
    public MongoDBContainer mongoDBContainer() {
        return new MongoDBContainer(DockerImageName.parse("mongo:7-jammy"));
    }

    @Bean
    @ServiceConnection
    public RabbitMQContainer rabbitMQContainer() {
        return new RabbitMQContainer(DockerImageName.parse("rabbitmq:3.13-management-alpine"));
    }
}
