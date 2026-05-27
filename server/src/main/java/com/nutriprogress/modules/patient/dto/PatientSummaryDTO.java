package com.nutriprogress.modules.patient.dto;

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
public class PatientSummaryDTO {

    private UUID id;
    private String fullName;
    private String phone;
    private Integer age;
    private Boolean isActive;
    private LocalDate lastEvaluationDate;
    private BigDecimal currentWeight;
    private Integer totalEvaluations;
}
