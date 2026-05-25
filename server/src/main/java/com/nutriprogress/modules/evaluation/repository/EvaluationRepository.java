package com.nutriprogress.modules.evaluation.repository;

import com.nutriprogress.modules.evaluation.entity.Evaluation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, UUID> {

    Page<Evaluation> findByPatientIdOrderByEvaluationDateDesc(UUID patientId, Pageable pageable);

    List<Evaluation> findByPatientIdOrderByEvaluationDateDesc(UUID patientId);

    List<Evaluation> findByPatientIdOrderByEvaluationDateAsc(UUID patientId);

    long countByPatientId(UUID patientId);

    long countByNutritionistId(UUID nutritionistId);

    long countByNutritionistIdAndCreatedAtAfter(UUID nutritionistId, LocalDateTime date);

    @Query("SELECT e FROM Evaluation e WHERE e.id = :id AND e.nutritionist.id = :nutritionistId")
    Optional<Evaluation> findByIdAndNutritionistId(UUID id, UUID nutritionistId);

    @Query("SELECT e FROM Evaluation e WHERE e.patient.id = :patientId " +
           "AND e.nutritionist.id = :nutritionistId " +
           "ORDER BY e.evaluationDate DESC")
    List<Evaluation> findByPatientIdAndNutritionistId(UUID patientId, UUID nutritionistId);

    Optional<Evaluation> findFirstByPatientIdOrderByEvaluationDateDescEvaluationNumberDesc(UUID patientId);

    Optional<Evaluation> findFirstByPatientIdOrderByEvaluationDateAscEvaluationNumberAsc(UUID patientId);

    @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END " +
           "FROM Evaluation e WHERE e.id = :id AND e.nutritionist.id = :nutritionistId")
    boolean existsByIdAndNutritionistId(UUID id, UUID nutritionistId);
}
