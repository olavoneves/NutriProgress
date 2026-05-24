package com.nutriprogress.modules.patient.dto;

import com.nutriprogress.modules.patient.entity.Gender;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UpdatePatientRequest {

    @Size(min = 3, max = 255, message = "Nome deve ter entre 3 e 255 caracteres")
    private String fullName;

    @Email(message = "Email invalido")
    private String email;

    @Pattern(regexp = "^[0-9]{10,11}$", message = "Telefone invalido")
    private String phone;

    @Past(message = "Data de nascimento deve ser no passado")
    private LocalDate birthDate;

    private Gender gender;

    @Positive(message = "Altura deve ser positiva")
    @DecimalMax(value = "300.0", message = "Altura deve ser menor que 300cm")
    private BigDecimal height;

    @Size(max = 1000, message = "Objetivo deve ter no maximo 1000 caracteres")
    private String goal;

    @Size(max = 5000, message = "Observacoes devem ter no maximo 5000 caracteres")
    private String notes;
}
