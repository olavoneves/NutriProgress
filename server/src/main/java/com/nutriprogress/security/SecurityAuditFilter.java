package com.nutriprogress.security;

import com.nutriprogress.modules.audit.service.AuditService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class SecurityAuditFilter extends OncePerRequestFilter {

    private final AuditService auditService;

    private static final Set<String> AUDITED_PATHS = Set.of(
            "/auth/login",
            "/auth/register",
            "/lgpd/export",
            "/lgpd/anonymize-patient",
            "/lgpd/account",
            "/billing/checkout",
            "/billing/cancel"
    );

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);
        filterChain.doFilter(request, responseWrapper);

        String uri = request.getRequestURI();
        int status = responseWrapper.getStatus();

        if (shouldAudit(uri, status)) {
            logAudit(request, status);
        }

        responseWrapper.copyBodyToResponse();
    }

    private boolean shouldAudit(String uri, int status) {
        if (AUDITED_PATHS.stream().anyMatch(uri::startsWith)) {
            return true;
        }
        return status >= 400;
    }

    private void logAudit(HttpServletRequest request, int statusCode) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UUID userId = null;
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
                userId = extractUserId(auth);
            }

            String ipAddress = extractIpAddress(request);
            String action = resolveAction(request.getMethod());

            auditService.log(
                    userId,
                    null,
                    action,
                    "HTTP",
                    request.getRequestURI(),
                    request.getMethod(),
                    request.getRequestURI(),
                    ipAddress,
                    request.getHeader("User-Agent"),
                    statusCode
            );
        } catch (Exception e) {
            log.warn("Falha ao registrar audit log: {}", e.getMessage());
        }
    }

    private String resolveAction(String method) {
        return switch (method.toUpperCase()) {
            case "GET" -> "READ";
            case "POST" -> "CREATE";
            case "PUT", "PATCH" -> "UPDATE";
            case "DELETE" -> "DELETE";
            default -> method;
        };
    }

    private UUID extractUserId(Authentication auth) {
        try {
            return UUID.fromString(auth.getName());
        } catch (Exception e) {
            return null;
        }
    }

    private String extractIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip != null && !ip.isBlank()) {
            return ip.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
