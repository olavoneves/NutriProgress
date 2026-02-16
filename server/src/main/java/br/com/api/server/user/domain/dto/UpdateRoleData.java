package br.com.api.server.user.domain.dto;

import br.com.api.server.user.domain.role.Role;
import jakarta.validation.constraints.NotNull;

public record UpdateRoleData(@NotNull Role role) {
}
