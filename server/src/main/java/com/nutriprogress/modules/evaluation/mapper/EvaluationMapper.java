package com.nutriprogress.modules.evaluation.mapper;

import com.nutriprogress.modules.evaluation.dto.DataPointDTO;
import com.nutriprogress.modules.evaluation.dto.EvaluationDTO;
import com.nutriprogress.modules.evaluation.dto.EvaluationDetailDTO;
import com.nutriprogress.modules.evaluation.dto.EvolutionComparisonDTO;
import com.nutriprogress.modules.evaluation.dto.EvolutionDataDTO;
import com.nutriprogress.modules.evaluation.entity.Evaluation;
import com.nutriprogress.modules.evaluation.entity.EvaluationPhoto;
import com.nutriprogress.modules.evaluation.util.BmiCalculator;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class EvaluationMapper {

    public EvaluationDTO toDTO(Evaluation evaluation) {
        List<EvaluationDTO.PhotoDTO> photos = mapPhotos(evaluation.getPhotos());

        return EvaluationDTO.builder()
                .id(evaluation.getId())
                .patientId(evaluation.getPatient().getId())
                .nutritionistId(evaluation.getNutritionist().getId())
                .evaluationDate(evaluation.getEvaluationDate())
                .evaluationNumber(evaluation.getEvaluationNumber())
                .weight(evaluation.getWeight())
                .height(evaluation.getHeight())
                .bmi(evaluation.getBmi())
                .bmiClassification(BmiCalculator.classify(evaluation.getBmi()))
                .bodyFatPercentage(evaluation.getBodyFatPercentage())
                .muscleMass(evaluation.getMuscleMass())
                .visceralFat(evaluation.getVisceralFat())
                .waistCircumference(evaluation.getWaistCircumference())
                .hipCircumference(evaluation.getHipCircumference())
                .chestCircumference(evaluation.getChestCircumference())
                .armCircumference(evaluation.getArmCircumference())
                .thighCircumference(evaluation.getThighCircumference())
                .calfCircumference(evaluation.getCalfCircumference())
                .notes(evaluation.getNotes())
                .photos(photos)
                .createdAt(evaluation.getCreatedAt())
                .updatedAt(evaluation.getUpdatedAt())
                .build();
    }

    public EvaluationDetailDTO toDetailDTO(Evaluation evaluation, Evaluation previousEvaluation) {
        EvaluationDetailDTO.EvolutionDifference difference = null;

        if (previousEvaluation != null) {
            difference = EvaluationDetailDTO.EvolutionDifference.builder()
                    .weightDifference(diff(evaluation.getWeight(), previousEvaluation.getWeight()))
                    .bmiDifference(diff(evaluation.getBmi(), previousEvaluation.getBmi()))
                    .bodyFatDifference(diff(evaluation.getBodyFatPercentage(), previousEvaluation.getBodyFatPercentage()))
                    .muscleMassDifference(diff(evaluation.getMuscleMass(), previousEvaluation.getMuscleMass()))
                    .daysSincePrevious((int) ChronoUnit.DAYS.between(
                            previousEvaluation.getEvaluationDate(),
                            evaluation.getEvaluationDate()
                    ))
                    .build();
        }

        return EvaluationDetailDTO.builder()
                .id(evaluation.getId())
                .evaluationNumber(evaluation.getEvaluationNumber())
                .evaluationDate(evaluation.getEvaluationDate())
                .patientId(evaluation.getPatient().getId())
                .patientName(evaluation.getPatient().getFullName())
                .weight(evaluation.getWeight())
                .height(evaluation.getHeight())
                .bmi(evaluation.getBmi())
                .bmiClassification(BmiCalculator.classify(evaluation.getBmi()))
                .bodyFatPercentage(evaluation.getBodyFatPercentage())
                .muscleMass(evaluation.getMuscleMass())
                .visceralFat(evaluation.getVisceralFat())
                .waistCircumference(evaluation.getWaistCircumference())
                .hipCircumference(evaluation.getHipCircumference())
                .chestCircumference(evaluation.getChestCircumference())
                .armCircumference(evaluation.getArmCircumference())
                .thighCircumference(evaluation.getThighCircumference())
                .calfCircumference(evaluation.getCalfCircumference())
                .notes(evaluation.getNotes())
                .evolutionDifference(difference)
                .build();
    }

    public EvolutionDataDTO toEvolutionData(List<Evaluation> evaluations, UUID patientId, String patientName) {
        if (evaluations.isEmpty()) {
            return EvolutionDataDTO.builder()
                    .patientId(patientId)
                    .patientName(patientName)
                    .weightEvolution(new ArrayList<>())
                    .bmiEvolution(new ArrayList<>())
                    .bodyFatEvolution(new ArrayList<>())
                    .muscleMassEvolution(new ArrayList<>())
                    .build();
        }

        List<DataPointDTO> weightData = new ArrayList<>();
        List<DataPointDTO> bmiData = new ArrayList<>();
        List<DataPointDTO> bodyFatData = new ArrayList<>();
        List<DataPointDTO> muscleMassData = new ArrayList<>();

        for (Evaluation eval : evaluations) {
            if (eval.getWeight() != null) {
                weightData.add(DataPointDTO.builder()
                        .date(eval.getEvaluationDate())
                        .evaluationNumber(eval.getEvaluationNumber())
                        .value(eval.getWeight())
                        .build());
            }
            if (eval.getBmi() != null) {
                bmiData.add(DataPointDTO.builder()
                        .date(eval.getEvaluationDate())
                        .evaluationNumber(eval.getEvaluationNumber())
                        .value(eval.getBmi())
                        .build());
            }
            if (eval.getBodyFatPercentage() != null) {
                bodyFatData.add(DataPointDTO.builder()
                        .date(eval.getEvaluationDate())
                        .evaluationNumber(eval.getEvaluationNumber())
                        .value(eval.getBodyFatPercentage())
                        .build());
            }
            if (eval.getMuscleMass() != null) {
                muscleMassData.add(DataPointDTO.builder()
                        .date(eval.getEvaluationDate())
                        .evaluationNumber(eval.getEvaluationNumber())
                        .value(eval.getMuscleMass())
                        .build());
            }
        }

        // evaluations is sorted ASC: first = index 0, last = last index
        Evaluation first = evaluations.get(0);
        Evaluation last = evaluations.get(evaluations.size() - 1);

        return EvolutionDataDTO.builder()
                .patientId(patientId)
                .patientName(patientName)
                .weightEvolution(weightData)
                .bmiEvolution(bmiData)
                .bodyFatEvolution(bodyFatData)
                .muscleMassEvolution(muscleMassData)
                .comparison(buildComparison(first, last))
                .build();
    }

    private EvolutionComparisonDTO buildComparison(Evaluation first, Evaluation last) {
        BigDecimal weightDiff = diff(last.getWeight(), first.getWeight());
        BigDecimal bmiDiff = diff(last.getBmi(), first.getBmi());
        BigDecimal bodyFatDiff = diff(last.getBodyFatPercentage(), first.getBodyFatPercentage());
        BigDecimal muscleMassDiff = diff(last.getMuscleMass(), first.getMuscleMass());

        return EvolutionComparisonDTO.builder()
                .firstEvaluationDate(first.getEvaluationDate())
                .firstEvaluationNumber(first.getEvaluationNumber())
                .firstWeight(first.getWeight())
                .firstBmi(first.getBmi())
                .firstBodyFat(first.getBodyFatPercentage())
                .firstMuscleMass(first.getMuscleMass())
                .lastEvaluationDate(last.getEvaluationDate())
                .lastEvaluationNumber(last.getEvaluationNumber())
                .lastWeight(last.getWeight())
                .lastBmi(last.getBmi())
                .lastBodyFat(last.getBodyFatPercentage())
                .lastMuscleMass(last.getMuscleMass())
                .weightDifference(weightDiff)
                .bmiDifference(bmiDiff)
                .bodyFatDifference(bodyFatDiff)
                .muscleMassDifference(muscleMassDiff)
                .weightChangePercentage(percentage(first.getWeight(), weightDiff))
                .bodyFatChangePercentage(percentage(first.getBodyFatPercentage(), bodyFatDiff))
                .muscleMassChangePercentage(percentage(first.getMuscleMass(), muscleMassDiff))
                .daysBetween((int) ChronoUnit.DAYS.between(
                        first.getEvaluationDate(),
                        last.getEvaluationDate()
                ))
                .build();
    }

    private BigDecimal diff(BigDecimal current, BigDecimal previous) {
        if (current == null || previous == null) return null;
        return current.subtract(previous);
    }

    private BigDecimal percentage(BigDecimal base, BigDecimal difference) {
        if (base == null || difference == null || base.compareTo(BigDecimal.ZERO) == 0) return null;
        return difference
                .divide(base, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);
    }

    private List<EvaluationDTO.PhotoDTO> mapPhotos(List<EvaluationPhoto> photos) {
        if (photos == null) return new ArrayList<>();
        return photos.stream()
                .map(p -> EvaluationDTO.PhotoDTO.builder()
                        .url(p.getUrl())
                        .type(p.getType())
                        .build())
                .toList();
    }
}
