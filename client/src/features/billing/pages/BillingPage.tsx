import React, { useState } from 'react';
import { Loading }  from '@components/common/Loading';
import { Modal }    from '@components/ui/Modal';
import { Button }   from '@components/ui/Button';
import { useBilling }      from '../hooks';
import { PlanCard }        from '../components/PlanCard';
import { CurrentPlanCard } from '../components/CurrentPlanCard';
import { PlanLimitsBar }   from '../components/PlanLimitsBar';
import { PLANS_CONFIG }    from '../config/plans.config';
import type { PlanName }   from '../services';
import {
  PageHeader, PageTitle, PageSubtitle,
  BillingGrid, PlansSection, PlansSectionTitle,
  PlansGrid, SidebarSection, ErrorState,
  FAQSection, FAQTitle, FAQList,
  FAQItem, FAQQuestion, FAQAnswer,
} from './BillingPage.styles';

const FAQ_ITEMS = [
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim! Você pode cancelar quando quiser. O acesso permanece até o fim do período pago.',
  },
  {
    q: 'Como funciona o período gratuito?',
    a: 'O plano gratuito não tem limite de tempo, apenas de quantidade de pacientes (5 ativos).',
  },
  {
    q: 'Meus dados são perdidos se eu cancelar?',
    a: 'Não! Seus dados ficam salvos. Ao reativar, tudo estará lá.',
  },
  {
    q: 'Como são cobrados os planos?',
    a: 'Os planos são cobrados mensalmente via cartão de crédito (Stripe). O pagamento é recorrente automático.',
  },
];

const BillingPage: React.FC = () => {
  const {
    subscription, isLoading, isCheckingOut, isCanceling,
    error, startCheckout, cancelSubscription,
  } = useBilling();

  const [showCancelModal,  setShowCancelModal]  = useState(false);
  const [selectedPlan,     setSelectedPlan]     = useState<PlanName | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePlanSelect = (plan: PlanName) => {
    if (plan === 'FREE') {
      setShowCancelModal(true);
      return;
    }
    setSelectedPlan(plan);
    setShowConfirmModal(true);
  };

  const handleConfirmCheckout = async () => {
    if (!selectedPlan) return;
    setShowConfirmModal(false);
    await startCheckout(selectedPlan);
  };

  const handleConfirmCancel = async () => {
    setShowCancelModal(false);
    await cancelSubscription();
  };

  if (isLoading) {
    return <Loading text="Carregando assinatura..." />;
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Plano & Assinatura</PageTitle>
        <PageSubtitle>
          Gerencie seu plano e acompanhe o uso da plataforma
        </PageSubtitle>
      </PageHeader>

      {error && (
        <ErrorState>
          <p>{error}</p>
        </ErrorState>
      )}

      <BillingGrid>
        <PlansSection>
          {subscription && (
            <CurrentPlanCard
              subscription={subscription}
              onCancel={() => setShowCancelModal(true)}
              isCanceling={isCanceling}
            />
          )}

          <PlansSectionTitle>
            Escolha o plano ideal para você
          </PlansSectionTitle>

          <PlansGrid>
            {PLANS_CONFIG.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                currentPlan={subscription?.plan ?? 'FREE'}
                isCheckingOut={isCheckingOut}
                onSelect={handlePlanSelect}
              />
            ))}
          </PlansGrid>
        </PlansSection>

        <SidebarSection>
          {subscription?.limits && (
            <PlanLimitsBar limits={subscription.limits} />
          )}
        </SidebarSection>
      </BillingGrid>

      <FAQSection>
        <FAQTitle>Perguntas Frequentes</FAQTitle>
        <FAQList>
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q}>
              <FAQQuestion>{item.q}</FAQQuestion>
              <FAQAnswer>{item.a}</FAQAnswer>
            </FAQItem>
          ))}
        </FAQList>
      </FAQSection>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Assinatura"
        size="small"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmCheckout}
              isLoading={isCheckingOut}
            >
              Ir para pagamento
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: '#374151' }}>
          Você será redirecionado para o checkout seguro do Stripe
          para assinar o plano{' '}
          <strong>
            {PLANS_CONFIG.find((p) => p.name === selectedPlan)?.label}
          </strong>
          .
        </p>
      </Modal>

      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancelar Assinatura"
        size="small"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
              Manter assinatura
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmCancel}
              isLoading={isCanceling}
            >
              Cancelar assinatura
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ margin: 0, color: '#374151' }}>
            Tem certeza que deseja cancelar sua assinatura?
          </p>
          <ul style={{
            margin: 0,
            paddingLeft: '1.25rem',
            color: '#6b7280',
            fontSize: '0.875rem',
          }}>
            <li>Você mantém o acesso até o fim do período pago</li>
            <li>Seus dados não serão perdidos</li>
            <li>Pode reativar a qualquer momento</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default BillingPage;
