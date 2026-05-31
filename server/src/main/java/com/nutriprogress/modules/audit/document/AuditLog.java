package com.nutriprogress.modules.audit.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "audit_logs")
@CompoundIndex(name = "idx_audit_user_ts", def = "{'user_id': 1, 'timestamp': -1}")
public class AuditLog {

    @Id
    private String id;

    @Indexed
    @Field("user_id")
    private UUID userId;

    @Field("nutritionist_id")
    private UUID nutritionistId;

    @Field("action")
    private String action;

    @Field("resource_type")
    private String resourceType;

    @Field("resource_id")
    private String resourceId;

    @Field("http_method")
    private String httpMethod;

    @Field("endpoint")
    private String endpoint;

    @Field("ip_address")
    private String ipAddress;

    @Field("user_agent")
    private String userAgent;

    @Field("status_code")
    private Integer statusCode;

    @Field("metadata")
    private Map<String, Object> metadata;

    @Indexed
    private LocalDateTime timestamp;
}
