import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatRelative, formatWeight } from '@utils/formatters';
import { ROUTES } from '@routes/routes.config';
import type { PatientSummary } from '@features/patients';
import {
  ListContainer,
  ListHeader,
  ListTitle,
  ListAction,
  PatientItem,
  PatientAvatar,
  PatientInfo,
  PatientName,
  PatientMeta,
  PatientWeight,
  EmptyState,
  EmptyIcon,
} from './RecentPatientsList.styles';

interface RecentPatientsListProps {
  patients: PatientSummary[];
  isLoading?: boolean;
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

const AVATAR_COLORS = [
  '#10b981', '#3b82f6', '#8b5cf6',
  '#f59e0b', '#ef4444', '#06b6d4',
];

const getAvatarColor = (name: string): string =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export const RecentPatientsList: React.FC<RecentPatientsListProps> = ({
  patients,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <ListContainer>
        <ListHeader>
          <ListTitle>Pacientes Recentes</ListTitle>
        </ListHeader>
        {Array.from({ length: 4 }).map((_, i) => (
          <PatientItem key={i} $skeleton>
            <div className="skeleton-avatar" />
            <PatientInfo>
              <div className="skeleton-name" />
              <div className="skeleton-meta" />
            </PatientInfo>
          </PatientItem>
        ))}
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>Pacientes Recentes</ListTitle>
        <ListAction onClick={() => navigate(ROUTES.PATIENTS)}>
          Ver todos
        </ListAction>
      </ListHeader>

      {patients.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <svg viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </EmptyIcon>
          <p>Nenhum paciente cadastrado ainda</p>
          <button onClick={() => navigate(ROUTES.PATIENT_CREATE)}>
            Cadastrar primeiro paciente
          </button>
        </EmptyState>
      ) : (
        patients.map((patient) => (
          <PatientItem
            key={patient.id}
            onClick={() => navigate(ROUTES.PATIENT_DETAILS.replace(':id', patient.id))}
            $skeleton={false}
          >
            <PatientAvatar
              style={{ backgroundColor: getAvatarColor(patient.fullName) }}
            >
              {getInitials(patient.fullName)}
            </PatientAvatar>

            <PatientInfo>
              <PatientName>{patient.fullName}</PatientName>
              <PatientMeta>
                {patient.totalEvaluations > 0
                  ? `${patient.totalEvaluations} avaliação${
                      patient.totalEvaluations > 1 ? 'ões' : ''
                    } · ${
                      patient.lastEvaluationDate
                        ? formatRelative(patient.lastEvaluationDate)
                        : 'sem avaliação'
                    }`
                  : 'Sem avaliações'}
              </PatientMeta>
            </PatientInfo>

            {patient.currentWeight && (
              <PatientWeight>
                {formatWeight(patient.currentWeight)}
              </PatientWeight>
            )}
          </PatientItem>
        ))
      )}
    </ListContainer>
  );
};

RecentPatientsList.displayName = 'RecentPatientsList';
