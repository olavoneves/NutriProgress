package br.com.api.server.billing.controller;

import br.com.api.server.billing.domain.dto.CreatePlanData;
import br.com.api.server.billing.domain.dto.PlanData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing/plans")
public class PlanController {

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PlanData> createPlan(@Valid @RequestBody CreatePlanData data) {

    }

    @GetMapping
    public ResponseEntity<List<PlanData>> findPlans() {

    }
}
