package com.nutriprogress.modules.user.service;

import com.nutriprogress.modules.user.dto.UpdateUserRequest;
import com.nutriprogress.modules.user.dto.UserDTO;
import com.nutriprogress.modules.user.entity.User;
import com.nutriprogress.modules.user.exception.UserNotFoundException;
import com.nutriprogress.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserDTO findById(UUID id) {
        log.debug("Buscando usuario por ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return mapToDTO(user);
    }

    @Transactional(readOnly = true)
    public UserDTO findByEmail(String email) {
        log.debug("Buscando usuario por email: {}", email);
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UserNotFoundException(email));
        return mapToDTO(user);
    }

    @Transactional
    public UserDTO update(UUID id, UpdateUserRequest request) {
        log.info("Atualizando usuario: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        if (request.email() != null) {
            userRepository.findByEmailIgnoreCase(request.email())
                    .ifPresent(existing -> {
                        if (!existing.getId().equals(id)) {
                            throw new IllegalArgumentException("Email ja esta em uso");
                        }
                    });
            user.setEmail(request.email());
        }

        if (request.isActive() != null) {
            user.setIsActive(request.isActive());
        }

        user = userRepository.save(user);
        log.info("Usuario atualizado com sucesso: {}", id);
        return mapToDTO(user);
    }

    @Transactional
    public void deactivate(UUID id) {
        log.info("Desativando usuario: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        user.setIsActive(false);
        userRepository.save(user);
    }

    @Transactional
    public void activate(UUID id) {
        log.info("Ativando usuario: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        user.setIsActive(true);
        userRepository.save(user);
    }

    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .emailVerified(user.getEmailVerified())
                .lastLoginAt(user.getLastLoginAt())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
