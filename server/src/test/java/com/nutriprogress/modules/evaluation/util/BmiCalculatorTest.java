package com.nutriprogress.modules.evaluation.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("BmiCalculator - Testes Unitarios")
class BmiCalculatorTest {

    @Test
    @DisplayName("Deve calcular BMI corretamente")
    void shouldCalculateBmiCorrectly() {
        BigDecimal weight = BigDecimal.valueOf(70.0);
        BigDecimal height = BigDecimal.valueOf(165.0);

        BigDecimal bmi = BmiCalculator.calculate(weight, height);

        assertThat(bmi).isNotNull();
        assertThat(bmi).isEqualByComparingTo("25.71");
    }

    @Test
    @DisplayName("Deve classificar BMI como Abaixo do peso")
    void shouldClassifyUnderweight() {
        assertThat(BmiCalculator.classify(BigDecimal.valueOf(17.0))).isEqualTo("Abaixo do peso");
    }

    @Test
    @DisplayName("Deve classificar BMI como Peso normal")
    void shouldClassifyNormalWeight() {
        assertThat(BmiCalculator.classify(BigDecimal.valueOf(22.0))).isEqualTo("Peso normal");
    }

    @Test
    @DisplayName("Deve classificar BMI como Sobrepeso")
    void shouldClassifyOverweight() {
        assertThat(BmiCalculator.classify(BigDecimal.valueOf(27.0))).isEqualTo("Sobrepeso");
    }

    @Test
    @DisplayName("Deve classificar BMI como Obesidade Grau I")
    void shouldClassifyObesityGradeI() {
        assertThat(BmiCalculator.classify(BigDecimal.valueOf(32.0))).isEqualTo("Obesidade Grau I");
    }

    @Test
    @DisplayName("Deve classificar BMI como Obesidade Grau II")
    void shouldClassifyObesityGradeII() {
        assertThat(BmiCalculator.classify(BigDecimal.valueOf(37.0))).isEqualTo("Obesidade Grau II");
    }

    @Test
    @DisplayName("Deve classificar BMI como Obesidade Grau III")
    void shouldClassifyObesityGradeIII() {
        assertThat(BmiCalculator.classify(BigDecimal.valueOf(42.0))).isEqualTo("Obesidade Grau III");
    }

    @Test
    @DisplayName("Deve retornar null quando peso e null")
    void shouldReturnNullWhenWeightIsNull() {
        assertThat(BmiCalculator.calculate(null, BigDecimal.valueOf(165.0))).isNull();
    }

    @Test
    @DisplayName("Deve retornar null quando altura e null")
    void shouldReturnNullWhenHeightIsNull() {
        assertThat(BmiCalculator.calculate(BigDecimal.valueOf(70.0), null)).isNull();
    }

    @Test
    @DisplayName("Deve retornar null quando peso ou altura sao zero ou negativos")
    void shouldReturnNullWhenWeightOrHeightAreNotPositive() {
        assertThat(BmiCalculator.calculate(BigDecimal.ZERO, BigDecimal.valueOf(165.0))).isNull();
        assertThat(BmiCalculator.calculate(BigDecimal.valueOf(70.0), BigDecimal.ZERO)).isNull();
    }

    @Test
    @DisplayName("Deve retornar Desconhecido quando BMI e null")
    void shouldReturnUnknownWhenBmiIsNull() {
        assertThat(BmiCalculator.classify(null)).isEqualTo("Desconhecido");
    }
}
