import React from 'react';
import { AuthLayout } from '@components/layout/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { GoogleButton } from '../components/GoogleButton';
import { AuthDivider } from '../components/AuthDivider';
import { useLogin } from '../hooks';
import type { LoginSchema } from '../validations';
import { PageWrapper, CardWrapper } from './LoginPage.styles';

const LoginPage: React.FC = () => {
  const { handleLogin, isGoogleLoading } = useLogin();

  const onSubmit = async (values: LoginSchema) => {
    await handleLogin(values);
  };

  return (
    <AuthLayout>
      <PageWrapper>
        <CardWrapper>
          <LoginForm
            onSubmit={onSubmit}
            registerHref="/register"
          />

          <AuthDivider />

          <GoogleButton
            onClick={() => {
              alert('Google OAuth: integrar com Google Identity Services SDK');
            }}
            isLoading={isGoogleLoading}
          />
        </CardWrapper>
      </PageWrapper>
    </AuthLayout>
  );
};

export { LoginPage };
LoginPage.displayName = 'LoginPage';
