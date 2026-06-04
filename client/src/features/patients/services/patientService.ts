import { api, API_ENDPOINTS } from '@lib/api';
import type { PatientSummary, PatientListResponse, PatientFilters } from '../types';

export interface PatientDetail {
  id: string;
  nutritionistId: string;
  fullName: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  height?: number;
  goal?: string;
  notes?: string;
  isActive: boolean;
  lastEvaluation?: {
    evaluationId: string;
    evaluationDate: string;
    evaluationNumber: number;
    weight?: number;
    bmi?: number;
    bodyFatPercentage?: number;
  };
  stats?: {
    totalEvaluations: number;
    firstEvaluationDate?: string;
    lastEvaluationDate?: string;
    daysSinceLastEvaluation?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientData {
  fullName: string;
  email?: string;
  phone?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  birthDate?: string;
  height?: number;
  goal?: string;
  notes?: string;
}

const list = async (
  filters: PatientFilters = {}
): Promise<PatientListResponse> => {
  const params = new URLSearchParams();
  if (filters.search)                params.set('search',        filters.search);
  if (filters.isActive !== undefined) params.set('isActive',      String(filters.isActive));
  if (filters.page !== undefined)     params.set('page',          String(filters.page));
  if (filters.size !== undefined)     params.set('size',          String(filters.size));
  if (filters.sortBy)                 params.set('sortBy',        filters.sortBy);
  if (filters.sortDirection)          params.set('sortDirection', filters.sortDirection);

  const response = await api.get<{ data: PatientListResponse }>(
    `${API_ENDPOINTS.PATIENTS.BASE}?${params.toString()}`
  );
  return response.data.data;
};

const getDetailById = async (id: string): Promise<PatientDetail> => {
  const response = await api.get<{ data: PatientDetail }>(
    API_ENDPOINTS.PATIENTS.BY_ID(id)
  );
  return response.data.data;
};

const create = async (data: CreatePatientData): Promise<PatientDetail> => {
  const response = await api.post<{ data: PatientDetail }>(
    API_ENDPOINTS.PATIENTS.BASE,
    data
  );
  return response.data.data;
};

const update = async (
  id: string,
  data: Partial<CreatePatientData>
): Promise<PatientDetail> => {
  const response = await api.put<{ data: PatientDetail }>(
    API_ENDPOINTS.PATIENTS.BY_ID(id),
    data
  );
  return response.data.data;
};

const archive = async (id: string): Promise<void> => {
  await api.patch(API_ENDPOINTS.PATIENTS.ARCHIVE(id));
};

const restore = async (id: string): Promise<void> => {
  await api.patch(API_ENDPOINTS.PATIENTS.RESTORE(id));
};

export const patientService = {
  list,
  getDetailById,
  create,
  update,
  archive,
  restore,
};

export type { PatientSummary, PatientListResponse, PatientFilters };
