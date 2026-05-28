package com.nutriprogress.modules.analytics.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "business_metrics")
@CompoundIndex(name = "idx_metrics_date_type",
               def = "{'date': -1, 'metric_type': 1}",
               unique = true)
public class BusinessMetrics {

    @Id
    private String id;

    private LocalDate date;

    @Field("metric_type")
    private String metricType; // DAILY, MONTHLY

    @Field("total_nutritionists")
    private Long totalNutritionists;

    @Field("new_nutritionists")
    private Long newNutritionists;

    @Field("active_nutritionists")
    private Long activeNutritionists;

    @Field("free_plan_count")
    private Long freePlanCount;

    @Field("starter_plan_count")
    private Long starterPlanCount;

    @Field("pro_plan_count")
    private Long proPlanCount;

    @Field("premium_plan_count")
    private Long premiumPlanCount;

    @Field("mrr")
    private BigDecimal mrr;

    @Field("new_mrr")
    private BigDecimal newMrr;

    @Field("churned_mrr")
    private BigDecimal churnedMrr;

    @Field("total_patients")
    private Long totalPatients;

    @Field("new_patients")
    private Long newPatients;

    @Field("total_evaluations")
    private Long totalEvaluations;

    @Field("new_evaluations")
    private Long newEvaluations;

    @Field("churn_rate")
    private BigDecimal churnRate;

    @Field("activation_rate")
    private BigDecimal activationRate;
}
