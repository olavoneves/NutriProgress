package br.com.api.server.nutritionist.controller;

import br.com.api.server.nutritionist.domain.dto.NutritionistData;
import br.com.api.server.nutritionist.domain.dto.RegistrationNutritionistData;
import br.com.api.server.nutritionist.domain.dto.UpdateNutritionistData;
import br.com.api.server.nutritionist.domain.model.Nutritionist;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/nutritionists")
public class NutritionistController {

    // Adicionar logica para ser criada junto com usuário
    @PostMapping
    public ResponseEntity<NutritionistData> registerNutritionist(@Valid @RequestBody RegistrationNutritionistData data, UriComponentsBuilder uriBuilder) {

    }

    @PutMapping("/me")
    public ResponseEntity<NutritionistData> updateNutritionist(@AuthenticationPrincipal Nutritionist nutritionist, @Valid @RequestBody UpdateNutritionistData data) {

    }

    @PatchMapping("/me/status")
    public ResponseEntity<Void> softDelete(@AuthenticationPrincipal Nutritionist nutritionist) {

    }
}
