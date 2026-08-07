import { useContext } from 'react';
import { ThemeContext } from './theme.context';
import type { ThemeContextData } from './theme.context';

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
