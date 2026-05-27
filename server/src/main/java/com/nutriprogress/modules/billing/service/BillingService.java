package com.nutriprogress.modules.billing.service;

import com.nutriprogress.modules.billing.dto.CheckoutResponseDTO;
import com.nutriprogress.modules.billing.dto.CreateCheckoutRequest;
import com.nutriprogress.modules.billing.dto.PlanLimitsDTO;
import com.nutriprogress.modules.billing.dto.SubscriptionDTO;
import com.nutriprogress.modules.billing.entity.Payment;
import com.nutriprogress.modules.billing.entity.PaymentStatus;
import com.nutriprogress.modules.billing.entity.Subscription;
import com.nutriprogress.modules.billing.entity.SubscriptionStatus;
import com.nutriprogress.modules.billing.exception.BillingException;
import com.nutriprogress.modules.billing.mapper.SubscriptionMapper;
import com.nutriprogress.modules.billing.repository.PaymentRepository;
import com.nutriprogress.modules.billing.repository.SubscriptionRepository;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import com.nutriprogress.modules.nutritionist.exception.NutritionistNotFoundException;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.shared.event.EventPublisher;
import com.nutriprogress.shared.event.events.SubscriptionChangedEvent;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class BillingService {

    private final SubscriptionRepository subscriptionRepository;
    private final PaymentRepository paymentRepository;
    private final NutritionistRepository nutritionistRepository;
    private final StripeService stripeService;
    private final PlanLimitService planLimitService;
    private final SubscriptionMapper subscriptionMapper;
    private final EventPublisher eventPublisher;

    @Value("${app.url:http://localhost:3000}")
    private String appUrl;

    @Transactional
    public CheckoutResponseDTO createCheckout(UUID nutritionistId, CreateCheckoutRequest request) {
        log.info("Criando checkout para nutricionista {} plano {}", nutritionistId, request.getPlan());

        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        if (request.getPlan() == SubscriptionPlan.FREE) {
            throw new BillingException("Para cancelar a assinatura use o endpoint de cancelamento");
        }

        try {
            String customerId = getOrCreateStripeCustomer(nutritionist);

            String successUrl = request.getSuccessUrl() != null
                    ? request.getSuccessUrl()
                    : appUrl + "/billing/success";
            String cancelUrl = request.getCancelUrl() != null
                    ? request.getCancelUrl()
                    : appUrl + "/billing/cancel";

            Session session = stripeService.createCheckoutSession(
                    customerId, request.getPlan(), successUrl, cancelUrl);

            return CheckoutResponseDTO.builder()
                    .checkoutUrl(session.getUrl())
                    .sessionId(session.getId())
                    .build();

        } catch (BillingException e) {
            throw e;
        } catch (Exception e) {
            log.error("Erro ao criar checkout: {}", e.getMessage(), e);
            throw new BillingException("Erro ao criar sessao de pagamento: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void activateSubscription(
            String stripeCustomerId,
            String stripeSubscriptionId,
            String planName,
            Long periodStart,
            Long periodEnd,
            BigDecimal amount
    ) {
        log.info("Ativando subscription {} para customer {}", stripeSubscriptionId, stripeCustomerId);

        Nutritionist nutritionist = findNutritionistByStripeCustomerId(stripeCustomerId);
        SubscriptionPlan newPlan = SubscriptionPlan.valueOf(planName.toUpperCase());
        SubscriptionPlan oldPlan = nutritionist.getSubscriptionPlan();

        LocalDateTime periodStartDt = LocalDateTime.ofEpochSecond(periodStart, 0, ZoneOffset.UTC);
        LocalDateTime periodEndDt   = LocalDateTime.ofEpochSecond(periodEnd, 0, ZoneOffset.UTC);

        // Se já existe subscription com esse stripeSubscriptionId, atualiza (renovação)
        Optional<Subscription> existing = subscriptionRepository.findByStripeSubscriptionId(stripeSubscriptionId);
        if (existing.isPresent()) {
            Subscription subscription = existing.get();
            subscription.setStatus(SubscriptionStatus.ACTIVE);
            subscription.setPlan(newPlan);
            subscription.setCurrentPeriodStart(periodStartDt);
            subscription.setCurrentPeriodEnd(periodEndDt);
            subscription.setAmount(amount);
            subscriptionRepository.save(subscription);
            log.info("Subscription renovada: {}", stripeSubscriptionId);
        } else {
            // Nova subscription — cancela qualquer ativa anterior
            subscriptionRepository
                    .findByNutritionistIdAndStatus(nutritionist.getId(), SubscriptionStatus.ACTIVE)
                    .ifPresent(s -> {
                        s.setStatus(SubscriptionStatus.CANCELED);
                        s.setCanceledAt(LocalDateTime.now());
                        subscriptionRepository.save(s);
                    });

            Subscription subscription = new Subscription();
            subscription.setNutritionist(nutritionist);
            subscription.setPlan(newPlan);
            subscription.setStatus(SubscriptionStatus.ACTIVE);
            subscription.setAmount(amount);
            subscription.setPaymentMethod("STRIPE");
            subscription.setStripeSubscriptionId(stripeSubscriptionId);
            subscription.setStripeCustomerId(stripeCustomerId);
            subscription.setCurrentPeriodStart(periodStartDt);
            subscription.setCurrentPeriodEnd(periodEndDt);
            subscriptionRepository.save(subscription);
        }

        // Atualiza plano e expiração na entidade nutritionist
        nutritionist.setSubscriptionPlan(newPlan);
        nutritionist.setSubscriptionExpiresAt(periodEndDt);
        nutritionistRepository.save(nutritionist);

        log.info("Subscription ativada: {} -> plano {}", nutritionist.getUser().getEmail(), newPlan);

        if (oldPlan != newPlan) {
            publishSubscriptionChangedEvent(nutritionist, oldPlan, newPlan);
        }
    }

    @Transactional
    public void cancelSubscription(UUID nutritionistId) {
        log.info("Cancelando subscription da nutricionista: {}", nutritionistId);

        Subscription subscription = subscriptionRepository
                .findByNutritionistIdAndStatus(nutritionistId, SubscriptionStatus.ACTIVE)
                .orElseThrow(() -> new BillingException("Nenhuma assinatura ativa encontrada"));

        try {
            if (subscription.getStripeSubscriptionId() != null) {
                stripeService.cancelSubscription(subscription.getStripeSubscriptionId());
            }
            subscription.setStatus(SubscriptionStatus.CANCELED);
            subscription.setCanceledAt(LocalDateTime.now());
            subscriptionRepository.save(subscription);
            log.info("Subscription cancelada: {}", subscription.getId());

        } catch (BillingException e) {
            throw e;
        } catch (Exception e) {
            log.error("Erro ao cancelar subscription: {}", e.getMessage(), e);
            throw new BillingException("Erro ao cancelar assinatura: " + e.getMessage(), e);
        }
    }

    @Transactional(readOnly = true)
    public SubscriptionDTO getCurrentSubscription(UUID nutritionistId) {
        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        PlanLimitsDTO limits = planLimitService.getLimits(
                nutritionistId, nutritionist.getSubscriptionPlan());

        return subscriptionRepository
                .findByNutritionistIdAndStatus(nutritionistId, SubscriptionStatus.ACTIVE)
                .map(s -> subscriptionMapper.toDTO(s, limits))
                .orElseGet(() -> buildFreeSubscriptionDTO(nutritionist, limits));
    }

    @Transactional(readOnly = true)
    public List<Payment> getPaymentHistory(UUID nutritionistId) {
        return paymentRepository.findByNutritionistIdOrderByCreatedAtDesc(nutritionistId);
    }

    @Transactional
    public void recordPayment(UUID nutritionistId, BigDecimal amount,
                              String paymentIntentId, String invoiceId) {
        log.info("Registrando pagamento para nutricionista: {}", nutritionistId);

        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        Payment payment = new Payment();
        payment.setNutritionist(nutritionist);
        payment.setSubscription(
                subscriptionRepository
                        .findByNutritionistIdAndStatus(nutritionistId, SubscriptionStatus.ACTIVE)
                        .orElse(null)
        );
        payment.setAmount(amount);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentMethod("STRIPE");
        payment.setStripePaymentIntentId(paymentIntentId);
        payment.setStripeInvoiceId(invoiceId);
        payment.setPaidAt(LocalDateTime.now());

        paymentRepository.save(payment);
        log.info("Pagamento registrado: {}", payment.getId());
    }

    // Retorna o nome do plano de uma subscription pelo stripeSubscriptionId (usado pelo webhook)
    @Transactional(readOnly = true)
    public String findPlanByStripeSubscriptionId(String stripeSubscriptionId) {
        return subscriptionRepository.findByStripeSubscriptionId(stripeSubscriptionId)
                .map(s -> s.getPlan().name())
                .orElse("STARTER");
    }

    // ========================================================================
    // PRIVATE HELPERS
    // ========================================================================

    private String getOrCreateStripeCustomer(Nutritionist nutritionist) throws Exception {
        Optional<String> existingCustomerId = subscriptionRepository
                .findByNutritionistId(nutritionist.getId())
                .stream()
                .filter(s -> s.getStripeCustomerId() != null)
                .map(Subscription::getStripeCustomerId)
                .findFirst();

        if (existingCustomerId.isPresent()) {
            return existingCustomerId.get();
        }
        return stripeService.createCustomer(
                nutritionist.getUser().getEmail(),
                nutritionist.getFullName()
        );
    }

    private Nutritionist findNutritionistByStripeCustomerId(String customerId) {
        return subscriptionRepository.findByStripeCustomerId(customerId)
                .stream()
                .findFirst()
                .map(Subscription::getNutritionist)
                .orElseThrow(() -> new BillingException(
                        "Nutricionista nao encontrada para customer: " + customerId
                ));
    }

    private SubscriptionDTO buildFreeSubscriptionDTO(Nutritionist nutritionist, PlanLimitsDTO limits) {
        return SubscriptionDTO.builder()
                .nutritionistId(nutritionist.getId())
                .plan(SubscriptionPlan.FREE)
                .status(SubscriptionStatus.ACTIVE)
                .isActive(true)
                .limits(limits)
                .build();
    }

    private void publishSubscriptionChangedEvent(Nutritionist nutritionist,
                                                  SubscriptionPlan oldPlan,
                                                  SubscriptionPlan newPlan) {
        SubscriptionChangedEvent event = SubscriptionChangedEvent.builder()
                .eventId(UUID.randomUUID())
                .occurredAt(LocalDateTime.now())
                .aggregateId(nutritionist.getId())
                .nutritionistEmail(nutritionist.getUser().getEmail())
                .nutritionistName(nutritionist.getFullName())
                .oldPlan(oldPlan != null ? oldPlan.name() : "FREE")
                .newPlan(newPlan.name())
                .build();
        eventPublisher.publish(event);
    }
}
