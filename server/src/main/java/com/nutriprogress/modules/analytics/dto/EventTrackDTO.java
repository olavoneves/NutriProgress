package com.nutriprogress.modules.analytics.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Map;

@Data
public class EventTrackDTO {

    @NotBlank(message = "Tipo do evento e obrigatorio")
    private String eventType;

    private Map<String, Object> metadata;

    private String sessionId;
}
