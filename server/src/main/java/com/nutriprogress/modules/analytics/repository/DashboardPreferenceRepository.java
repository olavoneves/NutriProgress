package com.nutriprogress.modules.analytics.repository;

import com.nutriprogress.modules.analytics.document.DashboardPreference;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DashboardPreferenceRepository extends MongoRepository<DashboardPreference, String> {

    Optional<DashboardPreference> findByNutritionistId(UUID nutritionistId);
}
