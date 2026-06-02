import type { AuthUser, AuthTokens } from '@/@types';

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  crn: string;
  phone?: string;
  specialty?: string;
  clinicName?: string;
  acceptTerms: boolean;
}

export interface LoginApiResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      nutritionistId: string;
    };
  };
}

export interface RegisterApiResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      nutritionistId: string;
    };
  };
}

export type { AuthUser, AuthTokens };
