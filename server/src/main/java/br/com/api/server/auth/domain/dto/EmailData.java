package br.com.api.server.auth.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailData(@NotBlank @Email String email) {
}
