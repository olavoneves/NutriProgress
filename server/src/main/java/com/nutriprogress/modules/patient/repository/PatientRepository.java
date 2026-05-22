package com.nutriprogress.modules.patient.repository;

import com.nutriprogress.modules.patient.entity.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {

    Page<Patient> findByNutritionistIdAndIsActive(UUID nutritionistId, Boolean isActive, Pageable pageable);
}
