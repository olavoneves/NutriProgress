package com.nutriprogress.modules.evaluation.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class BmiCalculator {

    private BmiCalculator() {}

    public static BigDecimal calculate(BigDecimal weight, BigDecimal height) {
        if (weight == null || height == null) return null;
        if (weight.compareTo(BigDecimal.ZERO) <= 0 || height.compareTo(BigDecimal.ZERO) <= 0) return null;

        BigDecimal heightInMeters = height.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
        BigDecimal heightSquared = heightInMeters.multiply(heightInMeters);
        return weight.divide(heightSquared, 2, RoundingMode.HALF_UP);
    }

    public static String classify(BigDecimal bmi) {
        if (bmi == null) return "Desconhecido";

        if (bmi.compareTo(BigDecimal.valueOf(18.5)) < 0) return "Abaixo do peso";
        if (bmi.compareTo(BigDecimal.valueOf(25.0)) < 0) return "Peso normal";
        if (bmi.compareTo(BigDecimal.valueOf(30.0)) < 0) return "Sobrepeso";
        if (bmi.compareTo(BigDecimal.valueOf(35.0)) < 0) return "Obesidade Grau I";
        if (bmi.compareTo(BigDecimal.valueOf(40.0)) < 0) return "Obesidade Grau II";
        return "Obesidade Grau III";
    }
}
