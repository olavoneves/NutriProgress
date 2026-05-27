package com.nutriprogress.modules.auth.service;

import com.nutriprogress.config.JwtProperties;
import com.nutriprogress.modules.auth.dto.LoginRequest;
import com.nutriprogress.modules.auth.dto.LoginResponse;
import com.nutriprogress.modules.auth.dto.RefreshTokenRequest;
import com.nutriprogress.modules.auth.dto.RegisterRequest;
import com.nutriprogress.modules.auth.dto.TokenResponse;
import com.nutriprogress.modules.auth.exception.InvalidCredentialsException;
import com.nutriprogress.modules.auth.exception.TokenExpiredException;
import com.nutriprogress.modules.auth.exception.UserAlreadyExistsException;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.user.entity.User;
import com.nutriprogress.modules.user.entity.UserRole;
import com.nutriprogress.modules.user.repository.UserRepository;
import com.nutriprogress.shared.event.EventPublisher;
import com.nutriprogress.shared.event.events.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final NutritionistRepository nutritionistRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;
    private final AuthenticationManager authenticationManager;
    private final EventPublisher eventPublisher;

    @Transactional
    public LoginResponse login(LoginRequest request) {
        log.info("Tentativa de login: {}", request.email());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
        } catch (BadCredentialsException e) {
            log.warn("Credenciais invalidas para: {}", request.email());
            throw new InvalidCredentialsException("Email ou senha invalidos");
        }

        User user = userRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new InvalidCredentialsException("Usuario nao encontrado"));

        if (Boolean.FALSE.equals(user.getIsActive())) {
            throw new InvalidCredentialsException("Usuario inativo");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        log.info("Login bem-sucedido: {}", user.getEmail());
        return buildLoginResponse(user, accessToken, refreshToken);
    }

    @Transactional
    public LoginResponse register(RegisterRequest request) {
        log.info("Tentativa de registro: {}", request.email());

        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new UserAlreadyExistsException("Email ja cadastrado");
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(UserRole.NUTRITIONIST)
                .isActive(true)
                .emailVerified(false)
                .build();
        user = userRepository.save(user);

        Nutritionist nutritionist = Nutritionist.builder()
                .user(user)
                .fullName(request.fullName())
                .crn(request.crn())
                .phone(request.phone())
                .clinicName(request.clinicName())
                .specialty(request.specialty())
                .build();
        nutritionistRepository.save(nutritionist);

        eventPublisher.publish(UserRegisteredEvent.builder()
                .eventId(UUID.randomUUID())
                .occurredAt(LocalDateTime.now())
                .aggregateId(user.getId())
                .email(user.getEmail())
                .fullName(nutritionist.getFullName())
                .role(user.getRole().name())
                .build());

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        log.info("Registro bem-sucedido: {}", user.getEmail());
        return buildLoginResponse(user, accessToken, refreshToken);
    }

    @Transactional(readOnly = true)
    public TokenResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.refreshToken();

        if (!jwtService.validateRefreshToken(refreshToken)) {
            throw new TokenExpiredException("Refresh token invalido ou expirado");
        }

        String email = jwtService.extractEmail(refreshToken);
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new InvalidCredentialsException("Usuario nao encontrado"));

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        log.info("Token refreshed para: {}", email);

        return TokenResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .expiresIn(jwtProperties.getExpiration())
                .build();
    }

    public LoginResponse buildLoginResponse(User user, String accessToken, String refreshToken) {
        Nutritionist nutritionist = nutritionistRepository.findByUserId(user.getId()).orElse(null);

        LoginResponse.UserInfo userInfo = LoginResponse.UserInfo.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(nutritionist != null ? nutritionist.getFullName() : null)
                .role(user.getRole().name())
                .nutritionistId(nutritionist != null ? nutritionist.getId() : null)
                .build();

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(jwtProperties.getExpiration())
                .user(userInfo)
                .build();
    }
}
