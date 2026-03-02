package br.com.api.server.auth.controller;

import br.com.api.server.auth.domain.dto.EmailData;
import br.com.api.server.auth.domain.dto.ResetPasswordData;
import br.com.api.server.auth.service.ForgotPasswordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    public ForgotPasswordController(ForgotPasswordService forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(
            @Valid @RequestBody EmailData data
            ) {
        forgotPasswordService.forgotPassword(data);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(
            @Valid @RequestBody ResetPasswordData data,
            @RequestParam String code
    ) {
        forgotPasswordService.resetPassword(data, code);
        return ResponseEntity.noContent().build();
    }
}
