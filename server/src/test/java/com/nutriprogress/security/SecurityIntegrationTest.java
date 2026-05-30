package com.nutriprogress.security;

import com.nutriprogress.config.TestContainersConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@DisplayName("Security - Integration Tests")
class SecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Deve incluir headers de seguranca em todas as respostas")
    void shouldIncludeSecurityHeaders() throws Exception {
        mockMvc.perform(get("/actuator/health"))
                .andExpect(header().exists("X-Frame-Options"))
                .andExpect(header().string("X-Frame-Options", "DENY"))
                .andExpect(header().exists("X-Content-Type-Options"))
                .andExpect(header().string("X-Content-Type-Options", "nosniff"))
                .andExpect(header().exists("X-XSS-Protection"));
    }

    @Test
    @DisplayName("Deve bloquear acesso a endpoints protegidos sem JWT")
    void shouldBlockProtectedEndpointsWithoutJwt() throws Exception {
        mockMvc.perform(get("/patients"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/nutritionists/me"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/billing/subscription"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Deve permitir acesso a endpoints publicos sem autenticacao")
    void shouldAllowPublicEndpoints() throws Exception {
        // Testa que o Spring Security NAO bloqueia o endpoint (nao deve retornar 401/403).
        // O status pode ser 200 (healthy) ou 503 (degraded) — ambos sao acessiveis.
        int status = mockMvc.perform(get("/actuator/health"))
                .andReturn().getResponse().getStatus();
        assertThat(status)
                .as("Endpoint /actuator/health deve ser acessivel sem autenticacao")
                .isNotIn(401, 403);
    }

    @Test
    @DisplayName("Deve rejeitar token JWT invalido")
    void shouldRejectInvalidJwt() throws Exception {
        mockMvc.perform(get("/patients")
                .header("Authorization", "Bearer token.invalido.aqui"))
                .andExpect(status().isUnauthorized());
    }
}
