import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getStoredTokens, clearStoredTokens } from '@lib/api';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
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
    const login = useCallback(async (_credentials) => {
        setIsLoading(true);
        try {
            // TODO: Chamar authService.login(credentials)
            // const response = await authService.login(credentials);
            // setTokens(response.tokens);
            // setUser(response.user);
            // setStoredTokens(response.tokens);
            throw new Error('Login não implementado ainda');
        }
        catch (error) {
            clearStoredTokens();
            setUser(null);
            setTokens(null);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const logout = useCallback(() => {
        clearStoredTokens();
        setUser(null);
        setTokens(null);
        // TODO: Chamar authService.logout() (invalidar refresh token no backend)
    }, []);
    const updateUser = useCallback((updatedUser) => {
        setUser(updatedUser);
    }, []);
    return (_jsx(AuthContext.Provider, { value: {
            user,
            tokens,
            isAuthenticated: !!tokens?.accessToken,
            isLoading,
            login,
            logout,
            updateUser,
        }, children: children }));
};
AuthProvider.displayName = 'AuthProvider';
/**
 * Hook para acessar o AuthContext.
 * Deve ser usado dentro de um AuthProvider.
 */
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
    }
    return context;
}
