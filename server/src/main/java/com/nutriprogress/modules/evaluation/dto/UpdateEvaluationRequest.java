package com.nutriprogress.modules.evaluation.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UpdateEvaluationRequest {

    @PastOrPresent(message = "Data da avaliacao nao pode ser futura")
    private LocalDate evaluationDate;

    @Positive(message = "Peso deve ser positivo")
    @DecimalMax(value = "500.0", message = "Peso deve ser menor que 500kg")
    private BigDecimal weight;

    @Positive(message = "Altura deve ser positiva")
    @DecimalMax(value = "300.0", message = "Altura deve ser menor que 300cm")
    private BigDecimal height;

    @DecimalMin(value = "0.0", message = "Percentual de gordura deve ser maior ou igual a 0")
    @DecimalMax(value = "100.0", message = "Percentual de gordura deve ser menor ou igual a 100")
    private BigDecimal bodyFatPercentage;

    @Positive(message = "Massa muscular deve ser positiva")
    private BigDecimal muscleMass;

    @Min(value = 1, message = "Gordura visceral deve ser entre 1 e 59")
    @Max(value = 59, message = "Gordura visceral deve ser entre 1 e 59")
    private Integer visceralFat;

    @Positive(message = "Circunferencia deve ser positiva")
    private BigDecimal waistCircumference;

    @Positive(message = "Circunferencia deve ser positiva")
    private BigDecimal hipCircumference;

    @Positive(message = "Circunferencia deve ser positiva")
    private BigDecimal chestCircumference;

    @Positive(message = "Circunferencia deve ser positiva")
    private BigDecimal armCircumference;

    @Positive(message = "Circunferencia deve ser positiva")
    private BigDecimal thighCircumference;

    @Positive(message = "Circunferencia deve ser positiva")
    private BigDecimal calfCircumference;

    @Size(max = 5000, message = "Observacoes devem ter no maximo 5000 caracteres")
    private String notes;
}
