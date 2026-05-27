import type { ReactNode } from 'react';
type ThemeMode = 'light' | 'dark';
interface ThemeContextData {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    defaultMode?: ThemeMode;
}
export declare const ThemeModeProvider: React.FC<ThemeProviderProps>;
/**
 * Hook para acessar o ThemeContext (dark/light mode).
 */
export declare function useThemeMode(): ThemeContextData;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map