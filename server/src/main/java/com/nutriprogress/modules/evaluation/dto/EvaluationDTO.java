package com.nutriprogress.modules.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDTO {

    private UUID id;
    private UUID patientId;
    private UUID nutritionistId;
    private LocalDate evaluationDate;
    private Integer evaluationNumber;

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
    private List<PhotoDTO> photos;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PhotoDTO {
        private String url;
        private String type;
    }
}
