package com.nutriprogress.shared.event;

import com.nutriprogress.config.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publish(DomainEvent event) {
        try {
            log.info("Publicando evento: {} - ID: {}", event.getEventType(), event.getEventId());

            rabbitTemplate.convertAndSend(
                    RabbitMQConfig.EVENTS_EXCHANGE,
                    event.getEventType(),
                    event
            );

            log.debug("Evento publicado com sucesso: {}", event.getEventId());
        } catch (Exception e) {
            // Falha na mensageria nao deve quebrar o fluxo principal de negocio.
            log.error("Erro ao publicar evento {}: {}", event.getEventType(), e.getMessage(), e);
        }
    }
}
