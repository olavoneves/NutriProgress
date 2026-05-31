package com.nutriprogress.modules.analytics.service;

import com.nutriprogress.modules.analytics.document.AnalyticsEvent;
import com.nutriprogress.modules.analytics.dto.AnalyticsSummaryDTO;
import com.nutriprogress.modules.analytics.dto.EventTrackDTO;
import com.nutriprogress.modules.analytics.repository.AnalyticsEventRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AnalyticsEventRepository eventRepository;

    public static final String EVENT_LOGIN              = "login";
    public static final String EVENT_PATIENT_CREATED    = "patient_created";
    public static final String EVENT_EVALUATION_CREATED = "evaluation_created";
    public static final String EVENT_EXPORT_PDF         = "export_pdf";
    public static final String EVENT_PLAN_UPGRADED      = "plan_upgraded";
    public static final String EVENT_PATIENT_ARCHIVED   = "patient_archived";
    public static final String EVENT_DASHBOARD_VIEWED   = "dashboard_viewed";

    /**
     * Registra evento de analytics de forma assincrona (nao bloqueia o fluxo principal).
     */
    @Async("analyticsExecutor")
    public void track(UUID nutritionistId, String eventType, Map<String, Object> metadata) {
        try {
            AnalyticsEvent event = AnalyticsEvent.builder()
                    .nutritionistId(nutritionistId)
                    .eventType(eventType)
                    .metadata(metadata != null ? metadata : new HashMap<>())
                    .timestamp(LocalDateTime.now())
                    .build();

            eventRepository.save(event);
            log.debug("Evento analytics registrado: {} para nutricionista {}", eventType, nutritionistId);
        } catch (Exception e) {
            // Analytics nunca pode quebrar o fluxo principal.
            log.warn("Falha ao registrar evento analytics {}: {}", eventType, e.getMessage());
        }
    }

    /**
     * Registra evento com dados da request HTTP.
     */
    @Async("analyticsExecutor")
    public void track(UUID nutritionistId, EventTrackDTO dto, HttpServletRequest request) {
        try {
            AnalyticsEvent event = AnalyticsEvent.builder()
                    .nutritionistId(nutritionistId)
                    .eventType(dto.getEventType())
                    .metadata(dto.getMetadata() != null ? dto.getMetadata() : new HashMap<>())
                    .timestamp(LocalDateTime.now())
                    .sessionId(dto.getSessionId())
                    .ipAddress(extractIpAddress(request))
                    .userAgent(request.getHeader("User-Agent"))
                    .build();

            eventRepository.save(event);
        } catch (Exception e) {
            log.warn("Falha ao registrar evento analytics: {}", e.getMessage());
        }
    }

    /**
     * Resumo de analytics da nutricionista (ultimos 30 dias).
     */
    public AnalyticsSummaryDTO getSummary(UUID nutritionistId) {
        LocalDateTime start = LocalDateTime.now().minusDays(30);
        LocalDateTime end   = LocalDateTime.now();

        List<AnalyticsEvent> events = eventRepository
                .findByNutritionistIdAndTimestampBetween(nutritionistId, start, end);

        long totalLogins = countByType(events, EVENT_LOGIN);
        long totalPatientsCreated = countByType(events, EVENT_PATIENT_CREATED);
        long totalEvaluationsCreated = countByType(events, EVENT_EVALUATION_CREATED);
        long totalPdfExports = countByType(events, EVENT_EXPORT_PDF);

        return AnalyticsSummaryDTO.builder()
                .totalLogins(totalLogins)
                .totalPatientsCreated(totalPatientsCreated)
                .totalEvaluationsCreated(totalEvaluationsCreated)
                .totalPdfExports(totalPdfExports)
                .loginsByDay(groupEventsByDay(events, EVENT_LOGIN))
                .evaluationsByDay(groupEventsByDay(events, EVENT_EVALUATION_CREATED))
                .build();
    }

    private long countByType(List<AnalyticsEvent> events, String eventType) {
        return events.stream().filter(e -> eventType.equals(e.getEventType())).count();
    }

    private List<Map<String, Object>> groupEventsByDay(List<AnalyticsEvent> events, String eventType) {
        Map<LocalDate, Long> grouped = new HashMap<>();

        events.stream()
                .filter(e -> eventType.equals(e.getEventType()))
                .forEach(e -> grouped.merge(e.getTimestamp().toLocalDate(), 1L, Long::sum));

        List<Map<String, Object>> result = new ArrayList<>();
        grouped.forEach((date, count) -> {
            Map<String, Object> point = new HashMap<>();
            point.put("date", date.toString());
            point.put("count", count);
            result.add(point);
        });

        result.sort((a, b) -> a.get("date").toString().compareTo(b.get("date").toString()));
        return result;
    }

    private String extractIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip != null && !ip.isBlank()) {
            return ip.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
