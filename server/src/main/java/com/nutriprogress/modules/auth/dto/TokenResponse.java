package com.nutriprogress.modules.auth.dto;

import lombok.Builder;

@Builder
public record TokenResponse(
        String accessToken,
        String refreshToken,
        Long expiresIn
) {
}
