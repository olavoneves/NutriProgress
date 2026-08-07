package com.nutriprogress.modules.report.exception;

/**
 * Lancada quando o plano atual da nutricionista nao inclui a funcionalidade
 * solicitada. Traduzida para HTTP 402 pelo GlobalExceptionHandler.
 */
public class FeatureNotAvailableException extends RuntimeException {

    private final String requiredPlan;

    public FeatureNotAvailableException(
            String feature,
            String currentPlan,
            String requiredPlan
    ) {
        super(String.format(
                "A funcionalidade '%s' nao esta disponivel no plano %s. " +
                "Faca upgrade para o plano %s.",
                feature, currentPlan, requiredPlan
        ));
        this.requiredPlan = requiredPlan;
    }

    public String getRequiredPlan() {
        return requiredPlan;
    }
}
