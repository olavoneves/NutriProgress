package com.nutriprogress.shared.seed;

import com.nutriprogress.modules.user.entity.User;
import com.nutriprogress.modules.user.entity.UserRole;
import com.nutriprogress.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@Profile("!test")
@RequiredArgsConstructor
public class DatabaseSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        log.info("Executando DatabaseSeeder...");
        seedAdminUser();
        log.info("DatabaseSeeder concluído.");
    }

    private void seedAdminUser() {
        String adminEmail = "admin@nutriprogress.com";

        if (userRepository.existsByEmailIgnoreCase(adminEmail)) {
            log.debug("Admin já existe, pulando seed.");
            return;
        }

        User admin = User.builder()
                .email(adminEmail)
                .passwordHash(passwordEncoder.encode("NutriAdmin@2026"))
                .role(UserRole.ADMIN)
                .isActive(true)
                .emailVerified(true)
                .build();

        userRepository.save(admin);
        log.info("Usuário admin criado: {}", adminEmail);
    }
}
