package com.nutriprogress.modules.user.exception;

import com.nutriprogress.shared.exception.ResourceNotFoundException;

import java.util.UUID;

public class UserNotFoundException extends ResourceNotFoundException {

    public UserNotFoundException(UUID id) {
        super("Usuario nao encontrado com ID: " + id);
    }

    public UserNotFoundException(String email) {
        super("Usuario nao encontrado com email: " + email);
    }
}
