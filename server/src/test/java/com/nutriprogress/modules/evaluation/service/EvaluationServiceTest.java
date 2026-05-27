package com.nutriprogress.modules.evaluation.service;

import com.nutriprogress.modules.evaluation.dto.CreateEvaluationRequest;
import com.nutriprogress.modules.evaluation.dto.EvaluationDTO;
import com.nutriprogress.modules.evaluation.dto.EvaluationDetailDTO;
import com.nutriprogress.modules.evaluation.dto.UpdateEvaluationRequest;
import com.nutriprogress.modules.evaluation.entity.Evaluation;
import com.nutriprogress.modules.evaluation.exception.EvaluationNotFoundException;
import com.nutriprogress.modules.evaluation.mapper.EvaluationMapper;
import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.patient.exception.PatientNotFoundException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import com.nutriprogress.shared.event.EventPublisher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("EvaluationService - Testes Unitarios")
class EvaluationServiceTest {

    @Mock
    private EvaluationRepository evaluationRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private NutritionistRepository nutritionistRepository;

    @Mock
    private EvaluationMapper mapper;

    @Mock
    private EventPublisher eventPublisher;

    @InjectMocks
    private EvaluationService evaluationService;

    private UUID nutritionistId;
    private UUID patientId;
    private UUID evaluationId;
    private Patient patient;
    private Nutritionist nutritionist;
    private Evaluation evaluation;

    @BeforeEach
    void setUp() {
        nutritionistId = UUID.randomUUID();
        patientId = UUID.randomUUID();
        evaluationId = UUID.randomUUID();

        nutritionist = new Nutritionist();
        nutritionist.setId(nutritionistId);

        patient = new Patient();
        patient.setId(patientId);
        patient.setFullName("Maria Silva");
        patient.setNutritionist(nutritionist);

        evaluation = new Evaluation();
        evaluation.setId(evaluationId);
        evaluation.setPatient(patient);
        evaluation.setNutritionist(nutritionist);
        evaluation.setEvaluationNumber(1);
        evaluation.setEvaluationDate(LocalDate.now());
        evaluation.setWeight(BigDecimal.valueOf(70.0));
        evaluation.setHeight(BigDecimal.valueOf(165.0));
        evaluation.setBmi(BigDecimal.valueOf(25.71));
    }

    @Test
    @DisplayName("Deve criar avaliacao com sucesso")
    void shouldCreateEvaluationSuccessfully() {
        CreateEvaluationRequest request = new CreateEvaluationRequest();
        request.setEvaluationDate(LocalDate.now());
        request.setWeight(BigDecimal.valueOf(70.0));
        request.setHeight(BigDecimal.valueOf(165.0));

        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.of(patient));
        when(nutritionistRepository.findById(nutritionistId))
                .thenReturn(Optional.of(nutritionist));
        when(evaluationRepository.save(any(Evaluation.class)))
                .thenReturn(evaluation);
        when(mapper.toDTO(evaluation))
                .thenReturn(new EvaluationDTO());

        EvaluationDTO result = evaluationService.create(nutritionistId, patientId, request);

        assertThat(result).isNotNull();
        verify(evaluationRepository).save(any(Evaluation.class));
        verify(mapper).toDTO(evaluation);
    }

    @Test
    @DisplayName("Deve lancar PatientNotFoundException quando paciente nao existe")
    void shouldThrowPatientNotFoundWhenPatientDoesNotExist() {
        CreateEvaluationRequest request = new CreateEvaluationRequest();
        request.setEvaluationDate(LocalDate.now());

        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.empty());
        when(patientRepository.existsById(patientId))
                .thenReturn(false);

        assertThatThrownBy(() -> evaluationService.create(nutritionistId, patientId, request))
                .isInstanceOf(PatientNotFoundException.class);
    }

    @Test
    @DisplayName("Deve lancar UnauthorizedPatientAccessException quando paciente pertence a outra nutricionista")
    void shouldThrowUnauthorizedWhenPatientBelongsToAnotherNutritionist() {
        CreateEvaluationRequest request = new CreateEvaluationRequest();
        request.setEvaluationDate(LocalDate.now());

        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.empty());
        when(patientRepository.existsById(patientId))
                .thenReturn(true);

        assertThatThrownBy(() -> evaluationService.create(nutritionistId, patientId, request))
                .isInstanceOf(UnauthorizedPatientAccessException.class);
    }

    @Test
    @DisplayName("Deve listar avaliacoes do paciente")
    void shouldListEvaluationsByPatient() {
        when(patientRepository.existsByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(true);
        when(evaluationRepository.findByPatientIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(List.of(evaluation));
        when(mapper.toDTO(evaluation))
                .thenReturn(new EvaluationDTO());

        List<EvaluationDTO> result = evaluationService.findByPatient(nutritionistId, patientId);

        assertThat(result).hasSize(1);
    }

    @Test
    @DisplayName("Deve buscar avaliacao por ID com dados de evolucao")
    void shouldFindEvaluationByIdWithEvolutionData() {
        when(evaluationRepository.findByIdAndNutritionistId(evaluationId, nutritionistId))
                .thenReturn(Optional.of(evaluation));
        when(evaluationRepository.findByPatientIdOrderByEvaluationDateAsc(patientId))
                .thenReturn(List.of(evaluation));
        when(mapper.toDetailDTO(evaluation, null))
                .thenReturn(new EvaluationDetailDTO());

        EvaluationDetailDTO result = evaluationService.findById(nutritionistId, evaluationId);

        assertThat(result).isNotNull();
        verify(mapper).toDetailDTO(evaluation, null);
    }

    @Test
    @DisplayName("Deve lancar EvaluationNotFoundException quando avaliacao nao existe")
    void shouldThrowEvaluationNotFoundWhenEvaluationDoesNotExist() {
        when(evaluationRepository.findByIdAndNutritionistId(evaluationId, nutritionistId))
                .thenReturn(Optional.empty());
        when(evaluationRepository.existsById(evaluationId))
                .thenReturn(false);

        assertThatThrownBy(() -> evaluationService.findById(nutritionistId, evaluationId))
                .isInstanceOf(EvaluationNotFoundException.class);
    }

    @Test
    @DisplayName("Deve atualizar avaliacao com sucesso")
    void shouldUpdateEvaluationSuccessfully() {
        UpdateEvaluationRequest request = new UpdateEvaluationRequest();
        request.setWeight(BigDecimal.valueOf(69.0));

        when(evaluationRepository.findByIdAndNutritionistId(evaluationId, nutritionistId))
                .thenReturn(Optional.of(evaluation));
        when(evaluationRepository.save(evaluation))
                .thenReturn(evaluation);
        when(mapper.toDTO(evaluation))
                .thenReturn(new EvaluationDTO());

        EvaluationDTO result = evaluationService.update(nutritionistId, evaluationId, request);

        assertThat(result).isNotNull();
        assertThat(evaluation.getWeight()).isEqualByComparingTo("69.0");
        verify(evaluationRepository).save(evaluation);
    }

    @Test
    @DisplayName("Deve deletar avaliacao com sucesso")
    void shouldDeleteEvaluationSuccessfully() {
        when(evaluationRepository.findByIdAndNutritionistId(evaluationId, nutritionistId))
                .thenReturn(Optional.of(evaluation));

        evaluationService.delete(nutritionistId, evaluationId);

        verify(evaluationRepository).delete(evaluation);
    }
}
