package com.nutriprogress.modules.nutritionist.dto;

import com.nutriprogress.modules.nutritionist.entity.Specialty;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record NutritionistDTO(
        UUID id,
        UUID userId,
        String fullName,
        String email,
        String crn,
        String phone,
        Specialty specialty,
        String clinicName,
        String avatarUrl,
        SubscriptionPlan subscriptionPlan,
        LocalDateTime subscriptionExpiresAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
