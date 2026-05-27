package com.nutriprogress.modules.user.dto;

import jakarta.validation.constraints.Email;

public record UpdateUserRequest(
        @Email(message = "Email invalido")
        String email,

        Boolean isActive
) {
}
