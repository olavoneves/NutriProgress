package br.com.api.server.auth.controller;

import br.com.api.server.auth.domain.dto.VerifyEmailTokenData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class VerifyEmailController {

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(@Valid @RequestBody VerifyEmailTokenData data) {

    }

    @PostMapping("/verify-email/resend")
    public ResponseEntity<Void> resendVerifyEmail() {

    }
}
