package com.nutriprogress.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record GoogleLoginRequest(
        @NotBlank(message = "ID token do Google e obrigatorio")
        String idToken
) {
}
