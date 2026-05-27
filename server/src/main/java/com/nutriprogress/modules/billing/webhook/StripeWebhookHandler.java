package com.nutriprogress.modules.billing.webhook;

import com.nutriprogress.modules.billing.service.BillingService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.Invoice;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
@RequiredArgsConstructor
public class StripeWebhookHandler {

    private final BillingService billingService;

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    public void handleEvent(String payload, String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            log.error("Assinatura do webhook invalida: {}", e.getMessage());
            throw new RuntimeException("Webhook signature verification failed", e);
        }

        log.info("Processando webhook Stripe: {}", event.getType());

        switch (event.getType()) {
            case "checkout.session.completed"    -> handleCheckoutCompleted(event);
            case "invoice.payment_succeeded"     -> handleInvoicePaymentSucceeded(event);
            case "customer.subscription.deleted" -> handleSubscriptionDeleted(event);
            case "customer.subscription.updated" -> log.info("Subscription atualizada no Stripe");
            default -> log.debug("Evento Stripe nao tratado: {}", event.getType());
        }
    }

    private void handleCheckoutCompleted(Event event) {
        try {
            EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
            if (deserializer.getObject().isEmpty()) return;

            Session session = (Session) deserializer.getObject().get();
            String customerId     = session.getCustomer();
            String subscriptionId = session.getSubscription();
            String planName       = session.getMetadata().get("plan");

            com.stripe.model.Subscription stripeSubscription =
                    com.stripe.model.Subscription.retrieve(subscriptionId);

            billingService.activateSubscription(
                    customerId,
                    subscriptionId,
                    planName,
                    stripeSubscription.getCurrentPeriodStart(),
                    stripeSubscription.getCurrentPeriodEnd(),
                    BigDecimal.valueOf(session.getAmountTotal()).movePointLeft(2)
            );

        } catch (Exception e) {
            log.error("Erro ao processar checkout.session.completed: {}", e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    private void handleInvoicePaymentSucceeded(Event event) {
        try {
            EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
            if (deserializer.getObject().isEmpty()) return;

            Invoice invoice = (Invoice) deserializer.getObject().get();
            String subscriptionId = invoice.getSubscription();
            String customerId     = invoice.getCustomer();

            // Obtém o plano do nosso banco para evitar depender de metadata da Stripe
            String planName = billingService.findPlanByStripeSubscriptionId(subscriptionId);

            com.stripe.model.Subscription stripeSubscription =
                    com.stripe.model.Subscription.retrieve(subscriptionId);

            log.info("Pagamento de invoice recebido para subscription: {}", subscriptionId);

            billingService.activateSubscription(
                    customerId,
                    subscriptionId,
                    planName,
                    stripeSubscription.getCurrentPeriodStart(),
                    stripeSubscription.getCurrentPeriodEnd(),
                    BigDecimal.valueOf(invoice.getAmountPaid()).movePointLeft(2)
            );

        } catch (Exception e) {
            log.error("Erro ao processar invoice.payment_succeeded: {}", e.getMessage(), e);
        }
    }

    private void handleSubscriptionDeleted(Event event) {
        try {
            EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
            if (deserializer.getObject().isEmpty()) return;

            com.stripe.model.Subscription subscription =
                    (com.stripe.model.Subscription) deserializer.getObject().get();

            log.info("Subscription deletada no Stripe: {}", subscription.getId());

        } catch (Exception e) {
            log.error("Erro ao processar customer.subscription.deleted: {}", e.getMessage(), e);
        }
    }
}
