export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export type StorageKey = 'auth_tokens' | 'sidebar_collapsed' | 'theme';
