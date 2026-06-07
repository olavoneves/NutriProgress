import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes.config';
import { LoginPage, RegisterPage } from '@features/auth';
import { DashboardPage } from '@features/dashboard';
import { MainLayout } from '@components/layout/MainLayout';
import { PrivateRoute } from '@components/common/PrivateRoute';
import { Loading } from '@components/common/Loading';
import { useAuth } from '@store/auth';
import { useNutritionist } from '@features/profile';
import { buildSidebarSections } from '@/config/sidebar.config';

const PatientsListPage = React.lazy(
  () => import('@features/patients/pages/PatientsListPage')
);
const PatientDetailsPage = React.lazy(
  () => import('@features/patients/pages/PatientDetailsPage')
);
const CreatePatientPage = React.lazy(
  () => import('@features/patients/pages/CreatePatientPage')
);
const EditPatientPage = React.lazy(
  () => import('@features/patients/pages/EditPatientPage')
);
const CreateEvaluationPage = React.lazy(
  () => import('@features/evaluations/pages/CreateEvaluationPage')
);
const EvolutionPage = React.lazy(
  () => import('@features/evaluations/pages/EvolutionPage')
);
const BillingPage = React.lazy(
  () => import('@features/billing/pages/BillingPage')
);
const CheckoutSuccessPage = React.lazy(
  () => import('@features/billing/pages/CheckoutSuccessPage')
);
const CheckoutCancelPage = React.lazy(
  () => import('@features/billing/pages/CheckoutCancelPage')
);

const PlaceholderPage: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center',
    color: '#6b7280',
  }}>
    <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>
      {title}
    </h1>
    <p>{description}</p>
  </div>
);

const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { nutritionist } = useNutritionist();

  const sidebarSections = buildSidebarSections(
    nutritionist?.stats.activePatients
  );

  return (
    <PrivateRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
      <MainLayout
        userName={user?.name}
        userInfo={user?.email}
        sidebarSections={sidebarSections}
        onLogout={logout}
        version="v0.1.0"
      />
    </PrivateRoute>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path={ROUTES.LOGIN}    element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

      {/* Rotas protegidas com MainLayout */}
      <Route element={<ProtectedLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

        {/* Patients */}
        <Route
          path={ROUTES.PATIENTS}
          element={
            <React.Suspense fallback={<Loading text="Carregando..." />}>
              <PatientsListPage />
            </React.Suspense>
          }
        />
        <Route
          path={ROUTES.PATIENT_CREATE}
          element={
            <React.Suspense fallback={<Loading text="Carregando..." />}>
              <CreatePatientPage />
            </React.Suspense>
          }
        />
        <Route
          path={ROUTES.PATIENT_DETAILS}
          element={
            <React.Suspense fallback={<Loading text="Carregando..." />}>
              <PatientDetailsPage />
            </React.Suspense>
          }
        />
        <Route
          path={ROUTES.PATIENT_EDIT}
          element={
            <React.Suspense fallback={<Loading text="Carregando..." />}>
              <EditPatientPage />
            </React.Suspense>
          }
        />

        {/* Evaluations */}
        <Route
          path={ROUTES.EVALUATION_CREATE}
          element={
            <React.Suspense fallback={<Loading text="Carregando..." />}>
              <CreateEvaluationPage />
            </React.Suspense>
          }
        />
        <Route
          path={ROUTES.PATIENT_EVOLUTION}
          element={
            <React.Suspense fallback={<Loading text="Carregando..." />}>
              <EvolutionPage />
            </React.Suspense>
          }
        />

        <Route
          path={ROUTES.PATIENTS_ARCHIVED}
          element={
            <PlaceholderPage
              title="Arquivados"
              description="Pacientes arquivados serão listados aqui."
            />
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <PlaceholderPage
              title="Meu Perfil"
              description="Página de perfil será implementada aqui."
            />
          }
        />
        <Route
          path={ROUTES.BILLING}
          element={
            <React.Suspense fallback={<Loading text="Carregando..." />}>
              <BillingPage />
            </React.Suspense>
          }
        />
      </Route>

      {/* Rotas públicas do checkout Stripe */}
      <Route
        path={ROUTES.BILLING_SUCCESS}
        element={
          <React.Suspense fallback={<Loading text="Carregando..." />}>
            <CheckoutSuccessPage />
          </React.Suspense>
        }
      />
      <Route
        path={ROUTES.BILLING_CANCEL}
        element={
          <React.Suspense fallback={<Loading text="Carregando..." />}>
            <CheckoutCancelPage />
          </React.Suspense>
        }
      />

      {/* Redirect root */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* 404 */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={
          <PlaceholderPage title="404" description="Página não encontrada." />
        }
      />
    </Routes>
  );
};

AppRoutes.displayName = 'AppRoutes';
