import type { AxiosInstance } from 'axios';
export declare const api: AxiosInstance;
export declare const apiRefresh: AxiosInstance;
export declare const API_ENDPOINTS: {
    readonly AUTH: {
        readonly LOGIN: "/auth/login";
        readonly REFRESH: "/auth/refresh";
        readonly LOGOUT: "/auth/logout";
    };
    readonly NUTRITIONISTS: {
        readonly ME: "/nutritionists/me";
        readonly UPDATE_ME: "/nutritionists/me";
    };
    readonly PATIENTS: {
        readonly BASE: "/patients";
        readonly BY_ID: (id: string) => string;
        readonly ARCHIVE: (id: string) => string;
        readonly RESTORE: (id: string) => string;
        readonly EVALUATIONS: (id: string) => string;
    };
    readonly EVALUATIONS: {
        readonly BASE: "/evaluations";
        readonly BY_ID: (id: string) => string;
    };
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly INTERNAL_SERVER_ERROR: 500;
};
//# sourceMappingURL=axios.config.d.ts.map