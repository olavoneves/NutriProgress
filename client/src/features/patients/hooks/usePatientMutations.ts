import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { patientService } from '../services';
import { ROUTES } from '@routes/routes.config';
import type { PatientSchema } from '../validations';

export const usePatientMutations = () => {
  const navigate            = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const createPatient = async (data: PatientSchema) => {
    setIsLoading(true);
    try {
      const patient = await patientService.create({
        fullName:  data.fullName,
        email:     data.email     || undefined,
        phone:     data.phone     || undefined,
        gender:    data.gender,
        birthDate: data.birthDate || undefined,
        height:    data.height ? parseFloat(data.height) : undefined,
        goal:      data.goal  || undefined,
        notes:     data.notes || undefined,
      });
      toast.success('Paciente cadastrado com sucesso!');
      navigate(ROUTES.PATIENT_DETAILS.replace(':id', patient.id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao cadastrar paciente';
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePatient = async (id: string, data: Partial<PatientSchema>) => {
    setIsLoading(true);
    try {
      await patientService.update(id, {
        fullName:  data.fullName,
        email:     data.email     || undefined,
        phone:     data.phone     || undefined,
        gender:    data.gender,
        birthDate: data.birthDate || undefined,
        height:    data.height ? parseFloat(data.height) : undefined,
        goal:      data.goal  || undefined,
        notes:     data.notes || undefined,
      });
      toast.success('Paciente atualizado com sucesso!');
      navigate(ROUTES.PATIENT_DETAILS.replace(':id', id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao atualizar paciente';
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const archivePatient = async (id: string) => {
    setIsLoading(true);
    try {
      await patientService.archive(id);
      toast.success('Paciente arquivado com sucesso!');
    } catch {
      toast.error('Erro ao arquivar paciente');
      throw new Error('Erro ao arquivar paciente');
    } finally {
      setIsLoading(false);
    }
  };

  const restorePatient = async (id: string) => {
    setIsLoading(true);
    try {
      await patientService.restore(id);
      toast.success('Paciente restaurado com sucesso!');
    } catch {
      toast.error('Erro ao restaurar paciente');
      throw new Error('Erro ao restaurar paciente');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPatient,
    updatePatient,
    archivePatient,
    restorePatient,
    isLoading,
  };
};
