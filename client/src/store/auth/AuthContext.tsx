import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, AuthTokens, LoginCredentials } from '../../@types';
import { getStoredTokens, clearStoredTokens } from '@lib/api';

interface AuthContextData {
    user: AuthUser | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [tokens, setTokens] = useState<AuthTokens | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Carrega tokens do storage na inicialização
    useEffect(() => {
        const storedTokens = getStoredTokens();
        if (storedTokens) {
            setTokens(storedTokens);
            // TODO: Buscar dados do usuário com o token (/nutritionists/me)
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (_credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            // TODO: Chamar authService.login(credentials)
            // const response = await authService.login(credentials);
            // setTokens(response.tokens);
            // setUser(response.user);
            // setStoredTokens(response.tokens);
            throw new Error('Login não implementado ainda');
        } catch (error) {
            clearStoredTokens();
            setUser(null);
            setTokens(null);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        clearStoredTokens();
        setUser(null);
        setTokens(null);
        // TODO: Chamar authService.logout() (invalidar refresh token no backend)
    }, []);

    const updateUser = useCallback((updatedUser: AuthUser) => {
        setUser(updatedUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                tokens,
                isAuthenticated: !!tokens?.accessToken,
                isLoading,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.displayName = 'AuthProvider';

/**
 * Hook para acessar o AuthContext.
 * Deve ser usado dentro de um AuthProvider.
 */
export function useAuthContext(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
    }
    return context;
}
