import { api, API_ENDPOINTS } from '@lib/api';

export interface EvaluationDTO {
  id: string;
  patientId: string;
  nutritionistId: string;
  evaluationDate: string;
  evaluationNumber: number;
  weight?: number;
  height?: number;
  bmi?: number;
  bmiClassification?: string;
  bodyFatPercentage?: number;
  muscleMass?: number;
  visceralFat?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  chestCircumference?: number;
  armCircumference?: number;
  thighCircumference?: number;
  calfCircumference?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationDetailDTO extends EvaluationDTO {
  patientName: string;
  evolutionDifference?: {
    weightDifference?: number;
    bmiDifference?: number;
    bodyFatDifference?: number;
    muscleMassDifference?: number;
    daysSincePrevious?: number;
  };
}

export interface DataPoint {
  date: string;
  evaluationNumber: number;
  value: number;
}

export interface EvolutionComparison {
  firstEvaluationDate: string;
  firstEvaluationNumber: number;
  firstWeight?: number;
  firstBmi?: number;
  firstBodyFat?: number;
  firstMuscleMass?: number;
  lastEvaluationDate: string;
  lastEvaluationNumber: number;
  lastWeight?: number;
  lastBmi?: number;
  lastBodyFat?: number;
  lastMuscleMass?: number;
  weightDifference?: number;
  bmiDifference?: number;
  bodyFatDifference?: number;
  muscleMassDifference?: number;
  weightChangePercentage?: number;
  bodyFatChangePercentage?: number;
  muscleMassChangePercentage?: number;
  daysBetween?: number;
}

export interface EvolutionDataDTO {
  patientId: string;
  patientName: string;
  weightEvolution:     DataPoint[];
  bmiEvolution:        DataPoint[];
  bodyFatEvolution:    DataPoint[];
  muscleMassEvolution: DataPoint[];
  comparison?: EvolutionComparison;
}

export interface CreateEvaluationData {
  evaluationDate: string;
  weight?: number;
  height?: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  visceralFat?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  chestCircumference?: number;
  armCircumference?: number;
  thighCircumference?: number;
  calfCircumference?: number;
  notes?: string;
}

const listByPatient = async (
  patientId: string
): Promise<EvaluationDTO[]> => {
  const response = await api.get<{ data: EvaluationDTO[] }>(
    API_ENDPOINTS.PATIENTS.EVALUATIONS(patientId)
  );
  return response.data.data;
};

const getById = async (
  patientId: string,
  evaluationId: string
): Promise<EvaluationDetailDTO> => {
  const response = await api.get<{ data: EvaluationDetailDTO }>(
    `${API_ENDPOINTS.PATIENTS.EVALUATIONS(patientId)}/${evaluationId}`
  );
  return response.data.data;
};

const create = async (
  patientId: string,
  data: CreateEvaluationData
): Promise<EvaluationDTO> => {
  const response = await api.post<{ data: EvaluationDTO }>(
    API_ENDPOINTS.PATIENTS.EVALUATIONS(patientId),
    data
  );
  return response.data.data;
};

const update = async (
  patientId: string,
  evaluationId: string,
  data: Partial<CreateEvaluationData>
): Promise<EvaluationDTO> => {
  const response = await api.put<{ data: EvaluationDTO }>(
    `${API_ENDPOINTS.PATIENTS.EVALUATIONS(patientId)}/${evaluationId}`,
    data
  );
  return response.data.data;
};

const remove = async (
  patientId: string,
  evaluationId: string
): Promise<void> => {
  await api.delete(
    `${API_ENDPOINTS.PATIENTS.EVALUATIONS(patientId)}/${evaluationId}`
  );
};

const getEvolution = async (
  patientId: string
): Promise<EvolutionDataDTO> => {
  const response = await api.get<{ data: EvolutionDataDTO }>(
    API_ENDPOINTS.PATIENTS.EVOLUTION(patientId)
  );
  return response.data.data;
};

export const evaluationService = {
  listByPatient,
  getById,
  create,
  update,
  remove,
  getEvolution,
};
