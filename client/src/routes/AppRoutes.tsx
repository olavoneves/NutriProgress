import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes.config';
import { LoginPage } from '@features/auth';
import { DashboardPage } from '@features/dashboard';
import { MainLayout } from '@components/layout/MainLayout';
import type { SidebarSection } from '@components/layout/Sidebar';

/**
 * Seções do sidebar para o MainLayout
 */
const sidebarSections: SidebarSection[] = [
    {
        title: 'Principal',
        items: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                path: ROUTES.DASHBOARD,
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                ),
            },
            {
                id: 'patients',
                label: 'Pacientes',
                path: ROUTES.PATIENTS,
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                ),
                badge: 24,
            },
            {
                id: 'evaluations',
                label: 'Avaliações',
                path: ROUTES.EVALUATIONS,
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                ),
            },
        ],
    },
    {
        title: 'Configurações',
        items: [
            {
                id: 'profile',
                label: 'Meu Perfil',
                path: ROUTES.PROFILE,
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                ),
            },
        ],
    },
];

/**
 * Layout wrapper para rotas protegidas
 */
const ProtectedLayout: React.FC = () => {
    return (
        <MainLayout
            userName="Dr. Nutricionista"
            userInfo="Nutrição Clínica"
            sidebarSections={sidebarSections}
            version="v0.1.0"
        />
    );
};

/**
 * AppRoutes — Definição de todas as rotas da aplicação.
 */
export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<LoginPage />} />

            {/* Rotas protegidas com MainLayout */}
            <Route element={<ProtectedLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={ROUTES.PATIENTS} element={<PlaceholderPage title="Pacientes" description="Listagem de pacientes será implementada aqui." />} />
                <Route path={ROUTES.EVALUATIONS} element={<PlaceholderPage title="Avaliações" description="Listagem de avaliações será implementada aqui." />} />
                <Route path={ROUTES.PROFILE} element={<PlaceholderPage title="Meu Perfil" description="Página de perfil será implementada aqui." />} />
            </Route>

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

            {/* 404 */}
            <Route path={ROUTES.NOT_FOUND} element={<PlaceholderPage title="404" description="Página não encontrada." />} />
        </Routes>
    );
};

/**
 * Componente placeholder para páginas não implementadas
 */
const PlaceholderPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        textAlign: 'center',
        color: '#6b7280',
    }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>{title}</h1>
        <p>{description}</p>
    </div>
);

AppRoutes.displayName = 'AppRoutes';
