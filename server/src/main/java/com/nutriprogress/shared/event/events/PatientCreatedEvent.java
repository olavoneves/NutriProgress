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
public class PatientCreatedEvent implements DomainEvent {

    private UUID eventId;
    private LocalDateTime occurredAt;
    private UUID aggregateId;

    private String patientName;
    private UUID nutritionistId;
    private String nutritionistEmail;

    @Override
    public String getEventType() {
        return "patient.created";
    }
}
