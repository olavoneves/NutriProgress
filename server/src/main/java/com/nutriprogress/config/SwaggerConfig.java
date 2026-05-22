package com.nutriprogress.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI nutriProgressOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("NutriProgress API")
                .description("API do NutriProgress - SaaS para nutricionistas")
                .version("v0.1.0"));
    }
}
