package com.nutriprogress.modules.analytics.controller;

import com.nutriprogress.modules.analytics.dto.AnalyticsSummaryDTO;
import com.nutriprogress.modules.analytics.dto.BusinessMetricsDTO;
import com.nutriprogress.modules.analytics.dto.DashboardPreferenceDTO;
import com.nutriprogress.modules.analytics.dto.EventTrackDTO;
import com.nutriprogress.modules.analytics.service.AnalyticsService;
import com.nutriprogress.modules.analytics.service.DashboardService;
import com.nutriprogress.modules.analytics.service.MetricsService;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Endpoints de analytics e preferencias de dashboard")
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final DashboardService dashboardService;
    private final MetricsService metricsService;
    private final NutritionistService nutritionistService;

    @PostMapping("/track")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Rastrear Evento", description = "Registra evento de uso do frontend")
    public ResponseEntity<ApiResponse<Void>> track(
            Authentication authentication,
            @Valid @RequestBody EventTrackDTO dto,
            HttpServletRequest request
    ) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        analyticsService.track(nutritionistId, dto, request);
        return ResponseEntity.ok(ApiResponse.<Void>ok(null));
    }

    @GetMapping("/summary")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Resumo Analytics", description = "Metricas de uso dos ultimos 30 dias")
    public ResponseEntity<ApiResponse<AnalyticsSummaryDTO>> getSummary(Authentication authentication) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        AnalyticsSummaryDTO summary = analyticsService.getSummary(nutritionistId);
        return ResponseEntity.ok(ApiResponse.ok(summary));
    }

    @GetMapping("/dashboard/preferences")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Preferencias", description = "Retorna preferencias do dashboard")
    public ResponseEntity<ApiResponse<DashboardPreferenceDTO>> getDashboardPreferences(
            Authentication authentication
    ) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        DashboardPreferenceDTO preferences = dashboardService.getPreferences(nutritionistId);
        return ResponseEntity.ok(ApiResponse.ok(preferences));
    }

    @PutMapping("/dashboard/preferences")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Salvar Preferencias", description = "Salva preferencias do dashboard")
    public ResponseEntity<ApiResponse<DashboardPreferenceDTO>> saveDashboardPreferences(
            Authentication authentication,
            @RequestBody DashboardPreferenceDTO dto
    ) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        DashboardPreferenceDTO saved = dashboardService.savePreferences(nutritionistId, dto);
        return ResponseEntity.ok(ApiResponse.ok(saved, "Preferencias salvas com sucesso"));
    }

    @GetMapping("/business")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Metricas de Negocio", description = "MRR, distribuicao de planos e serie historica")
    public ResponseEntity<ApiResponse<BusinessMetricsDTO>> getBusinessMetrics() {
        BusinessMetricsDTO metrics = metricsService.getBusinessMetrics();
        return ResponseEntity.ok(ApiResponse.ok(metrics));
    }

    private UUID resolveNutritionistId(Authentication authentication) {
        return nutritionistService.findByUserEmail(authentication.getName()).id();
    }
}
