import type { SidebarSection } from '@components/layout/Sidebar';

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const PatientsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ArchiveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BillingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export const buildSidebarSections = (
  activePatientsCount?: number
): SidebarSection[] => [
  {
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
      },
      {
        id: 'patients',
        label: 'Meus Pacientes',
        path: '/patients',
        icon: <PatientsIcon />,
        badge: activePatientsCount,
      },
      {
        id: 'patients-archived',
        label: 'Arquivados',
        path: '/patients/archived',
        icon: <ArchiveIcon />,
      },
    ],
  },
  {
    title: 'Conta',
    items: [
      {
        id: 'profile',
        label: 'Meu Perfil',
        path: '/profile',
        icon: <ProfileIcon />,
      },
      {
        id: 'billing',
        label: 'Plano & Assinatura',
        path: '/billing',
        icon: <BillingIcon />,
      },
    ],
  },
];
