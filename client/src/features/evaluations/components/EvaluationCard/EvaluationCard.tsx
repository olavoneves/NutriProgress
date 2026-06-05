import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatWeight, formatBMI, formatPercentage } from '@utils/formatters';
import { ROUTES } from '@routes/routes.config';
import type { EvaluationDTO } from '../../services';
import {
  CardContainer,
  CardHeader,
  EvalNumber,
  EvalDate,
  CardMetrics,
  CardMetricItem,
  CardMetricLabel,
  CardMetricValue,
  CardActions,
  ActionButton,
} from './EvaluationCard.styles';

interface EvaluationCardProps {
  evaluation:  EvaluationDTO;
  patientId:   string;
  onDelete?:   (id: string) => void;
  isDeleting?: boolean;
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({
  evaluation,
  patientId,
  onDelete,
  isDeleting = false,
}) => {
  const navigate = useNavigate();

  return (
    <CardContainer>
      <CardHeader>
        <EvalNumber>Avaliação #{evaluation.evaluationNumber}</EvalNumber>
        <EvalDate>{formatDate(evaluation.evaluationDate)}</EvalDate>
      </CardHeader>

      <CardMetrics>
        <CardMetricItem>
          <CardMetricLabel>Peso</CardMetricLabel>
          <CardMetricValue>
            {formatWeight(evaluation.weight)}
          </CardMetricValue>
        </CardMetricItem>

        <CardMetricItem>
          <CardMetricLabel>IMC</CardMetricLabel>
          <CardMetricValue>
            {formatBMI(evaluation.bmi ?? null)}
            {evaluation.bmiClassification && (
              <span className="classification">
                {evaluation.bmiClassification}
              </span>
            )}
          </CardMetricValue>
        </CardMetricItem>

        <CardMetricItem>
          <CardMetricLabel>% Gordura</CardMetricLabel>
          <CardMetricValue>
            {formatPercentage(evaluation.bodyFatPercentage)}
          </CardMetricValue>
        </CardMetricItem>

        <CardMetricItem>
          <CardMetricLabel>Massa Musc.</CardMetricLabel>
          <CardMetricValue>
            {formatWeight(evaluation.muscleMass)}
          </CardMetricValue>
        </CardMetricItem>
      </CardMetrics>

      <CardActions>
        <ActionButton
          onClick={() =>
            navigate(
              ROUTES.EVALUATION_DETAILS
                .replace(':patientId', patientId)
                .replace(':id', evaluation.id)
            )
          }
        >
          Ver detalhes
        </ActionButton>

        {onDelete && (
          <ActionButton
            $danger
            onClick={() => onDelete(evaluation.id)}
            disabled={isDeleting}
          >
            Remover
          </ActionButton>
        )}
      </CardActions>
    </CardContainer>
  );
};

EvaluationCard.displayName = 'EvaluationCard';
