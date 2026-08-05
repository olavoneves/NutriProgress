import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Loading } from '@components/common/Loading';
import { usePatients, usePatientMutations } from '../hooks';
import { PatientCard } from '../components/PatientCard';
import { ROUTES } from '@routes/routes.config';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  PatientsGrid,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  ErrorState,
} from './PatientsListPage.styles';

const ArchivedPatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { patients, totalElements, isLoading, error, refetch } = usePatients({
    isActive: false,
  });
  const { restorePatient, isLoading: isRestoring } = usePatientMutations();

  const handleRestore = async (id: string) => {
    try {
      await restorePatient(id);
      await refetch();
    } catch {
      // toast de erro já exibido em usePatientMutations
    }
  };

  const plural = totalElements !== 1;

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Pacientes Arquivados</PageTitle>
          <PageSubtitle>
            {totalElements} paciente{plural ? 's' : ''} arquivado
            {plural ? 's' : ''} · os dados são mantidos e podem ser
            restaurados
          </PageSubtitle>
        </div>
        <Button variant="outline" onClick={() => navigate(ROUTES.PATIENTS)}>
          Ver pacientes ativos
        </Button>
      </PageHeader>

      {isLoading ? (
        <Loading text="Carregando arquivados..." />
      ) : error ? (
        <ErrorState>
          <p>{error}</p>
          <Button variant="outline" onClick={() => void refetch()}>
            Tentar novamente
          </Button>
        </ErrorState>
      ) : patients.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polyline points="21 8 21 21 3 21 3 8" />
              <rect x="1" y="3" width="22" height="5" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
          </EmptyStateIcon>
          <EmptyStateTitle>Nenhum paciente arquivado</EmptyStateTitle>
          <EmptyStateText>
            Pacientes arquivados aparecem aqui e podem ser restaurados a
            qualquer momento.
          </EmptyStateText>
        </EmptyState>
      ) : (
        <PatientsGrid>
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onRestore={handleRestore}
              isRestoring={isRestoring}
            />
          ))}
        </PatientsGrid>
      )}
    </>
  );
};

export default ArchivedPatientsPage;
