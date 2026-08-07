import type { SidebarSection } from '@components/layout/Sidebar';
import {
  ArchiveIcon,
  BillingIcon,
  DashboardIcon,
  PatientsIcon,
  ProfileIcon,
} from './sidebar.icons';

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
