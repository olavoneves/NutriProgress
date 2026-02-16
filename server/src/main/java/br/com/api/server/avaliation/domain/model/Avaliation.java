package br.com.api.server.avaliation.domain.model;

import br.com.api.server.nutritionist.domain.model.Nutritionist;
import br.com.api.server.patient.domain.model.Patient;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "avaliation")
@NoArgsConstructor
@Getter
public class Avaliation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    private List<Patient> patientId;

    @ManyToOne(fetch = FetchType.LAZY)
    private List<Nutritionist> nutritionistId;

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

}
