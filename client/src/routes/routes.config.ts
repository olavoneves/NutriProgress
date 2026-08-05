
export const ROUTES = {
  LOGIN:    '/login',
  REGISTER: '/register',

  DASHBOARD: '/dashboard',
  PROFILE:   '/profile',
  BILLING:          '/billing',
  BILLING_SUCCESS:  '/billing/success',
  BILLING_CANCEL:   '/billing/cancel',

  // Estáticas antes das dinâmicas: '/patients/new' e '/patients/archived'
  // precisam ser registradas antes de '/patients/:id'.
  PATIENTS:          '/patients',
  PATIENT_CREATE:    '/patients/new',
  PATIENTS_ARCHIVED: '/patients/archived',
  PATIENT_DETAILS:   '/patients/:id',
  PATIENT_EDIT:      '/patients/:id/edit',

  PATIENT_EVOLUTION:  '/patients/:patientId/evolution',
  EVALUATION_CREATE:  '/patients/:patientId/evaluations/new',
  EVALUATION_DETAILS: '/patients/:patientId/evaluations/:id',
  EVALUATION_EDIT:    '/patients/:patientId/evaluations/:id/edit',

  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
} as const;
