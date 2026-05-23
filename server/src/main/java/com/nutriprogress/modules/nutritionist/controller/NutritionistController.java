package com.nutriprogress.modules.nutritionist.controller;

import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.dto.NutritionistProfileDTO;
import com.nutriprogress.modules.nutritionist.dto.UpdateNutritionistRequest;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/nutritionists")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Nutritionists", description = "Endpoints de gerenciamento de nutricionistas")
public class NutritionistController {

    private final NutritionistService nutritionistService;

    @GetMapping("/me")
    @Operation(summary = "Meu Perfil", description = "Retorna perfil completo da nutricionista logada")
    public ResponseEntity<ApiResponse<NutritionistProfileDTO>> getMyProfile(Authentication authentication) {
        NutritionistDTO nutritionist = nutritionistService.findByUserEmail(authentication.getName());
        NutritionistProfileDTO profile = nutritionistService.getProfile(nutritionist.id());
        return ResponseEntity.ok(ApiResponse.ok(profile));
    }

    @PutMapping("/me")
    @Operation(summary = "Atualizar Perfil", description = "Atualiza dados da nutricionista logada")
    public ResponseEntity<ApiResponse<NutritionistDTO>> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateNutritionistRequest request
    ) {
        NutritionistDTO nutritionist = nutritionistService.findByUserEmail(authentication.getName());
        NutritionistDTO updated = nutritionistService.update(nutritionist.id(), request);
        return ResponseEntity.ok(ApiResponse.ok(updated, "Perfil atualizado com sucesso"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Buscar por ID", description = "Retorna nutricionista por ID (apenas admin)")
    public ResponseEntity<ApiResponse<NutritionistDTO>> getById(@PathVariable UUID id) {
        NutritionistDTO nutritionist = nutritionistService.findById(id);
        return ResponseEntity.ok(ApiResponse.ok(nutritionist));
    }
}
