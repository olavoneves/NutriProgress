package br.com.api.server.avaliation.domain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UpdateAvaliationData(BigDecimal weight,
                                   BigDecimal height,
                                   BigDecimal bmi,
                                   BigDecimal waistCircumference,
                                   BigDecimal hipCircumference,
                                   BigDecimal armCircumference,
                                   BigDecimal thighCircumference,
                                   BigDecimal bodyFatPercentage,
                                   BigDecimal muscleMass,
                                   BigDecimal visceralFat,
                                   String notes,
                                   Boolean active,
                                   LocalDate avaliationDate) {
}
