package br.com.api.server.billing.controller;

import br.com.api.server.billing.domain.dto.CreatePaymentData;
import br.com.api.server.billing.domain.dto.PaymentData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing/payments")
public class PaymentController {

    @PostMapping
    public ResponseEntity<PaymentData> createPayment(@Valid @RequestBody CreatePaymentData data) {

    }

    @GetMapping("/subscription/{subscriptionId}")
    public ResponseEntity<List<PaymentData>> listPaymentsBySubscription() {

    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhookGateway() {

    }
}
