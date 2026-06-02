import { api, API_ENDPOINTS } from '@lib/api';
import type {
  LoginFormValues,
  RegisterFormValues,
  LoginApiResponse,
  RegisterApiResponse,
} from '../types';

const login = async (credentials: LoginFormValues) => {
  const response = await api.post<LoginApiResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data;
};

const register = async (
  data: Omit<RegisterFormValues, 'confirmPassword' | 'acceptTerms'>
) => {
  const response = await api.post<RegisterApiResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    data
  );
  return response.data;
};

const loginWithGoogle = async (idToken: string) => {
  const response = await api.post<LoginApiResponse>(
    API_ENDPOINTS.AUTH.GOOGLE,
    { idToken }
  );
  return response.data;
};

export const authService = { login, register, loginWithGoogle };
