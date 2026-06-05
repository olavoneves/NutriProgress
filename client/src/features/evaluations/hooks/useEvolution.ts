import { useMemo } from 'react';
import { calculateEvolution } from '../utils';
import type { EvaluationDTO, EvolutionDataDTO } from '../services';

export const useEvolution = (
  evaluations: EvaluationDTO[],
  patientName: string
): EvolutionDataDTO => {
  return useMemo(
    () => calculateEvolution(evaluations, patientName),
    [evaluations, patientName]
  );
};
