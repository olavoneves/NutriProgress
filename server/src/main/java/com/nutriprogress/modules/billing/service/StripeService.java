package com.nutriprogress.modules.billing.service;

import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class StripeService {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @Value("${stripe.price.starter:#{null}}")
    private String starterPriceId;

    @Value("${stripe.price.pro:#{null}}")
    private String proPriceId;

    @Value("${stripe.price.premium:#{null}}")
    private String premiumPriceId;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public String createCustomer(String email, String name) throws StripeException {
        log.info("Criando customer Stripe para: {}", email);
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(email)
                .setName(name)
                .build();
        Customer customer = Customer.create(params);
        log.info("Customer Stripe criado: {}", customer.getId());
        return customer.getId();
    }

    public Session createCheckoutSession(
            String customerId,
            SubscriptionPlan plan,
            String successUrl,
            String cancelUrl
    ) throws StripeException {
        log.info("Criando checkout session para plano: {}", plan);

        String priceId = resolvePriceId(plan);
        if (priceId == null) {
            throw new IllegalArgumentException("Price ID nao configurado para plano: " + plan);
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setCustomer(customerId)
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build()
                )
                .putMetadata("plan", plan.name())
                .build();

        Session session = Session.create(params);
        log.info("Checkout session criada: {}", session.getId());
        return session;
    }

    public void cancelSubscription(String stripeSubscriptionId) throws StripeException {
        log.info("Cancelando subscription Stripe: {}", stripeSubscriptionId);
        com.stripe.model.Subscription subscription =
                com.stripe.model.Subscription.retrieve(stripeSubscriptionId);
        com.stripe.param.SubscriptionUpdateParams params =
                com.stripe.param.SubscriptionUpdateParams.builder()
                        .setCancelAtPeriodEnd(true)
                        .build();
        subscription.update(params);
        log.info("Subscription cancelada ao fim do periodo: {}", stripeSubscriptionId);
    }

    public Map<String, Object> getPlanPrices() {
        Map<String, Object> prices = new HashMap<>();
        prices.put("STARTER", Map.of("amount", 2900, "currency", "BRL", "interval", "month"));
        prices.put("PRO",     Map.of("amount", 4900, "currency", "BRL", "interval", "month"));
        prices.put("PREMIUM", Map.of("amount", 9900, "currency", "BRL", "interval", "month"));
        return prices;
    }

    private String resolvePriceId(SubscriptionPlan plan) {
        return switch (plan) {
            case STARTER -> starterPriceId;
            case PRO     -> proPriceId;
            case PREMIUM -> premiumPriceId;
            default      -> null;
        };
    }
}
