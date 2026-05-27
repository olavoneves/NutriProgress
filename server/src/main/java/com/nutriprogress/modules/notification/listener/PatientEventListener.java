package com.nutriprogress.modules.notification.listener;

import com.nutriprogress.config.RabbitMQConfig;
import com.nutriprogress.modules.notification.service.NotificationService;
import com.nutriprogress.shared.event.events.PatientCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PatientEventListener {

    private final NotificationService notificationService;

    @RabbitListener(queues = RabbitMQConfig.PATIENT_EVENTS_QUEUE)
    public void handlePatientCreated(PatientCreatedEvent event) {
        log.info("Processando evento PatientCreated: {}", event.getEventId());

        try {
            notificationService.sendPatientCreatedNotification(
                    event.getNutritionistEmail(),
                    event.getPatientName()
            );
            log.info("Notificacao de paciente criado enviada para: {}", event.getNutritionistEmail());
        } catch (Exception e) {
            log.error("Erro ao processar PatientCreatedEvent: {}", e.getMessage(), e);
            throw e;
        }
    }
}
