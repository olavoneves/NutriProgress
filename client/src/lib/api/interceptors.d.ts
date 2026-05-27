import type { AuthTokens } from '../../@types';
export declare const getStoredTokens: () => AuthTokens | null;
export declare const setStoredTokens: (tokens: AuthTokens) => void;
export declare const clearStoredTokens: () => void;
export declare const setupRequestInterceptor: () => void;
export declare const setupResponseInterceptor: () => void;
/**
 * Configura todos os interceptors
 */
export declare const setupInterceptors: () => void;
//# sourceMappingURL=interceptors.d.ts.map