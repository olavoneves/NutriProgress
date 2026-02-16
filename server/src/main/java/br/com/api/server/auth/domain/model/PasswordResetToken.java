package br.com.api.server.auth.domain.model;

import br.com.api.server.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "password_reset_token")
@NoArgsConstructor
@Getter
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    private List<User> userId;

    private LocalDateTime expiresAt;
    private Boolean used;
    private LocalDateTime createdAt;

}
