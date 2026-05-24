package com.nutriprogress.modules.auth.dto;

import com.nutriprogress.modules.nutritionist.entity.Specialty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Nome completo e obrigatorio")
        String fullName,

        @NotBlank(message = "Email e obrigatorio")
        @Email(message = "Email invalido")
        String email,

        @NotBlank(message = "Senha e obrigatoria")
        @Size(min = 8, message = "Senha deve ter no minimo 8 caracteres")
        String password,

        @NotBlank(message = "CRN e obrigatorio")
        String crn,

        String phone,
        Specialty specialty,
        String clinicName
) {
}
