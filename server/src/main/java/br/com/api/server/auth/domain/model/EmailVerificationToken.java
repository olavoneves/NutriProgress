package br.com.api.server.auth.domain.model;

import br.com.api.server.user.domain.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "email_verification_tokens")
@NoArgsConstructor
@Getter
public class EmailVerificationToken {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime expiresAt;
    private Boolean verified;
    private LocalDateTime createdAt;

}
