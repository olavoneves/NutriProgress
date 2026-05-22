package com.nutriprogress.modules.evaluation.repository;

import com.nutriprogress.modules.evaluation.entity.Evaluation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, UUID> {

    Page<Evaluation> findByPatientIdOrderByEvaluationDateDesc(UUID patientId, Pageable pageable);
}
