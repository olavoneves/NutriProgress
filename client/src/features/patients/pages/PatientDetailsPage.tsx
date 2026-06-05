import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Loading } from '@components/common/Loading';
import { Modal } from '@components/ui/Modal';
import { usePatientDetails, usePatientMutations } from '../hooks';
import { PatientDetailCard } from '../components/PatientDetailCard';
import { PatientBadge } from '../components/PatientBadge';
import { useEvaluations, useEvaluationMutations }
  from '@features/evaluations/hooks';
import { EvaluationCard }
  from '@features/evaluations/components/EvaluationCard';
import { ROUTES } from '@routes/routes.config';
import {
  PageHeader,
  BackButton,
  HeaderActions,
  PageTitle,
  PatientStatusRow,
  ContentGrid,
  ContentMain,
  ContentAside,
  SectionCard,
  SectionHeader,
  SectionTitle,
  SectionAction,
  EmptyEvaluations,
  ErrorState,
} from './PatientDetailsPage.styles';

const PatientDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id }   = useParams<{ id: string }>();

  const { patient, isLoading, error, refetch } = usePatientDetails(id);
  const { archivePatient, restorePatient, isLoading: mutating } =
    usePatientMutations();

  const { evaluations, isLoading: loadingEvals, refetch: refetchEvals } =
    useEvaluations(id);
  const { deleteEvaluation, isLoading: deletingEval } =
    useEvaluationMutations();

  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const handleArchive = async () => {
    if (!id) return;
    await archivePatient(id);
    setShowArchiveModal(false);
    void refetch();
  };

  const handleRestore = async () => {
    if (!id) return;
    await restorePatient(id);
    void refetch();
  };

  const handleDeleteEvaluation = async (evaluationId: string) => {
    await deleteEvaluation(id!, evaluationId);
    void refetchEvals();
  };

  if (isLoading) {
    return <Loading text="Carregando paciente..." />;
  }

  if (error || !patient) {
    return (
      <ErrorState>
        <p>{error ?? 'Paciente não encontrado'}</p>
        <Button variant="outline" onClick={() => navigate(ROUTES.PATIENTS)}>
          Voltar para lista
        </Button>
      </ErrorState>
    );
  }

  return (
    <>
      <BackButton onClick={() => navigate(ROUTES.PATIENTS)}>
        ← Voltar para pacientes
      </BackButton>

      <PageHeader>
        <div>
          <PatientStatusRow>
            <PageTitle>{patient.fullName}</PageTitle>
            <PatientBadge
              variant={patient.isActive ? 'active' : 'archived'}
            />
          </PatientStatusRow>
        </div>

        <HeaderActions>
          <Button
            variant="outline"
            onClick={() =>
              navigate(ROUTES.PATIENT_EDIT.replace(':id', id!))
            }
          >
            Editar
          </Button>

          {patient.isActive ? (
            <Button
              variant="danger"
              onClick={() => setShowArchiveModal(true)}
            >
              Arquivar
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={() => void handleRestore()}
              isLoading={mutating}
            >
              Restaurar
            </Button>
          )}

          <Button
            variant="primary"
            onClick={() =>
              navigate(ROUTES.EVALUATION_CREATE.replace(':patientId', id!))
            }
          >
            + Nova Avaliação
          </Button>
        </HeaderActions>
      </PageHeader>

      <ContentGrid>
        <ContentAside>
          <PatientDetailCard patient={patient} />
        </ContentAside>

        <ContentMain>
          <SectionCard>
            <SectionHeader>
              <SectionTitle>
                Avaliações ({evaluations.length})
              </SectionTitle>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {evaluations.length >= 2 && (
                  <SectionAction
                    onClick={() =>
                      navigate(
                        ROUTES.PATIENT_EVOLUTION.replace(':patientId', id!)
                      )
                    }
                  >
                    Ver evolução
                  </SectionAction>
                )}
                <SectionAction
                  onClick={() =>
                    navigate(
                      ROUTES.EVALUATION_CREATE.replace(':patientId', id!)
                    )
                  }
                >
                  + Nova
                </SectionAction>
              </div>
            </SectionHeader>

            {loadingEvals ? (
              <div style={{ padding: '1rem' }}>
                <Loading />
              </div>
            ) : evaluations.length === 0 ? (
              <EmptyEvaluations>
                <p>Nenhuma avaliação registrada ainda.</p>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() =>
                    navigate(
                      ROUTES.EVALUATION_CREATE.replace(':patientId', id!)
                    )
                  }
                >
                  Registrar Primeira Avaliação
                </Button>
              </EmptyEvaluations>
            ) : (
              <div style={{
                display:       'flex',
                flexDirection: 'column',
                gap:           '1rem',
                padding:       '1rem',
              }}>
                {evaluations.map((ev) => (
                  <EvaluationCard
                    key={ev.id}
                    evaluation={ev}
                    patientId={id!}
                    onDelete={handleDeleteEvaluation}
                    isDeleting={deletingEval}
                  />
                ))}
              </div>
            )}
          </SectionCard>
        </ContentMain>
      </ContentGrid>

      <Modal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        title="Arquivar Paciente"
        size="small"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowArchiveModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => void handleArchive()}
              isLoading={mutating}
            >
              Arquivar
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: '#374151' }}>
          Tem certeza que deseja arquivar{' '}
          <strong>{patient.fullName}</strong>?
          O paciente será removido da lista ativa, mas seus dados
          serão mantidos.
        </p>
      </Modal>
    </>
  );
};

export default PatientDetailsPage;
