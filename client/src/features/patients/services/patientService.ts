import { api, API_ENDPOINTS } from '@lib/api';
import type {
  Patient,
  PatientSummary,
  PatientListResponse,
  PatientFilters,
} from '../types';

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

const getById = async (id: string): Promise<Patient> => {
  const response = await api.get<{ data: Patient }>(
    API_ENDPOINTS.PATIENTS.BY_ID(id)
  );
  return response.data.data;
};

const create = async (data: Partial<Patient>): Promise<Patient> => {
  const response = await api.post<{ data: Patient }>(
    API_ENDPOINTS.PATIENTS.BASE,
    data
  );
  return response.data.data;
};

const update = async (
  id: string,
  data: Partial<Patient>
): Promise<Patient> => {
  const response = await api.put<{ data: Patient }>(
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
  getById,
  create,
  update,
  archive,
  restore,
};

export type { PatientSummary, PatientListResponse, PatientFilters };
