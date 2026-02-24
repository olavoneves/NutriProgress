package br.com.api.server.auth.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record TokenData(@NotBlank String accessToken,
                        @NotBlank String refreshToken) {
}
