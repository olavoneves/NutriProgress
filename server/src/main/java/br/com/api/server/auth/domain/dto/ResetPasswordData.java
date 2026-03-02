package br.com.api.server.auth.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record ResetPasswordData(@NotBlank String newPassword,
                                @NotBlank String confirmNewPassword) {
}
