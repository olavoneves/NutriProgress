package com.nutriprogress.modules.billing.dto;

import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCheckoutRequest {

    @NotNull(message = "Plano e obrigatorio")
    private SubscriptionPlan plan;

    private String successUrl;
    private String cancelUrl;
}
