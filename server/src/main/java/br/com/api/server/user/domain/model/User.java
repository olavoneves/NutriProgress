package br.com.api.server.user.domain.model;

import br.com.api.server.user.domain.dto.RegistrationData;
import br.com.api.server.user.domain.dto.UpdateData;
import br.com.api.server.user.domain.role.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "user")
@NoArgsConstructor
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String name;
    private String email;
    private String password;
    private Boolean active;
    private Boolean emailVerified;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public User(RegistrationData data, String passwordHash) {
        this.name = data.name();
        this.email = data.email();
        this.password = passwordHash;
        this.active = false;
        this.emailVerified = false;
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }

    public void updateUser(UpdateData data) {
        this.name = data.name();
    }

    public void setEmailVerified() {
        this.active = true;
        this.emailVerified = true;
    }

    public void updatePassword(String newPasswordHash) {
        this.password = newPasswordHash;
    }
}
