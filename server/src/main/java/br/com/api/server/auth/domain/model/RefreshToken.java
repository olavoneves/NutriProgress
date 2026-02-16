package br.com.api.server.auth.domain.model;

import br.com.api.server.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "refresh_token")
@NoArgsConstructor
@Getter
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    private List<User> userId;

    private LocalDateTime expiresAt;
    private Boolean revoked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
