package com.nutriprogress.modules.patient.mapper;

import com.nutriprogress.modules.evaluation.entity.Evaluation;
import com.nutriprogress.modules.patient.dto.PatientDTO;
import com.nutriprogress.modules.patient.dto.PatientDetailDTO;
import com.nutriprogress.modules.patient.dto.PatientSummaryDTO;
import com.nutriprogress.modules.patient.entity.Patient;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class PatientMapper {

    public PatientDTO toDTO(Patient patient) {
        return PatientDTO.builder()
                .id(patient.getId())
                .nutritionistId(patient.getNutritionist().getId())
                .fullName(patient.getFullName())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .birthDate(patient.getBirthDate())
                .age(calculateAge(patient.getBirthDate()))
                .gender(patient.getGender())
                .height(patient.getHeight())
                .goal(patient.getGoal())
                .notes(patient.getNotes())
                .isActive(patient.getIsActive())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }

    public PatientSummaryDTO toSummaryDTO(Patient patient, Evaluation lastEvaluation, Integer totalEvaluations) {
        return PatientSummaryDTO.builder()
                .id(patient.getId())
                .fullName(patient.getFullName())
                .phone(patient.getPhone())
                .age(calculateAge(patient.getBirthDate()))
                .isActive(patient.getIsActive())
                .lastEvaluationDate(lastEvaluation != null ? lastEvaluation.getEvaluationDate() : null)
                .currentWeight(lastEvaluation != null ? lastEvaluation.getWeight() : null)
                .totalEvaluations(totalEvaluations)
                .build();
    }

    public PatientDetailDTO toDetailDTO(Patient patient, Evaluation lastEvaluation, List<Evaluation> allEvaluations) {
        PatientDetailDTO.LastEvaluationSummary lastEvalSummary = null;
        if (lastEvaluation != null) {
            lastEvalSummary = PatientDetailDTO.LastEvaluationSummary.builder()
                    .evaluationId(lastEvaluation.getId())
                    .evaluationDate(lastEvaluation.getEvaluationDate())
                    .evaluationNumber(lastEvaluation.getEvaluationNumber())
                    .weight(lastEvaluation.getWeight())
                    .bmi(lastEvaluation.getBmi())
                    .bodyFatPercentage(lastEvaluation.getBodyFatPercentage())
                    .build();
        }

        return PatientDetailDTO.builder()
                .id(patient.getId())
                .nutritionistId(patient.getNutritionist().getId())
                .fullName(patient.getFullName())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .birthDate(patient.getBirthDate())
                .age(calculateAge(patient.getBirthDate()))
                .gender(patient.getGender())
                .height(patient.getHeight())
                .goal(patient.getGoal())
                .notes(patient.getNotes())
                .isActive(patient.getIsActive())
                .lastEvaluation(lastEvalSummary)
                .stats(buildStats(allEvaluations))
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }

    private Integer calculateAge(LocalDate birthDate) {
        if (birthDate == null) {
            return null;
        }
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    private PatientDetailDTO.PatientStats buildStats(List<Evaluation> evaluations) {
        if (evaluations == null || evaluations.isEmpty()) {
            return PatientDetailDTO.PatientStats.builder()
                    .totalEvaluations(0L)
                    .build();
        }

        // Avaliações ordenadas DESC: primeiro = mais recente, último = mais antigo
        Evaluation mostRecent = evaluations.get(0);
        Evaluation oldest = evaluations.get(evaluations.size() - 1);

        Integer daysSinceLast = null;
        if (mostRecent.getEvaluationDate() != null) {
            daysSinceLast = (int) ChronoUnit.DAYS.between(mostRecent.getEvaluationDate(), LocalDate.now());
        }

        return PatientDetailDTO.PatientStats.builder()
                .totalEvaluations((long) evaluations.size())
                .firstEvaluationDate(oldest.getEvaluationDate())
                .lastEvaluationDate(mostRecent.getEvaluationDate())
                .daysSinceLastEvaluation(daysSinceLast)
                .build();
    }
}
