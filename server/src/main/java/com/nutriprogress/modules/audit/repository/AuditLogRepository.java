package com.nutriprogress.modules.audit.repository;

import com.nutriprogress.modules.audit.document.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends MongoRepository<AuditLog, String> {

    Page<AuditLog> findByUserId(UUID userId, Pageable pageable);

    List<AuditLog> findByUserIdAndTimestampBetween(UUID userId, LocalDateTime start, LocalDateTime end);

    List<AuditLog> findByResourceTypeAndResourceId(String resourceType, String resourceId);
}
