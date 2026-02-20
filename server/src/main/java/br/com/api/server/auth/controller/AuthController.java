package br.com.api.server.auth.controller;

import br.com.api.server.auth.domain.dto.LoginData;
import br.com.api.server.auth.domain.dto.RefreshTokenData;
import br.com.api.server.auth.domain.dto.TokenData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<TokenData> login(@Valid @RequestBody LoginData data) {

    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> refreshToken(@Valid @RequestBody RefreshTokenData refreshData) {

    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {

    }

    @PostMapping("/logout/all")
    public ResponseEntity<Void> logoutAll() {

    }
}
