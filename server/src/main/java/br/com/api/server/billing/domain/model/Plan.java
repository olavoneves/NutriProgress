package br.com.api.server.billing.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "plan")
@NoArgsConstructor
@Getter
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String name;
    private String description;
    private BigDecimal price;
    private Integer maxPatients;
    private String features;
    private Boolean active;
    private LocalDateTime createdAt;
}
