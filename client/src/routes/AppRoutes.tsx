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
const ArchivedPatientsPage = React.lazy(
  () => import('@features/patients/pages/ArchivedPatientsPage')
);
const CreateEvaluationPage = React.lazy(
  () => import('@features/evaluations/pages/CreateEvaluationPage')
);
const EvaluationDetailsPage = React.lazy(
  () => import('@features/evaluations/pages/EvaluationDetailsPage')
);
const EditEvaluationPage = React.lazy(
  () => import('@features/evaluations/pages/EditEvaluationPage')
);
const EvolutionPage = React.lazy(
  () => import('@features/evaluations/pages/EvolutionPage')
);
const ProfilePage = React.lazy(
  () => import('@features/profile/pages/ProfilePage')
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
const NotFoundPage = React.lazy(
  () => import('@features/shared/pages/NotFoundPage')
);

/** Envolve uma página lazy no Suspense padrão da aplicação. */
const suspended = (node: React.ReactNode) => (
  <React.Suspense fallback={<Loading text="Carregando..." />}>
    {node}
  </React.Suspense>
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

        {/*
          Patients — segmentos estáticos ('/patients/new', '/patients/archived')
          vêm antes do dinâmico '/patients/:id'.
        */}
        <Route
          path={ROUTES.PATIENTS}
          element={suspended(<PatientsListPage />)}
        />
        <Route
          path={ROUTES.PATIENT_CREATE}
          element={suspended(<CreatePatientPage />)}
        />
        <Route
          path={ROUTES.PATIENTS_ARCHIVED}
          element={suspended(<ArchivedPatientsPage />)}
        />
        <Route
          path={ROUTES.PATIENT_DETAILS}
          element={suspended(<PatientDetailsPage />)}
        />
        <Route
          path={ROUTES.PATIENT_EDIT}
          element={suspended(<EditPatientPage />)}
        />
        <Route
          path={ROUTES.PATIENT_EVOLUTION}
          element={suspended(<EvolutionPage />)}
        />

        {/* Evaluations */}
        <Route
          path={ROUTES.EVALUATION_CREATE}
          element={suspended(<CreateEvaluationPage />)}
        />
        <Route
          path={ROUTES.EVALUATION_DETAILS}
          element={suspended(<EvaluationDetailsPage />)}
        />
        <Route
          path={ROUTES.EVALUATION_EDIT}
          element={suspended(<EditEvaluationPage />)}
        />

        {/* Conta */}
        <Route path={ROUTES.PROFILE} element={suspended(<ProfilePage />)} />
        <Route path={ROUTES.BILLING} element={suspended(<BillingPage />)} />
      </Route>

      {/* Rotas públicas do checkout Stripe */}
      <Route
        path={ROUTES.BILLING_SUCCESS}
        element={suspended(<CheckoutSuccessPage />)}
      />
      <Route
        path={ROUTES.BILLING_CANCEL}
        element={suspended(<CheckoutCancelPage />)}
      />

      {/* Redirect root */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* 404 */}
      <Route path={ROUTES.NOT_FOUND} element={suspended(<NotFoundPage />)} />
    </Routes>
  );
};

AppRoutes.displayName = 'AppRoutes';
