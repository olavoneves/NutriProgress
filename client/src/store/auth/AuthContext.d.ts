import type { ReactNode } from 'react';
import type { AuthUser, AuthTokens, LoginCredentials } from '../../@types';
interface AuthContextData {
    user: AuthUser | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    updateUser: (user: AuthUser) => void;
}
interface AuthProviderProps {
    children: ReactNode;
}
export declare const AuthProvider: React.FC<AuthProviderProps>;
/**
 * Hook para acessar o AuthContext.
 * Deve ser usado dentro de um AuthProvider.
 */
export declare function useAuthContext(): AuthContextData;
export {};
//# sourceMappingURL=AuthContext.d.ts.map