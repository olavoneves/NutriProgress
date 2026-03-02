package br.com.api.server.auth.service;

import br.com.api.server.auth.domain.dto.EmailData;
import br.com.api.server.auth.domain.dto.ResetPasswordData;
import br.com.api.server.auth.domain.model.PasswordResetToken;
import br.com.api.server.auth.repository.PasswordResetTokenRepository;
import br.com.api.server.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ForgotPasswordService {

    private final EmailService emailService;
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;

    public ForgotPasswordService(EmailService emailService, UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository, PasswordEncoder passwordEncoder) {
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void forgotPassword(EmailData data) {
        var user = userRepository.findByEmailIgnoreCase(data.email())
                .orElseThrow(
                        () -> new UsernameNotFoundException("User not found")
                );
        var passwordResetToken = new PasswordResetToken();

        var token = UUID.randomUUID();

        passwordResetToken.setToken(token.toString());
        passwordResetToken.setExpiresAt(LocalDateTime.now().plusMinutes(15));

        passwordResetTokenRepository.save(passwordResetToken);

        emailService.sendEmailForgotPassword(user, token.toString());
    }

    public void resetPassword(
            ResetPasswordData data,
            String code
    ) {
        var token = passwordResetTokenRepository
                .findByToken(code)
                .orElseThrow(
                        () -> new RuntimeException("Invalid token")
                );

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        if (!data.newPassword().equals(data.confirmNewPassword())) {
            throw new RuntimeException("New password is different to confirm password");
        }

        var user = token.getUser();

        var passwordHash = passwordEncoder.encode(data.newPassword());

        user.updatePassword(passwordHash);

        token.setUsed(true);
        passwordResetTokenRepository.save(token);
    }
}
