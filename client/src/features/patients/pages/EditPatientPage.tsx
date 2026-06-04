import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@components/common/Loading';
import { usePatientDetails, usePatientMutations } from '../hooks';
import { PatientForm } from '../components/PatientForm';
import { ROUTES } from '@routes/routes.config';
import type { PatientSchema } from '../validations';
import {
  BackButton,
  PageHeader,
  PageTitle,
  PageSubtitle,
  FormCard,
} from './CreatePatientPage.styles';

const EditPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { id }   = useParams<{ id: string }>();
  const { patient, isLoading } = usePatientDetails(id);
  const { updatePatient, isLoading: saving } = usePatientMutations();

  const handleSubmit = async (data: PatientSchema) => {
    if (!id) return;
    await updatePatient(id, data);
  };

  if (isLoading) {
    return <Loading text="Carregando paciente..." />;
  }

  return (
    <>
      <BackButton
        onClick={() =>
          navigate(ROUTES.PATIENT_DETAILS.replace(':id', id ?? ''))
        }
      >
        ← Voltar para o paciente
      </BackButton>

      <PageHeader>
        <PageTitle>Editar Paciente</PageTitle>
        <PageSubtitle>
          Atualize os dados de{' '}
          <strong>{patient?.fullName}</strong>
        </PageSubtitle>
      </PageHeader>

      <FormCard>
        {patient && (
          <PatientForm
            defaultValues={patient}
            onSubmit={handleSubmit}
            onCancel={() =>
              navigate(ROUTES.PATIENT_DETAILS.replace(':id', id ?? ''))
            }
            isLoading={saving}
            submitLabel="Salvar Alterações"
          />
        )}
      </FormCard>
    </>
  );
};

export default EditPatientPage;
