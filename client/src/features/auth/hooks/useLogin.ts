import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@store/auth';
import { ROUTES } from '@routes/routes.config';
import type { LoginFormValues } from '../types';

export const useLogin = () => {
  const { login, loginGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    ROUTES.DASHBOARD;

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success('Login realizado com sucesso!');
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Email ou senha inválidos';
      toast.error(message);
      throw error;
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    setIsGoogleLoading(true);
    try {
      await loginGoogle(idToken);
      toast.success('Login com Google realizado!');
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao fazer login com Google';
      toast.error(message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return { handleLogin, handleGoogleLogin, isGoogleLoading };
};
