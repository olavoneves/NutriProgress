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
public class DataPointDTO {
    private LocalDate date;
    private Integer evaluationNumber;
    private BigDecimal value;
}
