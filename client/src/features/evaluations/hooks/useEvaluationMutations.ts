import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { evaluationService } from '../services';
import { ROUTES } from '@routes/routes.config';
import type { EvaluationSchema } from '../validations';

const toNum = (v?: string) =>
  v && v !== '' ? parseFloat(v) : undefined;

export const useEvaluationMutations = () => {
  const navigate  = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const createEvaluation = async (
    patientId: string,
    data: EvaluationSchema
  ) => {
    setIsLoading(true);
    try {
      await evaluationService.create(patientId, {
        evaluationDate:     data.evaluationDate,
        weight:             toNum(data.weight),
        height:             toNum(data.height),
        bodyFatPercentage:  toNum(data.bodyFatPercentage),
        muscleMass:         toNum(data.muscleMass),
        visceralFat:        toNum(data.visceralFat),
        waistCircumference: toNum(data.waistCircumference),
        hipCircumference:   toNum(data.hipCircumference),
        chestCircumference: toNum(data.chestCircumference),
        armCircumference:   toNum(data.armCircumference),
        thighCircumference: toNum(data.thighCircumference),
        calfCircumference:  toNum(data.calfCircumference),
        notes:              data.notes || undefined,
      });
      toast.success('Avaliação registrada com sucesso!');
      navigate(ROUTES.PATIENT_DETAILS.replace(':id', patientId));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Erro ao criar avaliação'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvaluation = async (
    patientId: string,
    evaluationId: string,
    data: Partial<EvaluationSchema>
  ) => {
    setIsLoading(true);
    try {
      await evaluationService.update(patientId, evaluationId, {
        evaluationDate:     data.evaluationDate,
        weight:             toNum(data.weight),
        height:             toNum(data.height),
        bodyFatPercentage:  toNum(data.bodyFatPercentage),
        muscleMass:         toNum(data.muscleMass),
        visceralFat:        toNum(data.visceralFat),
        waistCircumference: toNum(data.waistCircumference),
        hipCircumference:   toNum(data.hipCircumference),
        chestCircumference: toNum(data.chestCircumference),
        armCircumference:   toNum(data.armCircumference),
        thighCircumference: toNum(data.thighCircumference),
        calfCircumference:  toNum(data.calfCircumference),
        notes:              data.notes || undefined,
      });
      toast.success('Avaliação atualizada com sucesso!');
      navigate(ROUTES.PATIENT_DETAILS.replace(':id', patientId));
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Erro ao atualizar avaliação'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvaluation = async (
    patientId: string,
    evaluationId: string
  ) => {
    setIsLoading(true);
    try {
      await evaluationService.remove(patientId, evaluationId);
      toast.success('Avaliação removida com sucesso!');
    } catch (err) {
      toast.error('Erro ao remover avaliação');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createEvaluation,
    updateEvaluation,
    deleteEvaluation,
    isLoading,
  };
};
