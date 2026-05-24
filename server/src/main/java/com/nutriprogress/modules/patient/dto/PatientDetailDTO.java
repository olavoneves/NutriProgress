package com.nutriprogress.modules.patient.dto;

import com.nutriprogress.modules.patient.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDetailDTO {

    private UUID id;
    private UUID nutritionistId;
    private String fullName;
    private String email;
    private String phone;
    private LocalDate birthDate;
    private Integer age;
    private Gender gender;
    private BigDecimal height;
    private String goal;
    private String notes;
    private Boolean isActive;
    private LastEvaluationSummary lastEvaluation;
    private PatientStats stats;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LastEvaluationSummary {
        private UUID evaluationId;
        private LocalDate evaluationDate;
        private Integer evaluationNumber;
        private BigDecimal weight;
        private BigDecimal bmi;
        private BigDecimal bodyFatPercentage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatientStats {
        private Long totalEvaluations;
        private LocalDate firstEvaluationDate;
        private LocalDate lastEvaluationDate;
        private Integer daysSinceLastEvaluation;
    }
}
