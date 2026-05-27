package com.nutriprogress.modules.patient.controller;

import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.modules.patient.dto.CreatePatientRequest;
import com.nutriprogress.modules.patient.dto.PatientDTO;
import com.nutriprogress.modules.patient.dto.PatientDetailDTO;
import com.nutriprogress.modules.patient.dto.PatientFilterRequest;
import com.nutriprogress.modules.patient.dto.PatientSummaryDTO;
import com.nutriprogress.modules.patient.dto.UpdatePatientRequest;
import com.nutriprogress.modules.patient.service.PatientService;
import com.nutriprogress.shared.dto.ApiResponse;
import com.nutriprogress.shared.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Patients", description = "Endpoints de gerenciamento de pacientes")
public class PatientController {

    private final PatientService patientService;
    private final NutritionistService nutritionistService;

    @PostMapping
    @Operation(summary = "Criar Paciente", description = "Cadastra novo paciente")
    public ResponseEntity<ApiResponse<PatientDTO>> create(
            Authentication authentication,
            @Valid @RequestBody CreatePatientRequest request
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        PatientDTO patient = patientService.create(nutritionistId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(patient, "Paciente cadastrado com sucesso"));
    }

    @GetMapping
    @Operation(summary = "Listar Pacientes", description = "Lista pacientes com filtros e paginacao")
    public ResponseEntity<ApiResponse<PageResponse<PatientSummaryDTO>>> list(
            Authentication authentication,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "fullName") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection
    ) {
        UUID nutritionistId = getNutritionistId(authentication);

        PatientFilterRequest filters = PatientFilterRequest.builder()
                .search(search)
                .isActive(isActive)
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();

        PageResponse<PatientSummaryDTO> patients = patientService.findAll(nutritionistId, filters);
        return ResponseEntity.ok(ApiResponse.ok(patients));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar Paciente", description = "Retorna detalhes completos do paciente")
    public ResponseEntity<ApiResponse<PatientDetailDTO>> getById(
            Authentication authentication,
            @PathVariable UUID id
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        PatientDetailDTO patient = patientService.findById(nutritionistId, id);
        return ResponseEntity.ok(ApiResponse.ok(patient));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar Paciente", description = "Atualiza dados do paciente")
    public ResponseEntity<ApiResponse<PatientDTO>> update(
            Authentication authentication,
            @PathVariable UUID id,
            @Valid @RequestBody UpdatePatientRequest request
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        PatientDTO patient = patientService.update(nutritionistId, id, request);
        return ResponseEntity.ok(ApiResponse.ok(patient, "Paciente atualizado com sucesso"));
    }

    @PatchMapping("/{id}/archive")
    @Operation(summary = "Arquivar Paciente", description = "Arquiva paciente (soft delete)")
    public ResponseEntity<ApiResponse<Void>> archive(
            Authentication authentication,
            @PathVariable UUID id
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        patientService.archive(nutritionistId, id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Paciente arquivado com sucesso"));
    }

    @PatchMapping("/{id}/restore")
    @Operation(summary = "Restaurar Paciente", description = "Restaura paciente arquivado")
    public ResponseEntity<ApiResponse<Void>> restore(
            Authentication authentication,
            @PathVariable UUID id
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        patientService.restore(nutritionistId, id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Paciente restaurado com sucesso"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar Paciente", description = "DELETA PERMANENTEMENTE o paciente e todas avaliacoes")
    public ResponseEntity<ApiResponse<Void>> delete(
            Authentication authentication,
            @PathVariable UUID id
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        patientService.delete(nutritionistId, id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Paciente deletado permanentemente"));
    }

    private UUID getNutritionistId(Authentication authentication) {
        NutritionistDTO nutritionist = nutritionistService.findByUserEmail(authentication.getName());
        return nutritionist.id();
    }
}
