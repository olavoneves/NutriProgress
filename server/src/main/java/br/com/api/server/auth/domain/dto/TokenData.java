package br.com.api.server.auth.domain.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public record TokenData(@NotBlank String accessToken,
                        @NotBlank String refreshToken,
                        LocalDateTime expiresIn) {
}
