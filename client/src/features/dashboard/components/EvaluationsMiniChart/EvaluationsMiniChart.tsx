import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { tokens } from '@styles/tokens';
import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartSubtitle,
  EmptyChart,
} from './EvaluationsMiniChart.styles';

interface ChartDataPoint {
  label: string;
  value: number;
}

interface EvaluationsMiniChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
  totalThisMonth?: number;
}

const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const generateMonthLabels = (): string[] => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now);
    d.setMonth(now.getMonth() - 5 + i);
    return MONTH_LABELS[d.getMonth()];
  });
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: tokens.colors.white,
        border: `1px solid ${tokens.colors.gray[200]}`,
        borderRadius: tokens.borderRadius.lg,
        padding: '0.5rem 0.75rem',
        fontSize: tokens.typography.fontSize.xs,
        boxShadow: tokens.shadows.md,
      }}>
        <p style={{ margin: 0, color: tokens.colors.gray[600] }}>{label}</p>
        <p style={{ margin: 0, fontWeight: 700, color: tokens.colors.brand }}>
          {payload[0].value} avaliações
        </p>
      </div>
    );
  }
  return null;
};

export const EvaluationsMiniChart: React.FC<EvaluationsMiniChartProps> = ({
  data,
  isLoading = false,
  totalThisMonth = 0,
}) => {
  const labels = generateMonthLabels();
  const chartData: ChartDataPoint[] = data ?? labels.map((label) => ({ label, value: 0 }));

  if (isLoading) {
    return (
      <ChartContainer>
        <ChartHeader>
          <div>
            <div className="skeleton-title" />
            <div className="skeleton-subtitle" />
          </div>
        </ChartHeader>
        <div className="skeleton-chart" />
      </ChartContainer>
    );
  }

  const hasData = chartData.some((d) => d.value > 0);

  return (
    <ChartContainer>
      <ChartHeader>
        <div>
          <ChartTitle>Avaliações por Mês</ChartTitle>
          <ChartSubtitle>
            {totalThisMonth} este mês · últimos 6 meses
          </ChartSubtitle>
        </div>
      </ChartHeader>

      {!hasData ? (
        <EmptyChart>
          <svg width="40" height="40" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4"  />
            <line x1="6"  y1="20" x2="6"  y2="14" />
          </svg>
          <span>Nenhuma avaliação registrada ainda</span>
        </EmptyChart>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={tokens.colors.gray[100]}
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: tokens.colors.gray[400] }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: tokens.colors.gray[400] }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill={tokens.colors.brand}
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

EvaluationsMiniChart.displayName = 'EvaluationsMiniChart';
