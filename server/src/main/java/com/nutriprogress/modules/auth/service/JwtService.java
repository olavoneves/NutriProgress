package com.nutriprogress.modules.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.nutriprogress.config.JwtProperties;
import com.nutriprogress.modules.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String CLAIM_USER_ID = "userId";
    private static final String CLAIM_EMAIL = "email";
    private static final String CLAIM_ROLE = "role";
    private static final String CLAIM_TYPE = "type";
    private static final String TYPE_REFRESH = "refresh";

    private final JwtProperties jwtProperties;

    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(jwtProperties.getExpiration());

        return JWT.create()
                .withIssuer(jwtProperties.getIssuer())
                .withSubject(user.getEmail())
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiry))
                .withClaim(CLAIM_USER_ID, user.getId().toString())
                .withClaim(CLAIM_EMAIL, user.getEmail())
                .withClaim(CLAIM_ROLE, user.getRole().name())
                .sign(algorithm());
    }

    public String generateRefreshToken(User user) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(jwtProperties.getRefreshExpiration());

        return JWT.create()
                .withIssuer(jwtProperties.getIssuer())
                .withSubject(user.getEmail())
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiry))
                .withClaim(CLAIM_USER_ID, user.getId().toString())
                .withClaim(CLAIM_TYPE, TYPE_REFRESH)
                .sign(algorithm());
    }

    public String extractEmail(String token) {
        return decode(token).getSubject();
    }

    public UUID extractUserId(String token) {
        return UUID.fromString(decode(token).getClaim(CLAIM_USER_ID).asString());
    }

    public Date extractExpiration(String token) {
        return decode(token).getExpiresAt();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            DecodedJWT decoded = decode(token);
            String email = decoded.getSubject();
            return email != null
                    && email.equals(userDetails.getUsername())
                    && decoded.getExpiresAt().toInstant().isAfter(Instant.now());
        } catch (TokenExpiredException e) {
            log.warn("Token expirado: {}", e.getMessage());
            return false;
        } catch (JWTVerificationException e) {
            log.error("Erro na validacao do token: {}", e.getMessage());
            return false;
        }
    }

    public boolean validateRefreshToken(String token) {
        try {
            DecodedJWT decoded = decode(token);
            String type = decoded.getClaim(CLAIM_TYPE).asString();
            return TYPE_REFRESH.equals(type)
                    && decoded.getExpiresAt().toInstant().isAfter(Instant.now());
        } catch (JWTVerificationException e) {
            log.error("Refresh token invalido: {}", e.getMessage());
            return false;
        }
    }

    private DecodedJWT decode(String token) {
        JWTVerifier verifier = JWT.require(algorithm())
                .withIssuer(jwtProperties.getIssuer())
                .build();
        return verifier.verify(token);
    }

    private Algorithm algorithm() {
        return Algorithm.HMAC512(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
    }
}
