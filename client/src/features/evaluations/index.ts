export { evaluationService } from './services';
export type {
  EvaluationDTO,
  EvaluationDetailDTO,
  EvolutionDataDTO,
  EvolutionComparison,
  DataPoint,
  CreateEvaluationData,
} from './services';

export {
  useEvaluations,
  useEvolution,
  useEvaluationMutations,
} from './hooks';

export { EvaluationForm }  from './components/EvaluationForm';
export { EvaluationCard }  from './components/EvaluationCard';
export { MetricCard }      from './components/MetricCard';
export { ComparisonTable } from './components/ComparisonTable';
export { EvolutionChart }  from './components/EvolutionChart';

export { evaluationSchema }      from './validations';
export type { EvaluationSchema } from './validations';

export { calculateEvolution } from './utils';
