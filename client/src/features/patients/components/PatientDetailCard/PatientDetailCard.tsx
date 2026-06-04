import React from 'react';
import { formatDate, formatHeight } from '@utils/formatters';
import { GENDER_LABELS } from '@utils/constants';
import type { PatientDetail } from '../../services';
import {
  DetailCardContainer,
  DetailHeader,
  DetailAvatar,
  DetailHeaderInfo,
  DetailName,
  DetailGrid,
  DetailItem,
  DetailItemLabel,
  DetailItemValue,
  DetailSection,
  DetailSectionTitle,
} from './PatientDetailCard.styles';

const AVATAR_COLORS = [
  '#10b981', '#3b82f6', '#8b5cf6',
  '#f59e0b', '#ef4444', '#06b6d4',
];

const getAvatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const getInitials = (name: string) =>
  name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase();

interface PatientDetailCardProps {
  patient: PatientDetail;
}

export const PatientDetailCard: React.FC<PatientDetailCardProps> = ({
  patient,
}) => (
  <DetailCardContainer>
    <DetailHeader>
      <DetailAvatar
        style={{ backgroundColor: getAvatarColor(patient.fullName) }}
      >
        {getInitials(patient.fullName)}
      </DetailAvatar>
      <DetailHeaderInfo>
        <DetailName>{patient.fullName}</DetailName>
        <span>{patient.email ?? '—'}</span>
      </DetailHeaderInfo>
    </DetailHeader>

    <DetailSection>
      <DetailSectionTitle>Dados Pessoais</DetailSectionTitle>
      <DetailGrid>
        <DetailItem>
          <DetailItemLabel>Telefone</DetailItemLabel>
          <DetailItemValue>{patient.phone ?? '—'}</DetailItemValue>
        </DetailItem>
        <DetailItem>
          <DetailItemLabel>Nascimento</DetailItemLabel>
          <DetailItemValue>
            {patient.birthDate
              ? `${formatDate(patient.birthDate)}${
                  patient.age ? ` (${patient.age} anos)` : ''
                }`
              : '—'}
          </DetailItemValue>
        </DetailItem>
        <DetailItem>
          <DetailItemLabel>Gênero</DetailItemLabel>
          <DetailItemValue>
            {patient.gender ? GENDER_LABELS[patient.gender] : '—'}
          </DetailItemValue>
        </DetailItem>
        <DetailItem>
          <DetailItemLabel>Altura</DetailItemLabel>
          <DetailItemValue>
            {formatHeight(patient.height)}
          </DetailItemValue>
        </DetailItem>
      </DetailGrid>
    </DetailSection>

    {patient.goal && (
      <DetailSection>
        <DetailSectionTitle>Objetivo</DetailSectionTitle>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>
          {patient.goal}
        </p>
      </DetailSection>
    )}

    {patient.notes && (
      <DetailSection>
        <DetailSectionTitle>Observações</DetailSectionTitle>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>
          {patient.notes}
        </p>
      </DetailSection>
    )}

    {patient.stats && (
      <DetailSection>
        <DetailSectionTitle>Estatísticas</DetailSectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailItemLabel>Total de Avaliações</DetailItemLabel>
            <DetailItemValue>
              {patient.stats.totalEvaluations}
            </DetailItemValue>
          </DetailItem>
          <DetailItem>
            <DetailItemLabel>Primeira Avaliação</DetailItemLabel>
            <DetailItemValue>
              {formatDate(patient.stats.firstEvaluationDate)}
            </DetailItemValue>
          </DetailItem>
          <DetailItem>
            <DetailItemLabel>Última Avaliação</DetailItemLabel>
            <DetailItemValue>
              {formatDate(patient.stats.lastEvaluationDate)}
            </DetailItemValue>
          </DetailItem>
          <DetailItem>
            <DetailItemLabel>Dias Desde Última</DetailItemLabel>
            <DetailItemValue>
              {patient.stats.daysSinceLastEvaluation != null
                ? `${patient.stats.daysSinceLastEvaluation} dias`
                : '—'}
            </DetailItemValue>
          </DetailItem>
        </DetailGrid>
      </DetailSection>
    )}
  </DetailCardContainer>
);

PatientDetailCard.displayName = 'PatientDetailCard';
