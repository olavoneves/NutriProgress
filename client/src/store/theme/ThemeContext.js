import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
const ThemeContext = createContext(null);
export const ThemeModeProvider = ({ children, defaultMode = 'light', }) => {
    const [mode, setModeValue] = useLocalStorage('theme_preference', defaultMode);
    const toggleMode = useCallback(() => {
        setModeValue((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, [setModeValue]);
    const setMode = useCallback((newMode) => {
        setModeValue(newMode);
    }, [setModeValue]);
    return (_jsx(ThemeContext.Provider, { value: { mode, toggleMode, setMode }, children: children }));
};
ThemeModeProvider.displayName = 'ThemeModeProvider';
/**
 * Hook para acessar o ThemeContext (dark/light mode).
 */
export function useThemeMode() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode deve ser usado dentro de um ThemeModeProvider');
    }
    return context;
}
