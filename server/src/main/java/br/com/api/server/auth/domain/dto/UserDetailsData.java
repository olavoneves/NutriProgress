package br.com.api.server.auth.domain.dto;

import br.com.api.server.user.domain.model.User;
import br.com.api.server.user.domain.role.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record UserDetailsData(@NotNull UUID id,
                              @NotBlank String name,
                              @NotBlank @Email String email,
                              @NotNull Role role) {
    public UserDetailsData(User user) {
        this(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
