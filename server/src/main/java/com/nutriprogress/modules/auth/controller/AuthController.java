package com.nutriprogress.modules.auth.controller;

import com.nutriprogress.modules.auth.dto.GoogleLoginRequest;
import com.nutriprogress.modules.auth.dto.LoginRequest;
import com.nutriprogress.modules.auth.dto.LoginResponse;
import com.nutriprogress.modules.auth.dto.RefreshTokenRequest;
import com.nutriprogress.modules.auth.dto.RegisterRequest;
import com.nutriprogress.modules.auth.dto.TokenResponse;
import com.nutriprogress.modules.auth.service.AuthService;
import com.nutriprogress.modules.auth.service.GoogleOAuthService;
import com.nutriprogress.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints de autenticacao")
public class AuthController {

    private final AuthService authService;
    private final GoogleOAuthService googleOAuthService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Autentica usuario com email e senha")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Login realizado com sucesso"));
    }

    @PostMapping("/register")
    @Operation(summary = "Registro", description = "Cria nova conta de nutricionista")
    public ResponseEntity<ApiResponse<LoginResponse>> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Conta criada com sucesso"));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh Token", description = "Renova access token usando refresh token")
    public ResponseEntity<ApiResponse<TokenResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        TokenResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Token renovado com sucesso"));
    }

    @PostMapping("/google")
    @Operation(summary = "Google OAuth", description = "Autentica usando Google OAuth 2.0")
    public ResponseEntity<ApiResponse<LoginResponse>> googleLogin(@Valid @RequestBody GoogleLoginRequest request) {
        LoginResponse response = googleOAuthService.loginWithGoogle(request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Login com Google realizado com sucesso"));
    }
}
