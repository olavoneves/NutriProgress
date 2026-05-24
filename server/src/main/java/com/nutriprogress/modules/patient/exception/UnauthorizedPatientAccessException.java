package com.nutriprogress.modules.patient.exception;

import java.util.UUID;

public class UnauthorizedPatientAccessException extends RuntimeException {

    public UnauthorizedPatientAccessException(UUID patientId, UUID nutritionistId) {
        super(String.format(
                "Nutricionista %s nao tem permissao para acessar paciente %s",
                nutritionistId, patientId
        ));
    }

    public UnauthorizedPatientAccessException(String message) {
        super(message);
    }
}
