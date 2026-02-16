package br.com.api.server.user.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistrationData(@NotBlank String name,
                               @NotBlank @Email String email) {
}
