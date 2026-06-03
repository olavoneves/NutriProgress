export interface Patient {
  id: string;
  nutritionistId: string;
  fullName: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  biologicalSex?: 'MALE' | 'FEMALE';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PatientSummary {
  id: string;
  fullName: string;
  phone?: string;
  age?: number;
  isActive: boolean;
  lastEvaluationDate?: string;
  currentWeight?: number;
  totalEvaluations: number;
}

export interface PatientListResponse {
  content: PatientSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PatientFilters {
  search?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
