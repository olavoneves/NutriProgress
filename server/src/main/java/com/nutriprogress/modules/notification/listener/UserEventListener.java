package com.nutriprogress.modules.notification.listener;

import com.nutriprogress.config.RabbitMQConfig;
import com.nutriprogress.modules.notification.service.NotificationService;
import com.nutriprogress.shared.event.events.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserEventListener {

    private final NotificationService notificationService;

    @RabbitListener(queues = RabbitMQConfig.USER_EVENTS_QUEUE)
    public void handleUserRegistered(UserRegisteredEvent event) {
        log.info("Processando evento UserRegistered: {}", event.getEventId());

        try {
            notificationService.sendWelcomeEmail(event.getEmail(), event.getFullName());
            log.info("Email de boas-vindas enviado para: {}", event.getEmail());
        } catch (Exception e) {
            log.error("Erro ao processar UserRegisteredEvent: {}", e.getMessage(), e);
            throw e;
        }
    }
}
