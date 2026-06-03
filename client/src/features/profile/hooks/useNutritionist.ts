import { useState, useEffect, useCallback } from 'react';
import { nutritionistService } from '../services';
import type { NutritionistProfile } from '../services';

interface UseNutritionistReturn {
  nutritionist: NutritionistProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useNutritionist = (): UseNutritionistReturn => {
  const [nutritionist, setNutritionist] = useState<NutritionistProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await nutritionistService.getProfile();
      setNutritionist(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar perfil';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  return { nutritionist, isLoading, error, refetch: fetchProfile };
};
