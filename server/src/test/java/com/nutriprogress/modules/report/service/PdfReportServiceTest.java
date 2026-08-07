package com.nutriprogress.modules.report.service;

import com.nutriprogress.modules.billing.service.PlanLimitService;
import com.nutriprogress.modules.evaluation.entity.Evaluation;
import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.patient.exception.PatientNotFoundException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import com.nutriprogress.modules.report.exception.FeatureNotAvailableException;
import com.nutriprogress.shared.exception.ValidationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

/**
 * Exercita a geracao real do PDF (Thymeleaf -> openhtmltopdf -> PDFBox),
 * sem banco. E o unico ponto onde a renderizacao e de fato verificada:
 * o template precisa continuar sendo XML bem-formado e o SVG precisa
 * atravessar o Batik sem estourar.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("PdfReportService - Testes Unitarios")
class PdfReportServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private EvaluationRepository evaluationRepository;

    @Mock
    private NutritionistRepository nutritionistRepository;

    private PdfReportService service;

    private final UUID nutritionistId = UUID.randomUUID();
    private final UUID patientId      = UUID.randomUUID();

    private Nutritionist nutritionist;
    private Patient      patient;

    @BeforeEach
    void setUp() {
        // Engine real (nao mock) e SpringTemplateEngine (SpEL), igual ao que
        // o Spring Boot injeta em producao — o dialeto muda a avaliacao das
        // expressoes, entao usar o TemplateEngine base falsearia o teste.
        ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
        resolver.setPrefix("templates/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setCharacterEncoding(StandardCharsets.UTF_8.name());

        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(resolver);

        service = new PdfReportService(
                patientRepository,
                evaluationRepository,
                nutritionistRepository,
                new PlanLimitService(patientRepository),
                new SvgChartBuilder(),
                templateEngine
        );

        nutritionist = Nutritionist.builder()
                .id(nutritionistId)
                .fullName("Dra. Ana Souza")
                .crn("CRN-3/12345")
                .clinicName("Clinica Vida & Nutricao")
                .subscriptionPlan(SubscriptionPlan.STARTER)
                .build();

        patient = Patient.builder()
                .id(patientId)
                .fullName("Joao da Silva")
                .birthDate(LocalDate.of(1990, 5, 20))
                .build();
    }

    private Evaluation evaluation(int number, LocalDate date,
                                  String weight, String bodyFat, String muscle) {
        return Evaluation.builder()
                .id(UUID.randomUUID())
                .patient(patient)
                .nutritionist(nutritionist)
                .evaluationNumber(number)
                .evaluationDate(date)
                .weight(new BigDecimal(weight))
                .height(new BigDecimal("175.00"))
                .bmi(new BigDecimal("25.71"))
                .bodyFatPercentage(new BigDecimal(bodyFat))
                .muscleMass(new BigDecimal(muscle))
                .notes("Manter a hidratacao e a caminhada diaria.")
                .build();
    }

    private List<Evaluation> threeEvaluations() {
        return List.of(
                evaluation(1, LocalDate.of(2026, 1, 10), "82.50", "28.40", "31.00"),
                evaluation(2, LocalDate.of(2026, 3, 12), "80.10", "26.90", "31.80"),
                evaluation(3, LocalDate.of(2026, 6, 15), "79.00", "25.30", "32.40")
        );
    }

    private void givenPatientWithEvaluations(List<Evaluation> evaluations) {
        when(nutritionistRepository.findById(nutritionistId))
                .thenReturn(Optional.of(nutritionist));
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.of(patient));
        when(evaluationRepository.findByPatientIdOrderByEvaluationDateAsc(patientId))
                .thenReturn(evaluations);
    }

    @Test
    @DisplayName("Deve gerar um PDF valido e nao trivial")
    void shouldGenerateValidPdf() {
        givenPatientWithEvaluations(threeEvaluations());

        byte[] pdf = service.generatePatientReport(nutritionistId, patientId);

        assertThat(pdf).isNotEmpty();
        // Assinatura do formato: todo PDF comeca com "%PDF-"
        assertThat(new String(pdf, 0, 5, StandardCharsets.ISO_8859_1)).isEqualTo("%PDF-");
        // Um relatorio com graficos e tabela nao cabe em poucos bytes
        assertThat(pdf.length).isGreaterThan(5_000);
    }

    @Test
    @DisplayName("Deve gerar PDF mesmo com uma unica avaliacao (grafico vazio)")
    void shouldGeneratePdfWithSingleEvaluation() {
        givenPatientWithEvaluations(List.of(
                evaluation(1, LocalDate.of(2026, 1, 10), "82.50", "28.40", "31.00")
        ));

        byte[] pdf = service.generatePatientReport(nutritionistId, patientId);

        assertThat(new String(pdf, 0, 5, StandardCharsets.ISO_8859_1)).isEqualTo("%PDF-");
    }

    @Test
    @DisplayName("Deve gerar PDF quando metricas opcionais estao ausentes")
    void shouldGeneratePdfWithMissingMetrics() {
        Evaluation onlyWeight = Evaluation.builder()
                .id(UUID.randomUUID())
                .patient(patient)
                .nutritionist(nutritionist)
                .evaluationNumber(1)
                .evaluationDate(LocalDate.of(2026, 1, 10))
                .weight(new BigDecimal("82.50"))
                .build();

        givenPatientWithEvaluations(List.of(onlyWeight));

        byte[] pdf = service.generatePatientReport(nutritionistId, patientId);

        assertThat(new String(pdf, 0, 5, StandardCharsets.ISO_8859_1)).isEqualTo("%PDF-");
    }

    @Test
    @DisplayName("Plano FREE deve ser bloqueado com o plano necessario")
    void shouldBlockFreePlan() {
        nutritionist.setSubscriptionPlan(SubscriptionPlan.FREE);
        when(nutritionistRepository.findById(nutritionistId))
                .thenReturn(Optional.of(nutritionist));

        assertThatThrownBy(() -> service.generatePatientReport(nutritionistId, patientId))
                .isInstanceOf(FeatureNotAvailableException.class)
                .hasMessageContaining("Exportar PDF")
                .asInstanceOf(org.assertj.core.api.InstanceOfAssertFactories
                        .type(FeatureNotAvailableException.class))
                .extracting(FeatureNotAvailableException::getRequiredPlan)
                .isEqualTo("STARTER");
    }

    @Test
    @DisplayName("Paciente de outra nutricionista deve ser negado")
    void shouldDenyForeignPatient() {
        when(nutritionistRepository.findById(nutritionistId))
                .thenReturn(Optional.of(nutritionist));
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.empty());
        when(patientRepository.existsById(patientId)).thenReturn(true);

        assertThatThrownBy(() -> service.generatePatientReport(nutritionistId, patientId))
                .isInstanceOf(UnauthorizedPatientAccessException.class);
    }

    @Test
    @DisplayName("Paciente inexistente deve retornar not found")
    void shouldFailForUnknownPatient() {
        when(nutritionistRepository.findById(nutritionistId))
                .thenReturn(Optional.of(nutritionist));
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.empty());
        when(patientRepository.existsById(patientId)).thenReturn(false);

        assertThatThrownBy(() -> service.generatePatientReport(nutritionistId, patientId))
                .isInstanceOf(PatientNotFoundException.class);
    }

    @Test
    @DisplayName("Paciente sem avaliacoes deve retornar erro de validacao claro")
    void shouldFailWithoutEvaluations() {
        lenient().when(nutritionistRepository.findById(nutritionistId))
                .thenReturn(Optional.of(nutritionist));
        givenPatientWithEvaluations(List.of());

        assertThatThrownBy(() -> service.generatePatientReport(nutritionistId, patientId))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("ainda nao possui avaliacoes");
    }
}
