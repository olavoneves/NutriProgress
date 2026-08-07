package com.nutriprogress.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
        int status,
        String error,
        String message,
        String path,
        List<FieldError> fieldErrors,
        /**
         * Detalhes adicionais legiveis por maquina, para erros em que o
         * cliente precisa reagir a algo alem da mensagem (ex.: o plano
         * necessario em um 402). Omitido do JSON quando nulo.
         */
        Map<String, String> errors,
        LocalDateTime timestamp
) {
    public ErrorResponse(
            int status,
            String error,
            String message,
            String path,
            List<FieldError> fieldErrors,
            LocalDateTime timestamp
    ) {
        this(status, error, message, path, fieldErrors, null, timestamp);
    }

    public record FieldError(String field, String message) {
        public static FieldError of(Map.Entry<String, String> e) {
            return new FieldError(e.getKey(), e.getValue());
        }
    }
}
