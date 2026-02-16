package br.com.api.server.billing.domain.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record CreatePaymentData(UUID subscriptionId,
                                BigDecimal amount,
                                String currency) {
}
