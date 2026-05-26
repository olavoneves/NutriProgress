package com.nutriprogress.shared.event.events;

import com.nutriprogress.shared.event.DomainEvent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationCreatedEvent implements DomainEvent {

    private UUID eventId;
    private LocalDateTime occurredAt;
    private UUID aggregateId;

    private UUID patientId;
    private String patientName;
    private UUID nutritionistId;
    private Integer evaluationNumber;
    private LocalDate evaluationDate;
    private BigDecimal weight;

    @Override
    public String getEventType() {
        return "evaluation.created";
    }
}
