import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { ThemeContext } from './theme.context';
import type { ThemeMode } from './theme.context';

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
