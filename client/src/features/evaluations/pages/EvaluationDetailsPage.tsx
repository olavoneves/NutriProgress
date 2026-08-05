import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@components/common/Loading';
import { Button } from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';
import { evaluationService } from '../services';
import { useEvaluationMutations } from '../hooks';
import { MetricCard } from '../components/MetricCard';
import { ROUTES } from '@routes/routes.config';
import { formatDate } from '@utils/formatters';
import { tokens } from '@styles/tokens';
import type { EvaluationDetailDTO } from '../services';
import {
  BackButton,
  PageHeader,
  PageTitle,
  PageSubtitle,
  HeaderActions,
  MetricsGrid,
  SectionCard,
  SectionTitle,
  MeasureGrid,
  MeasureItem,
  MeasureLabel,
  MeasureValue,
  NotesBox,
  ModalText,
  ErrorState,
} from './EvaluationDetailsPage.styles';

const EvaluationDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientId, id } = useParams<{ patientId: string; id: string }>();
  const { deleteEvaluation, isLoading: deleting } = useEvaluationMutations();

  const [evaluation, setEvaluation] = useState<EvaluationDetailDTO | null>(null);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchEvaluation = useCallback(async () => {
    if (!patientId || !id) return;

    setIsLoading(true);
    setError(null);
    try {
      setEvaluation(await evaluationService.getById(patientId, id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar avaliação'
      );
    } finally {
      setIsLoading(false);
    }
  }, [patientId, id]);

  useEffect(() => {
    void fetchEvaluation();
  }, [fetchEvaluation]);

  const backToPatient = () =>
    navigate(ROUTES.PATIENT_DETAILS.replace(':id', patientId!));

  const handleDelete = async () => {
    if (!patientId || !id) return;
    await deleteEvaluation(patientId, id);
    setShowDeleteModal(false);
    backToPatient();
  };

  if (isLoading) {
    return <Loading text="Carregando avaliação..." />;
  }

  if (error || !evaluation) {
    return (
      <ErrorState>
        <p>{error ?? 'Avaliação não encontrada'}</p>
        <Button variant="outline" onClick={backToPatient}>
          Voltar
        </Button>
      </ErrorState>
    );
  }

  const diff = evaluation.evolutionDifference;

  const circumferences = [
    { label: 'Cintura',     value: evaluation.waistCircumference },
    { label: 'Quadril',     value: evaluation.hipCircumference   },
    { label: 'Tórax',       value: evaluation.chestCircumference },
    { label: 'Braço',       value: evaluation.armCircumference   },
    { label: 'Coxa',        value: evaluation.thighCircumference },
    { label: 'Panturrilha', value: evaluation.calfCircumference  },
  ].filter((c): c is { label: string; value: number } => c.value != null);

  return (
    <>
      <BackButton onClick={backToPatient}>
        ← Voltar para {evaluation.patientName}
      </BackButton>

      <PageHeader>
        <div>
          <PageTitle>Avaliação #{evaluation.evaluationNumber}</PageTitle>
          <PageSubtitle>
            {evaluation.patientName} · {formatDate(evaluation.evaluationDate)}
            {diff?.daysSincePrevious != null &&
              ` · ${diff.daysSincePrevious} dias após a anterior`}
          </PageSubtitle>
        </div>

        <HeaderActions>
          <Button
            variant="outline"
            onClick={() =>
              navigate(
                ROUTES.EVALUATION_EDIT
                  .replace(':patientId', patientId!)
                  .replace(':id', id!)
              )
            }
          >
            Editar
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Remover
          </Button>
        </HeaderActions>
      </PageHeader>

      {/* Métricas principais com diferença vs. avaliação anterior */}
      <MetricsGrid>
        <MetricCard
          label="Peso"
          value={evaluation.weight}
          unit="kg"
          difference={diff?.weightDifference}
          color={tokens.colors.brand}
        />
        <MetricCard
          label="IMC"
          value={evaluation.bmi}
          classification={evaluation.bmiClassification}
          difference={diff?.bmiDifference}
          color={tokens.colors.info.main}
        />
        <MetricCard
          label="% Gordura"
          value={evaluation.bodyFatPercentage}
          unit="%"
          difference={diff?.bodyFatDifference}
          color={tokens.colors.error.main}
        />
        <MetricCard
          label="Massa Muscular"
          value={evaluation.muscleMass}
          unit="kg"
          difference={diff?.muscleMassDifference}
          color={tokens.colors.warning.main}
        />
      </MetricsGrid>

      {circumferences.length > 0 && (
        <SectionCard>
          <SectionTitle>Circunferências (cm)</SectionTitle>
          <MeasureGrid>
            {circumferences.map((c) => (
              <MeasureItem key={c.label}>
                <MeasureLabel>{c.label}</MeasureLabel>
                <MeasureValue>{c.value.toFixed(1)} cm</MeasureValue>
              </MeasureItem>
            ))}
          </MeasureGrid>
        </SectionCard>
      )}

      <SectionCard>
        <SectionTitle>Dados Complementares</SectionTitle>
        <MeasureGrid>
          <MeasureItem>
            <MeasureLabel>Altura</MeasureLabel>
            <MeasureValue>
              {evaluation.height != null
                ? `${evaluation.height.toFixed(1)} cm`
                : '—'}
            </MeasureValue>
          </MeasureItem>
          <MeasureItem>
            <MeasureLabel>Gordura Visceral</MeasureLabel>
            <MeasureValue>{evaluation.visceralFat ?? '—'}</MeasureValue>
          </MeasureItem>
          <MeasureItem>
            <MeasureLabel>Registrada em</MeasureLabel>
            <MeasureValue>{formatDate(evaluation.createdAt)}</MeasureValue>
          </MeasureItem>
        </MeasureGrid>
      </SectionCard>

      {evaluation.notes && (
        <SectionCard>
          <SectionTitle>Observações</SectionTitle>
          <NotesBox>{evaluation.notes}</NotesBox>
        </SectionCard>
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Remover Avaliação"
        size="small"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={deleting}
            >
              Remover
            </Button>
          </>
        }
      >
        <ModalText>
          Tem certeza que deseja remover a avaliação #
          {evaluation.evaluationNumber}? Esta ação não pode ser desfeita.
        </ModalText>
      </Modal>
    </>
  );
};

export default EvaluationDetailsPage;
