package br.com.api.server.nutritionist.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "nutritionist")
@NoArgsConstructor
@Getter
public class Nutritionist {
    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "user_id"
    )
    private UUID id;

    private String crn;
    private String phone;
    private String clinicName;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
