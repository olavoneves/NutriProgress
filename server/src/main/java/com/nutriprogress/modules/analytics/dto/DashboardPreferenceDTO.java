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
public class DashboardPreferenceDTO {

    private List<WidgetDTO> widgets;
    private ChartPreferenceDTO chartPreferences;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WidgetDTO {
        private String type;
        private Integer position;
        private Boolean visible;
        private Map<String, Object> config;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChartPreferenceDTO {
        private List<String> defaultMetrics;
        private Map<String, String> colors;
        private String defaultPeriod;
    }
}
