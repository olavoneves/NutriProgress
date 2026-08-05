import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatWeight } from '@utils/formatters';
import { ROUTES } from '@routes/routes.config';
import { PatientBadge } from '../PatientBadge';
import type { PatientSummary } from '../../services';
import {
  CardContainer,
  CardAvatar,
  CardContent,
  CardName,
  CardMeta,
  CardMetaItem,
  CardFooter,
  CardFooterItem,
  CardRestoreButton,
} from './PatientCard.styles';

const AVATAR_COLORS = [
  '#10b981', '#3b82f6', '#8b5cf6',
  '#f59e0b', '#ef4444', '#06b6d4',
];

const getAvatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const getInitials = (name: string) =>
  name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase();

interface PatientCardProps {
  patient:      PatientSummary;
  /** Quando informado, exibe a ação de restaurar (usado na lista de arquivados). */
  onRestore?:   (id: string) => void;
  isRestoring?: boolean;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onRestore,
  isRestoring = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.PATIENT_DETAILS.replace(':id', patient.id));
  };

  const getBadgeVariant = () => {
    if (!patient.isActive)               return 'archived' as const;
    if (patient.totalEvaluations === 0)  return 'noEvaluation' as const;
    return 'active' as const;
  };

  return (
    <CardContainer
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <CardAvatar style={{ backgroundColor: getAvatarColor(patient.fullName) }}>
        {getInitials(patient.fullName)}
      </CardAvatar>

      <CardContent>
        <CardName>{patient.fullName}</CardName>

        <CardMeta>
          {patient.age && (
            <CardMetaItem>
              <svg width="13" height="13" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {patient.age} anos
            </CardMetaItem>
          )}
          {patient.phone && (
            <CardMetaItem>
              <svg width="13" height="13" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                         19.79 19.79 0 0 1-8.63-3.07
                         A19.5 19.5 0 0 1 4.69 12.22
                         19.79 19.79 0 0 1 1.61 3.68
                         2 2 0 0 1 3.6 1.5h3a2 2 0 0 1 2 1.72
                         c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11
                         L7.91 9.1a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1
                         2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1
                         21.48 16.92z" />
              </svg>
              {patient.phone}
            </CardMetaItem>
          )}
        </CardMeta>
      </CardContent>

      <CardFooter>
        <PatientBadge variant={getBadgeVariant()} />

        {patient.currentWeight && (
          <CardFooterItem>
            {formatWeight(patient.currentWeight)}
          </CardFooterItem>
        )}

        {patient.lastEvaluationDate && (
          <CardFooterItem>
            {formatDate(patient.lastEvaluationDate)}
          </CardFooterItem>
        )}

        {onRestore && (
          <CardRestoreButton
            type="button"
            disabled={isRestoring}
            onClick={(e) => {
              e.stopPropagation();
              onRestore(patient.id);
            }}
          >
            Restaurar
          </CardRestoreButton>
        )}
      </CardFooter>
    </CardContainer>
  );
};

PatientCard.displayName = 'PatientCard';
