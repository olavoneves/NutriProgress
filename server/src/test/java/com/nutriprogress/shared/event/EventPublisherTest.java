package com.nutriprogress.shared.event;

import com.nutriprogress.config.RabbitMQConfig;
import com.nutriprogress.shared.event.events.UserRegisteredEvent;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@DisplayName("EventPublisher - Testes Unitarios")
class EventPublisherTest {

    @Mock
    private RabbitTemplate rabbitTemplate;

    @InjectMocks
    private EventPublisher eventPublisher;

    @Test
    @DisplayName("Deve publicar evento na exchange e routing key corretas")
    void shouldPublishEventSuccessfully() {
        UserRegisteredEvent event = UserRegisteredEvent.builder()
                .eventId(UUID.randomUUID())
                .occurredAt(LocalDateTime.now())
                .aggregateId(UUID.randomUUID())
                .email("test@example.com")
                .fullName("Test User")
                .role("NUTRITIONIST")
                .build();

        eventPublisher.publish(event);

        verify(rabbitTemplate).convertAndSend(
                eq(RabbitMQConfig.EVENTS_EXCHANGE),
                eq("user.registered"),
                eq(event)
        );
    }
}
