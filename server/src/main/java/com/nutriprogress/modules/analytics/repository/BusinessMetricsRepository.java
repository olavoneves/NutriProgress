package com.nutriprogress.modules.analytics.repository;

import com.nutriprogress.modules.analytics.document.BusinessMetrics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessMetricsRepository extends MongoRepository<BusinessMetrics, String> {

    Optional<BusinessMetrics> findByDateAndMetricType(LocalDate date, String metricType);

    List<BusinessMetrics> findByMetricTypeAndDateBetweenOrderByDateDesc(
            String metricType,
            LocalDate start,
            LocalDate end
    );
}
