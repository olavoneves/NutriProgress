import React from 'react';
import {
  MetricCardContainer,
  MetricLabel,
  MetricValue,
  MetricUnit,
  MetricDiff,
  MetricClassification,
} from './MetricCard.styles';

interface MetricCardProps {
  label:           string;
  value?:          number | null;
  unit?:           string;
  difference?:     number | null;
  diffLabel?:      string;
  classification?: string;
  color?:          string;
  isLoading?:      boolean;
}

const formatDiff = (diff: number) =>
  diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);

const getDiffDirection = (
  diff: number,
  positiveIsGood: boolean
): 'good' | 'bad' | 'neutral' => {
  if (diff === 0) return 'neutral';
  const improved = positiveIsGood ? diff > 0 : diff < 0;
  return improved ? 'good' : 'bad';
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit = '',
  difference,
  diffLabel = 'vs anterior',
  classification,
  color = '#10b981',
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <MetricCardContainer color={color}>
        <div className="skeleton-label" />
        <div className="skeleton-value" />
      </MetricCardContainer>
    );
  }

  if (value == null) {
    return (
      <MetricCardContainer color={color}>
        <MetricLabel>{label}</MetricLabel>
        <MetricValue $empty>—</MetricValue>
      </MetricCardContainer>
    );
  }

  const isWeightOrFat =
    label.toLowerCase().includes('gordura') ||
    label.toLowerCase().includes('peso');
  const positiveIsGood = !isWeightOrFat;

  const diffDirection =
    difference != null
      ? getDiffDirection(difference, positiveIsGood)
      : undefined;

  return (
    <MetricCardContainer color={color}>
      <MetricLabel>{label}</MetricLabel>
      <MetricValue $empty={false}>
        {value.toFixed(1)}
        {unit && <MetricUnit>{unit}</MetricUnit>}
      </MetricValue>

      {difference != null && (
        <MetricDiff direction={diffDirection!}>
          {formatDiff(difference)} {unit}
          <span className="diff-label">{diffLabel}</span>
        </MetricDiff>
      )}

      {classification && (
        <MetricClassification>{classification}</MetricClassification>
      )}
    </MetricCardContainer>
  );
};

MetricCard.displayName = 'MetricCard';
