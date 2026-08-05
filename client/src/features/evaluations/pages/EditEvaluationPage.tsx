import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@components/common/Loading';
import { evaluationService } from '../services';
import { useEvaluationMutations } from '../hooks';
import { EvaluationForm } from '../components/EvaluationForm';
import { ROUTES } from '@routes/routes.config';
import type { EvaluationSchema } from '../validations';
import type { EvaluationDetailDTO } from '../services';
import {
  BackButton,
  PageHeader,
  PageTitle,
  PageSubtitle,
  FormCard,
} from './CreateEvaluationPage.styles';

const EditEvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientId, id } = useParams<{ patientId: string; id: string }>();
  const { updateEvaluation, isLoading: saving } = useEvaluationMutations();

  const [evaluation, setEvaluation] = useState<EvaluationDetailDTO | null>(null);
  const [isLoading, setIsLoading]   = useState(true);

  useEffect(() => {
    if (!patientId || !id) return;

    evaluationService
      .getById(patientId, id)
      .then(setEvaluation)
      .catch(() => setEvaluation(null))
      .finally(() => setIsLoading(false));
  }, [patientId, id]);

  const backToEvaluation = () =>
    navigate(
      ROUTES.EVALUATION_DETAILS
        .replace(':patientId', patientId!)
        .replace(':id', id!)
    );

  const handleSubmit = async (data: EvaluationSchema) => {
    if (!patientId || !id) return;
    await updateEvaluation(patientId, id, data);
  };

  if (isLoading) {
    return <Loading text="Carregando avaliação..." />;
  }

  return (
    <>
      <BackButton onClick={backToEvaluation}>
        ← Voltar para a avaliação
      </BackButton>

      <PageHeader>
        <PageTitle>
          Editar Avaliação
          {evaluation ? ` #${evaluation.evaluationNumber}` : ''}
        </PageTitle>
        <PageSubtitle>
          {evaluation?.patientName ?? 'Atualizar avaliação corporal'}
        </PageSubtitle>
      </PageHeader>

      <FormCard>
        {evaluation && (
          <EvaluationForm
            defaultValues={evaluation}
            onSubmit={handleSubmit}
            onCancel={backToEvaluation}
            isLoading={saving}
            submitLabel="Salvar Alterações"
          />
        )}
      </FormCard>
    </>
  );
};

export default EditEvaluationPage;
