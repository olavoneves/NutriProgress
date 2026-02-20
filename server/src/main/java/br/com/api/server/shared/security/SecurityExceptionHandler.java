package br.com.api.server.shared.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Component
public class SecurityExceptionHandler {

    private final ObjectMapper objectMapper;

    public SecurityExceptionHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void handleAuthenticationException(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception
    ) throws IOException {

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", 401);
        body.put("error", "Unauthorized");
        body.put("message", "Authentication failed");
        body.put("path", request.getRequestURI());

        response.getWriter().write(objectMapper.writeValueAsString(body));
    }

    public void handleAccessDeniedException(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException exception
    ) throws IOException {

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", 403);
        body.put("error", "Forbidden");
        body.put("message", "You do not have permission to access this resource");
        body.put("path", request.getRequestURI());

        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}
