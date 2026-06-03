import React from 'react';
import {
  StatCardContainer,
  StatCardIcon,
  StatCardContent,
  StatCardValue,
  StatCardLabel,
  StatCardTrend,
  StatCardFooter,
} from './StatCard.styles';

export type StatCardColor = 'green' | 'blue' | 'purple' | 'orange' | 'red';

export interface StatCardTrendData {
  value: number;
  label: string;
  direction: 'up' | 'down' | 'neutral';
}

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: StatCardColor;
  trend?: StatCardTrendData;
  footer?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color = 'green',
  trend,
  footer,
  isLoading = false,
  onClick,
}) => {
  if (isLoading) {
    return (
      <StatCardContainer color={color} $clickable={false}>
        <div className="skeleton-icon" />
        <StatCardContent>
          <div className="skeleton-value" />
          <div className="skeleton-label" />
        </StatCardContent>
      </StatCardContainer>
    );
  }

  return (
    <StatCardContainer
      color={color}
      $clickable={!!onClick}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <StatCardIcon color={color}>{icon}</StatCardIcon>

      <StatCardContent>
        <StatCardValue>{value}</StatCardValue>
        <StatCardLabel>{label}</StatCardLabel>
      </StatCardContent>

      {trend && (
        <StatCardTrend direction={trend.direction}>
          {trend.direction === 'up' && <TrendUpIcon />}
          {trend.direction === 'down' && <TrendDownIcon />}
          <span>{trend.value > 0 ? '+' : ''}{trend.value}</span>
          <span className="trend-label">{trend.label}</span>
        </StatCardTrend>
      )}

      {footer && <StatCardFooter>{footer}</StatCardFooter>}
    </StatCardContainer>
  );
};

StatCard.displayName = 'StatCard';
