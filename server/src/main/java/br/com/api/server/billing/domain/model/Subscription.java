package br.com.api.server.billing.domain.model;

import br.com.api.server.nutritionist.domain.model.Nutritionist;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "subscriptions")
@NoArgsConstructor
@Getter
public class Subscription {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutritionist_id", nullable = false)
    private Nutritionist nutritionist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

    @Enumerated(EnumType.STRING)
    private PlanStatus status;

    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean autoRenew;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
