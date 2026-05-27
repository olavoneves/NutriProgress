package com.nutriprogress.modules.evaluation.controller;

import com.nutriprogress.modules.evaluation.dto.CreateEvaluationRequest;
import com.nutriprogress.modules.evaluation.dto.EvaluationDTO;
import com.nutriprogress.modules.evaluation.dto.EvaluationDetailDTO;
import com.nutriprogress.modules.evaluation.dto.EvolutionDataDTO;
import com.nutriprogress.modules.evaluation.dto.UpdateEvaluationRequest;
import com.nutriprogress.modules.evaluation.service.EvaluationService;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.shared.dto.ApiResponse;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/patients/{patientId}/evaluations")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Evaluations", description = "Endpoints de gerenciamento de avaliacoes corporais")
public class EvaluationController {

    private final EvaluationService evaluationService;
    private final NutritionistService nutritionistService;

    @PostMapping
    @Operation(summary = "Criar Avaliacao", description = "Registra nova avaliacao corporal")
    public ResponseEntity<ApiResponse<EvaluationDTO>> create(
            Authentication authentication,
            @PathVariable UUID patientId,
            @Valid @RequestBody CreateEvaluationRequest request
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        EvaluationDTO evaluation = evaluationService.create(nutritionistId, patientId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(evaluation, "Avaliacao registrada com sucesso"));
    }

    @GetMapping
    @Operation(summary = "Listar Avaliacoes", description = "Lista todas avaliacoes do paciente")
    public ResponseEntity<ApiResponse<List<EvaluationDTO>>> list(
            Authentication authentication,
            @PathVariable UUID patientId
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        List<EvaluationDTO> evaluations = evaluationService.findByPatient(nutritionistId, patientId);
        return ResponseEntity.ok(ApiResponse.ok(evaluations));
    }

    @GetMapping("/{evaluationId}")
    @Operation(summary = "Buscar Avaliacao", description = "Retorna detalhes da avaliacao com diferenca em relacao a anterior")
    public ResponseEntity<ApiResponse<EvaluationDetailDTO>> getById(
            Authentication authentication,
            @PathVariable UUID patientId,
            @PathVariable UUID evaluationId
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        EvaluationDetailDTO evaluation = evaluationService.findById(nutritionistId, evaluationId);
        return ResponseEntity.ok(ApiResponse.ok(evaluation));
    }

    @PutMapping("/{evaluationId}")
    @Operation(summary = "Atualizar Avaliacao", description = "Atualiza dados da avaliacao")
    public ResponseEntity<ApiResponse<EvaluationDTO>> update(
            Authentication authentication,
            @PathVariable UUID patientId,
            @PathVariable UUID evaluationId,
            @Valid @RequestBody UpdateEvaluationRequest request
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        EvaluationDTO evaluation = evaluationService.update(nutritionistId, evaluationId, request);
        return ResponseEntity.ok(ApiResponse.ok(evaluation, "Avaliacao atualizada com sucesso"));
    }

    @DeleteMapping("/{evaluationId}")
    @Operation(summary = "Deletar Avaliacao", description = "Remove avaliacao permanentemente")
    public ResponseEntity<ApiResponse<Void>> delete(
            Authentication authentication,
            @PathVariable UUID patientId,
            @PathVariable UUID evaluationId
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        evaluationService.delete(nutritionistId, evaluationId);
        return ResponseEntity.ok(ApiResponse.ok(null, "Avaliacao deletada com sucesso"));
    }

    @GetMapping("/evolution")
    @Operation(summary = "Dados de Evolucao", description = "Retorna dados de evolucao do paciente para graficos")
    public ResponseEntity<ApiResponse<EvolutionDataDTO>> getEvolution(
            Authentication authentication,
            @PathVariable UUID patientId
    ) {
        UUID nutritionistId = getNutritionistId(authentication);
        EvolutionDataDTO evolution = evaluationService.getEvolutionData(nutritionistId, patientId);
        return ResponseEntity.ok(ApiResponse.ok(evolution));
    }

    private UUID getNutritionistId(Authentication authentication) {
        return nutritionistService.findByUserEmail(authentication.getName()).id();
    }
}
