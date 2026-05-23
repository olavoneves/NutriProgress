package com.nutriprogress.modules.nutritionist.service;

import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.dto.NutritionistProfileDTO;
import com.nutriprogress.modules.nutritionist.dto.NutritionistStatsDTO;
import com.nutriprogress.modules.nutritionist.dto.UpdateNutritionistRequest;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import com.nutriprogress.modules.nutritionist.exception.NutritionistNotFoundException;
import com.nutriprogress.modules.nutritionist.exception.SubscriptionLimitExceededException;
import com.nutriprogress.modules.nutritionist.mapper.NutritionistMapper;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class NutritionistService {

    private final NutritionistRepository nutritionistRepository;
    private final PatientRepository patientRepository;
    private final EvaluationRepository evaluationRepository;
    private final NutritionistMapper mapper;

    @Transactional(readOnly = true)
    public NutritionistDTO findById(UUID id) {
        log.debug("Buscando nutricionista por ID: {}", id);
        Nutritionist nutritionist = nutritionistRepository.findById(id)
                .orElseThrow(() -> new NutritionistNotFoundException(id));
        return mapper.toDTO(nutritionist);
    }

    @Transactional(readOnly = true)
    public NutritionistDTO findByUserId(UUID userId) {
        log.debug("Buscando nutricionista por user ID: {}", userId);
        Nutritionist nutritionist = nutritionistRepository.findByUserId(userId)
                .orElseThrow(() -> new NutritionistNotFoundException(
                        "Nutricionista nao encontrada para o usuario: " + userId));
        return mapper.toDTO(nutritionist);
    }

    @Transactional(readOnly = true)
    public NutritionistDTO findByUserEmail(String email) {
        log.debug("Buscando nutricionista por email: {}", email);
        Nutritionist nutritionist = nutritionistRepository.findByUserEmail(email)
                .orElseThrow(() -> new NutritionistNotFoundException(
                        "Nutricionista nao encontrada para o email: " + email));
        return mapper.toDTO(nutritionist);
    }

    @Transactional(readOnly = true)
    public NutritionistProfileDTO getProfile(UUID nutritionistId) {
        log.debug("Buscando perfil completo da nutricionista: {}", nutritionistId);
        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));
        NutritionistStatsDTO stats = calculateStats(nutritionistId);
        return mapper.toProfileDTO(nutritionist, stats);
    }

    @Transactional
    public NutritionistDTO update(UUID id, UpdateNutritionistRequest request) {
        log.info("Atualizando nutricionista: {}", id);
        Nutritionist nutritionist = nutritionistRepository.findById(id)
                .orElseThrow(() -> new NutritionistNotFoundException(id));

        if (request.fullName() != null) {
            nutritionist.setFullName(request.fullName());
        }
        if (request.phone() != null) {
            nutritionist.setPhone(request.phone());
        }
        if (request.crn() != null) {
            nutritionist.setCrn(request.crn());
        }
        if (request.specialty() != null) {
            nutritionist.setSpecialty(request.specialty());
        }
        if (request.clinicName() != null) {
            nutritionist.setClinicName(request.clinicName());
        }
        if (request.avatarUrl() != null) {
            nutritionist.setAvatarUrl(request.avatarUrl());
        }

        nutritionist = nutritionistRepository.save(nutritionist);
        log.info("Nutricionista atualizada com sucesso: {}", id);
        return mapper.toDTO(nutritionist);
    }

    @Transactional(readOnly = true)
    public void checkPatientLimit(UUID nutritionistId) {
        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        long activePatients = patientRepository.countByNutritionistIdAndIsActive(nutritionistId, true);
        SubscriptionPlan plan = nutritionist.getSubscriptionPlan();
        int limit = getPatientLimit(plan);

        if (limit > 0 && activePatients >= limit) {
            throw new SubscriptionLimitExceededException(
                    "Limite de pacientes atingido para o plano %s. Limite: %d, Atual: %d"
                            .formatted(plan.name(), limit, activePatients));
        }
    }

    private int getPatientLimit(SubscriptionPlan plan) {
        return switch (plan) {
            case FREE -> 5;
            case STARTER -> 20;
            case PRO -> 50;
            case PREMIUM -> -1;
        };
    }

    private NutritionistStatsDTO calculateStats(UUID nutritionistId) {
        long totalPatients = patientRepository.countByNutritionistId(nutritionistId);
        long activePatients = patientRepository.countByNutritionistIdAndIsActive(nutritionistId, true);
        long archivedPatients = totalPatients - activePatients;

        long totalEvaluations = evaluationRepository.countByNutritionistId(nutritionistId);
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        long evaluationsThisMonth = evaluationRepository
                .countByNutritionistIdAndCreatedAtAfter(nutritionistId, startOfMonth);

        return NutritionistStatsDTO.builder()
                .totalPatients(totalPatients)
                .activePatients(activePatients)
                .archivedPatients(archivedPatients)
                .totalEvaluations(totalEvaluations)
                .evaluationsThisMonth(evaluationsThisMonth)
                .build();
    }

    @Transactional(readOnly = true)
    public boolean hasActiveSubscription(UUID nutritionistId) {
        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        if (nutritionist.getSubscriptionPlan() == SubscriptionPlan.FREE) {
            return true;
        }
        if (nutritionist.getSubscriptionExpiresAt() == null) {
            return false;
        }
        return nutritionist.getSubscriptionExpiresAt().isAfter(LocalDateTime.now());
    }
}
