import { createContext } from 'react';
import type { AuthUser, LoginCredentials } from '../../@types';

export interface AuthState {
  user:            AuthUser | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  error:           string | null;
}

export interface AuthContextValue extends AuthState {
  login:       (credentials: LoginCredentials) => Promise<void>;
  loginGoogle: (idToken: string) => Promise<void>;
  logout:      () => void;
  clearError:  () => void;
}

/**
 * O contexto vive em um módulo separado do Provider para que o arquivo do
 * Provider exporte apenas componentes (requisito do Fast Refresh do Vite).
 */
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
