package br.com.api.server.avaliation.domain.model;

import br.com.api.server.nutritionist.domain.model.Nutritionist;
import br.com.api.server.patient.domain.model.Patient;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "avaliations")
@NoArgsConstructor
@Getter
public class Avaliation {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutritionist_id", nullable = false)
    private Nutritionist nutritionist;

    private BigDecimal weight;
    private BigDecimal height;
    private BigDecimal bmi;
    private BigDecimal waistCircumference;
    private BigDecimal hipCircumference;
    private BigDecimal armCircumference;
    private BigDecimal thighCircumference;
    private BigDecimal bodyFatPercentage;
    private BigDecimal muscleMass;
    private BigDecimal visceralFat;
    private String notes;
    private Boolean active;
    private LocalDate avaliationDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
