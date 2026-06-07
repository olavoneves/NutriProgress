import React from 'react';
import type { PlanLimits } from '../../services';
import {
  LimitsContainer, LimitsTitle,
  LimitRow, LimitLabel, LimitBarWrapper,
  LimitBar, LimitCount, LimitFeatureList,
  LimitFeatureItem, LimitFeatureIcon,
} from './PlanLimitsBar.styles';

interface PlanLimitsBarProps {
  limits: PlanLimits;
}

export const PlanLimitsBar: React.FC<PlanLimitsBarProps> = ({ limits }) => {
  const patientsUsed = limits.currentPatients;
  const patientsMax  = limits.maxPatients;
  const pct = limits.unlimitedPatients
    ? 0
    : Math.min(100, (patientsUsed / patientsMax) * 100);

  const isNearLimit = !limits.unlimitedPatients && pct >= 80;
  const isAtLimit   = !limits.unlimitedPatients && pct >= 100;

  const barColor = isAtLimit
    ? '#ef4444'
    : isNearLimit
    ? '#f59e0b'
    : '#10b981';

  const features = [
    { label: 'Exportar PDF',            included: limits.exportPdf       },
    { label: 'Gráficos avançados',      included: limits.advancedCharts  },
    { label: 'Dashboard personalizado', included: limits.customDashboard },
    { label: 'Multi-usuário',           included: limits.multiUser       },
    { label: 'Suporte prioritário',     included: limits.prioritySupport },
  ];

  return (
    <LimitsContainer>
      <LimitsTitle>Uso do Plano</LimitsTitle>

      <LimitRow>
        <LimitLabel>
          <span>Pacientes ativos</span>
          <LimitCount $warning={isNearLimit} $danger={isAtLimit}>
            {patientsUsed}
            {limits.unlimitedPatients
              ? ' (ilimitado)'
              : ` / ${patientsMax}`}
          </LimitCount>
        </LimitLabel>

        {!limits.unlimitedPatients && (
          <LimitBarWrapper>
            <LimitBar $percent={pct} $color={barColor} />
          </LimitBarWrapper>
        )}
      </LimitRow>

      <LimitFeatureList>
        {features.map((f) => (
          <LimitFeatureItem key={f.label} $included={f.included}>
            <LimitFeatureIcon $included={f.included}>
              {f.included ? '✓' : '✗'}
            </LimitFeatureIcon>
            {f.label}
          </LimitFeatureItem>
        ))}
      </LimitFeatureList>
    </LimitsContainer>
  );
};

PlanLimitsBar.displayName = 'PlanLimitsBar';
