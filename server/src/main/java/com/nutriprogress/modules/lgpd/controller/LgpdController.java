package com.nutriprogress.modules.lgpd.controller;

import com.nutriprogress.modules.lgpd.dto.AnonymizationRequestDTO;
import com.nutriprogress.modules.lgpd.dto.DataExportDTO;
import com.nutriprogress.modules.lgpd.service.LgpdService;
import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/lgpd")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "LGPD", description = "Endpoints de conformidade com a LGPD")
public class LgpdController {

    private final LgpdService lgpdService;
    private final NutritionistService nutritionistService;

    @GetMapping("/export")
    @Operation(summary = "Exportar Dados", description = "Exporta todos os dados pessoais (LGPD Art. 15)")
    public ResponseEntity<ApiResponse<DataExportDTO>> exportData(Authentication authentication) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        DataExportDTO export = lgpdService.exportPersonalData(nutritionistId);
        return ResponseEntity.ok(ApiResponse.ok(export));
    }

    @PostMapping("/anonymize-patient")
    @Operation(summary = "Anonimizar Paciente", description = "Anonimiza ou exclui dados de paciente (LGPD Art. 18)")
    public ResponseEntity<ApiResponse<Void>> anonymizePatient(
            Authentication authentication,
            @Valid @RequestBody AnonymizationRequestDTO request
    ) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        lgpdService.anonymizePatient(nutritionistId, request.getPatientId(), request.getPermanentDelete());

        String message = Boolean.TRUE.equals(request.getPermanentDelete())
                ? "Dados do paciente removidos permanentemente"
                : "Dados do paciente anonimizados com sucesso";

        return ResponseEntity.ok(ApiResponse.ok(null, message));
    }

    @DeleteMapping("/account")
    @Operation(summary = "Excluir Conta", description = "Solicita exclusao permanente da conta (LGPD Art. 18, VI)")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(Authentication authentication) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        lgpdService.requestAccountDeletion(nutritionistId);
        return ResponseEntity.ok(ApiResponse.ok(null, "Conta marcada para exclusao"));
    }

    // Padrao do projeto: authentication.getName() retorna email, resolucao via findByUserEmail
    private UUID resolveNutritionistId(Authentication authentication) {
        NutritionistDTO nutritionist = nutritionistService.findByUserEmail(authentication.getName());
        return nutritionist.id();
    }
}
