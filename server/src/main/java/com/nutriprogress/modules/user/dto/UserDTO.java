package com.nutriprogress.modules.user.dto;

import com.nutriprogress.modules.user.entity.UserRole;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record UserDTO(
        UUID id,
        String email,
        UserRole role,
        Boolean isActive,
        Boolean emailVerified,
        LocalDateTime lastLoginAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
