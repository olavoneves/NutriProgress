import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Loading } from '@components/common/Loading';
import { usePatients } from '../hooks';
import { PatientCard } from '../components/PatientCard';
import { PatientFilters } from '../components/PatientFilters';
import { ROUTES } from '@routes/routes.config';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  PatientsGrid,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  ErrorState,
} from './PatientsListPage.styles';

const PatientsListPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    patients,
    totalElements,
    totalPages,
    currentPage,
    isLoading,
    error,
    filters,
    search,
    setSearch,
    setIsActive,
    setPage,
    refetch,
  } = usePatients({ isActive: true });

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Meus Pacientes</PageTitle>
          <PageSubtitle>
            Gerencie e acompanhe todos os seus pacientes
          </PageSubtitle>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate(ROUTES.PATIENT_CREATE)}
          leftIcon={
            <svg width="18" height="18" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          }
        >
          Novo Paciente
        </Button>
      </PageHeader>

      <PatientFilters
        search={search}
        onSearchChange={setSearch}
        activeFilter={filters.isActive}
        onActiveFilterChange={setIsActive}
        totalElements={totalElements}
        isLoading={isLoading}
      />

      {error && (
        <ErrorState>
          <p>Erro ao carregar pacientes: {error}</p>
          <Button variant="outline" onClick={() => void refetch()}>
            Tentar novamente
          </Button>
        </ErrorState>
      )}

      {isLoading ? (
        <Loading text="Carregando pacientes..." />
      ) : patients.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>
            <svg viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </EmptyStateIcon>
          <EmptyStateTitle>Nenhum paciente encontrado</EmptyStateTitle>
          <EmptyStateText>
            {filters.isActive
              ? 'Cadastre seu primeiro paciente para começar'
              : 'Nenhum paciente arquivado'}
          </EmptyStateText>
          {filters.isActive && (
            <Button
              variant="primary"
              onClick={() => navigate(ROUTES.PATIENT_CREATE)}
            >
              Cadastrar Paciente
            </Button>
          )}
        </EmptyState>
      ) : (
        <PatientsGrid>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </PatientsGrid>
      )}

      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            ← Anterior
          </PaginationButton>

          <PaginationInfo>
            Página {currentPage + 1} de {totalPages}
          </PaginationInfo>

          <PaginationButton
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            Próxima →
          </PaginationButton>
        </PaginationContainer>
      )}
    </>
  );
};

export default PatientsListPage;
