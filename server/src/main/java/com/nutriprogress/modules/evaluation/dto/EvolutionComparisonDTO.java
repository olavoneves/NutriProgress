package com.nutriprogress.modules.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvolutionComparisonDTO {

    private LocalDate firstEvaluationDate;
    private Integer firstEvaluationNumber;
    private BigDecimal firstWeight;
    private BigDecimal firstBmi;
    private BigDecimal firstBodyFat;
    private BigDecimal firstMuscleMass;

    private LocalDate lastEvaluationDate;
    private Integer lastEvaluationNumber;
    private BigDecimal lastWeight;
    private BigDecimal lastBmi;
    private BigDecimal lastBodyFat;
    private BigDecimal lastMuscleMass;

    private BigDecimal weightDifference;
    private BigDecimal bmiDifference;
    private BigDecimal bodyFatDifference;
    private BigDecimal muscleMassDifference;

    private BigDecimal weightChangePercentage;
    private BigDecimal bodyFatChangePercentage;
    private BigDecimal muscleMassChangePercentage;

    private Integer daysBetween;
}
