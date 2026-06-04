import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientMutations } from '../hooks';
import { PatientForm } from '../components/PatientForm';
import { ROUTES } from '@routes/routes.config';
import {
  BackButton,
  PageHeader,
  PageTitle,
  PageSubtitle,
  FormCard,
} from './CreatePatientPage.styles';

const CreatePatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { createPatient, isLoading } = usePatientMutations();

  return (
    <>
      <BackButton onClick={() => navigate(ROUTES.PATIENTS)}>
        ← Voltar para pacientes
      </BackButton>

      <PageHeader>
        <PageTitle>Novo Paciente</PageTitle>
        <PageSubtitle>
          Preencha os dados para cadastrar um novo paciente
        </PageSubtitle>
      </PageHeader>

      <FormCard>
        <PatientForm
          onSubmit={createPatient}
          onCancel={() => navigate(ROUTES.PATIENTS)}
          isLoading={isLoading}
          submitLabel="Cadastrar Paciente"
        />
      </FormCard>
    </>
  );
};

export default CreatePatientPage;
