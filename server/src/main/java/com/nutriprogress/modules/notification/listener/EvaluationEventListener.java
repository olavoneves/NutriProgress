package com.nutriprogress.modules.notification.listener;

import com.nutriprogress.config.RabbitMQConfig;
import com.nutriprogress.shared.event.events.EvaluationCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EvaluationEventListener {

    @RabbitListener(queues = RabbitMQConfig.EVALUATION_EVENTS_QUEUE)
    public void handleEvaluationCreated(EvaluationCreatedEvent event) {
        log.info("Processando evento EvaluationCreated: {}", event.getEventId());

        try {
            // Ganchos futuros: analise de tendencias, alertas de progresso, estatisticas.
            log.info("Avaliacao #{} registrada para paciente: {}",
                    event.getEvaluationNumber(), event.getPatientName());
        } catch (Exception e) {
            log.error("Erro ao processar EvaluationCreatedEvent: {}", e.getMessage(), e);
            throw e;
        }
    }
}
