package com.nutriprogress.shared.event.events;

import com.nutriprogress.shared.event.DomainEvent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionChangedEvent implements DomainEvent {

    private UUID eventId;
    private LocalDateTime occurredAt;
    private UUID aggregateId;

    private String nutritionistEmail;
    private String nutritionistName;
    private String oldPlan;
    private String newPlan;

    @Override
    public String getEventType() {
        return "subscription.changed";
    }
}
