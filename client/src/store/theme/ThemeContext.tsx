import { createContext, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';

type ThemeMode = 'light' | 'dark';

interface ThemeContextData {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextData | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
    defaultMode?: ThemeMode;
}

export const ThemeModeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultMode = 'light',
}) => {
    const [mode, setModeValue] = useLocalStorage<ThemeMode>('theme_preference', defaultMode);

    const toggleMode = useCallback(() => {
        setModeValue((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, [setModeValue]);

    const setMode = useCallback(
        (newMode: ThemeMode) => {
            setModeValue(newMode);
        },
        [setModeValue],
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeModeProvider.displayName = 'ThemeModeProvider';

/**
 * Hook para acessar o ThemeContext (dark/light mode).
 */
export function useThemeMode(): ThemeContextData {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode deve ser usado dentro de um ThemeModeProvider');
    }
    return context;
}
