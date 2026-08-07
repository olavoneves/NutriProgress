package com.nutriprogress.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.nutriprogress.config.TestContainersConfig;
import com.nutriprogress.modules.auth.dto.LoginResponse;
import com.nutriprogress.modules.auth.dto.RegisterRequest;
import com.nutriprogress.modules.evaluation.dto.CreateEvaluationRequest;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.dto.CreatePatientRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Cobre o endpoint de relatorio pela stack HTTP real. O ponto sensivel e a
 * negociacao de conteudo: o endpoint declara `application/pdf`, mas os erros
 * (402/403/404) saem em JSON pelo GlobalExceptionHandler.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(TestContainersConfig.class)
@DisplayName("Report - Integration Tests")
class ReportIntegrationTest {

    /*
     * Sem @Transactional de proposito. Cada request commita, como em producao.
     * Com o rollback do teste, o User recem-registrado fica pendente de flush
     * no persistence context; ai qualquer escrita auditada dispara
     * AuditorAwareImpl -> consulta em `users` -> auto-flush -> listener ->
     * AuditorAwareImpl... em recursao infinita (trava a suite).
     * O isolamento aqui vem do e-mail unico por execucao.
     */

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private NutritionistRepository nutritionistRepository;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private String accessToken;
    private String email;

    @BeforeEach
    void setUp() throws Exception {
        this.email = "report.test." + java.util.UUID.randomUUID() + "@nutriprogress.com";

        RegisterRequest register = new RegisterRequest(
                "Dra. Report Test",
                email,
                "senha12345",
                "CRN-RT-001",
                null, null, null
        );

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(register)))
                .andExpect(status().isOk())
                .andReturn();

        LoginResponse loginResponse = objectMapper.readValue(
                objectMapper.readTree(result.getResponse().getContentAsString())
                        .get("data").toString(),
                LoginResponse.class
        );
        this.accessToken = loginResponse.accessToken();
    }

    private void upgradeToStarter() {
        Nutritionist nutritionist = nutritionistRepository.findByUserEmail(email).orElseThrow();
        nutritionist.setSubscriptionPlan(SubscriptionPlan.STARTER);
        nutritionistRepository.save(nutritionist);
    }

    private String createPatient() throws Exception {
        CreatePatientRequest request = new CreatePatientRequest();
        request.setFullName("Joana Relatorio");
        request.setBirthDate(LocalDate.of(1992, 3, 15));

        MvcResult result = mockMvc.perform(post("/patients")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn();

        return objectMapper.readTree(result.getResponse().getContentAsString())
                .get("data").get("id").asText();
    }

    private void createEvaluation(String patientId, LocalDate date, String weight) throws Exception {
        CreateEvaluationRequest request = new CreateEvaluationRequest();
        request.setEvaluationDate(date);
        request.setWeight(new BigDecimal(weight));
        request.setHeight(new BigDecimal("168.00"));
        request.setBodyFatPercentage(new BigDecimal("27.50"));
        request.setMuscleMass(new BigDecimal("30.00"));

        mockMvc.perform(post("/patients/" + patientId + "/evaluations")
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Plano FREE deve receber 402 com o plano necessario")
    void shouldReturn402ForFreePlan() throws Exception {
        String patientId = createPatient();

        mockMvc.perform(get("/patients/" + patientId + "/report/pdf")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isPaymentRequired())
                .andExpect(jsonPath("$.status").value(402))
                .andExpect(jsonPath("$.errors.requiredPlan").value("STARTER"));
    }

    @Test
    @DisplayName("Plano STARTER deve baixar o PDF")
    void shouldReturnPdfForStarterPlan() throws Exception {
        String patientId = createPatient();
        createEvaluation(patientId, LocalDate.now().minusMonths(2), "78.40");
        createEvaluation(patientId, LocalDate.now().minusDays(3), "75.10");
        upgradeToStarter();

        MvcResult result = mockMvc.perform(get("/patients/" + patientId + "/report/pdf")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Type", MediaType.APPLICATION_PDF_VALUE))
                .andExpect(header().string("Content-Disposition",
                        org.hamcrest.Matchers.containsString("attachment")))
                .andReturn();

        byte[] pdf = result.getResponse().getContentAsByteArray();
        assertThat(new String(pdf, 0, 5, StandardCharsets.ISO_8859_1)).isEqualTo("%PDF-");
        assertThat(pdf.length).isGreaterThan(5_000);
    }

    @Test
    @DisplayName("Paciente sem avaliacoes deve receber 400 com mensagem clara")
    void shouldReturn400WithoutEvaluations() throws Exception {
        String patientId = createPatient();
        upgradeToStarter();

        mockMvc.perform(get("/patients/" + patientId + "/report/pdf")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message")
                        .value(org.hamcrest.Matchers.containsString("avaliacoes")));
    }

    @Test
    @DisplayName("Paciente inexistente deve receber 404")
    void shouldReturn404ForUnknownPatient() throws Exception {
        upgradeToStarter();

        mockMvc.perform(get("/patients/" + java.util.UUID.randomUUID() + "/report/pdf")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Deve rejeitar acesso sem token")
    void shouldRejectWithoutToken() throws Exception {
        mockMvc.perform(get("/patients/" + java.util.UUID.randomUUID() + "/report/pdf"))
                .andExpect(status().isUnauthorized());
    }
}
