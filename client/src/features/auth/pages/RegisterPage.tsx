import React from 'react';
import { AuthLayout } from '@components/layout/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';
import { GoogleButton } from '../components/GoogleButton';
import { AuthDivider } from '../components/AuthDivider';
import { authService } from '../services';
import { setStoredTokens } from '@lib/api';
import { ROUTES } from '@routes/routes.config';
import toast from 'react-hot-toast';
import type { RegisterSchema } from '../validations';
import { PageWrapper, CardWrapper } from './RegisterPage.styles';

const RegisterPage: React.FC = () => {

  const onSubmit = async (values: RegisterSchema) => {
    try {
      const response = await authService.register({
        fullName:   values.fullName,
        email:      values.email,
        password:   values.password,
        crn:        values.crn,
        phone:      values.phone,
        specialty:  values.specialty,
        clinicName: values.clinicName,
      });

      setStoredTokens({
        accessToken:  response.data.accessToken,
        refreshToken: response.data.refreshToken,
        expiresIn:    response.data.expiresIn,
      });

      toast.success('Conta criada com sucesso! Bem-vinda ao NutriProgress!');
      window.location.href = ROUTES.DASHBOARD;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta';
      toast.error(message);
      throw error;
    }
  };

  return (
    <AuthLayout>
      <PageWrapper>
        <CardWrapper>
          <GoogleButton
            onClick={() => {
              alert('Google OAuth: integrar com Google Identity Services SDK');
            }}
            isLoading={false}
            label="Registrar com Google"
          />

          <AuthDivider text="ou preencha os dados" />

          <RegisterForm
            onSubmit={onSubmit}
            loginHref="/login"
          />
        </CardWrapper>
      </PageWrapper>
    </AuthLayout>
  );
};

export { RegisterPage };
RegisterPage.displayName = 'RegisterPage';
