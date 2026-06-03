import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { useAuth } from '@store/auth';
import { useDashboard } from '../hooks';
import { StatCard } from '../components/StatCard';
import { RecentPatientsList } from '../components/RecentPatientsList';
import { EvaluationsMiniChart } from '../components/EvaluationsMiniChart';
import { ROUTES } from '@routes/routes.config';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  WelcomeBanner,
  WelcomeBannerText,
  WelcomeBannerTitle,
  WelcomeBannerSubtitle,
  StatsGrid,
  ContentGrid,
  ContentMain,
  ContentAside,
} from './DashboardPage.styles';

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const UserPlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useDashboard();

  const firstName = user?.name?.split(' ')[0] ?? 'Nutricionista';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Dashboard</PageTitle>
          <PageSubtitle>
            {greeting}, {firstName}! Aqui está o resumo de hoje.
          </PageSubtitle>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate(ROUTES.PATIENT_NEW)}
          leftIcon={<PlusIcon />}
        >
          Novo Paciente
        </Button>
      </PageHeader>

      {!isLoading && data?.stats.totalPatients === 0 && (
        <WelcomeBanner>
          <WelcomeBannerText>
            <WelcomeBannerTitle>
              Bem-vindo ao NutriProgress!
            </WelcomeBannerTitle>
            <WelcomeBannerSubtitle>
              Comece cadastrando seu primeiro paciente e acompanhe
              a evolução nutricional de forma prática.
            </WelcomeBannerSubtitle>
          </WelcomeBannerText>
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.PATIENT_NEW)}
          >
            Cadastrar Primeiro Paciente
          </Button>
        </WelcomeBanner>
      )}

      <StatsGrid>
        <StatCard
          label="Pacientes Ativos"
          value={isLoading ? '—' : (data?.stats.activePatients ?? 0)}
          color="green"
          isLoading={isLoading}
          onClick={() => navigate(ROUTES.PATIENTS)}
          icon={<UsersIcon />}
          footer={`${data?.stats.totalPatients ?? 0} no total`}
        />

        <StatCard
          label="Avaliações este Mês"
          value={isLoading ? '—' : (data?.stats.evaluationsThisMonth ?? 0)}
          color="blue"
          isLoading={isLoading}
          icon={<FileIcon />}
          footer={`${data?.stats.totalEvaluations ?? 0} no total`}
        />

        <StatCard
          label="Total de Pacientes"
          value={isLoading ? '—' : (data?.stats.totalPatients ?? 0)}
          color="purple"
          isLoading={isLoading}
          icon={<UserPlusIcon />}
          footer={`${data?.stats.activePatients ?? 0} ativos`}
        />

        <StatCard
          label="Total de Avaliações"
          value={isLoading ? '—' : (data?.stats.totalEvaluations ?? 0)}
          color="orange"
          isLoading={isLoading}
          icon={<ActivityIcon />}
          footer="registros históricos"
        />
      </StatsGrid>

      <ContentGrid>
        <ContentMain>
          <EvaluationsMiniChart
            isLoading={isLoading}
            totalThisMonth={data?.stats.evaluationsThisMonth}
          />
        </ContentMain>

        <ContentAside>
          <RecentPatientsList
            patients={data?.recentPatients ?? []}
            isLoading={isLoading}
          />
        </ContentAside>
      </ContentGrid>
    </>
  );
};

DashboardPage.displayName = 'DashboardPage';
