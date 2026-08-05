import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@store/auth';
import { ROUTES } from '@routes/routes.config';
import {
  NotFoundContainer,
  NotFoundCode,
  NotFoundTitle,
  NotFoundText,
  NotFoundAction,
} from './NotFoundPage.styles';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <NotFoundContainer>
      <NotFoundCode>404</NotFoundCode>
      <NotFoundTitle>Página não encontrada</NotFoundTitle>
      <NotFoundText>
        O endereço que você tentou acessar não existe ou foi movido.
      </NotFoundText>
      <NotFoundAction
        onClick={() =>
          navigate(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN)
        }
      >
        {isAuthenticated ? 'Ir para o Dashboard' : 'Ir para o Login'}
      </NotFoundAction>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
