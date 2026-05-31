package com.nutriprogress.modules.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsSummaryDTO {

    private Long totalLogins;
    private Long totalPatientsCreated;
    private Long totalEvaluationsCreated;
    private Long totalPdfExports;

    private Double averageEvaluationsPerPatient;
    private Long activePatientsLast30Days;

    private List<Map<String, Object>> loginsByDay;
    private List<Map<String, Object>> evaluationsByDay;

    private Long patientsWithEvaluationsThisMonth;
    private Long patientsWithoutEvaluationLast30Days;
}
