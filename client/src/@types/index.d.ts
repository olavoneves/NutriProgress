/**
 * Tipos globais e declarações de módulos para o NutriProgress Client
 */

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// ============================================================================
// Authentication Types
// ============================================================================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

// ============================================================================
// Nutritionist Types
// ============================================================================

export interface Nutritionist {
  id: string;
  name: string;
  email: string;
  crn?: string;
  phone?: string;
  clinicName?: string;
}

// ============================================================================
// Patient Types
// ============================================================================

export interface Patient {
  id: string;
  nutritionistId: string;
  fullName: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  phone?: string;
  notes?: string;
  active: boolean;
}

export interface CreatePatientInput {
  nutritionistId: string;
  fullName: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  phone?: string;
  notes?: string;
}

export interface UpdatePatientInput extends Partial<CreatePatientInput> {}

// ============================================================================
// Evaluation Types
// ============================================================================

export interface Evaluation {
  id: string;
  patientId: string;
  nutritionistId: string;
  weight?: number;
  height?: number;
  bmi?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  armCircumference?: number;
  thighCircumference?: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  visceralFat?: number;
  notes?: string;
  avaliationDate?: Date;
}

export interface CreateEvaluationInput {
  patientId: string;
  nutritionistId: string;
  weight?: number;
  height?: number;
  bmi?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  armCircumference?: number;
  thighCircumference?: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  visceralFat?: number;
  notes?: string;
  avaliationDate?: Date;
}

export interface UpdateEvaluationInput extends Partial<CreateEvaluationInput> {}

// ============================================================================
// Form Types
// ============================================================================

export interface FieldValidation {
  isValid: boolean;
  error?: string;
}

export interface FormState<T = unknown> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// Utility Types
// ============================================================================

export type ID = string | number;

export type Timestamp = string | Date;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncResult<T = unknown, E = ApiError> {
  data?: T;
  error?: E;
  status: AsyncStatus;
}

export interface FilterOptions {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// Chart Types
// ============================================================================

export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

// ============================================================================
// Storage Types
// ============================================================================

export type StorageKey = 
  | 'auth_tokens'
  | 'user_data'
  | 'theme_preference'
  | 'sidebar_collapsed';

// ============================================================================
// Module Augmentation
// ============================================================================

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

// ============================================================================
// Environment Variables
// ============================================================================

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ============================================================================
// Global Augmentations
// ============================================================================

declare global {
  interface Window {
    __NUTRIPROGRESS_DEBUG__?: boolean;
  }
}

export {};