package com.nutriprogress.modules.nutritionist.exception;

import com.nutriprogress.shared.exception.ResourceNotFoundException;

import java.util.UUID;

public class NutritionistNotFoundException extends ResourceNotFoundException {

    public NutritionistNotFoundException(UUID id) {
        super("Nutricionista nao encontrada com ID: " + id);
    }

    public NutritionistNotFoundException(String message) {
        super(message);
    }
}
