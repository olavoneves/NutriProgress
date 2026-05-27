package com.nutriprogress.modules.notification.service;

import com.nutriprogress.modules.notification.dto.EmailDTO;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.from:noreply@nutriprogress.com}")
    private String fromEmail;

    public void sendEmail(EmailDTO emailDTO) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(emailDTO.getTo());
            helper.setSubject(emailDTO.getSubject());

            String htmlContent = processTemplate(emailDTO.getTemplateName(), emailDTO.getVariables());
            helper.setText(htmlContent, true);

            mailSender.send(message);

            log.info("Email enviado com sucesso para: {}", emailDTO.getTo());
        } catch (Exception e) {
            log.error("Erro ao enviar email para {}: {}", emailDTO.getTo(), e.getMessage(), e);
            throw new RuntimeException("Falha ao enviar email", e);
        }
    }

    private String processTemplate(String templateName, Map<String, Object> variables) {
        Context context = new Context();
        if (variables != null) {
            variables.forEach(context::setVariable);
        }
        return templateEngine.process(templateName, context);
    }
}
