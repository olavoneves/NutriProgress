package br.com.api.server.billing.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payments")
@NoArgsConstructor
@Getter
public class Payment {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id", nullable = false)
    private Subscription subscriptionId;

    @Enumerated(EnumType.STRING)
    private Gateway gateway;

    private BigDecimal amount;
    private String currency;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String transactionId;
    private LocalDateTime paidAt;
    private LocalDateTime createdAt;

}
