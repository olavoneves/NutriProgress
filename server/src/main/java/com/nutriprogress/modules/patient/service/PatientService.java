package com.nutriprogress.modules.patient.service;

import com.nutriprogress.modules.evaluation.entity.Evaluation;
import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.exception.NutritionistNotFoundException;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.modules.patient.dto.CreatePatientRequest;
import com.nutriprogress.modules.patient.dto.PatientDTO;
import com.nutriprogress.modules.patient.dto.PatientDetailDTO;
import com.nutriprogress.modules.patient.dto.PatientFilterRequest;
import com.nutriprogress.modules.patient.dto.PatientSummaryDTO;
import com.nutriprogress.modules.patient.dto.UpdatePatientRequest;
import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.patient.exception.PatientNotFoundException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.modules.patient.mapper.PatientMapper;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import com.nutriprogress.modules.patient.specification.PatientSpecification;
import com.nutriprogress.shared.dto.PageResponse;
import com.nutriprogress.shared.event.EventPublisher;
import com.nutriprogress.shared.event.events.PatientCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final NutritionistRepository nutritionistRepository;
    private final EvaluationRepository evaluationRepository;
    private final NutritionistService nutritionistService;
    private final PatientMapper mapper;
    private final EventPublisher eventPublisher;

    @Transactional
    public PatientDTO create(UUID nutritionistId, CreatePatientRequest request) {
        log.info("Criando paciente para nutricionista: {}", nutritionistId);

        nutritionistService.checkPatientLimit(nutritionistId);

        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        Patient patient = new Patient();
        patient.setNutritionist(nutritionist);
        patient.setFullName(request.getFullName());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setBirthDate(request.getBirthDate());
        patient.setGender(request.getGender());
        patient.setHeight(request.getHeight());
        patient.setGoal(request.getGoal());
        patient.setNotes(request.getNotes());
        patient.setIsActive(true);

        patient = patientRepository.save(patient);
        log.info("Paciente criado com sucesso: {}", patient.getId());

        eventPublisher.publish(PatientCreatedEvent.builder()
                .eventId(UUID.randomUUID())
                .occurredAt(LocalDateTime.now())
                .aggregateId(patient.getId())
                .patientName(patient.getFullName())
                .nutritionistId(nutritionist.getId())
                .nutritionistEmail(nutritionist.getUser().getEmail())
                .build());

        return mapper.toDTO(patient);
    }

    @Transactional(readOnly = true)
    public PageResponse<PatientSummaryDTO> findAll(UUID nutritionistId, PatientFilterRequest filters) {
        log.debug("Listando pacientes da nutricionista {} com filtros: {}", nutritionistId, filters);

        Specification<Patient> spec = PatientSpecification.withFilters(nutritionistId, filters);

        String sortField = Objects.requireNonNullElse(filters.getSortBy(), "fullName");
        String sortDir = Objects.requireNonNullElse(filters.getSortDirection(), "ASC");
        int pageNum = Objects.requireNonNullElse(filters.getPage(), 0);
        int pageSize = Objects.requireNonNullElse(filters.getSize(), 20);

        Sort sort = Sort.by(
                "DESC".equalsIgnoreCase(sortDir) ? Sort.Direction.DESC : Sort.Direction.ASC,
                sortField
        );
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Patient> patientsPage = patientRepository.findAll(spec, pageable);

        Page<PatientSummaryDTO> dtoPage = patientsPage.map(patient -> {
            Evaluation lastEval = getLastEvaluation(patient.getId());
            int totalEvals = (int) evaluationRepository.countByPatientId(patient.getId());
            return mapper.toSummaryDTO(patient, lastEval, totalEvals);
        });

        return PageResponse.from(dtoPage);
    }

    @Transactional(readOnly = true)
    public PatientDetailDTO findById(UUID nutritionistId, UUID patientId) {
        log.debug("Buscando paciente {} da nutricionista {}", patientId, nutritionistId);

        Patient patient = patientRepository.findByIdAndNutritionistId(patientId, nutritionistId)
                .orElseThrow(() -> {
                    if (patientRepository.existsById(patientId)) {
                        return new UnauthorizedPatientAccessException(patientId, nutritionistId);
                    }
                    return new PatientNotFoundException(patientId);
                });

        List<Evaluation> evaluations = evaluationRepository.findByPatientIdOrderByEvaluationDateDesc(patientId);
        Evaluation lastEvaluation = evaluations.isEmpty() ? null : evaluations.get(0);

        return mapper.toDetailDTO(patient, lastEvaluation, evaluations);
    }

    @Transactional
    public PatientDTO update(UUID nutritionistId, UUID patientId, UpdatePatientRequest request) {
        log.info("Atualizando paciente {} da nutricionista {}", patientId, nutritionistId);

        Patient patient = findPatientWithOwnershipCheck(nutritionistId, patientId);

        if (request.getFullName() != null) patient.setFullName(request.getFullName());
        if (request.getEmail() != null) patient.setEmail(request.getEmail());
        if (request.getPhone() != null) patient.setPhone(request.getPhone());
        if (request.getBirthDate() != null) patient.setBirthDate(request.getBirthDate());
        if (request.getGender() != null) patient.setGender(request.getGender());
        if (request.getHeight() != null) patient.setHeight(request.getHeight());
        if (request.getGoal() != null) patient.setGoal(request.getGoal());
        if (request.getNotes() != null) patient.setNotes(request.getNotes());

        patient = patientRepository.save(patient);
        log.info("Paciente atualizado com sucesso: {}", patientId);

        return mapper.toDTO(patient);
    }

    @Transactional
    public void archive(UUID nutritionistId, UUID patientId) {
        log.info("Arquivando paciente {} da nutricionista {}", patientId, nutritionistId);

        Patient patient = findPatientWithOwnershipCheck(nutritionistId, patientId);

        if (!patient.getIsActive()) {
            log.warn("Paciente {} ja esta arquivado", patientId);
            return;
        }

        patient.setIsActive(false);
        patientRepository.save(patient);
        log.info("Paciente arquivado com sucesso: {}", patientId);
    }

    @Transactional
    public void restore(UUID nutritionistId, UUID patientId) {
        log.info("Restaurando paciente {} da nutricionista {}", patientId, nutritionistId);

        Patient patient = findPatientWithOwnershipCheck(nutritionistId, patientId);

        if (patient.getIsActive()) {
            log.warn("Paciente {} ja esta ativo", patientId);
            return;
        }

        nutritionistService.checkPatientLimit(nutritionistId);

        patient.setIsActive(true);
        patientRepository.save(patient);
        log.info("Paciente restaurado com sucesso: {}", patientId);
    }

    @Transactional
    public void delete(UUID nutritionistId, UUID patientId) {
        log.warn("DELETANDO PERMANENTEMENTE paciente {} da nutricionista {}", patientId, nutritionistId);

        Patient patient = findPatientWithOwnershipCheck(nutritionistId, patientId);
        patientRepository.delete(patient);

        log.warn("Paciente deletado permanentemente: {}", patientId);
    }

    private Patient findPatientWithOwnershipCheck(UUID nutritionistId, UUID patientId) {
        return patientRepository.findByIdAndNutritionistId(patientId, nutritionistId)
                .orElseThrow(() -> {
                    if (patientRepository.existsById(patientId)) {
                        return new UnauthorizedPatientAccessException(patientId, nutritionistId);
                    }
                    return new PatientNotFoundException(patientId);
                });
    }

    private Evaluation getLastEvaluation(UUID patientId) {
        Page<Evaluation> page = evaluationRepository.findByPatientIdOrderByEvaluationDateDesc(
                patientId, PageRequest.of(0, 1));
        return page.isEmpty() ? null : page.getContent().get(0);
    }
}
