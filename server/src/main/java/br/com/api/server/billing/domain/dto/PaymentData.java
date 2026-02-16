package br.com.api.server.billing.domain.dto;

import br.com.api.server.billing.domain.model.Gateway;
import br.com.api.server.billing.domain.model.PaymentStatus;
import br.com.api.server.billing.domain.model.Subscription;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentData(Subscription subscriptionId,
                          Gateway gateway,
                          BigDecimal amount,
                          String currency,
                          PaymentStatus status,
                          String transactionId,
                          LocalDateTime paidAt) {
}
