import { useState, useEffect, useCallback } from 'react';
import { patientService } from '@features/patients';
import { nutritionistService } from '@features/profile';
import type { NutritionistProfile } from '@features/profile';
import type { PatientSummary } from '@features/patients';

interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  evaluationsThisMonth: number;
  totalEvaluations: number;
}

interface DashboardData {
  nutritionist: NutritionistProfile | null;
  recentPatients: PatientSummary[];
  stats: DashboardStats;
}

interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [profile, patientsResponse] = await Promise.all([
        nutritionistService.getProfile(),
        patientService.list({
          isActive: true,
          page: 0,
          size: 5,
          sortBy: 'updatedAt',
          sortDirection: 'DESC',
        }),
      ]);

      setData({
        nutritionist: profile,
        recentPatients: patientsResponse.content,
        stats: {
          totalPatients:        profile.stats.totalPatients,
          activePatients:       profile.stats.activePatients,
          evaluationsThisMonth: profile.stats.evaluationsThisMonth,
          totalEvaluations:     profile.stats.totalEvaluations,
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar dashboard';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return { data, isLoading, error, refetch: fetchDashboard };
};
