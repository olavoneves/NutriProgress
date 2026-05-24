package com.nutriprogress.shared.exception;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.nutriprogress.modules.auth.exception.InvalidCredentialsException;
import com.nutriprogress.modules.auth.exception.TokenExpiredException;
import com.nutriprogress.modules.auth.exception.UserAlreadyExistsException;
import com.nutriprogress.modules.nutritionist.exception.SubscriptionLimitExceededException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.shared.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex, HttpServletRequest req) {
        return build(HttpStatus.NOT_FOUND, ex.getMessage(), req.getRequestURI(), null);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex, HttpServletRequest req) {
        return build(HttpStatus.UNAUTHORIZED, ex.getMessage(), req.getRequestURI(), null);
    }

    @ExceptionHandler({InvalidCredentialsException.class, BadCredentialsException.class})
    public ResponseEntity<ErrorResponse> handleInvalidCredentials(Exception ex, HttpServletRequest req) {
        log.warn("Credenciais invalidas: {}", ex.getMessage());
        return build(HttpStatus.UNAUTHORIZED, ex.getMessage(), req.getRequestURI(), null);
    }

    @ExceptionHandler({TokenExpiredException.class, JWTVerificationException.class})
    public ResponseEntity<ErrorResponse> handleTokenException(Exception ex, HttpServletRequest req) {
        log.warn("Erro de token: {}", ex.getMessage());
        return build(HttpStatus.UNAUTHORIZED, "Token invalido ou expirado", req.getRequestURI(), null);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(UserAlreadyExistsException ex, HttpServletRequest req) {
        log.warn("Usuario ja existe: {}", ex.getMessage());
        return build(HttpStatus.CONFLICT, ex.getMessage(), req.getRequestURI(), null);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex, HttpServletRequest req) {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage(), req.getRequestURI(), null);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex, HttpServletRequest req) {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage(), req.getRequestURI(), null);
    }

    @ExceptionHandler(SubscriptionLimitExceededException.class)
    public ResponseEntity<ErrorResponse> handleSubscriptionLimit(SubscriptionLimitExceededException ex, HttpServletRequest req) {
        log.warn("Limite de assinatura excedido: {}", ex.getMessage());
        return build(HttpStatus.PAYMENT_REQUIRED, ex.getMessage(), req.getRequestURI(), null);
    }

    @ExceptionHandler(UnauthorizedPatientAccessException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedPatientAccess(UnauthorizedPatientAccessException ex, HttpServletRequest req) {
        log.warn("Acesso nao autorizado a paciente: {}", ex.getMessage());
        return build(HttpStatus.FORBIDDEN, "Voce nao tem permissao para acessar este paciente", req.getRequestURI(), null);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleNotReadable(HttpMessageNotReadableException ex, HttpServletRequest req) {
        String message = "Corpo da requisicao invalido";
        String cause = ex.getMessage();
        if (cause != null && cause.contains("not one of the values accepted")) {
            message = "Valor invalido para campo enum. " + cause.replaceAll(".*\\(([^)]+)\\).*", "Valores aceitos: $1");
        } else if (cause != null && cause.contains("Cannot deserialize value of type")) {
            message = "Formato de valor invalido no corpo da requisicao";
        }
        log.warn("Requisicao mal formada: {}", ex.getMessage());
        return build(HttpStatus.BAD_REQUEST, message, req.getRequestURI(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleBeanValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        List<ErrorResponse.FieldError> fields = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> new ErrorResponse.FieldError(fe.getField(), fe.getDefaultMessage()))
                .toList();
        return build(HttpStatus.BAD_REQUEST, "Dados invalidos", req.getRequestURI(), fields);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest req) {
        log.error("Erro interno", ex);
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno: " + ex.getMessage(), req.getRequestURI(), null);
    }

    private ResponseEntity<ErrorResponse> build(HttpStatus status, String message, String path, List<ErrorResponse.FieldError> fields) {
        ErrorResponse body = new ErrorResponse(
                status.value(),
                status.getReasonPhrase(),
                message,
                path,
                fields,
                LocalDateTime.now()
        );
        return ResponseEntity.status(status).body(body);
    }
}
