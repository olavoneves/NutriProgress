package br.com.api.server.auth.controller;

import br.com.api.server.auth.domain.dto.LoginData;
import br.com.api.server.auth.domain.dto.RefreshTokenData;
import br.com.api.server.auth.domain.dto.TokenData;
import br.com.api.server.auth.service.AuthService;
import br.com.api.server.user.domain.model.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenData> login(
            @Valid @RequestBody LoginData data
    ) {
        var tokenData = authService.login(data);
        return ResponseEntity.ok(tokenData);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenData> refreshToken(
            @Valid @RequestBody RefreshTokenData refreshData
    ) {
        var tokenData = authService.refreshToken(refreshData);
        return ResponseEntity.ok(tokenData);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody RefreshTokenData refreshData
    ) {
        authService.logout(user, refreshData);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout/all")
    public ResponseEntity<Void> logoutAll(
            @AuthenticationPrincipal User user
    ) {
        authService.logoutAll(user);
        return ResponseEntity.noContent().build();
    }
}
