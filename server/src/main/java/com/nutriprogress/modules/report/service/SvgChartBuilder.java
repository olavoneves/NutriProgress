package com.nutriprogress.modules.report.service;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;

/**
 * Gera grafico de linha em SVG puro, sem dependencias externas.
 * O SVG e embutido no HTML e renderizado pelo openhtmltopdf (Batik).
 *
 * IMPORTANTE: toda formatacao numerica usa {@link Locale#ROOT}. Coordenadas
 * de SVG exigem ponto como separador decimal — formatar com o locale default
 * quebraria o grafico em maquinas pt-BR.
 */
@Component
public class SvgChartBuilder {

    private static final int WIDTH      = 700;
    private static final int HEIGHT     = 260;
    private static final int PADDING_X  = 50;
    private static final int PADDING_Y  = 30;

    public record Point(String label, BigDecimal value) {}

    /**
     * Constroi um grafico de linha com area preenchida.
     *
     * @param points serie temporal (minimo 2 pontos)
     * @param color  cor da linha em hex (ex: "#10b981")
     */
    public String buildLineChart(List<Point> points, String color) {
        if (points == null || points.size() < 2) {
            return buildEmptyChart();
        }

        double min = points.stream()
                .mapToDouble(p -> p.value().doubleValue())
                .min().orElse(0);
        double max = points.stream()
                .mapToDouble(p -> p.value().doubleValue())
                .max().orElse(1);

        // Margem de 10% acima e abaixo para o grafico respirar
        double range  = Math.max(max - min, 0.1);
        double yMin   = min - range * 0.1;
        double yMax   = max + range * 0.1;
        double yRange = yMax - yMin;

        int plotWidth  = WIDTH  - (PADDING_X * 2);
        int plotHeight = HEIGHT - (PADDING_Y * 2);

        StringBuilder linePath = new StringBuilder();
        StringBuilder areaPath = new StringBuilder();
        StringBuilder dots     = new StringBuilder();
        StringBuilder labels   = new StringBuilder();

        for (int i = 0; i < points.size(); i++) {
            Point p = points.get(i);

            double x = PADDING_X +
                    ((double) i / (points.size() - 1)) * plotWidth;
            double y = PADDING_Y + plotHeight -
                    ((p.value().doubleValue() - yMin) / yRange) * plotHeight;

            linePath.append(i == 0 ? "M" : "L")
                    .append(coord(x)).append(",")
                    .append(coord(y)).append(" ");

            if (i == 0) {
                areaPath.append("M").append(coord(x)).append(",")
                        .append(coord(PADDING_Y + plotHeight)).append(" ");
            }
            areaPath.append("L").append(coord(x)).append(",")
                    .append(coord(y)).append(" ");

            // Ponto
            dots.append(String.format(Locale.ROOT,
                    "<circle cx='%s' cy='%s' r='4' fill='%s'/>",
                    coord(x), coord(y), color
            ));

            // Nos extremos o rotulo e ancorado para dentro, senao ele
            // transborda a area util e colide com os rotulos do eixo Y.
            String anchor = i == 0 ? "start"
                          : i == points.size() - 1 ? "end"
                          : "middle";

            // Valor acima do ponto
            dots.append(String.format(Locale.ROOT,
                    "<text x='%s' y='%s' font-size='11' font-weight='600' " +
                    "fill='#111827' text-anchor='%s'>%s</text>",
                    coord(x), coord(y - 12), anchor, ptBr(p.value())
            ));

            // Rotulo do eixo X
            labels.append(String.format(Locale.ROOT,
                    "<text x='%s' y='%d' font-size='10' fill='#9ca3af' " +
                    "text-anchor='%s'>%s</text>",
                    coord(x), HEIGHT - 8, anchor, escape(p.label())
            ));
        }

        // Fecha a area ate a base do plot
        areaPath.append("L")
                .append(coord(PADDING_X + (double) plotWidth)).append(",")
                .append(coord(PADDING_Y + (double) plotHeight))
                .append(" Z");

        // Linhas de grade horizontais + rotulos do eixo Y
        StringBuilder grid = new StringBuilder();
        for (int g = 0; g <= 3; g++) {
            double gy = PADDING_Y + (plotHeight / 3.0) * g;
            double gv = yMax - (yRange / 3.0) * g;
            grid.append(String.format(Locale.ROOT,
                    "<line x1='%d' y1='%s' x2='%d' y2='%s' " +
                    "stroke='#f3f4f6' stroke-width='1'/>",
                    PADDING_X, coord(gy), PADDING_X + plotWidth, coord(gy)
            ));
            grid.append(String.format(Locale.ROOT,
                    "<text x='%d' y='%s' font-size='9' fill='#d1d5db' " +
                    "text-anchor='end'>%s</text>",
                    PADDING_X - 8, coord(gy + 3), ptBr(gv)
            ));
        }

        String gradientId = "grad_" + color.replace("#", "");

        return String.format(Locale.ROOT, """
                <svg xmlns='http://www.w3.org/2000/svg'
                     width='%d' height='%d' viewBox='0 0 %d %d'>
                  <defs>
                    <linearGradient id='%s' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='0%%' stop-color='%s' stop-opacity='0.20'/>
                      <stop offset='100%%' stop-color='%s' stop-opacity='0.02'/>
                    </linearGradient>
                  </defs>
                  %s
                  <path d='%s' fill='url(#%s)'/>
                  <path d='%s' fill='none' stroke='%s'
                        stroke-width='2.5' stroke-linejoin='round'/>
                  %s
                  %s
                </svg>
                """,
                WIDTH, HEIGHT, WIDTH, HEIGHT,
                gradientId, color, color,
                grid,
                areaPath, gradientId,
                linePath, color,
                dots, labels
        );
    }

    private String buildEmptyChart() {
        return String.format(Locale.ROOT, """
                <svg xmlns='http://www.w3.org/2000/svg'
                     width='%d' height='120' viewBox='0 0 %d 120'>
                  <text x='%d' y='60' font-size='13' fill='#9ca3af'
                        text-anchor='middle'>Dados insuficientes para gerar o grafico</text>
                </svg>
                """, WIDTH, WIDTH, WIDTH / 2);
    }

    /** Coordenada SVG — sempre com ponto decimal. */
    private String coord(double v) {
        return String.format(Locale.ROOT, "%.2f", v);
    }

    /** Rotulo visivel — virgula decimal, sem zeros a direita. */
    private String ptBr(BigDecimal value) {
        return value.stripTrailingZeros().toPlainString().replace('.', ',');
    }

    private String ptBr(double value) {
        return String.format(Locale.ROOT, "%.1f", value).replace('.', ',');
    }

    private String escape(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }
}
