
export const ROUTES = {
    // Auth
    LOGIN: '/login',
    REGISTER: '/register',

    // App
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    BILLING: '/billing',

    // Patients
    PATIENTS: '/patients',
    PATIENT_DETAIL: (id: string) => `/patients/${id}`,
    PATIENT_NEW: '/patients/new',
    PATIENT_EDIT: (id: string) => `/patients/${id}/edit`,
    PATIENTS_ARCHIVED: '/patients/archived',

    // Evaluations
    EVALUATIONS: '/evaluations',
    EVALUATION_DETAIL: (id: string) => `/evaluations/${id}`,
    EVALUATION_NEW: (patientId: string) => `/patients/${patientId}/evaluations/new`,

    // Errors
    UNAUTHORIZED: '/unauthorized',
    NOT_FOUND: '*',
} as const;
