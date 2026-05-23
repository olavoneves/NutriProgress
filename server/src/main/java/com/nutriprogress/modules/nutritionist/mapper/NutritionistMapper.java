package com.nutriprogress.modules.nutritionist.mapper;

import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.dto.NutritionistProfileDTO;
import com.nutriprogress.modules.nutritionist.dto.NutritionistStatsDTO;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class NutritionistMapper {

    public NutritionistDTO toDTO(Nutritionist nutritionist) {
        return NutritionistDTO.builder()
                .id(nutritionist.getId())
                .userId(nutritionist.getUser().getId())
                .fullName(nutritionist.getFullName())
                .email(nutritionist.getUser().getEmail())
                .crn(nutritionist.getCrn())
                .phone(nutritionist.getPhone())
                .specialty(nutritionist.getSpecialty())
                .clinicName(nutritionist.getClinicName())
                .avatarUrl(nutritionist.getAvatarUrl())
                .subscriptionPlan(nutritionist.getSubscriptionPlan())
                .subscriptionExpiresAt(nutritionist.getSubscriptionExpiresAt())
                .createdAt(nutritionist.getCreatedAt())
                .updatedAt(nutritionist.getUpdatedAt())
                .build();
    }

    public NutritionistProfileDTO toProfileDTO(Nutritionist nutritionist, NutritionistStatsDTO stats) {
        return NutritionistProfileDTO.builder()
                .id(nutritionist.getId())
                .fullName(nutritionist.getFullName())
                .email(nutritionist.getUser().getEmail())
                .crn(nutritionist.getCrn())
                .phone(nutritionist.getPhone())
                .specialty(nutritionist.getSpecialty())
                .clinicName(nutritionist.getClinicName())
                .avatarUrl(nutritionist.getAvatarUrl())
                .subscriptionPlan(nutritionist.getSubscriptionPlan())
                .subscriptionExpiresAt(nutritionist.getSubscriptionExpiresAt())
                .isSubscriptionActive(isSubscriptionActive(nutritionist))
                .stats(stats)
                .createdAt(nutritionist.getCreatedAt())
                .build();
    }

    private Boolean isSubscriptionActive(Nutritionist nutritionist) {
        SubscriptionPlan plan = nutritionist.getSubscriptionPlan();
        if (plan == null) {
            return false;
        }
        if (plan == SubscriptionPlan.FREE) {
            return true;
        }
        if (nutritionist.getSubscriptionExpiresAt() == null) {
            return false;
        }
        return nutritionist.getSubscriptionExpiresAt().isAfter(LocalDateTime.now());
    }
}
