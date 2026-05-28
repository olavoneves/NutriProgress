package com.nutriprogress.modules.analytics.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "dashboard_preferences")
public class DashboardPreference {

    @Id
    private String id;

    @Indexed(unique = true)
    @Field("nutritionist_id")
    private UUID nutritionistId;

    private LayoutConfig layout;

    @Field("chart_preferences")
    private ChartPreferences chartPreferences;

    @Field("updated_at")
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LayoutConfig {
        private List<Widget> widgets;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Widget {
        private String type;
        private Integer position;
        private Boolean visible;
        private Map<String, Object> config;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChartPreferences {
        private List<String> defaultMetrics;
        private Map<String, String> colors;
        private String defaultPeriod;
    }
}
