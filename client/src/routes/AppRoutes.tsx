import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes.config';
import { LoginPage, RegisterPage } from '@features/auth';
import { DashboardPage } from '@features/dashboard';
import { MainLayout } from '@components/layout/MainLayout';
import { PrivateRoute } from '@components/common/PrivateRoute';
import { useAuth } from '@store/auth';
import { useNutritionist } from '@features/profile';
import { buildSidebarSections } from '@/config/sidebar.config';

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

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path={ROUTES.LOGIN}    element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

      {/* Rotas protegidas com MainLayout */}
      <Route element={<ProtectedLayout />}>
        <Route path={ROUTES.DASHBOARD}        element={<DashboardPage />} />
        <Route path={ROUTES.PATIENTS}         element={<PlaceholderPage title="Pacientes" description="Listagem de pacientes será implementada aqui." />} />
        <Route path={ROUTES.PATIENTS_ARCHIVED} element={<PlaceholderPage title="Arquivados" description="Pacientes arquivados serão listados aqui." />} />
        <Route path={ROUTES.PATIENT_NEW}      element={<PlaceholderPage title="Novo Paciente" description="Formulário de cadastro será implementado aqui." />} />
        <Route path={ROUTES.EVALUATIONS}      element={<PlaceholderPage title="Avaliações" description="Listagem de avaliações será implementada aqui." />} />
        <Route path={ROUTES.PROFILE}          element={<PlaceholderPage title="Meu Perfil" description="Página de perfil será implementada aqui." />} />
        <Route path={ROUTES.BILLING}          element={<PlaceholderPage title="Plano & Assinatura" description="Gestão do plano será implementada aqui." />} />
      </Route>

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* 404 */}
      <Route path={ROUTES.NOT_FOUND} element={<PlaceholderPage title="404" description="Página não encontrada." />} />
    </Routes>
  );
};

AppRoutes.displayName = 'AppRoutes';
