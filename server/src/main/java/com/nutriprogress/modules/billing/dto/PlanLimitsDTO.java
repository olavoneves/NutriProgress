package com.nutriprogress.modules.billing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanLimitsDTO {

    private String planName;
    private Integer maxPatients;
    private Boolean unlimitedPatients;
    private Boolean advancedCharts;
    private Boolean exportPdf;
    private Boolean customDashboard;
    private Boolean multiUser;
    private Boolean prioritySupport;
    private Long currentPatients;
    private Long remainingPatients;  // -1 = ilimitado
}
