package com.nutriprogress.modules.evaluation.service;

import com.nutriprogress.modules.evaluation.dto.CreateEvaluationRequest;
import com.nutriprogress.modules.evaluation.dto.EvaluationDTO;
import com.nutriprogress.modules.evaluation.dto.EvaluationDetailDTO;
import com.nutriprogress.modules.evaluation.dto.EvolutionDataDTO;
import com.nutriprogress.modules.evaluation.dto.UpdateEvaluationRequest;
import com.nutriprogress.modules.evaluation.entity.Evaluation;
import com.nutriprogress.modules.evaluation.exception.EvaluationNotFoundException;
import com.nutriprogress.modules.evaluation.mapper.EvaluationMapper;
import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.exception.NutritionistNotFoundException;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.patient.exception.PatientNotFoundException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import com.nutriprogress.shared.event.EventPublisher;
import com.nutriprogress.shared.event.events.EvaluationCreatedEvent;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;

    // @PersistenceContext: injetado pelo Spring (nao entra no construtor do @RequiredArgsConstructor)
    // Necessario para refresh apos INSERT, pois o trigger set_evaluation_number() e executado no banco
    // e o Hibernate nao ve o valor automaticamente sem um SELECT explicito pos-INSERT.
    @PersistenceContext
    private EntityManager entityManager;
    private final PatientRepository patientRepository;
    private final NutritionistRepository nutritionistRepository;
    private final EvaluationMapper mapper;
    private final EventPublisher eventPublisher;

    @Transactional
    public EvaluationDTO create(UUID nutritionistId, UUID patientId, CreateEvaluationRequest request) {
        log.info("Criando avaliacao para paciente {} da nutricionista {}", patientId, nutritionistId);

        Patient patient = patientRepository.findByIdAndNutritionistId(patientId, nutritionistId)
                .orElseThrow(() -> {
                    if (patientRepository.existsById(patientId)) {
                        return new UnauthorizedPatientAccessException(patientId, nutritionistId);
                    }
                    return new PatientNotFoundException(patientId);
                });

        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        Evaluation evaluation = new Evaluation();
        evaluation.setPatient(patient);
        evaluation.setNutritionist(nutritionist);
        evaluation.setEvaluationDate(request.getEvaluationDate());
        evaluation.setWeight(request.getWeight());
        evaluation.setHeight(request.getHeight());
        // BMI calculado automaticamente por @PrePersist na entidade
        evaluation.setBodyFatPercentage(request.getBodyFatPercentage());
        evaluation.setMuscleMass(request.getMuscleMass());
        evaluation.setVisceralFat(request.getVisceralFat());
        evaluation.setWaistCircumference(request.getWaistCircumference());
        evaluation.setHipCircumference(request.getHipCircumference());
        evaluation.setChestCircumference(request.getChestCircumference());
        evaluation.setArmCircumference(request.getArmCircumference());
        evaluation.setThighCircumference(request.getThighCircumference());
        evaluation.setCalfCircumference(request.getCalfCircumference());
        evaluation.setNotes(request.getNotes());

        evaluation = evaluationRepository.save(evaluation);
        // Flush envia o INSERT ao banco (acionando o trigger set_evaluation_number()).
        // Refresh le de volta os valores gerados pelo trigger que o Hibernate nao vê em cache.
        entityManager.flush();
        entityManager.refresh(evaluation);
        log.info("Avaliacao criada com sucesso: {} (Numero: {})", evaluation.getId(), evaluation.getEvaluationNumber());

        eventPublisher.publish(EvaluationCreatedEvent.builder()
                .eventId(UUID.randomUUID())
                .occurredAt(LocalDateTime.now())
                .aggregateId(evaluation.getId())
                .patientId(patient.getId())
                .patientName(patient.getFullName())
                .nutritionistId(nutritionist.getId())
                .evaluationNumber(evaluation.getEvaluationNumber())
                .evaluationDate(evaluation.getEvaluationDate())
                .weight(evaluation.getWeight())
                .build());

        return mapper.toDTO(evaluation);
    }

    @Transactional(readOnly = true)
    public List<EvaluationDTO> findByPatient(UUID nutritionistId, UUID patientId) {
        log.debug("Listando avaliacoes do paciente {} da nutricionista {}", patientId, nutritionistId);

        if (!patientRepository.existsByIdAndNutritionistId(patientId, nutritionistId)) {
            if (patientRepository.existsById(patientId)) {
                throw new UnauthorizedPatientAccessException(patientId, nutritionistId);
            }
            throw new PatientNotFoundException(patientId);
        }

        return evaluationRepository.findByPatientIdAndNutritionistId(patientId, nutritionistId)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public EvaluationDetailDTO findById(UUID nutritionistId, UUID evaluationId) {
        log.debug("Buscando avaliacao {} da nutricionista {}", evaluationId, nutritionistId);

        Evaluation evaluation = evaluationRepository.findByIdAndNutritionistId(evaluationId, nutritionistId)
                .orElseThrow(() -> {
                    if (evaluationRepository.existsById(evaluationId)) {
                        return new UnauthorizedPatientAccessException(
                                "Voce nao tem permissao para acessar esta avaliacao");
                    }
                    return new EvaluationNotFoundException(evaluationId);
                });

        List<Evaluation> allEvaluations = evaluationRepository
                .findByPatientIdOrderByEvaluationDateAsc(evaluation.getPatient().getId());

        Evaluation previousEvaluation = null;
        for (int i = 0; i < allEvaluations.size(); i++) {
            if (allEvaluations.get(i).getId().equals(evaluationId) && i > 0) {
                previousEvaluation = allEvaluations.get(i - 1);
                break;
            }
        }

        return mapper.toDetailDTO(evaluation, previousEvaluation);
    }

    @Transactional
    public EvaluationDTO update(UUID nutritionistId, UUID evaluationId, UpdateEvaluationRequest request) {
        log.info("Atualizando avaliacao {} da nutricionista {}", evaluationId, nutritionistId);

        Evaluation evaluation = evaluationRepository.findByIdAndNutritionistId(evaluationId, nutritionistId)
                .orElseThrow(() -> {
                    if (evaluationRepository.existsById(evaluationId)) {
                        return new UnauthorizedPatientAccessException(
                                "Voce nao tem permissao para editar esta avaliacao");
                    }
                    return new EvaluationNotFoundException(evaluationId);
                });

        if (request.getEvaluationDate() != null) evaluation.setEvaluationDate(request.getEvaluationDate());
        if (request.getWeight() != null) evaluation.setWeight(request.getWeight());
        if (request.getHeight() != null) evaluation.setHeight(request.getHeight());
        // BMI recalculado automaticamente por @PreUpdate na entidade
        if (request.getBodyFatPercentage() != null) evaluation.setBodyFatPercentage(request.getBodyFatPercentage());
        if (request.getMuscleMass() != null) evaluation.setMuscleMass(request.getMuscleMass());
        if (request.getVisceralFat() != null) evaluation.setVisceralFat(request.getVisceralFat());
        if (request.getWaistCircumference() != null) evaluation.setWaistCircumference(request.getWaistCircumference());
        if (request.getHipCircumference() != null) evaluation.setHipCircumference(request.getHipCircumference());
        if (request.getChestCircumference() != null) evaluation.setChestCircumference(request.getChestCircumference());
        if (request.getArmCircumference() != null) evaluation.setArmCircumference(request.getArmCircumference());
        if (request.getThighCircumference() != null) evaluation.setThighCircumference(request.getThighCircumference());
        if (request.getCalfCircumference() != null) evaluation.setCalfCircumference(request.getCalfCircumference());
        if (request.getNotes() != null) evaluation.setNotes(request.getNotes());

        evaluation = evaluationRepository.save(evaluation);
        log.info("Avaliacao atualizada com sucesso: {}", evaluationId);

        return mapper.toDTO(evaluation);
    }

    @Transactional
    public void delete(UUID nutritionistId, UUID evaluationId) {
        log.warn("Deletando avaliacao {} da nutricionista {}", evaluationId, nutritionistId);

        Evaluation evaluation = evaluationRepository.findByIdAndNutritionistId(evaluationId, nutritionistId)
                .orElseThrow(() -> {
                    if (evaluationRepository.existsById(evaluationId)) {
                        return new UnauthorizedPatientAccessException(
                                "Voce nao tem permissao para deletar esta avaliacao");
                    }
                    return new EvaluationNotFoundException(evaluationId);
                });

        evaluationRepository.delete(evaluation);
        log.info("Avaliacao deletada com sucesso: {}", evaluationId);
    }

    @Transactional(readOnly = true)
    public EvolutionDataDTO getEvolutionData(UUID nutritionistId, UUID patientId) {
        log.debug("Obtendo dados de evolucao do paciente {} da nutricionista {}", patientId, nutritionistId);

        Patient patient = patientRepository.findByIdAndNutritionistId(patientId, nutritionistId)
                .orElseThrow(() -> {
                    if (patientRepository.existsById(patientId)) {
                        return new UnauthorizedPatientAccessException(patientId, nutritionistId);
                    }
                    return new PatientNotFoundException(patientId);
                });

        List<Evaluation> evaluations = evaluationRepository
                .findByPatientIdOrderByEvaluationDateAsc(patientId);

        return mapper.toEvolutionData(evaluations, patient.getId(), patient.getFullName());
    }
}
