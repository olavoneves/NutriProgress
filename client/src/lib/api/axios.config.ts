import axios from 'axios';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const api: AxiosInstance = axios.create(axiosConfig);

export const apiRefresh: AxiosInstance = axios.create(axiosConfig);

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN:    '/auth/login',
    REGISTER: '/auth/register',
    REFRESH:  '/auth/refresh',
    LOGOUT:   '/auth/logout',
    GOOGLE:   '/auth/google',
  },
  NUTRITIONISTS: {
    ME: '/nutritionists/me',
    UPDATE_ME: '/nutritionists/me',
  },
  PATIENTS: {
    BASE: '/patients',
    BY_ID: (id: string) => `/patients/${id}`,
    ARCHIVE: (id: string) => `/patients/${id}/archive`,
    RESTORE: (id: string) => `/patients/${id}/restore`,
    EVALUATIONS: (id: string) => `/patients/${id}/evaluations`,
    EVOLUTION:   (id: string) => `/patients/${id}/evolution`,
  },
  EVALUATIONS: {
    BASE: '/evaluations',
    BY_ID: (id: string) => `/evaluations/${id}`,
  },
  BILLING: {
    SUBSCRIPTION: '/billing/subscription',
    CHECKOUT:     '/billing/checkout',
    CANCEL:       '/billing/cancel',
  },
  LGPD: {
    EXPORT:            '/lgpd/export',
    ANONYMIZE_PATIENT: '/lgpd/anonymize-patient',
    ACCOUNT:           '/lgpd/account',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;