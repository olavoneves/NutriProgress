package com.nutriprogress.modules.billing.repository;

import com.nutriprogress.modules.billing.entity.Subscription;
import com.nutriprogress.modules.billing.entity.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {

    Optional<Subscription> findByNutritionistIdAndStatus(UUID nutritionistId, SubscriptionStatus status);

    Optional<Subscription> findByStripeSubscriptionId(String stripeSubscriptionId);

    List<Subscription> findByNutritionistId(UUID nutritionistId);

    List<Subscription> findByStripeCustomerId(String stripeCustomerId);
}
