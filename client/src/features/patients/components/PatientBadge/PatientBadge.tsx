import React from 'react';
import { BadgeContainer } from './PatientBadge.styles';

export type PatientBadgeVariant =
  | 'active' | 'archived' | 'new' | 'noEvaluation';

const BADGE_CONFIG: Record<PatientBadgeVariant, {
  label: string; color: string; bg: string;
}> = {
  active:       { label: 'Ativo',         color: '#15803d', bg: '#f0fdf4' },
  archived:     { label: 'Arquivado',     color: '#6b7280', bg: '#f3f4f6' },
  new:          { label: 'Novo',          color: '#1d4ed8', bg: '#eff6ff' },
  noEvaluation: { label: 'Sem Avaliação', color: '#b45309', bg: '#fffbeb' },
};

interface PatientBadgeProps {
  variant: PatientBadgeVariant;
}

export const PatientBadge: React.FC<PatientBadgeProps> = ({ variant }) => {
  const config = BADGE_CONFIG[variant];
  return (
    <BadgeContainer color={config.color} bg={config.bg}>
      {config.label}
    </BadgeContainer>
  );
};

PatientBadge.displayName = 'PatientBadge';
