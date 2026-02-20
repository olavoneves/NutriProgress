package br.com.api.server.nutritionist.domain.model;

import br.com.api.server.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "nutritionists")
@NoArgsConstructor
@Getter
public class Nutritionist {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private String crn;
    private String phone;
    private String clinicName;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
