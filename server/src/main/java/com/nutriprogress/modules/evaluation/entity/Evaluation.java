package com.nutriprogress.modules.evaluation.entity;

import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.shared.audit.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "evaluations",
        indexes = {
                @Index(name = "idx_patient_date", columnList = "patient_id, evaluation_date DESC")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_patient_number", columnNames = {"patient_id", "evaluation_number"})
        }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evaluation extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutritionist_id", nullable = false)
    private Nutritionist nutritionist;

    @Column(name = "evaluation_date", nullable = false)
    private LocalDate evaluationDate;

    @Column(name = "evaluation_number")
    private Integer evaluationNumber;

    @Column(precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(precision = 5, scale = 2)
    private BigDecimal height;

    @Column(precision = 4, scale = 2)
    private BigDecimal bmi;

    @Column(name = "body_fat_percentage", precision = 4, scale = 2)
    private BigDecimal bodyFatPercentage;

    @Column(name = "muscle_mass", precision = 5, scale = 2)
    private BigDecimal muscleMass;

    @Column(name = "visceral_fat")
    private Integer visceralFat;

    @Column(name = "waist_circumference", precision = 5, scale = 2)
    private BigDecimal waistCircumference;

    @Column(name = "hip_circumference", precision = 5, scale = 2)
    private BigDecimal hipCircumference;

    @Column(name = "chest_circumference", precision = 5, scale = 2)
    private BigDecimal chestCircumference;

    @Column(name = "arm_circumference", precision = 5, scale = 2)
    private BigDecimal armCircumference;

    @Column(name = "thigh_circumference", precision = 5, scale = 2)
    private BigDecimal thighCircumference;

    @Column(name = "calf_circumference", precision = 5, scale = 2)
    private BigDecimal calfCircumference;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<EvaluationPhoto> photos;

    @PrePersist
    @PreUpdate
    private void calculateBmi() {
        if (weight != null && height != null && height.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal heightInMeters = height.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
            this.bmi = weight.divide(
                    heightInMeters.multiply(heightInMeters),
                    2,
                    RoundingMode.HALF_UP
            );
        }
    }
}
