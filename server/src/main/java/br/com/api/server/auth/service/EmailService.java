package br.com.api.server.auth.service;

import br.com.api.server.user.domain.model.User;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String EMAIL_ORIGEM = "nutri.progress@gmail.com";
    private final String NAME_SENDER = "NutriProgress";
    // Substituir para URL em produção
    private final String URL_SITE = "http://localhost:8080";

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private void sendEmail(String title, String content, String email) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setFrom(EMAIL_ORIGEM, NAME_SENDER);
            helper.setTo(email);
            helper.setSubject(content);
            helper.setText(title, true);

        } catch (Exception exception) {
            throw new RuntimeException("Error in send email");
        }

        mailSender.send(message);
    }

    public void sendEmailForgotPassword(User user, String token) {
        var title = "Redefinir Senha - NutriProgress";
        var content = formatEmail("""
                        Olá,[[name]], tudo bem? <br>
                        Segue o seu link para você redefinir sua senha, <br>
                        
                        <h3> <a href=\"[[url]]\" target=\"_self\">VERIFICAR</a></h3>
                        
                        Atenciosamente, <br>
                        NutriProgress.
                        """, user.getName(), "http://localhost:8080/api/auth/reset-password?code=" + token);

        sendEmail(title, content, user.getUsername());
    }

    private String formatEmail(String content, String name, String url) {
        return content.replace("[[name]]", name).replace("[[url]]", url);
    }
}
