import { useState, useEffect, useCallback } from 'react';
import { patientService } from '../services';
import type { PatientDetail } from '../services';

interface UsePatientDetailsReturn {
  patient: PatientDetail | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePatientDetails = (
  id: string | undefined
): UsePatientDetailsReturn => {
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await patientService.getDetailById(id);
      setPatient(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar paciente'
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { void fetch(); }, [fetch]);

  return { patient, isLoading, error, refetch: fetch };
};
