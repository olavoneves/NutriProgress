package br.com.api.server.auth.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenData(@NotBlank String refreshToken) {
}
