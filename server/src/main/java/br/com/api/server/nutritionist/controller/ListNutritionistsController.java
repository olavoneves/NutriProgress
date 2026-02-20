package br.com.api.server.nutritionist.controller;

import br.com.api.server.nutritionist.domain.dto.NutritionistData;
import br.com.api.server.nutritionist.domain.model.Nutritionist;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/nutritionists")
public class ListNutritionistsController {

    @GetMapping("/me")
    public ResponseEntity<NutritionistData> findNutritionistPrincipal(@AuthenticationPrincipal Nutritionist nutritionist) {

    }

    @GetMapping
    public ResponseEntity<List<NutritionistData>> findAllNutritionist() {

    }
}
