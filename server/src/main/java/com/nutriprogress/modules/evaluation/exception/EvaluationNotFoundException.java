package com.nutriprogress.modules.evaluation.exception;

import com.nutriprogress.shared.exception.ResourceNotFoundException;

import java.util.UUID;

public class EvaluationNotFoundException extends ResourceNotFoundException {

    public EvaluationNotFoundException(UUID id) {
        super("Avaliacao nao encontrada com ID: " + id);
    }

    public EvaluationNotFoundException(String message) {
        super(message);
    }
}
