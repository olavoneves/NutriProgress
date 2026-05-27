package com.nutriprogress.shared.event;

import java.time.LocalDateTime;
import java.util.UUID;

public interface DomainEvent {

    UUID getEventId();

    LocalDateTime getOccurredAt();

    /**
     * Tipo do evento, usado como routing key na publicação (ex.: "user.registered").
     */
    String getEventType();

    UUID getAggregateId();
}
