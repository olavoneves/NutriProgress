import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import type { AuthUser, AuthTokens, LoginCredentials } from '../../@types';
import { api, API_ENDPOINTS } from '@lib/api';
import { getStoredTokens, setStoredTokens, clearStoredTokens } from '@lib/api';

interface AuthState {
  user:            AuthUser | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  error:           string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: AuthUser }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user:            null,
  isAuthenticated: false,
  isLoading:       true,
  error:           null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user:            action.payload,
        isAuthenticated: true,
        isLoading:       false,
        error:           null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user:            null,
        isAuthenticated: false,
        isLoading:       false,
        error:           action.payload,
      };
    case 'AUTH_LOGOUT':
      return { ...initialState, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  login:       (credentials: LoginCredentials) => Promise<void>;
  loginGoogle: (idToken: string) => Promise<void>;
  logout:      () => void;
  clearError:  () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface LoginApiResponse {
  data: {
    accessToken:  string;
    refreshToken: string;
    expiresIn:    number;
    user: {
      id:               string;
      email:            string;
      fullName:         string;
      role:             string;
      nutritionistId?:  string;
    };
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const tokens = getStoredTokens();
    if (!tokens?.accessToken) {
      dispatch({ type: 'AUTH_LOGOUT' });
      return;
    }

    api
      .get<{ data: { id: string; email: string; fullName: string; role: string } }>(
        API_ENDPOINTS.NUTRITIONISTS.ME
      )
      .then((res) => {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            id:    res.data.data.id,
            email: res.data.data.email,
            name:  res.data.data.fullName,
            role:  res.data.data.role,
          },
        });
      })
      .catch(() => {
        clearStoredTokens();
        dispatch({ type: 'AUTH_LOGOUT' });
      });
  }, []);

  const handleAuthSuccess = useCallback(
    (response: LoginApiResponse['data']) => {
      const tokens: AuthTokens = {
        accessToken:  response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn:    response.expiresIn,
      };
      setStoredTokens(tokens);

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          id:    response.user.id,
          email: response.user.email,
          name:  response.user.fullName,
          role:  response.user.role,
        },
      });
    },
    []
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      dispatch({ type: 'AUTH_START' });
      try {
        const response = await api.post<LoginApiResponse>(
          API_ENDPOINTS.AUTH.LOGIN,
          credentials
        );
        handleAuthSuccess(response.data.data);
      } catch (error: unknown) {
        const message =
          (error as { message?: string }).message || 'Erro ao fazer login';
        dispatch({ type: 'AUTH_FAILURE', payload: message });
        throw error;
      }
    },
    [handleAuthSuccess]
  );

  const loginGoogle = useCallback(
    async (idToken: string) => {
      dispatch({ type: 'AUTH_START' });
      try {
        const response = await api.post<LoginApiResponse>(
          API_ENDPOINTS.AUTH.GOOGLE,
          { idToken }
        );
        handleAuthSuccess(response.data.data);
      } catch (error: unknown) {
        const message =
          (error as { message?: string }).message ||
          'Erro ao fazer login com Google';
        dispatch({ type: 'AUTH_FAILURE', payload: message });
        throw error;
      }
    },
    [handleAuthSuccess]
  );

  const logout = useCallback(() => {
    clearStoredTokens();
    dispatch({ type: 'AUTH_LOGOUT' });
  }, []);

  const clearError = useCallback(
    () => dispatch({ type: 'CLEAR_ERROR' }),
    []
  );

  return (
    <AuthContext.Provider
      value={{ ...state, login, loginGoogle, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.displayName = 'AuthProvider';

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const useAuthContext = useAuth;
