package com.nutriprogress.shared.audit;

import com.nutriprogress.modules.user.repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class AuditorAwareImpl implements AuditorAware<UUID> {

    private final UserRepository userRepository;

    public AuditorAwareImpl(@Lazy UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<UUID> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            return Optional.empty();
        }

        try {
            return userRepository.findByEmailIgnoreCase(authentication.getName())
                    .map(user -> user.getId());
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
