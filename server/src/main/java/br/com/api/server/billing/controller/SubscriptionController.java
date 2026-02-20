package br.com.api.server.billing.controller;

import br.com.api.server.billing.domain.dto.CreateSubscriptionData;
import br.com.api.server.billing.domain.dto.SubscriptionData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/billing/subscriptions")
public class SubscriptionController {

    @PostMapping
    public ResponseEntity<SubscriptionData> createSubscription(@Valid @RequestBody CreateSubscriptionData data) {

    }

    @GetMapping("/me")
    public ResponseEntity<SubscriptionData> findNutritionistSubscription() {

    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelSubscription(@PathVariable UUID id) {

    }

    @PatchMapping("/{id}/renew")
    public ResponseEntity<Void> renewSubscription(@PathVariable UUID id) {

    }
}
