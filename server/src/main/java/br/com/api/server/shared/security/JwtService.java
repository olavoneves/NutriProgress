package br.com.api.server.shared.security;

import br.com.api.server.user.domain.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    @Value("${jwt.token.secret}")
    private String secret;

    @Value("${jwt.token.access.expiration}")
    private Integer expirationAccessToken;

    @Value("${jwt.token.refresh.expiration}")
    private Integer expirationRefreshToken;

    public String generateAccessToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("NutriProgress")
                    .withSubject(user.getUsername())
                    .withExpiresAt(expiresIn(expirationAccessToken))
                    .sign(algorithm);

        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error in generate Access Token");
        }
    }

    public String generateRefreshToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("NutriProgress")
                    .withSubject(user.getId().toString())
                    .withExpiresAt(expiresIn(expirationRefreshToken))
                    .sign(algorithm);

        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error in generate Refresh Token");
        }
    }

    public String verifyToken(String token) {
        DecodedJWT decodedJWT;
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier jwtVerifier = JWT.require(algorithm)
                    .withIssuer("NutriProgress")
                    .build();

            decodedJWT = jwtVerifier.verify(token);
            return decodedJWT.getSubject();

        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Error in verification token");
        }
    }

    public Instant expiresIn(Integer minutes) {
        return Instant.now().plusSeconds(minutes * 60L);
    }
}
