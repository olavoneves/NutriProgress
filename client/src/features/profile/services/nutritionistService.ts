import { api, API_ENDPOINTS } from '@lib/api';

export interface NutritionistProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  crn?: string;
  phone?: string;
  specialty?: string;
  clinicName?: string;
  avatarUrl?: string;
  subscriptionPlan: 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM';
  subscriptionExpiresAt?: string;
  isSubscriptionActive: boolean;
  stats: {
    totalPatients: number;
    activePatients: number;
    archivedPatients: number;
    totalEvaluations: number;
    evaluationsThisMonth: number;
  };
  createdAt: string;
}

export interface UpdateNutritionistData {
  fullName?: string;
  phone?: string;
  crn?: string;
  specialty?: string;
  clinicName?: string;
  avatarUrl?: string;
}

const getProfile = async (): Promise<NutritionistProfile> => {
  const response = await api.get<{ data: NutritionistProfile }>(
    API_ENDPOINTS.NUTRITIONISTS.ME
  );
  return response.data.data;
};

const updateProfile = async (
  data: UpdateNutritionistData
): Promise<NutritionistProfile> => {
  const response = await api.put<{ data: NutritionistProfile }>(
    API_ENDPOINTS.NUTRITIONISTS.UPDATE_ME,
    data
  );
  return response.data.data;
};

export const nutritionistService = { getProfile, updateProfile };
