package br.com.api.server.billing.domain.dto;

import java.util.UUID;

public record CreateSubscriptionData(UUID nutritionistId,
                                     UUID planId,
                                     Boolean autoRenew) {
}
