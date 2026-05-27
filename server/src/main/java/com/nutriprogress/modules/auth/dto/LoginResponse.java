package com.nutriprogress.modules.auth.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record LoginResponse(
        String accessToken,
        String refreshToken,
        Long expiresIn,
        UserInfo user
) {

    @Builder
    public record UserInfo(
            UUID id,
            String email,
            String fullName,
            String role,
            UUID nutritionistId
    ) {
    }
}
