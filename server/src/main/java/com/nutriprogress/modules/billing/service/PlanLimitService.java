package com.nutriprogress.modules.billing.service;

import com.nutriprogress.modules.billing.dto.PlanLimitsDTO;
import com.nutriprogress.modules.nutritionist.entity.SubscriptionPlan;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlanLimitService {

    private final PatientRepository patientRepository;

    public PlanLimitsDTO getLimits(UUID nutritionistId, SubscriptionPlan plan) {
        long currentPatients = patientRepository
                .countByNutritionistIdAndIsActive(nutritionistId, true);

        int maxPatients = getMaxPatients(plan);
        long remaining  = maxPatients == -1 ? -1L : Math.max(0, maxPatients - currentPatients);

        return PlanLimitsDTO.builder()
                .planName(plan.name())
                .maxPatients(maxPatients)
                .unlimitedPatients(maxPatients == -1)
                .advancedCharts(plan.ordinal() >= SubscriptionPlan.PRO.ordinal())
                .exportPdf(plan.ordinal() >= SubscriptionPlan.STARTER.ordinal())
                .customDashboard(plan.ordinal() >= SubscriptionPlan.PRO.ordinal())
                .multiUser(plan == SubscriptionPlan.PREMIUM)
                .prioritySupport(plan == SubscriptionPlan.PREMIUM)
                .currentPatients(currentPatients)
                .remainingPatients(remaining)
                .build();
    }

    public boolean canAddPatient(UUID nutritionistId, SubscriptionPlan plan) {
        int maxPatients = getMaxPatients(plan);
        if (maxPatients == -1) return true;
        long currentPatients = patientRepository
                .countByNutritionistIdAndIsActive(nutritionistId, true);
        return currentPatients < maxPatients;
    }

    public boolean hasFeature(SubscriptionPlan plan, String feature) {
        return switch (feature) {
            case "EXPORT_PDF"       -> plan.ordinal() >= SubscriptionPlan.STARTER.ordinal();
            case "ADVANCED_CHARTS"  -> plan.ordinal() >= SubscriptionPlan.PRO.ordinal();
            case "CUSTOM_DASHBOARD" -> plan.ordinal() >= SubscriptionPlan.PRO.ordinal();
            case "MULTI_USER"       -> plan == SubscriptionPlan.PREMIUM;
            case "PRIORITY_SUPPORT" -> plan == SubscriptionPlan.PREMIUM;
            default                 -> false;
        };
    }

    public int getMaxPatients(SubscriptionPlan plan) {
        return switch (plan) {
            case FREE    -> 5;
            case STARTER -> 20;
            case PRO     -> 50;
            case PREMIUM -> -1;
        };
    }
}
