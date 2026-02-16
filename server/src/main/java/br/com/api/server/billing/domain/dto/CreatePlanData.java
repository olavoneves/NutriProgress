package br.com.api.server.billing.domain.dto;

import java.math.BigDecimal;

public record CreatePlanData(String name,
                             String description,
                             BigDecimal price,
                             Integer maxPatients,
                             String features) {
}
