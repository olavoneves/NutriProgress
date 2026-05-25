package com.nutriprogress.modules.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDetailDTO {

    private UUID id;
    private Integer evaluationNumber;
    private LocalDate evaluationDate;

    private UUID patientId;
    private String patientName;

    private BigDecimal weight;
    private BigDecimal height;
    private BigDecimal bmi;
    private String bmiClassification;

    private BigDecimal bodyFatPercentage;
    private BigDecimal muscleMass;
    private Integer visceralFat;

    private BigDecimal waistCircumference;
    private BigDecimal hipCircumference;
    private BigDecimal chestCircumference;
    private BigDecimal armCircumference;
    private BigDecimal thighCircumference;
    private BigDecimal calfCircumference;

    private String notes;

    private EvolutionDifference evolutionDifference;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EvolutionDifference {
        private BigDecimal weightDifference;
        private BigDecimal bmiDifference;
        private BigDecimal bodyFatDifference;
        private BigDecimal muscleMassDifference;
        private Integer daysSincePrevious;
    }
}
