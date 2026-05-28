package com.nutriprogress.modules.analytics.listener;

import com.nutriprogress.config.RabbitMQConfig;
import com.nutriprogress.modules.analytics.service.AnalyticsService;
import com.nutriprogress.modules.analytics.service.MetricsService;
import com.nutriprogress.shared.event.events.EvaluationCreatedEvent;
import com.nutriprogress.shared.event.events.PatientCreatedEvent;
import com.nutriprogress.shared.event.events.SubscriptionChangedEvent;
import com.nutriprogress.shared.event.events.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AnalyticsEventListener {

    private final AnalyticsService analyticsService;
    private final MetricsService metricsService;

    @RabbitListener(queues = RabbitMQConfig.ANALYTICS_USER_QUEUE)
    public void onUserRegistered(UserRegisteredEvent event) {
        log.debug("Analytics: UserRegistered {}", event.getAggregateId());

        analyticsService.track(
                event.getAggregateId(),
                AnalyticsService.EVENT_LOGIN,
                Map.of("trigger", "register")
        );
    }

    @RabbitListener(queues = RabbitMQConfig.ANALYTICS_PATIENT_QUEUE)
    public void onPatientCreated(PatientCreatedEvent event) {
        log.debug("Analytics: PatientCreated {}", event.getAggregateId());

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("patientId",   event.getAggregateId().toString());
        metadata.put("patientName", event.getPatientName());

        analyticsService.track(
                event.getNutritionistId(),
                AnalyticsService.EVENT_PATIENT_CREATED,
                metadata
        );

        metricsService.incrementPatientCreated();
    }

    @RabbitListener(queues = RabbitMQConfig.ANALYTICS_EVALUATION_QUEUE)
    public void onEvaluationCreated(EvaluationCreatedEvent event) {
        log.debug("Analytics: EvaluationCreated {}", event.getAggregateId());

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("evaluationId",     event.getAggregateId().toString());
        metadata.put("patientId",        event.getPatientId().toString());
        metadata.put("evaluationNumber", event.getEvaluationNumber());

        analyticsService.track(
                event.getNutritionistId(),
                AnalyticsService.EVENT_EVALUATION_CREATED,
                metadata
        );

        metricsService.incrementEvaluationCreated();
    }

    @RabbitListener(queues = RabbitMQConfig.ANALYTICS_SUBSCRIPTION_QUEUE)
    public void onSubscriptionChanged(SubscriptionChangedEvent event) {
        log.debug("Analytics: SubscriptionChanged {}", event.getAggregateId());

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("oldPlan", event.getOldPlan());
        metadata.put("newPlan", event.getNewPlan());

        analyticsService.track(
                event.getAggregateId(),
                AnalyticsService.EVENT_PLAN_UPGRADED,
                metadata
        );
    }
}
