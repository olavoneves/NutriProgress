package com.nutriprogress.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private String secret;

    private Long expiration = 900_000L;

    private Long refreshExpiration = 604_800_000L;

    private String issuer = "nutriprogress-api";
}
