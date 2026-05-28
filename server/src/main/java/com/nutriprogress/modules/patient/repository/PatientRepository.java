package com.nutriprogress.modules.patient.repository;

import com.nutriprogress.modules.patient.entity.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID>, JpaSpecificationExecutor<Patient> {

    Optional<Patient> findByIdAndNutritionistId(UUID id, UUID nutritionistId);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    Page<Patient> findByNutritionistId(UUID nutritionistId, Pageable pageable);

    Page<Patient> findByNutritionistIdAndIsActive(UUID nutritionistId, Boolean isActive, Pageable pageable);

    long countByNutritionistId(UUID nutritionistId);

    long countByNutritionistIdAndIsActive(UUID nutritionistId, Boolean isActive);

    boolean existsByIdAndNutritionistId(UUID id, UUID nutritionistId);
}
