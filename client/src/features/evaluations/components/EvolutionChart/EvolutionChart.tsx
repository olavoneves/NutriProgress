import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatDate } from '@utils/formatters';
import { tokens } from '@styles/tokens';
import type { EvolutionDataDTO, DataPoint } from '../../services';
import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartTabs,
  ChartTab,
  EmptyChart,
} from './EvolutionChart.styles';

type MetricKey = 'weight' | 'bmi' | 'bodyFat' | 'muscleMass';

interface MetricConfig {
  label:   string;
  unit:    string;
  color:   string;
  dataKey: keyof EvolutionDataDTO;
}

const METRIC_CONFIG: Record<MetricKey, MetricConfig> = {
  weight: {
    label:   'Peso',
    unit:    'kg',
    color:   tokens.colors.brand,
    dataKey: 'weightEvolution',
  },
  bmi: {
    label:   'IMC',
    unit:    '',
    color:   tokens.colors.info.main,
    dataKey: 'bmiEvolution',
  },
  bodyFat: {
    label:   '% Gordura',
    unit:    '%',
    color:   tokens.colors.error.main,
    dataKey: 'bodyFatEvolution',
  },
  muscleMass: {
    label:   'Massa Muscular',
    unit:    'kg',
    color:   tokens.colors.warning.main,
    dataKey: 'muscleMassEvolution',
  },
};

interface EvolutionChartProps {
  data:       EvolutionDataDTO;
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?:  boolean;
  payload?: Array<{ value: number }>;
  label?:   string;
  unit:     string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active, payload, label, unit,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:   tokens.colors.white,
      border:       `1px solid ${tokens.colors.gray[200]}`,
      borderRadius: tokens.borderRadius.lg,
      padding:      '0.5rem 0.875rem',
      boxShadow:    tokens.shadows.md,
      fontSize:     tokens.typography.fontSize.xs,
    }}>
      <p style={{ margin: '0 0 0.25rem', color: tokens.colors.gray[500] }}>
        {label}
      </p>
      <p style={{
        margin:     0,
        fontWeight: 700,
        color:      tokens.colors.gray[900],
        fontSize:   tokens.typography.fontSize.base,
      }}>
        {payload[0].value.toFixed(1)} {unit}
      </p>
    </div>
  );
};

export const EvolutionChart: React.FC<EvolutionChartProps> = ({
  data,
  isLoading = false,
}) => {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('weight');

  const metric  = METRIC_CONFIG[activeMetric];
  const rawData = data[metric.dataKey] as DataPoint[];

  const chartData = rawData.map((d) => ({
    ...d,
    date:     formatDate(d.date, 'dd/MM'),
    fullDate: formatDate(d.date),
  }));

  if (isLoading) {
    return (
      <ChartContainer>
        <ChartHeader>
          <div className="skeleton-title" />
        </ChartHeader>
        <div className="skeleton-chart" />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Evolução ao Longo do Tempo</ChartTitle>
        <ChartTabs>
          {(Object.entries(METRIC_CONFIG) as [MetricKey, MetricConfig][]).map(
            ([key, cfg]) => (
              <ChartTab
                key={key}
                $active={activeMetric === key}
                $color={cfg.color}
                onClick={() => setActiveMetric(key)}
              >
                {cfg.label}
              </ChartTab>
            )
          )}
        </ChartTabs>
      </ChartHeader>

      {chartData.length < 2 ? (
        <EmptyChart>
          <svg width="40" height="40" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span>
            Mínimo de 2 avaliações para exibir o gráfico
          </span>
        </EmptyChart>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="colorGradient"
                x1="0" y1="0" x2="0" y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={metric.color}
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor={metric.color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={tokens.colors.gray[100]}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: tokens.colors.gray[400] }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: tokens.colors.gray[400] }}
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip
              content={<CustomTooltip unit={metric.unit} />}
            />
            <Area
              type="monotone"
              dataKey="value"
              name={metric.label}
              stroke={metric.color}
              strokeWidth={2.5}
              fill="url(#colorGradient)"
              dot={{
                fill:        metric.color,
                strokeWidth: 0,
                r:           4,
              }}
              activeDot={{
                r:           6,
                fill:        metric.color,
                strokeWidth: 2,
                stroke:      tokens.colors.white,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

EvolutionChart.displayName = 'EvolutionChart';
