package br.com.api.server.billing.domain.dto;

import br.com.api.server.billing.domain.model.Plan;
import br.com.api.server.billing.domain.model.PlanStatus;
import br.com.api.server.nutritionist.domain.model.Nutritionist;

import java.time.LocalDate;

public record SubscriptionData(Nutritionist nutritionistId,
                               Plan planId,
                               PlanStatus status,
                               LocalDate startDate,
                               LocalDate endDate,
                               Boolean autoRenew) {
}
