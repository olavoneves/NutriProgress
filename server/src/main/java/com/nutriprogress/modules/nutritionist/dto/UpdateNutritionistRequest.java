package com.nutriprogress.modules.nutritionist.dto;

import com.nutriprogress.modules.nutritionist.entity.Specialty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateNutritionistRequest(
        @Size(min = 3, max = 255, message = "Nome deve ter entre 3 e 255 caracteres")
        String fullName,

        @Pattern(regexp = "^[0-9]{10,11}$", message = "Telefone invalido")
        String phone,

        String crn,
        Specialty specialty,
        String clinicName,
        String avatarUrl
) {
}
