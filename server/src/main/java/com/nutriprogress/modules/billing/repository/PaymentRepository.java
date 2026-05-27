package com.nutriprogress.modules.billing.repository;

import com.nutriprogress.modules.billing.entity.Payment;
import com.nutriprogress.modules.billing.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    List<Payment> findByNutritionistIdOrderByCreatedAtDesc(UUID nutritionistId);

    List<Payment> findByNutritionistIdAndStatus(UUID nutritionistId, PaymentStatus status);

    Optional<Payment> findByStripePaymentIntentId(String stripePaymentIntentId);
}
