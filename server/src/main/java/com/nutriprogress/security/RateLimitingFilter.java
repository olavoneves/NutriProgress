package com.nutriprogress.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.nutriprogress.shared.dto.ErrorResponse;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitingFilter extends OncePerRequestFilter {

    private final RateLimitingConfig rateLimitingConfig;
    // Jackson 3 é o primário no Spring Boot 4; criar Jackson 2 ObjectMapper manualmente (padrão do projeto)
    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Value("${app.rate-limiting.enabled:true}")
    private boolean rateLimitingEnabled;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        if (!rateLimitingEnabled) {
            filterChain.doFilter(request, response);
            return;
        }

        String ipAddress = extractIpAddress(request);
        String requestUri = request.getRequestURI();

        if (requestUri.equals("/auth/login") || requestUri.equals("/auth/register")) {
            Bucket loginBucket = rateLimitingConfig.resolveLoginBucket(ipAddress);
            ConsumptionProbe probe = loginBucket.tryConsumeAndReturnRemaining(1);
            if (!probe.isConsumed()) {
                long waitSeconds = probe.getNanosToWaitForRefill() / 1_000_000_000;
                log.warn("Rate limit de login excedido para IP: {}", ipAddress);
                sendRateLimitResponse(response, requestUri, waitSeconds);
                return;
            }
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            String userId = auth.getName();
            Bucket authBucket = rateLimitingConfig.resolveAuthenticatedBucket(userId);
            ConsumptionProbe probe = authBucket.tryConsumeAndReturnRemaining(1);
            if (!probe.isConsumed()) {
                long waitSeconds = probe.getNanosToWaitForRefill() / 1_000_000_000;
                log.warn("Rate limit autenticado excedido para usuario: {}", userId);
                sendRateLimitResponse(response, requestUri, waitSeconds);
                return;
            }
            response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
        } else {
            Bucket publicBucket = rateLimitingConfig.resolvePublicBucket(ipAddress);
            ConsumptionProbe probe = publicBucket.tryConsumeAndReturnRemaining(1);
            if (!probe.isConsumed()) {
                long waitSeconds = probe.getNanosToWaitForRefill() / 1_000_000_000;
                sendRateLimitResponse(response, requestUri, waitSeconds);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private void sendRateLimitResponse(HttpServletResponse response, String path, long retryAfterSeconds)
            throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.addHeader("Retry-After", String.valueOf(retryAfterSeconds));

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.TOO_MANY_REQUESTS.value(),
                "Too Many Requests",
                "Limite de requisicoes excedido. Tente novamente em " + retryAfterSeconds + " segundos.",
                path,
                null,
                LocalDateTime.now()
        );

        objectMapper.writeValue(response.getOutputStream(), errorResponse);
    }

    private String extractIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip != null && !ip.isBlank()) {
            return ip.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
