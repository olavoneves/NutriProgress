package com.nutriprogress.modules.billing.controller;

import com.nutriprogress.modules.billing.dto.CheckoutResponseDTO;
import com.nutriprogress.modules.billing.dto.CreateCheckoutRequest;
import com.nutriprogress.modules.billing.dto.SubscriptionDTO;
import com.nutriprogress.modules.billing.service.BillingService;
import com.nutriprogress.modules.billing.webhook.StripeWebhookHandler;
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
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
@Tag(name = "Billing", description = "Endpoints de cobranca e assinaturas")
public class BillingController {

    private final BillingService billingService;
    private final NutritionistService nutritionistService;
    private final StripeWebhookHandler stripeWebhookHandler;

    @GetMapping("/subscription")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Assinatura Atual", description = "Retorna assinatura e limites do plano")
    public ResponseEntity<ApiResponse<SubscriptionDTO>> getCurrentSubscription(
            Authentication authentication
    ) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        SubscriptionDTO subscription = billingService.getCurrentSubscription(nutritionistId);
        return ResponseEntity.ok(ApiResponse.ok(subscription));
    }

    @PostMapping("/checkout")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Criar Checkout", description = "Cria sessao de pagamento Stripe")
    public ResponseEntity<ApiResponse<CheckoutResponseDTO>> createCheckout(
            Authentication authentication,
            @Valid @RequestBody CreateCheckoutRequest request
    ) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        CheckoutResponseDTO response = billingService.createCheckout(nutritionistId, request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/cancel")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Cancelar Assinatura", description = "Cancela assinatura ao fim do periodo")
    public ResponseEntity<ApiResponse<Void>> cancelSubscription(Authentication authentication) {
        UUID nutritionistId = resolveNutritionistId(authentication);
        billingService.cancelSubscription(nutritionistId);
        return ResponseEntity.ok(ApiResponse.ok(null, "Assinatura cancelada ao fim do periodo atual"));
    }

    @PostMapping("/webhook/stripe")
    @Operation(summary = "Stripe Webhook", description = "Recebe eventos do Stripe")
    public ResponseEntity<Void> stripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader
    ) {
        stripeWebhookHandler.handleEvent(payload, sigHeader);
        return ResponseEntity.ok().build();
    }

    private UUID resolveNutritionistId(Authentication authentication) {
        NutritionistDTO nutritionist = nutritionistService.findByUserEmail(authentication.getName());
        return nutritionist.id();
    }
}
