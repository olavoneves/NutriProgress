package br.com.api.server.auth.service;

import br.com.api.server.auth.domain.dto.LoginData;
import br.com.api.server.auth.domain.dto.RefreshTokenData;
import br.com.api.server.auth.domain.dto.TokenData;
import br.com.api.server.auth.domain.model.RefreshToken;
import br.com.api.server.auth.repository.RefreshTokenRepository;
import br.com.api.server.shared.security.JwtService;
import br.com.api.server.user.domain.model.User;
import br.com.api.server.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthService(JwtService jwtService, UserRepository userRepository, AuthenticationManager authenticationManager, RefreshTokenRepository refreshTokenRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public TokenData login(LoginData data) {
        var authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        data.email(), data.password()
                );

        var authentication = authenticationManager.authenticate(authenticationToken);
        var user = (User) authentication.getPrincipal();

        var accessTokenValue = jwtService.generateAccessToken(user);
        var refreshTokenValue = jwtService.generateRefreshToken(user);

        var refreshToken = new RefreshToken();
        refreshToken.setToken(refreshTokenValue);
        refreshToken.setUser(user);
        refreshToken.setRevoked(false);
        refreshToken.setExpiresAt(LocalDateTime.now().plusMinutes(jwtService.getRefreshExpirationInMinutes()));

        refreshTokenRepository.save(refreshToken);

        return new TokenData(accessTokenValue, refreshTokenValue);
    }

    @Transactional
    public TokenData refreshToken(RefreshTokenData refreshData) {
        var tokenValue = refreshData.refreshToken();

        var storedToken = refreshTokenRepository
                .findByTokenAndRevokedFalse(tokenValue)
                .orElseThrow(
                        () -> new RuntimeException("Invalid refresh token")
                );

        if (storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token expired");
        }

        storedToken.setRevoked(true);
        storedToken.setUpdatedAt(LocalDateTime.now());

        jwtService.verifyToken(tokenValue);

        var user = storedToken.getUser();

        var newAccessTokenValue = jwtService.generateAccessToken(user);
        var newRefreshTokenValue = jwtService.generateRefreshToken(user);

        var newRefreshToken = new RefreshToken();
        newRefreshToken.setToken(newRefreshTokenValue);
        newRefreshToken.setUser(user);
        newRefreshToken.setRevoked(false);
        newRefreshToken.setExpiresAt(LocalDateTime.now().plusMinutes(jwtService.getRefreshExpirationInMinutes()));

        refreshTokenRepository.save(newRefreshToken);

        return new TokenData(newAccessTokenValue, newRefreshTokenValue);
    }

    @Transactional
    public void logout(User user, RefreshTokenData refreshData) {
        var token = refreshTokenRepository
                .findByTokenAndRevokedFalse(refreshData.refreshToken())
                .orElseThrow(
                        () -> new RuntimeException("Token not found")
                );

        if (!token.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Invalid token owner");
        }

        token.setRevoked(true);
    }

    @Transactional
    public void logoutAll(User user) {
        var tokens = refreshTokenRepository
                .findAllByUserAndRevokedFalse(user);

        tokens.forEach(token -> token.setRevoked(true));
    }
}
