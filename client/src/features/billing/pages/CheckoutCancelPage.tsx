import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routes/routes.config';
import {
  ResultContainer, ResultIcon,
  ResultTitle, ResultText, ResultAction,
} from './CheckoutResultPage.styles';

const CheckoutCancelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ResultContainer>
      <ResultIcon $success={false}>
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </ResultIcon>
      <ResultTitle>Pagamento cancelado</ResultTitle>
      <ResultText>
        Nenhuma cobrança foi realizada. Você pode tentar novamente
        quando quiser.
      </ResultText>
      <ResultAction onClick={() => navigate(ROUTES.BILLING)}>
        Voltar para planos
      </ResultAction>
    </ResultContainer>
  );
};

export default CheckoutCancelPage;
