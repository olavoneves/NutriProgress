package com.nutriprogress.modules.analytics.service;

import com.nutriprogress.modules.analytics.document.DashboardPreference;
import com.nutriprogress.modules.analytics.dto.DashboardPreferenceDTO;
import com.nutriprogress.modules.analytics.repository.DashboardPreferenceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardPreferenceRepository preferenceRepository;

    public DashboardPreferenceDTO getPreferences(UUID nutritionistId) {
        DashboardPreference preference = preferenceRepository
                .findByNutritionistId(nutritionistId)
                .orElseGet(() -> createDefaultPreferences(nutritionistId));

        return mapToDTO(preference);
    }

    public DashboardPreferenceDTO savePreferences(UUID nutritionistId, DashboardPreferenceDTO dto) {
        log.info("Salvando preferencias de dashboard para: {}", nutritionistId);

        DashboardPreference preference = preferenceRepository
                .findByNutritionistId(nutritionistId)
                .orElseGet(() -> {
                    DashboardPreference p = new DashboardPreference();
                    p.setNutritionistId(nutritionistId);
                    return p;
                });

        if (dto.getWidgets() != null) {
            List<DashboardPreference.Widget> widgets = dto.getWidgets().stream()
                    .map(w -> DashboardPreference.Widget.builder()
                            .type(w.getType())
                            .position(w.getPosition())
                            .visible(w.getVisible())
                            .config(w.getConfig())
                            .build())
                    .toList();

            DashboardPreference.LayoutConfig layout = new DashboardPreference.LayoutConfig();
            layout.setWidgets(widgets);
            preference.setLayout(layout);
        }

        if (dto.getChartPreferences() != null) {
            DashboardPreference.ChartPreferences chartPrefs =
                    DashboardPreference.ChartPreferences.builder()
                            .defaultMetrics(dto.getChartPreferences().getDefaultMetrics())
                            .colors(dto.getChartPreferences().getColors())
                            .defaultPeriod(dto.getChartPreferences().getDefaultPeriod())
                            .build();
            preference.setChartPreferences(chartPrefs);
        }

        preference.setUpdatedAt(LocalDateTime.now());
        preference = preferenceRepository.save(preference);

        log.info("Preferencias salvas para: {}", nutritionistId);
        return mapToDTO(preference);
    }

    private DashboardPreference createDefaultPreferences(UUID nutritionistId) {
        log.info("Criando preferencias default para: {}", nutritionistId);

        List<DashboardPreference.Widget> defaultWidgets = List.of(
                buildWidget("RECENT_PATIENTS",       1, true),
                buildWidget("MONTHLY_EVALUATIONS",   2, true),
                buildWidget("ACTIVE_PATIENTS_COUNT", 3, true),
                buildWidget("EVALUATIONS_CHART",     4, true),
                buildWidget("QUICK_STATS",           5, true),
                buildWidget("UPCOMING_RETURNS",      6, false)
        );

        DashboardPreference.LayoutConfig layout = new DashboardPreference.LayoutConfig();
        layout.setWidgets(defaultWidgets);

        DashboardPreference.ChartPreferences chartPrefs =
                DashboardPreference.ChartPreferences.builder()
                        .defaultMetrics(List.of("weight", "bodyFatPercentage"))
                        .colors(Map.of(
                                "weight",            "#10b981",
                                "bodyFatPercentage", "#ef4444",
                                "muscleMass",        "#3b82f6"
                        ))
                        .defaultPeriod("MONTH")
                        .build();

        DashboardPreference preference = DashboardPreference.builder()
                .nutritionistId(nutritionistId)
                .layout(layout)
                .chartPreferences(chartPrefs)
                .updatedAt(LocalDateTime.now())
                .build();

        return preferenceRepository.save(preference);
    }

    private DashboardPreference.Widget buildWidget(String type, int position, boolean visible) {
        return DashboardPreference.Widget.builder()
                .type(type)
                .position(position)
                .visible(visible)
                .config(new HashMap<>())
                .build();
    }

    private DashboardPreferenceDTO mapToDTO(DashboardPreference preference) {
        List<DashboardPreferenceDTO.WidgetDTO> widgets = new ArrayList<>();

        if (preference.getLayout() != null && preference.getLayout().getWidgets() != null) {
            widgets = preference.getLayout().getWidgets().stream()
                    .map(w -> DashboardPreferenceDTO.WidgetDTO.builder()
                            .type(w.getType())
                            .position(w.getPosition())
                            .visible(w.getVisible())
                            .config(w.getConfig())
                            .build())
                    .toList();
        }

        DashboardPreferenceDTO.ChartPreferenceDTO chartPrefs = null;
        if (preference.getChartPreferences() != null) {
            chartPrefs = DashboardPreferenceDTO.ChartPreferenceDTO.builder()
                    .defaultMetrics(preference.getChartPreferences().getDefaultMetrics())
                    .colors(preference.getChartPreferences().getColors())
                    .defaultPeriod(preference.getChartPreferences().getDefaultPeriod())
                    .build();
        }

        return DashboardPreferenceDTO.builder()
                .widgets(widgets)
                .chartPreferences(chartPrefs)
                .build();
    }
}
