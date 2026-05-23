package com.nutriprogress.modules.nutritionist.service;

import com.nutriprogress.modules.evaluation.repository.EvaluationRepository;
import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.dto.UpdateNutritionistRequest;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.entity.Specialty;
import com.nutriprogress.modules.nutritionist.exception.NutritionistNotFoundException;
import com.nutriprogress.modules.nutritionist.mapper.NutritionistMapper;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import com.nutriprogress.modules.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("NutritionistService - Testes Unitarios")
class NutritionistServiceTest {

    @Mock
    private NutritionistRepository nutritionistRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private EvaluationRepository evaluationRepository;

    @Mock
    private NutritionistMapper mapper;

    @InjectMocks
    private NutritionistService nutritionistService;

    private UUID nutritionistId;
    private Nutritionist nutritionist;
    private NutritionistDTO nutritionistDTO;

    @BeforeEach
    void setUp() {
        nutritionistId = UUID.randomUUID();

        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("nutri@example.com");

        nutritionist = new Nutritionist();
        nutritionist.setId(nutritionistId);
        nutritionist.setUser(user);
        nutritionist.setFullName("Dr. Joao Silva");
        nutritionist.setCrn("CRN-12345");
        nutritionist.setSpecialty(Specialty.CLINICAL);

        nutritionistDTO = NutritionistDTO.builder()
                .id(nutritionistId)
                .fullName("Dr. Joao Silva")
                .email("nutri@example.com")
                .crn("CRN-12345")
                .build();
    }

    @Test
    @DisplayName("Deve buscar nutricionista por ID com sucesso")
    void shouldFindNutritionistById() {
        when(nutritionistRepository.findById(nutritionistId)).thenReturn(Optional.of(nutritionist));
        when(mapper.toDTO(nutritionist)).thenReturn(nutritionistDTO);

        NutritionistDTO result = nutritionistService.findById(nutritionistId);

        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(nutritionistId);
        assertThat(result.fullName()).isEqualTo("Dr. Joao Silva");

        verify(nutritionistRepository).findById(nutritionistId);
        verify(mapper).toDTO(nutritionist);
    }

    @Test
    @DisplayName("Deve lancar excecao quando nutricionista nao encontrada")
    void shouldThrowExceptionWhenNutritionistNotFound() {
        when(nutritionistRepository.findById(nutritionistId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> nutritionistService.findById(nutritionistId))
                .isInstanceOf(NutritionistNotFoundException.class)
                .hasMessageContaining(nutritionistId.toString());

        verify(nutritionistRepository).findById(nutritionistId);
        verify(mapper, never()).toDTO(any());
    }

    @Test
    @DisplayName("Deve atualizar nutricionista com sucesso")
    void shouldUpdateNutritionistSuccessfully() {
        UpdateNutritionistRequest request = new UpdateNutritionistRequest(
                "Dr. Joao Silva Atualizado", "11999999999", null, null, null, null);

        when(nutritionistRepository.findById(nutritionistId)).thenReturn(Optional.of(nutritionist));
        when(nutritionistRepository.save(any(Nutritionist.class))).thenReturn(nutritionist);
        when(mapper.toDTO(nutritionist)).thenReturn(nutritionistDTO);

        NutritionistDTO result = nutritionistService.update(nutritionistId, request);

        assertThat(result).isNotNull();
        assertThat(nutritionist.getFullName()).isEqualTo("Dr. Joao Silva Atualizado");
        assertThat(nutritionist.getPhone()).isEqualTo("11999999999");

        verify(nutritionistRepository).findById(nutritionistId);
        verify(nutritionistRepository).save(nutritionist);
        verify(mapper).toDTO(nutritionist);
    }
}
