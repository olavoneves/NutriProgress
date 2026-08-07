import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextData {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}

/**
 * O contexto vive em um módulo separado do Provider para que o arquivo do
 * Provider exporte apenas componentes (requisito do Fast Refresh do Vite).
 */
export const ThemeContext = createContext<ThemeContextData | null>(null);
