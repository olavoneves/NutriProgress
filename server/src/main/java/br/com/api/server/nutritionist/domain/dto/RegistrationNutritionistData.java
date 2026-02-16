package br.com.api.server.nutritionist.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RegistrationNutritionistData(String crn,
                                           @NotBlank
                                           @Pattern(
                                                   regexp = "^[1-9]{2}9[0-9]{8}$",
                                                   message = "Formato de celular inválido. Use DDD9XXXXXXXX"
                                           ) String phone,
                                           String clinicName) {
}
