package com.nutriprogress.modules.notification.service;

import com.nutriprogress.modules.notification.dto.EmailDTO;
import com.nutriprogress.modules.notification.entity.Notification;
import com.nutriprogress.modules.notification.entity.NotificationType;
import com.nutriprogress.modules.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    @Transactional
    public void sendWelcomeEmail(String email, String name) {
        log.info("Enviando email de boas-vindas para: {}", email);

        Notification notification = new Notification();
        notification.setRecipientEmail(email);
        notification.setType(NotificationType.WELCOME_EMAIL);
        notification.setSubject("Bem-vindo ao NutriProgress!");
        notification.setStatus(Notification.NotificationStatus.PENDING);

        try {
            Map<String, Object> variables = new HashMap<>();
            variables.put("name", name);
            variables.put("appUrl", "https://nutriprogress.com");

            EmailDTO emailDTO = EmailDTO.builder()
                    .to(email)
                    .subject("Bem-vindo ao NutriProgress!")
                    .templateName("email/welcome")
                    .variables(variables)
                    .build();

            emailService.sendEmail(emailDTO);

            notification.setStatus(Notification.NotificationStatus.SENT);
            notification.setSentAt(LocalDateTime.now());
        } catch (Exception e) {
            log.error("Erro ao enviar email de boas-vindas: {}", e.getMessage());
            notification.setStatus(Notification.NotificationStatus.FAILED);
            notification.setErrorMessage(e.getMessage());
            notification.setRetryCount(notification.getRetryCount() + 1);
        } finally {
            notificationRepository.save(notification);
        }
    }

    @Transactional
    public void sendPatientCreatedNotification(String nutritionistEmail, String patientName) {
        log.info("Enviando notificacao de paciente criado para: {}", nutritionistEmail);

        Notification notification = new Notification();
        notification.setRecipientEmail(nutritionistEmail);
        notification.setType(NotificationType.PATIENT_CREATED);
        notification.setSubject("Novo paciente cadastrado");
        notification.setStatus(Notification.NotificationStatus.PENDING);

        try {
            Map<String, Object> variables = new HashMap<>();
            variables.put("patientName", patientName);

            EmailDTO emailDTO = EmailDTO.builder()
                    .to(nutritionistEmail)
                    .subject("Novo paciente cadastrado: " + patientName)
                    .templateName("email/patient-created")
                    .variables(variables)
                    .build();

            emailService.sendEmail(emailDTO);

            notification.setStatus(Notification.NotificationStatus.SENT);
            notification.setSentAt(LocalDateTime.now());
        } catch (Exception e) {
            log.error("Erro ao enviar notificacao: {}", e.getMessage());
            notification.setStatus(Notification.NotificationStatus.FAILED);
            notification.setErrorMessage(e.getMessage());
            notification.setRetryCount(notification.getRetryCount() + 1);
        } finally {
            notificationRepository.save(notification);
        }
    }
}
