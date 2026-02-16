package br.com.api.server.patient.domain.dto;

import br.com.api.server.patient.domain.model.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record RegistrationPatientData(@NotNull UUID nutritionistId,
                                      @NotBlank String fullName,
                                      @NotNull Gender gender,
                                      @NotBlank @Email String email,
                                      @NotNull
                                      @Pattern(
                                              regexp = "^[1-9]{2}9[0-9]{8}$",
                                              message = "Formato de celular inválido. Use DDD9XXXXXXXX"
                                      ) String phone,
                                      String notes) {
}
