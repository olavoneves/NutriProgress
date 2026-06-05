
export const ROUTES = {
  LOGIN:    '/login',
  REGISTER: '/register',

  DASHBOARD: '/dashboard',
  PROFILE:   '/profile',
  BILLING:   '/billing',

  PATIENTS:          '/patients',
  PATIENT_CREATE:    '/patients/new',
  PATIENT_DETAILS:   '/patients/:id',
  PATIENT_EDIT:      '/patients/:id/edit',
  PATIENTS_ARCHIVED: '/patients/archived',

  PATIENT_EVOLUTION:  '/patients/:patientId/evolution',
  EVALUATION_CREATE:  '/patients/:patientId/evaluations/new',
  EVALUATION_DETAILS: '/patients/:patientId/evaluations/:id',

  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
} as const;
