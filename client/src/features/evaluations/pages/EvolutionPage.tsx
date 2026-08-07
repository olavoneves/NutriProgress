import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@components/common/Loading';
import { Button } from '@components/ui/Button';
import { tokens } from '@styles/tokens';
import { usePatientDetails } from '@features/patients/hooks';
import { ExportPdfButton } from '@features/reports';
import { useBilling } from '@features/billing';
import { useEvaluations, useEvolution } from '../hooks';
import { EvolutionChart }  from '../components/EvolutionChart';
import { ComparisonTable } from '../components/ComparisonTable';
import { MetricCard }      from '../components/MetricCard';
import { ROUTES }          from '@routes/routes.config';
import {
  BackButton,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MetricsGrid,
  ChartsSection,
  NoDataState,
} from './EvolutionPage.styles';

const EvolutionPage: React.FC = () => {
  const navigate       = useNavigate();
  const { patientId }  = useParams<{ patientId: string }>();

  const { patient, isLoading: loadingPatient } =
    usePatientDetails(patientId);
  const { evaluations, isLoading: loadingEvals } =
    useEvaluations(patientId);
  const { subscription } = useBilling();

  const evolution = useEvolution(evaluations, patient?.fullName ?? '');

  const isLoading = loadingPatient || loadingEvals;
  const last = evaluations[0];

  if (isLoading) {
    return <Loading text="Carregando evolução..." />;
  }

  return (
    <>
      <BackButton
        onClick={() =>
          navigate(ROUTES.PATIENT_DETAILS.replace(':id', patientId!))
        }
      >
        ← Voltar para {patient?.fullName}
      </BackButton>

      <PageHeader>
        <div>
          <PageTitle>Evolução de {patient?.fullName}</PageTitle>
          <PageSubtitle>
            {evaluations.length} avaliação
            {evaluations.length !== 1 ? 'ões' : ''} registrada
            {evaluations.length !== 1 ? 's' : ''}
          </PageSubtitle>
        </div>

        {/* Ver comentario em PatientDetailsPage: otimista durante o load. */}
        <ExportPdfButton
          patientId={patientId!}
          patientName={patient?.fullName ?? ''}
          hasFeature={subscription?.limits.exportPdf ?? true}
          disabled={evaluations.length === 0}
          variant="primary"
        />
      </PageHeader>

      {evaluations.length === 0 ? (
        <NoDataState>
          <p>Nenhuma avaliação registrada para este paciente.</p>
          <Button
            variant="primary"
            onClick={() =>
              navigate(ROUTES.EVALUATION_CREATE.replace(':patientId', patientId!))
            }
          >
            Registrar Avaliação
          </Button>
        </NoDataState>
      ) : (
        <>
          <MetricsGrid>
            <MetricCard
              label="Peso Atual"
              value={last?.weight}
              unit="kg"
              difference={evolution.comparison?.weightDifference}
              color={tokens.colors.brand}
            />
            <MetricCard
              label="IMC"
              value={last?.bmi}
              classification={last?.bmiClassification}
              difference={evolution.comparison?.bmiDifference}
              color={tokens.colors.info.main}
            />
            <MetricCard
              label="% Gordura"
              value={last?.bodyFatPercentage}
              unit="%"
              difference={evolution.comparison?.bodyFatDifference}
              color={tokens.colors.error.main}
            />
            <MetricCard
              label="Massa Muscular"
              value={last?.muscleMass}
              unit="kg"
              difference={evolution.comparison?.muscleMassDifference}
              color={tokens.colors.warning.main}
            />
          </MetricsGrid>

          <ChartsSection>
            <EvolutionChart data={evolution} />
          </ChartsSection>

          {evolution.comparison && evaluations.length >= 2 && (
            <ComparisonTable comparison={evolution.comparison} />
          )}
        </>
      )}
    </>
  );
};

export default EvolutionPage;
