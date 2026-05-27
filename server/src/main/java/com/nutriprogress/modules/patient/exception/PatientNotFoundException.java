package com.nutriprogress.modules.patient.exception;

import com.nutriprogress.shared.exception.ResourceNotFoundException;

import java.util.UUID;

public class PatientNotFoundException extends ResourceNotFoundException {

    public PatientNotFoundException(UUID id) {
        super("Paciente nao encontrado com ID: " + id);
    }

    public PatientNotFoundException(String message) {
        super(message);
    }
}
