package br.com.api.server.avaliation.domain.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record RegistrationAvaliationData(@NotNull UUID patientId,
                                         @NotNull UUID nutritionistId,
                                         BigDecimal weight,
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
                                         LocalDate avaliationDate) {
}
