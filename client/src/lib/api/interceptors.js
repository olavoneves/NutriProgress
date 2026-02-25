import { AxiosError } from 'axios';
import { api, apiRefresh, API_ENDPOINTS, HTTP_STATUS } from './axios.config';
import { StorageService } from '@services/storage.service';
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        }
        else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};
export const getStoredTokens = () => {
    return StorageService.get('auth_tokens');
};
export const setStoredTokens = (tokens) => {
    StorageService.set('auth_tokens', tokens);
};
export const clearStoredTokens = () => {
    StorageService.remove('auth_tokens');
};
const refreshAccessToken = async () => {
    const tokens = getStoredTokens();
    if (!tokens?.refreshToken) {
        throw new Error('Refresh token não encontrado');
    }
    try {
        const response = await apiRefresh.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken: tokens.refreshToken });
        const newTokens = response.data.data;
        setStoredTokens(newTokens);
        return newTokens.accessToken;
    }
    catch (error) {
        clearStoredTokens();
        throw error;
    }
};
export const setupRequestInterceptor = () => {
    api.interceptors.request.use((config) => {
        const tokens = getStoredTokens();
        if (tokens?.accessToken &&
            config.url !== API_ENDPOINTS.AUTH.LOGIN &&
            config.url !== API_ENDPOINTS.AUTH.REFRESH) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        // Log em desenvolvimento
        if (import.meta.env.DEV) {
            console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    }, (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    });
};
export const setupResponseInterceptor = () => {
    api.interceptors.response.use((response) => {
        // Log em desenvolvimento
        if (import.meta.env.DEV) {
            console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        }
        return response;
    }, async (error) => {
        const originalRequest = error.config;
        // Log do erro
        if (import.meta.env.DEV) {
            console.error('[API Response Error]', {
                url: originalRequest?.url,
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
            });
        }
        // Se o erro for 401 e não for uma requisição de login/refresh
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
            originalRequest &&
            !originalRequest._retry &&
            originalRequest.url !== API_ENDPOINTS.AUTH.LOGIN &&
            originalRequest.url !== API_ENDPOINTS.AUTH.REFRESH) {
            // Se já está fazendo refresh, adiciona à fila
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return api(originalRequest);
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
            }
            // Marca que já tentou fazer refresh
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const newAccessToken = await refreshAccessToken();
                // Atualiza o header da requisição original
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                // Processa a fila de requisições pendentes
                processQueue(null, newAccessToken);
                // Retenta a requisição original
                return api(originalRequest);
            }
            catch (refreshError) {
                // Se o refresh falhar, limpa tokens e redireciona para login
                processQueue(refreshError, null);
                clearStoredTokens();
                // Redireciona para login (será tratado no AuthContext)
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
            finally {
                isRefreshing = false;
            }
        }
        // Para outros erros, formata a resposta de erro
        const apiError = {
            message: error.response?.data?.message || error.message || 'Erro desconhecido',
            code: error.response?.data?.code || error.code,
            status: error.response?.status,
            errors: error.response?.data?.errors,
        };
        return Promise.reject(apiError);
    });
};
/**
 * Configura todos os interceptors
 */
export const setupInterceptors = () => {
    setupRequestInterceptor();
    setupResponseInterceptor();
};
