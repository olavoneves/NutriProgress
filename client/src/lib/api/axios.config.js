import axios from 'axios';
const axiosConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000, // 30 segundos
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};
export const api = axios.create(axiosConfig);
export const apiRefresh = axios.create(axiosConfig);
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
    },
    NUTRITIONISTS: {
        ME: '/nutritionists/me',
        UPDATE_ME: '/nutritionists/me',
    },
    PATIENTS: {
        BASE: '/patients',
        BY_ID: (id) => `/patients/${id}`,
        ARCHIVE: (id) => `/patients/${id}/archive`,
        RESTORE: (id) => `/patients/${id}/restore`,
        EVALUATIONS: (id) => `/patients/${id}/evaluations`,
    },
    EVALUATIONS: {
        BASE: '/evaluations',
        BY_ID: (id) => `/evaluations/${id}`,
    },
};
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};
