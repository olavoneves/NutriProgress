import React from 'react';
import type { PlanConfig } from '../../config/plans.config';
import type { PlanName } from '../../services';
import {
  CardContainer, CardBadge, CardHeader,
  CardPriceTag, CardPrice, CardPriceSuffix,
  CardDescription, CardDivider,
  FeatureList, FeatureItem, FeatureIcon,
  CardAction, CurrentLabel,
} from './PlanCard.styles';

interface PlanCardProps {
  plan:          PlanConfig;
  currentPlan:   PlanName;
  isCheckingOut: boolean;
  onSelect:      (plan: PlanName) => void;
}

const PLAN_ORDER: PlanName[] = ['FREE', 'STARTER', 'PRO', 'PREMIUM'];

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  currentPlan,
  isCheckingOut,
  onSelect,
}) => {
  const isCurrent  = plan.name === currentPlan;
  const isDowngrade = PLAN_ORDER.indexOf(plan.name) < PLAN_ORDER.indexOf(currentPlan);

  const getActionLabel = () => {
    if (isCurrent)              return 'Plano atual';
    if (plan.name === 'FREE')   return 'Cancelar assinatura';
    if (isDowngrade)            return 'Fazer downgrade';
    return 'Assinar agora';
  };

  const getActionVariant = (): 'primary' | 'outline' | 'ghost' => {
    if (isCurrent)      return 'ghost';
    if (isDowngrade)    return 'outline';
    if (plan.highlight) return 'primary';
    return 'outline';
  };

  return (
    <CardContainer
      $highlight={plan.highlight}
      $color={plan.color}
      $current={isCurrent}
    >
      {plan.badge && (
        <CardBadge $color={plan.color}>{plan.badge}</CardBadge>
      )}

      <CardHeader>
        <h3>{plan.label}</h3>
        <CardPriceTag>
          {plan.price === 0 ? (
            <CardPrice>Grátis</CardPrice>
          ) : (
            <>
              <span className="currency">R$</span>
              <CardPrice>
                {plan.price.toFixed(2).replace('.', ',')}
              </CardPrice>
              <CardPriceSuffix>/mês</CardPriceSuffix>
            </>
          )}
        </CardPriceTag>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardDivider />

      <FeatureList>
        {plan.features.map((feature) => (
          <FeatureItem key={feature.label} $included={feature.included}>
            <FeatureIcon $included={feature.included}>
              {feature.included ? (
                <svg viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </FeatureIcon>
            {feature.label}
          </FeatureItem>
        ))}
      </FeatureList>

      {isCurrent ? (
        <CurrentLabel $color={plan.color}>
          <svg width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Seu plano atual
        </CurrentLabel>
      ) : (
        <CardAction
          $variant={getActionVariant()}
          $color={plan.color}
          onClick={() => onSelect(plan.name)}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? 'Redirecionando...' : getActionLabel()}
        </CardAction>
      )}
    </CardContainer>
  );
};

PlanCard.displayName = 'PlanCard';
