/**
 * Configuração centralizada de rotas da aplicação.
 */
export declare const ROUTES: {
    readonly LOGIN: "/login";
    readonly REGISTER: "/register";
    readonly DASHBOARD: "/dashboard";
    readonly PROFILE: "/profile";
    readonly PATIENTS: "/patients";
    readonly PATIENT_DETAIL: (id: string) => string;
    readonly PATIENT_NEW: "/patients/new";
    readonly PATIENT_EDIT: (id: string) => string;
    readonly EVALUATIONS: "/evaluations";
    readonly EVALUATION_DETAIL: (id: string) => string;
    readonly EVALUATION_NEW: (patientId: string) => string;
    readonly UNAUTHORIZED: "/unauthorized";
    readonly NOT_FOUND: "*";
};
//# sourceMappingURL=routes.config.d.ts.map