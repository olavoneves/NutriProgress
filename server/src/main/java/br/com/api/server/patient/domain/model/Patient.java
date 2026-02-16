package br.com.api.server.patient.domain.model;

import br.com.api.server.nutritionist.domain.model.Nutritionist;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "patient")
@NoArgsConstructor
@Getter
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    private List<Nutritionist> nutritionistId;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String email;
    private String phone;
    private String notes;
    private Boolean active;
    private LocalDateTime archivedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
