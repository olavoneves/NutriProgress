import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routes/routes.config';
import {
  ResultContainer, ResultIcon,
  ResultTitle, ResultText, ResultAction,
} from './CheckoutResultPage.styles';

const CheckoutSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(ROUTES.BILLING), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ResultContainer>
      <ResultIcon $success>
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </ResultIcon>
      <ResultTitle>Assinatura ativada com sucesso!</ResultTitle>
      <ResultText>
        Obrigado pela confiança. Seu plano foi ativado e você já pode
        aproveitar todos os recursos. Você será redirecionado em alguns
        segundos...
      </ResultText>
      <ResultAction onClick={() => navigate(ROUTES.BILLING)}>
        Ir para minha assinatura
      </ResultAction>
    </ResultContainer>
  );
};

export default CheckoutSuccessPage;
