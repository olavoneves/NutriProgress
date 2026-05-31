package com.nutriprogress.modules.audit.service;

import com.nutriprogress.modules.audit.document.AuditLog;
import com.nutriprogress.modules.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    /**
     * Registra acao com dados extraidos do request HTTP.
     * Todos os valores devem ser extraidos do request ANTES de chamar este metodo
     * (o request pode fechar antes do executor async processar).
     */
    @Async
    public void log(UUID userId, UUID nutritionistId, String action, String resourceType,
                    String resourceId, String httpMethod, String endpoint,
                    String ipAddress, String userAgent, Integer statusCode) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .userId(userId)
                    .nutritionistId(nutritionistId)
                    .action(action)
                    .resourceType(resourceType)
                    .resourceId(resourceId)
                    .httpMethod(httpMethod)
                    .endpoint(endpoint)
                    .ipAddress(ipAddress)
                    .userAgent(userAgent)
                    .statusCode(statusCode)
                    .timestamp(LocalDateTime.now())
                    .build();
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            log.warn("Falha ao registrar auditoria: {}", e.getMessage());
        }
    }

    @Async
    public void log(UUID userId, String action, String resourceType,
                    String resourceId, Map<String, Object> metadata) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .userId(userId)
                    .action(action)
                    .resourceType(resourceType)
                    .resourceId(resourceId)
                    .metadata(metadata)
                    .timestamp(LocalDateTime.now())
                    .build();
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            log.warn("Falha ao registrar auditoria: {}", e.getMessage());
        }
    }

    public List<AuditLog> getPatientAuditHistory(String patientId) {
        return auditLogRepository.findByResourceTypeAndResourceId("PATIENT", patientId);
    }
}
