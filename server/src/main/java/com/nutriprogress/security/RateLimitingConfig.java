package com.nutriprogress.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class RateLimitingConfig {

    private final Map<String, Bucket> bucketCache = new ConcurrentHashMap<>();

    public Bucket resolvePublicBucket(String ipAddress) {
        return bucketCache.computeIfAbsent("public:" + ipAddress, k -> createPublicBucket());
    }

    public Bucket resolveAuthenticatedBucket(String userId) {
        return bucketCache.computeIfAbsent("auth:" + userId, k -> createAuthenticatedBucket());
    }

    public Bucket resolveLoginBucket(String ipAddress) {
        return bucketCache.computeIfAbsent("login:" + ipAddress, k -> createLoginBucket());
    }

    private Bucket createPublicBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(20)
                .refillGreedy(20, Duration.ofMinutes(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket createAuthenticatedBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(100)
                .refillGreedy(100, Duration.ofMinutes(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket createLoginBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(5)
                .refillGreedy(5, Duration.ofMinutes(15))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }
}
