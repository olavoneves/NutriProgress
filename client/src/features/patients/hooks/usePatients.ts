import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@hooks/useDebounce';
import { patientService } from '../services';
import type { PatientSummary, PatientFilters } from '../services';

interface UsePatientsReturn {
  patients: PatientSummary[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  filters: PatientFilters;
  search: string;
  setSearch: (search: string) => void;
  setIsActive: (isActive: boolean | undefined) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
}

export const usePatients = (
  initialFilters: PatientFilters = {}
): UsePatientsReturn => {
  const [patients, setPatients]           = useState<PatientSummary[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages]       = useState(0);
  const [isLoading, setIsLoading]         = useState(true);
  const [error, setError]                 = useState<string | null>(null);

  const [filters, setFilters] = useState<PatientFilters>({
    page:          0,
    size:          20,
    sortBy:        'fullName',
    sortDirection: 'ASC',
    isActive:      true,
    ...initialFilters,
  });

  const [search, setSearchRaw] = useState(initialFilters.search ?? '');
  const debouncedSearch = useDebounce(search, 400);

  const setSearch = useCallback((value: string) => {
    setSearchRaw(value);
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  const setIsActive = useCallback((isActive: boolean | undefined) => {
    setFilters((prev) => ({ ...prev, isActive, page: 0 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await patientService.list({
        ...filters,
        search: debouncedSearch || undefined,
      });
      setPatients(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar pacientes'
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => { void fetch(); }, [fetch]);

  return {
    patients,
    totalElements,
    totalPages,
    currentPage: filters.page ?? 0,
    isLoading,
    error,
    filters,
    search,
    setSearch,
    setIsActive,
    setPage,
    refetch: fetch,
  };
};
