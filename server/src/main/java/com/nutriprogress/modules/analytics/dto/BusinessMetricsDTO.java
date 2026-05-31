package com.nutriprogress.modules.analytics.dto;

import com.nutriprogress.modules.analytics.document.BusinessMetrics;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessMetricsDTO {

    private LocalDate referenceDate;

    private Long totalNutritionists;
    private Long newNutritionistsThisMonth;
    private Long activeNutritionistsThisMonth;

    private Long freePlanCount;
    private Long starterPlanCount;
    private Long proPlanCount;
    private Long premiumPlanCount;

    private BigDecimal currentMrr;
    private BigDecimal mrrGrowth;

    private Long totalPatients;
    private Long totalEvaluations;
    private Long newEvaluationsThisMonth;

    private BigDecimal churnRate;
    private BigDecimal activationRate;

    private List<BusinessMetrics> historicalData;
}
