package com.nutriprogress.modules.lgpd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DataExportDTO {

    private UUID nutritionistId;
    private LocalDateTime exportedAt;
    private Map<String, Object> personalData;
    private Map<String, Object> professionalData;
    private List<Map<String, Object>> subscriptions;
    private List<Map<String, Object>> payments;
    private Map<String, Object> aggregatedStats;
}
