import { useState, useEffect, useCallback } from 'react';
import { evaluationService } from '../services';
import type { EvaluationDTO } from '../services';

interface UseEvaluationsReturn {
  evaluations: EvaluationDTO[];
  isLoading:   boolean;
  error:       string | null;
  refetch:     () => Promise<void>;
}

export const useEvaluations = (
  patientId: string | undefined
): UseEvaluationsReturn => {
  const [evaluations, setEvaluations] = useState<EvaluationDTO[]>([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await evaluationService.listByPatient(patientId);
      setEvaluations(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao carregar avaliações'
      );
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => { void fetchData(); }, [fetchData]);

  return { evaluations, isLoading, error, refetch: fetchData };
};
