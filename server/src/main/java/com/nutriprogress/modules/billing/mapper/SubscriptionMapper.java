package com.nutriprogress.modules.billing.mapper;

import com.nutriprogress.modules.billing.dto.PlanLimitsDTO;
import com.nutriprogress.modules.billing.dto.SubscriptionDTO;
import com.nutriprogress.modules.billing.entity.Subscription;
import com.nutriprogress.modules.billing.entity.SubscriptionStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class SubscriptionMapper {

    public SubscriptionDTO toDTO(Subscription subscription, PlanLimitsDTO limits) {
        boolean isActive = subscription.getStatus() == SubscriptionStatus.ACTIVE
                && (subscription.getCurrentPeriodEnd() == null
                    || subscription.getCurrentPeriodEnd().isAfter(LocalDateTime.now()));

        return SubscriptionDTO.builder()
                .id(subscription.getId())
                .nutritionistId(subscription.getNutritionist().getId())
                .plan(subscription.getPlan())
                .status(subscription.getStatus())
                .amount(subscription.getAmount())
                .paymentMethod(subscription.getPaymentMethod())
                .currentPeriodStart(subscription.getCurrentPeriodStart())
                .currentPeriodEnd(subscription.getCurrentPeriodEnd())
                .canceledAt(subscription.getCanceledAt())
                .trialEndsAt(subscription.getTrialEndsAt())
                .isActive(isActive)
                .limits(limits)
                .build();
    }
}
