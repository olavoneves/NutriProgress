/**
 * Configuração centralizada de rotas da aplicação.
 */
export const ROUTES = {
    // Auth
    LOGIN: '/login',
    REGISTER: '/register',
    // App
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    // Patients
    PATIENTS: '/patients',
    PATIENT_DETAIL: (id) => `/patients/${id}`,
    PATIENT_NEW: '/patients/new',
    PATIENT_EDIT: (id) => `/patients/${id}/edit`,
    // Evaluations
    EVALUATIONS: '/evaluations',
    EVALUATION_DETAIL: (id) => `/evaluations/${id}`,
    EVALUATION_NEW: (patientId) => `/patients/${patientId}/evaluations/new`,
    // Errors
    UNAUTHORIZED: '/unauthorized',
    NOT_FOUND: '*',
};
