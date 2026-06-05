import type { EvaluationDTO, EvolutionDataDTO, DataPoint } from '../services';

export const calculateEvolution = (
  evaluations: EvaluationDTO[],
  patientName: string
): EvolutionDataDTO => {
  if (evaluations.length === 0) {
    return {
      patientId: '',
      patientName,
      weightEvolution:     [],
      bmiEvolution:        [],
      bodyFatEvolution:    [],
      muscleMassEvolution: [],
    };
  }

  const sorted = [...evaluations].sort(
    (a, b) =>
      new Date(a.evaluationDate).getTime() -
      new Date(b.evaluationDate).getTime()
  );

  const weightEvolution:     DataPoint[] = [];
  const bmiEvolution:        DataPoint[] = [];
  const bodyFatEvolution:    DataPoint[] = [];
  const muscleMassEvolution: DataPoint[] = [];

  sorted.forEach((ev) => {
    const base: Omit<DataPoint, 'value'> = {
      date:             ev.evaluationDate,
      evaluationNumber: ev.evaluationNumber,
    };

    if (ev.weight != null)
      weightEvolution.push({ ...base, value: ev.weight });
    if (ev.bmi != null)
      bmiEvolution.push({ ...base, value: ev.bmi });
    if (ev.bodyFatPercentage != null)
      bodyFatEvolution.push({ ...base, value: ev.bodyFatPercentage });
    if (ev.muscleMass != null)
      muscleMassEvolution.push({ ...base, value: ev.muscleMass });
  });

  const first = sorted[0];
  const last  = sorted[sorted.length - 1];

  const diff = (a?: number, b?: number) =>
    a != null && b != null ? parseFloat((b - a).toFixed(2)) : undefined;

  const pct = (base?: number, d?: number) =>
    base != null && d != null && base !== 0
      ? parseFloat(((d / base) * 100).toFixed(2))
      : undefined;

  const daysBetween =
    sorted.length > 1
      ? Math.floor(
          (new Date(last.evaluationDate).getTime() -
            new Date(first.evaluationDate).getTime()) /
            86_400_000
        )
      : 0;

  const wDiff  = diff(first.weight,            last.weight);
  const bfDiff = diff(first.bodyFatPercentage, last.bodyFatPercentage);
  const mmDiff = diff(first.muscleMass,        last.muscleMass);

  return {
    patientId:           first.patientId,
    patientName,
    weightEvolution,
    bmiEvolution,
    bodyFatEvolution,
    muscleMassEvolution,
    comparison: {
      firstEvaluationDate:   first.evaluationDate,
      firstEvaluationNumber: first.evaluationNumber,
      firstWeight:           first.weight,
      firstBmi:              first.bmi,
      firstBodyFat:          first.bodyFatPercentage,
      firstMuscleMass:       first.muscleMass,
      lastEvaluationDate:    last.evaluationDate,
      lastEvaluationNumber:  last.evaluationNumber,
      lastWeight:            last.weight,
      lastBmi:               last.bmi,
      lastBodyFat:           last.bodyFatPercentage,
      lastMuscleMass:        last.muscleMass,
      weightDifference:           wDiff,
      bmiDifference:              diff(first.bmi, last.bmi),
      bodyFatDifference:          bfDiff,
      muscleMassDifference:       mmDiff,
      weightChangePercentage:     pct(first.weight,            wDiff),
      bodyFatChangePercentage:    pct(first.bodyFatPercentage, bfDiff),
      muscleMassChangePercentage: pct(first.muscleMass,        mmDiff),
      daysBetween,
    },
  };
};
