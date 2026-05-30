package com.nutriprogress.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.nutriprogress.config.TestContainersConfig;
import com.nutriprogress.modules.auth.dto.LoginResponse;
import com.nutriprogress.modules.auth.dto.RegisterRequest;
import com.nutriprogress.modules.evaluation.dto.CreateEvaluationRequest;
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

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@Transactional
@DisplayName("Evaluation - Integration Tests")
class EvaluationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private String accessToken;
    private String patientId;

    @BeforeEach
    void setUp() throws Exception {
        RegisterRequest register = new RegisterRequest(
                "Dr. Eval Test",
                "eval.test." + System.currentTimeMillis() + "@nutriprogress.com",
                "senha12345",
                "CRN-ET-001",
                null, null, null
        );

        MvcResult authResult = mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)))
                .andExpect(status().isOk())
                .andReturn();

        String authBody = authResult.getResponse().getContentAsString();
        LoginResponse loginResponse = objectMapper.readValue(
                objectMapper.readTree(authBody).get("data").toString(),
                LoginResponse.class
        );
        this.accessToken = loginResponse.accessToken();

        // CreatePatientRequest e classe @Data com setters
        CreatePatientRequest patient = new CreatePatientRequest();
        patient.setFullName("Paciente Eval Test");

        MvcResult patientResult = mockMvc.perform(post("/patients")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(patient)))
                .andExpect(status().isCreated())
                .andReturn();

        String patientBody = patientResult.getResponse().getContentAsString();
        this.patientId = objectMapper.readTree(patientBody).get("data").get("id").asText();
    }

    @Test
    @DisplayName("Deve criar avaliacao com BMI calculado automaticamente")
    void shouldCreateEvaluationWithBmi() throws Exception {
        // CreateEvaluationRequest e classe @Data com setters
        CreateEvaluationRequest request = new CreateEvaluationRequest();
        request.setEvaluationDate(LocalDate.now());
        request.setWeight(BigDecimal.valueOf(70.0));
        request.setHeight(BigDecimal.valueOf(165.0));
        request.setBodyFatPercentage(BigDecimal.valueOf(22.5));

        mockMvc.perform(post("/patients/" + patientId + "/evaluations")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.weight").value(70.0))
                .andExpect(jsonPath("$.data.bmi").exists())
                .andExpect(jsonPath("$.data.evaluationNumber").value(1));
    }

    @Test
    @DisplayName("Deve incrementar numero de avaliacao automaticamente")
    void shouldAutoIncrementEvaluationNumber() throws Exception {
        CreateEvaluationRequest request = new CreateEvaluationRequest();
        request.setEvaluationDate(LocalDate.now());
        request.setWeight(BigDecimal.valueOf(70.0));

        mockMvc.perform(post("/patients/" + patientId + "/evaluations")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(jsonPath("$.data.evaluationNumber").value(1));

        request.setWeight(BigDecimal.valueOf(68.5));
        mockMvc.perform(post("/patients/" + patientId + "/evaluations")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(jsonPath("$.data.evaluationNumber").value(2));
    }

    @Test
    @DisplayName("Deve retornar dados de evolucao para graficos")
    void shouldReturnEvolutionData() throws Exception {
        for (int i = 0; i < 3; i++) {
            CreateEvaluationRequest request = new CreateEvaluationRequest();
            request.setEvaluationDate(LocalDate.now().minusMonths(i));
            request.setWeight(BigDecimal.valueOf(72.0 - i));

            mockMvc.perform(post("/patients/" + patientId + "/evaluations")
                    .header("Authorization", "Bearer " + accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated());
        }

        mockMvc.perform(get("/patients/" + patientId + "/evaluations/evolution")
                .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.weightEvolution").isArray())
                .andExpect(jsonPath("$.data.comparison").exists())
                .andExpect(jsonPath("$.data.comparison.daysBetween").isNumber());
    }
}
