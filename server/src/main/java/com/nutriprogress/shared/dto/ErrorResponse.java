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
        LocalDateTime timestamp
) {
    public record FieldError(String field, String message) {
        public static FieldError of(Map.Entry<String, String> e) {
            return new FieldError(e.getKey(), e.getValue());
        }
    }
}
