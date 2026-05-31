package com.nutriprogress.modules.analytics.document;

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
@Document(collection = "analytics_events")
@CompoundIndex(name = "idx_nutritionist_event_ts",
               def = "{'nutritionist_id': 1, 'event_type': 1, 'timestamp': -1}")
public class AnalyticsEvent {

    @Id
    private String id;

    @Indexed
    @Field("nutritionist_id")
    private UUID nutritionistId;

    @Field("event_type")
    private String eventType;

    private Map<String, Object> metadata;

    @Indexed
    private LocalDateTime timestamp;

    @Field("session_id")
    private String sessionId;

    @Field("ip_address")
    private String ipAddress;

    @Field("user_agent")
    private String userAgent;
}
