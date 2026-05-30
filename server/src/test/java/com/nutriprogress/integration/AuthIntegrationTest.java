package com.nutriprogress.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.nutriprogress.config.TestContainersConfig;
import com.nutriprogress.modules.auth.dto.LoginRequest;
import com.nutriprogress.modules.auth.dto.RegisterRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@Transactional
@DisplayName("Auth - Integration Tests")
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    // RegisterRequest/LoginRequest sao records: usar ObjectMapper para serializar diretamente
    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Test
    @DisplayName("Deve registrar nova nutricionista com sucesso")
    void shouldRegisterSuccessfully() throws Exception {
        // RegisterRequest e record: usar construtor
        RegisterRequest request = new RegisterRequest(
                "Dr. Integration Test",
                "integration@test.com",
                "senha12345",
                "CRN-IT-001",
                null, null, null
        );

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").exists())
                .andExpect(jsonPath("$.data.refreshToken").exists())
                .andExpect(jsonPath("$.data.user.email").value("integration@test.com"));
    }

    @Test
    @DisplayName("Deve fazer login com sucesso apos registro")
    void shouldLoginAfterRegister() throws Exception {
        RegisterRequest register = new RegisterRequest(
                "Dr. Login Test",
                "login.test@nutriprogress.com",
                "senha12345",
                "CRN-LT-001",
                null, null, null
        );

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)))
                .andExpect(status().isOk());

        // LoginRequest e record: usar construtor
        LoginRequest login = new LoginRequest("login.test@nutriprogress.com", "senha12345");

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").exists())
                .andExpect(jsonPath("$.data.expiresIn").value(900000));
    }

    @Test
    @DisplayName("Deve rejeitar credenciais invalidas")
    void shouldRejectInvalidCredentials() throws Exception {
        LoginRequest login = new LoginRequest("nao.existe@test.com", "senhaErrada");

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Deve rejeitar registro com email duplicado")
    void shouldRejectDuplicateEmail() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "Dr. Duplicado",
                "duplicado@test.com",
                "senha12345",
                "CRN-DUP-001",
                null, null, null
        );

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }
}
