package com.nutriprogress.modules.analytics.repository;

import com.nutriprogress.modules.analytics.document.AnalyticsEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AnalyticsEventRepository extends MongoRepository<AnalyticsEvent, String> {

    List<AnalyticsEvent> findByNutritionistIdOrderByTimestampDesc(UUID nutritionistId);

    List<AnalyticsEvent> findByNutritionistIdAndEventType(UUID nutritionistId, String eventType);

    List<AnalyticsEvent> findByNutritionistIdAndTimestampBetween(
            UUID nutritionistId,
            LocalDateTime start,
            LocalDateTime end
    );

    long countByEventTypeAndTimestampBetween(String eventType, LocalDateTime start, LocalDateTime end);

    long countByNutritionistIdAndEventTypeAndTimestampBetween(
            UUID nutritionistId,
            String eventType,
            LocalDateTime start,
            LocalDateTime end
    );
}
