package com.nutriprogress.modules.analytics.service;

import com.nutriprogress.modules.analytics.document.BusinessMetrics;
import com.nutriprogress.modules.analytics.dto.BusinessMetricsDTO;
import com.nutriprogress.modules.analytics.repository.BusinessMetricsRepository;
import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MetricsService {

    private static final BigDecimal STARTER_PRICE = BigDecimal.valueOf(29.90);
    private static final BigDecimal PRO_PRICE     = BigDecimal.valueOf(49.90);
    private static final BigDecimal PREMIUM_PRICE = BigDecimal.valueOf(99.90);

    private final BusinessMetricsRepository metricsRepository;
    private final NutritionistRepository nutritionistRepository;
    private final PatientRepository patientRepository;
    private final EvaluationRepository evaluationRepository;
    private final MeterRegistry meterRegistry;

    private Counter loginCounter;
    private Counter patientCreatedCounter;
    private Counter evaluationCreatedCounter;

    @PostConstruct
    public void initMetrics() {
        loginCounter = Counter.builder("nutriprogress.logins.total")
                .description("Total de logins na plataforma")
                .register(meterRegistry);

        patientCreatedCounter = Counter.builder("nutriprogress.patients.created.total")
                .description("Total de pacientes criados")
                .register(meterRegistry);

        evaluationCreatedCounter = Counter.builder("nutriprogress.evaluations.created.total")
                .description("Total de avaliacoes criadas")
                .register(meterRegistry);
    }

    public void incrementLogin() {
        loginCounter.increment();
    }

    public void incrementPatientCreated() {
        patientCreatedCounter.increment();
    }

    public void incrementEvaluationCreated() {
        evaluationCreatedCounter.increment();
    }

    /**
     * Calcula e salva metricas do dia anterior (roda a meia-noite).
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void calculateDailyMetrics() {
        log.info("Calculando metricas diarias...");

        try {
            LocalDate yesterday = LocalDate.now().minusDays(1);
            LocalDateTime start = yesterday.atStartOfDay();
            LocalDateTime end   = yesterday.plusDays(1).atStartOfDay();

            long totalNutritionists = nutritionistRepository.count();
            long totalPatients      = patientRepository.count();
            long totalEvaluations   = evaluationRepository.count();

            long newNutritionists = nutritionistRepository.countByCreatedAtBetween(start, end);
            long newPatients      = patientRepository.countByCreatedAtBetween(start, end);
            long newEvaluations   = evaluationRepository.countByCreatedAtBetween(start, end);

            long freePlanCount    = countByPlan(SubscriptionPlan.FREE);
            long starterPlanCount = countByPlan(SubscriptionPlan.STARTER);
            long proPlanCount     = countByPlan(SubscriptionPlan.PRO);
            long premiumPlanCount = countByPlan(SubscriptionPlan.PREMIUM);

            BigDecimal mrr = calculateMrr(starterPlanCount, proPlanCount, premiumPlanCount);

            BusinessMetrics metrics = BusinessMetrics.builder()
                    .date(yesterday)
                    .metricType("DAILY")
                    .totalNutritionists(totalNutritionists)
                    .newNutritionists(newNutritionists)
                    .freePlanCount(freePlanCount)
                    .starterPlanCount(starterPlanCount)
                    .proPlanCount(proPlanCount)
                    .premiumPlanCount(premiumPlanCount)
                    .mrr(mrr)
                    .totalPatients(totalPatients)
                    .newPatients(newPatients)
                    .totalEvaluations(totalEvaluations)
                    .newEvaluations(newEvaluations)
                    .build();

            // Upsert: substitui se ja existir registro para o dia.
            metricsRepository.findByDateAndMetricType(yesterday, "DAILY")
                    .ifPresent(existing -> metrics.setId(existing.getId()));

            metricsRepository.save(metrics);
            log.info("Metricas diarias salvas para: {}", yesterday);
        } catch (Exception e) {
            log.error("Erro ao calcular metricas diarias: {}", e.getMessage(), e);
        }
    }

    /**
     * Metricas de negocio em tempo real + serie historica.
     */
    public BusinessMetricsDTO getBusinessMetrics() {
        LocalDate today     = LocalDate.now();
        LocalDate sixMonths = today.minusMonths(6);

        List<BusinessMetrics> historical = metricsRepository
                .findByMetricTypeAndDateBetweenOrderByDateDesc("DAILY", sixMonths, today);

        long totalNutritionists = nutritionistRepository.count();
        long freePlanCount      = countByPlan(SubscriptionPlan.FREE);
        long starterPlanCount   = countByPlan(SubscriptionPlan.STARTER);
        long proPlanCount       = countByPlan(SubscriptionPlan.PRO);
        long premiumPlanCount   = countByPlan(SubscriptionPlan.PREMIUM);
        BigDecimal currentMrr   = calculateMrr(starterPlanCount, proPlanCount, premiumPlanCount);

        LocalDateTime monthStart = today.withDayOfMonth(1).atStartOfDay();
        long newEvaluationsThisMonth = evaluationRepository
                .countByCreatedAtBetween(monthStart, LocalDateTime.now());

        return BusinessMetricsDTO.builder()
                .referenceDate(today)
                .totalNutritionists(totalNutritionists)
                .freePlanCount(freePlanCount)
                .starterPlanCount(starterPlanCount)
                .proPlanCount(proPlanCount)
                .premiumPlanCount(premiumPlanCount)
                .currentMrr(currentMrr)
                .totalPatients(patientRepository.count())
                .totalEvaluations(evaluationRepository.count())
                .newEvaluationsThisMonth(newEvaluationsThisMonth)
                .historicalData(historical)
                .build();
    }

    private long countByPlan(SubscriptionPlan plan) {
        return nutritionistRepository.countBySubscriptionPlan(plan);
    }

    private BigDecimal calculateMrr(long starterCount, long proCount, long premiumCount) {
        return STARTER_PRICE.multiply(BigDecimal.valueOf(starterCount))
                .add(PRO_PRICE.multiply(BigDecimal.valueOf(proCount)))
                .add(PREMIUM_PRICE.multiply(BigDecimal.valueOf(premiumCount)));
    }
}
