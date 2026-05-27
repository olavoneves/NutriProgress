package com.nutriprogress.modules.nutritionist.dto;

import lombok.Builder;

@Builder
public record NutritionistStatsDTO(
        Long totalPatients,
        Long activePatients,
        Long archivedPatients,
        Long totalEvaluations,
        Long evaluationsThisMonth
) {
}
