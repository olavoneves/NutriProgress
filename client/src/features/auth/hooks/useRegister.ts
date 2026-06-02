import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@store/auth';
import { ROUTES } from '@routes/routes.config';
import type { RegisterFormValues } from '../types';

export const useRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      toast.success('Conta criada com sucesso! Bem-vinda ao NutriProgress!');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta';
      toast.error(message);
      throw error;
    }
  };

  return { handleRegister };
};
