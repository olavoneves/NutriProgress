package com.nutriprogress.modules.billing.dto;

import com.nutriprogress.modules.billing.entity.SubscriptionStatus;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {

    private UUID id;
    private UUID nutritionistId;
    private SubscriptionPlan plan;
    private SubscriptionStatus status;
    private BigDecimal amount;
    private String paymentMethod;
    private LocalDateTime currentPeriodStart;
    private LocalDateTime currentPeriodEnd;
    private LocalDateTime canceledAt;
    private LocalDateTime trialEndsAt;
    private Boolean isActive;
    private PlanLimitsDTO limits;
}
