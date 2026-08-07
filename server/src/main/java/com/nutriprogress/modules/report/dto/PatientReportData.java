package com.nutriprogress.modules.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Dados ja formatados para o template do relatorio.
 * Tudo aqui e String: o template nao formata nada, so posiciona.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientReportData {

    // Identificacao
    private String patientName;
    private Integer patientAge;
    private String generatedAt;

    // Assinatura profissional
    private String nutritionistName;
    private String nutritionistCrn;
    private String clinicName;

    // Periodo
    private String firstEvaluationDate;
    private String lastEvaluationDate;
    private Integer totalEvaluations;
    private Integer daysBetween;

    // Destaques (linguagem de paciente)
    private List<Highlight> highlights;

    // Graficos (SVG inline)
    private String weightChartSvg;
    private String bodyFatChartSvg;

    // Tabela de avaliacoes
    private List<EvaluationRow> evaluations;

    // Observacao da nutricionista
    private String professionalNotes;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Highlight {
        private String label;      // "Peso"
        private String value;      // "-3,5 kg"
        private String message;    // "Voce perdeu 3,5 kg"
        private String direction;  // POSITIVE | NEGATIVE | NEUTRAL
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EvaluationRow {
        private Integer number;
        private String date;
        private String weight;
        private String bmi;
        private String bodyFat;
        private String muscleMass;
    }
}
