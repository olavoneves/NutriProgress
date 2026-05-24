package com.nutriprogress.modules.patient.service;

import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.modules.patient.dto.CreatePatientRequest;
import com.nutriprogress.modules.patient.dto.PatientDTO;
import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.patient.exception.PatientNotFoundException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.modules.patient.mapper.PatientMapper;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("PatientService - Testes Unitarios")
class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private NutritionistRepository nutritionistRepository;

    @Mock
    private EvaluationRepository evaluationRepository;

    @Mock
    private NutritionistService nutritionistService;

    @Mock
    private PatientMapper mapper;

    @InjectMocks
    private PatientService patientService;

    private UUID nutritionistId;
    private UUID patientId;
    private Nutritionist nutritionist;
    private Patient patient;

    @BeforeEach
    void setUp() {
        nutritionistId = UUID.randomUUID();
        patientId = UUID.randomUUID();

        nutritionist = new Nutritionist();
        nutritionist.setId(nutritionistId);

        patient = new Patient();
        patient.setId(patientId);
        patient.setNutritionist(nutritionist);
        patient.setFullName("Maria Silva");
        patient.setIsActive(true);
    }

    @Test
    @DisplayName("Deve criar paciente com sucesso")
    void shouldCreatePatientSuccessfully() {
        CreatePatientRequest request = new CreatePatientRequest();
        request.setFullName("Maria Silva");
        request.setEmail("maria@example.com");
        request.setBirthDate(LocalDate.of(1990, 5, 15));

        when(nutritionistRepository.findById(nutritionistId)).thenReturn(Optional.of(nutritionist));
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);
        when(mapper.toDTO(patient)).thenReturn(new PatientDTO());

        PatientDTO result = patientService.create(nutritionistId, request);

        assertThat(result).isNotNull();
        verify(nutritionistService).checkPatientLimit(nutritionistId);
        verify(patientRepository).save(any(Patient.class));
    }

    @Test
    @DisplayName("Deve lancar excecao ao tentar acessar paciente de outra nutricionista")
    void shouldThrowExceptionWhenAccessingPatientFromAnotherNutritionist() {
        UUID anotherNutritionistId = UUID.randomUUID();

        when(patientRepository.findByIdAndNutritionistId(patientId, anotherNutritionistId))
                .thenReturn(Optional.empty());
        when(patientRepository.existsById(patientId)).thenReturn(true);

        assertThatThrownBy(() -> patientService.findById(anotherNutritionistId, patientId))
                .isInstanceOf(UnauthorizedPatientAccessException.class);
    }

    @Test
    @DisplayName("Deve lancar PatientNotFoundException quando paciente nao existe")
    void shouldThrowPatientNotFoundWhenPatientDoesNotExist() {
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.empty());
        when(patientRepository.existsById(patientId)).thenReturn(false);

        assertThatThrownBy(() -> patientService.findById(nutritionistId, patientId))
                .isInstanceOf(PatientNotFoundException.class)
                .hasMessageContaining(patientId.toString());
    }

    @Test
    @DisplayName("Deve arquivar paciente com sucesso")
    void shouldArchivePatientSuccessfully() {
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.of(patient));

        patientService.archive(nutritionistId, patientId);

        assertThat(patient.getIsActive()).isFalse();
        verify(patientRepository).save(patient);
    }

    @Test
    @DisplayName("Nao deve salvar ao arquivar paciente ja arquivado")
    void shouldNotSaveWhenArchivingAlreadyArchivedPatient() {
        patient.setIsActive(false);
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.of(patient));

        patientService.archive(nutritionistId, patientId);

        verify(patientRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve restaurar paciente com sucesso")
    void shouldRestorePatientSuccessfully() {
        patient.setIsActive(false);
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.of(patient));

        patientService.restore(nutritionistId, patientId);

        assertThat(patient.getIsActive()).isTrue();
        verify(nutritionistService).checkPatientLimit(nutritionistId);
        verify(patientRepository).save(patient);
    }

    @Test
    @DisplayName("Deve deletar paciente permanentemente")
    void shouldDeletePatientPermanently() {
        when(patientRepository.findByIdAndNutritionistId(patientId, nutritionistId))
                .thenReturn(Optional.of(patient));

        patientService.delete(nutritionistId, patientId);

        verify(patientRepository).delete(patient);
    }
}
