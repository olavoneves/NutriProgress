package br.com.api.server.billing.domain.model;

import br.com.api.server.nutritionist.domain.model.Nutritionist;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "subscription")
@NoArgsConstructor
@Getter
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "nutritionist_id"
    )
    private List<Nutritionist> nutritionistId;

    @ManyToOne(fetch = FetchType.LAZY)
    private List<Plan> planId;

    @Enumerated(EnumType.STRING)
    private PlanStatus status;

    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean autoRenew;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
