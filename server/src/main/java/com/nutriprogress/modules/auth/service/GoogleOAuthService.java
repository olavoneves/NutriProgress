package com.nutriprogress.modules.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.nutriprogress.modules.auth.dto.GoogleLoginRequest;
import com.nutriprogress.modules.auth.dto.LoginResponse;
import com.nutriprogress.modules.auth.exception.InvalidCredentialsException;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.user.entity.User;
import com.nutriprogress.modules.user.entity.UserRole;
import com.nutriprogress.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleOAuthService {

    private final UserRepository userRepository;
    private final NutritionistRepository nutritionistRepository;
    private final JwtService jwtService;
    private final AuthService authService;

    @Value("${google.oauth.client-id}")
    private String googleClientId;

    @Transactional
    public LoginResponse loginWithGoogle(GoogleLoginRequest request) {
        log.info("Tentativa de login com Google");

        GoogleIdToken idToken;
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    new GsonFactory()
            )
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();
            idToken = verifier.verify(request.idToken());
        } catch (Exception e) {
            log.error("Erro ao verificar token do Google: {}", e.getMessage());
            throw new InvalidCredentialsException("Erro ao autenticar com Google");
        }

        if (idToken == null) {
            throw new InvalidCredentialsException("Token do Google invalido");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        String googleId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        log.info("Google OAuth verificado: {}", email);

        User user = userRepository.findByGoogleId(googleId)
                .or(() -> userRepository.findByEmailIgnoreCase(email))
                .orElseGet(() -> createUserFromGoogle(googleId, email, name));

        if (user.getGoogleId() == null) {
            user.setGoogleId(googleId);
        }
        user.setLastLoginAt(LocalDateTime.now());
        user.setEmailVerified(true);
        user = userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        log.info("Login com Google bem-sucedido: {}", email);
        return authService.buildLoginResponse(user, accessToken, refreshToken);
    }

    private User createUserFromGoogle(String googleId, String email, String name) {
        log.info("Criando novo usuario via Google: {}", email);

        User user = User.builder()
                .email(email)
                .googleId(googleId)
                .role(UserRole.NUTRITIONIST)
                .isActive(true)
                .emailVerified(true)
                .passwordHash(null)
                .build();
        user = userRepository.save(user);

        Nutritionist nutritionist = Nutritionist.builder()
                .user(user)
                .fullName(name)
                .build();
        nutritionistRepository.save(nutritionist);

        return user;
    }
}
