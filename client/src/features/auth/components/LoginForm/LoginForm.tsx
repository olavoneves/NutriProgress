import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { loginSchema, type LoginSchema } from '../../validations';
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormFooter,
  FormLink,
} from './LoginForm.styles';

interface LoginFormProps {
  onSubmit: (values: LoginSchema) => Promise<void>;
  isLoading?: boolean;
  registerHref?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  registerHref = '/register',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loading = isLoading || isSubmitting;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormTitle>Entrar na sua conta</FormTitle>
      <FormSubtitle>
        Bem-vinda de volta! Insira seus dados para continuar.
      </FormSubtitle>

      <Input
        {...register('email')}
        label="Email"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        autoComplete="email"
        required
        leftIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        }
      />

      <Input
        {...register('password')}
        label="Senha"
        type="password"
        placeholder="Sua senha"
        error={errors.password?.message}
        autoComplete="current-password"
        required
        leftIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        }
      />

      <Button
        type="submit"
        fullWidth
        isLoading={loading}
        disabled={loading}
      >
        Entrar
      </Button>

      <FormFooter>
        Não tem uma conta?{' '}
        <FormLink href={registerHref}>Criar conta grátis</FormLink>
      </FormFooter>
    </FormContainer>
  );
};

LoginForm.displayName = 'LoginForm';
