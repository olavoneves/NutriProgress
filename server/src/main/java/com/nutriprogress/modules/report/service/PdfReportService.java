package com.nutriprogress.modules.report.service;

import com.nutriprogress.modules.billing.service.PlanLimitService;
import com.nutriprogress.modules.evaluation.entity.Evaluation;
import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.patient.exception.PatientNotFoundException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import com.nutriprogress.modules.report.dto.PatientReportData;
import com.nutriprogress.modules.report.exception.FeatureNotAvailableException;
import com.nutriprogress.shared.exception.ResourceNotFoundException;
import com.nutriprogress.shared.exception.ValidationException;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.openhtmltopdf.svgsupport.BatikSVGDrawer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;

@Slf4j
@Service
@RequiredArgsConstructor
public class PdfReportService {

    private final PatientRepository      patientRepository;
    private final EvaluationRepository   evaluationRepository;
    private final NutritionistRepository nutritionistRepository;
    private final PlanLimitService       planLimitService;
    private final SvgChartBuilder        svgChartBuilder;
    private final TemplateEngine         templateEngine;

    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter SHORT_FMT =
            DateTimeFormatter.ofPattern("dd/MM");

    private static final String FEATURE_EXPORT_PDF = "EXPORT_PDF";

    /**
     * Gera o PDF de evolucao do paciente.
     * Valida disponibilidade da feature no plano e ownership do paciente.
     */
    @Transactional(readOnly = true)
    public byte[] generatePatientReport(UUID nutritionistId, UUID patientId) {
        log.info("Gerando relatorio PDF — paciente {} / nutricionista {}",
                patientId, nutritionistId);

        Nutritionist nutritionist = nutritionistRepository
                .findById(nutritionistId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Nutricionista nao encontrada com ID: " + nutritionistId));

        // Gate por plano
        if (!planLimitService.hasFeature(
                nutritionist.getSubscriptionPlan(), FEATURE_EXPORT_PDF)) {
            throw new FeatureNotAvailableException(
                    "Exportar PDF",
                    nutritionist.getSubscriptionPlan().name(),
                    "STARTER"
            );
        }

        // Ownership: 404 se nao existe, 403 se e de outra nutricionista
        Patient patient = patientRepository
                .findByIdAndNutritionistId(patientId, nutritionistId)
                .orElseThrow(() -> patientRepository.existsById(patientId)
                        ? new UnauthorizedPatientAccessException(patientId, nutritionistId)
                        : new PatientNotFoundException(patientId));

        List<Evaluation> evaluations = evaluationRepository
                .findByPatientIdOrderByEvaluationDateAsc(patientId);

        if (evaluations.isEmpty()) {
            throw new ValidationException(
                    "Este paciente ainda nao possui avaliacoes. " +
                    "Registre ao menos uma avaliacao para gerar o relatorio.");
        }

        PatientReportData data =
                buildReportData(patient, nutritionist, evaluations);

        return renderPdf(renderHtml(data));
    }

    // ====================================================
    // MONTAGEM DOS DADOS
    // ====================================================

    private PatientReportData buildReportData(
            Patient patient,
            Nutritionist nutritionist,
            List<Evaluation> evaluations
    ) {
        List<Evaluation> sorted = evaluations.stream()
                .sorted(Comparator.comparing(Evaluation::getEvaluationDate))
                .toList();

        Evaluation first = sorted.get(0);
        Evaluation last  = sorted.get(sorted.size() - 1);

        String weightSvg = svgChartBuilder.buildLineChart(
                toPoints(sorted, Evaluation::getWeight), "#10b981");
        String bodyFatSvg = svgChartBuilder.buildLineChart(
                toPoints(sorted, Evaluation::getBodyFatPercentage), "#3b82f6");

        return PatientReportData.builder()
                .patientName(patient.getFullName())
                .patientAge(calculateAge(patient.getBirthDate()))
                .generatedAt(LocalDate.now().format(DATE_FMT))
                .nutritionistName(nutritionist.getFullName())
                .nutritionistCrn(nutritionist.getCrn())
                .clinicName(nutritionist.getClinicName())
                .firstEvaluationDate(first.getEvaluationDate().format(DATE_FMT))
                .lastEvaluationDate(last.getEvaluationDate().format(DATE_FMT))
                .totalEvaluations(sorted.size())
                .daysBetween((int) ChronoUnit.DAYS.between(
                        first.getEvaluationDate(), last.getEvaluationDate()))
                .highlights(buildHighlights(first, last))
                .weightChartSvg(weightSvg)
                .bodyFatChartSvg(bodyFatSvg)
                .evaluations(buildRows(sorted))
                .professionalNotes(last.getNotes())
                .build();
    }

    /**
     * Traduz variacoes em frases voltadas ao paciente.
     */
    private List<PatientReportData.Highlight> buildHighlights(
            Evaluation first,
            Evaluation last
    ) {
        List<PatientReportData.Highlight> highlights = new ArrayList<>();

        // Este texto vai impresso no PDF que a paciente recebe — acentuacao
        // correta aqui nao e opcional, ao contrario dos logs e excecoes.
        addHighlight(highlights, "Peso",
                first.getWeight(), last.getWeight(), "kg",
                true,
                "Você perdeu %s kg",
                "Você ganhou %s kg",
                "Seu peso se manteve estável");

        addHighlight(highlights, "Gordura corporal",
                first.getBodyFatPercentage(), last.getBodyFatPercentage(), "%",
                true,
                "Sua gordura corporal reduziu %s pontos",
                "Sua gordura corporal aumentou %s pontos",
                "Sua gordura corporal se manteve estável");

        addHighlight(highlights, "Massa muscular",
                first.getMuscleMass(), last.getMuscleMass(), "kg",
                false,
                "Você perdeu %s kg de massa muscular",
                "Você ganhou %s kg de massa muscular",
                "Sua massa muscular se manteve estável");

        return highlights;
    }

    private void addHighlight(
            List<PatientReportData.Highlight> list,
            String label,
            BigDecimal firstValue,
            BigDecimal lastValue,
            String unit,
            boolean lowerIsBetter,
            String decreaseMsg,
            String increaseMsg,
            String stableMsg
    ) {
        if (firstValue == null || lastValue == null) return;

        BigDecimal diff = lastValue.subtract(firstValue)
                .setScale(1, RoundingMode.HALF_UP);
        int cmp = diff.compareTo(BigDecimal.ZERO);

        String abs = diff.abs().toPlainString().replace('.', ',');

        String message;
        String direction;

        if (cmp == 0) {
            message   = stableMsg;
            direction = "NEUTRAL";
        } else if (cmp < 0) {
            message   = String.format(decreaseMsg, abs);
            direction = lowerIsBetter ? "POSITIVE" : "NEGATIVE";
        } else {
            message   = String.format(increaseMsg, abs);
            direction = lowerIsBetter ? "NEGATIVE" : "POSITIVE";
        }

        String sign = cmp > 0 ? "+" : cmp < 0 ? "-" : "";

        list.add(PatientReportData.Highlight.builder()
                .label(label)
                .value(sign + abs + " " + unit)
                .message(message)
                .direction(direction)
                .build());
    }

    private List<PatientReportData.EvaluationRow> buildRows(
            List<Evaluation> evaluations
    ) {
        return evaluations.stream()
                .map(e -> PatientReportData.EvaluationRow.builder()
                        .number(e.getEvaluationNumber())
                        .date(e.getEvaluationDate().format(DATE_FMT))
                        .weight(format(e.getWeight(), "kg"))
                        .bmi(format(e.getBmi(), ""))
                        .bodyFat(format(e.getBodyFatPercentage(), "%"))
                        .muscleMass(format(e.getMuscleMass(), "kg"))
                        .build())
                .toList();
    }

    private List<SvgChartBuilder.Point> toPoints(
            List<Evaluation> evaluations,
            Function<Evaluation, BigDecimal> extractor
    ) {
        return evaluations.stream()
                .filter(e -> extractor.apply(e) != null)
                .map(e -> new SvgChartBuilder.Point(
                        e.getEvaluationDate().format(SHORT_FMT),
                        extractor.apply(e)))
                .toList();
    }

    private String format(BigDecimal value, String unit) {
        if (value == null) return "—";
        String v = value.setScale(1, RoundingMode.HALF_UP)
                .toPlainString().replace('.', ',');
        return unit.isEmpty() ? v : v + " " + unit;
    }

    private Integer calculateAge(LocalDate birthDate) {
        if (birthDate == null) return null;
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    // ====================================================
    // RENDERIZACAO
    // ====================================================

    private String renderHtml(PatientReportData data) {
        Context context = new Context();
        context.setVariable("report", data);
        return templateEngine.process("report/patient-evolution", context);
    }

    private byte[] renderPdf(String html) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.useSVGDrawer(new BatikSVGDrawer());
            builder.withHtmlContent(html, null);
            builder.toStream(out);
            builder.run();
            return out.toByteArray();
        } catch (Exception e) {
            log.error("Erro ao gerar PDF: {}", e.getMessage(), e);
            throw new IllegalStateException("Falha ao gerar o PDF", e);
        }
    }
}
