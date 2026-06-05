import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatientDetails } from '@features/patients/hooks';
import { useEvaluationMutations } from '../hooks';
import { EvaluationForm } from '../components/EvaluationForm';
import { ROUTES } from '@routes/routes.config';
import type { EvaluationSchema } from '../validations';
import {
  BackButton,
  PageHeader,
  PageTitle,
  PageSubtitle,
  FormCard,
} from './CreateEvaluationPage.styles';

const CreateEvaluationPage: React.FC = () => {
  const navigate              = useNavigate();
  const { patientId }         = useParams<{ patientId: string }>();
  const { patient }           = usePatientDetails(patientId);
  const { createEvaluation, isLoading } = useEvaluationMutations();

  const handleSubmit = async (data: EvaluationSchema) => {
    if (!patientId) return;
    await createEvaluation(patientId, data);
  };

  return (
    <>
      <BackButton
        onClick={() =>
          navigate(ROUTES.PATIENT_DETAILS.replace(':id', patientId!))
        }
      >
        ← Voltar para {patient?.fullName ?? 'paciente'}
      </BackButton>

      <PageHeader>
        <PageTitle>Nova Avaliação</PageTitle>
        <PageSubtitle>
          {patient
            ? `Registrar avaliação para ${patient.fullName}`
            : 'Registrar avaliação corporal'}
        </PageSubtitle>
      </PageHeader>

      <FormCard>
        <EvaluationForm
          onSubmit={handleSubmit}
          onCancel={() =>
            navigate(ROUTES.PATIENT_DETAILS.replace(':id', patientId!))
          }
          isLoading={isLoading}
        />
      </FormCard>
    </>
  );
};

export default CreateEvaluationPage;
