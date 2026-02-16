package br.com.api.server.user.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateData(@NotBlank String name) {
}
