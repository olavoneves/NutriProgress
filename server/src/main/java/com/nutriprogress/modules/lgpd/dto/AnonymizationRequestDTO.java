package com.nutriprogress.modules.lgpd.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class AnonymizationRequestDTO {

    @NotNull(message = "ID do paciente e obrigatorio")
    private UUID patientId;

    private Boolean permanentDelete = false;

    private String reason;
}
