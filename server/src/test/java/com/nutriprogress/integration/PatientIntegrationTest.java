package com.nutriprogress.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.nutriprogress.config.TestContainersConfig;
import com.nutriprogress.modules.auth.dto.LoginResponse;
import com.nutriprogress.modules.auth.dto.RegisterRequest;
import com.nutriprogress.modules.patient.dto.CreatePatientRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@Transactional
@DisplayName("Patient - Integration Tests")
class PatientIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private String accessToken;

    @BeforeEach
    void setUp() throws Exception {
        // RegisterRequest e record: usar construtor com email unico por timestamp
        RegisterRequest register = new RegisterRequest(
                "Dr. Patient Test",
                "patient.test." + System.currentTimeMillis() + "@nutriprogress.com",
                "senha12345",
                "CRN-PT-001",
                null, null, null
        );

        MvcResult result = mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        // LoginResponse e record: usar accessor .accessToken()
        LoginResponse loginResponse = objectMapper.readValue(
                objectMapper.readTree(responseBody).get("data").toString(),
                LoginResponse.class
        );
        this.accessToken = loginResponse.accessToken();
    }

    @Test
    @DisplayName("Deve criar paciente com sucesso")
    void shouldCreatePatientSuccessfully() throws Exception {
        // CreatePatientRequest e classe @Data: usar setters
        CreatePatientRequest request = new CreatePatientRequest();
        request.setFullName("Maria Silva Integration");
        request.setEmail("maria.integration@test.com");
        request.setPhone("11987654321");

        mockMvc.perform(post("/patients")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.fullName").value("Maria Silva Integration"))
                .andExpect(jsonPath("$.data.isActive").value(true));
    }

    @Test
    @DisplayName("Deve listar pacientes com paginacao")
    void shouldListPatientsWithPagination() throws Exception {
        mockMvc.perform(get("/patients?page=0&size=10")
                .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.page").value(0))
                .andExpect(jsonPath("$.data.size").value(10));
    }

    @Test
    @DisplayName("Deve rejeitar acesso sem token")
    void shouldRejectAccessWithoutToken() throws Exception {
        mockMvc.perform(get("/patients"))
                .andExpect(status().isUnauthorized());
    }
}
