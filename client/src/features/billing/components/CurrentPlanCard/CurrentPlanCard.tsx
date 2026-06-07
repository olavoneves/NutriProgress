import React from 'react';
import { formatDate, formatCurrency } from '@utils/formatters';
import { PLANS_CONFIG } from '../../config/plans.config';
import type { SubscriptionDTO } from '../../services';
import {
  CardContainer, CardHeader, PlanBadge,
  CardTitle, CardSubtitle, InfoGrid,
  InfoItem, InfoLabel, InfoValue,
  StatusBadge, CancelButton,
} from './CurrentPlanCard.styles';

interface CurrentPlanCardProps {
  subscription: SubscriptionDTO;
  onCancel:     () => void;
  isCanceling:  boolean;
}

export const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({
  subscription,
  onCancel,
  isCanceling,
}) => {
  const planConfig = PLANS_CONFIG.find((p) => p.name === subscription.plan);

  const isFree     = subscription.plan === 'FREE';
  const isCanceled = subscription.status === 'CANCELED';

  return (
    <CardContainer $color={planConfig?.color ?? '#6b7280'}>
      <CardHeader>
        <div>
          <PlanBadge $color={planConfig?.color ?? '#6b7280'}>
            {planConfig?.label ?? subscription.plan}
          </PlanBadge>
          <CardTitle>Sua Assinatura Atual</CardTitle>
          <CardSubtitle>{planConfig?.description}</CardSubtitle>
        </div>

        <StatusBadge $status={subscription.status}>
          {subscription.status === 'ACTIVE'   && '● Ativo'}
          {subscription.status === 'CANCELED' && '● Cancelado'}
          {subscription.status === 'EXPIRED'  && '● Expirado'}
          {subscription.status === 'PENDING'  && '● Pendente'}
          {subscription.status === 'TRIAL'    && '● Trial'}
        </StatusBadge>
      </CardHeader>

      <InfoGrid>
        {!isFree && subscription.amount != null && (
          <InfoItem>
            <InfoLabel>Valor</InfoLabel>
            <InfoValue>
              {formatCurrency(subscription.amount)}
              <span>/mês</span>
            </InfoValue>
          </InfoItem>
        )}

        {subscription.currentPeriodEnd && (
          <InfoItem>
            <InfoLabel>
              {isCanceled ? 'Acesso até' : 'Renovação em'}
            </InfoLabel>
            <InfoValue>
              {formatDate(subscription.currentPeriodEnd)}
            </InfoValue>
          </InfoItem>
        )}

        <InfoItem>
          <InfoLabel>Pacientes</InfoLabel>
          <InfoValue>
            {subscription.limits.currentPatients}
            {!subscription.limits.unlimitedPatients && (
              <span>/ {subscription.limits.maxPatients}</span>
            )}
            {subscription.limits.unlimitedPatients && (
              <span>ilimitados</span>
            )}
          </InfoValue>
        </InfoItem>

        {subscription.paymentMethod && (
          <InfoItem>
            <InfoLabel>Pagamento</InfoLabel>
            <InfoValue>
              {subscription.paymentMethod === 'STRIPE'
                ? 'Cartão de crédito'
                : subscription.paymentMethod}
            </InfoValue>
          </InfoItem>
        )}
      </InfoGrid>

      {!isFree && !isCanceled && subscription.isActive && (
        <CancelButton onClick={onCancel} disabled={isCanceling}>
          {isCanceling ? 'Cancelando...' : 'Cancelar assinatura'}
        </CancelButton>
      )}
    </CardContainer>
  );
};

CurrentPlanCard.displayName = 'CurrentPlanCard';
