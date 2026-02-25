/**
 * NutriProgress Design Token System
 *
 * Centraliza todas as cores, espaçamentos, tipografia, sombras,
 * border-radius e breakpoints da aplicação.
 */
export declare const theme: {
    readonly colors: {
        readonly primary: {
            readonly 50: "#f0fdf4";
            readonly 100: "#dcfce7";
            readonly 200: "#bbf7d0";
            readonly 300: "#86efac";
            readonly 400: "#4ade80";
            readonly 500: "#10b981";
            readonly 600: "#059669";
            readonly 700: "#047857";
            readonly 800: "#065f46";
            readonly 900: "#064e3b";
        };
        readonly success: {
            readonly 50: "#f0fdf4";
            readonly 100: "#dcfce7";
            readonly 500: "#22c55e";
            readonly 600: "#16a34a";
            readonly 700: "#15803d";
        };
        readonly danger: {
            readonly 50: "#fef2f2";
            readonly 100: "#fee2e2";
            readonly 500: "#ef4444";
            readonly 600: "#dc2626";
            readonly 700: "#b91c1c";
        };
        readonly warning: {
            readonly 50: "#fffbeb";
            readonly 100: "#fef3c7";
            readonly 500: "#f59e0b";
            readonly 600: "#d97706";
            readonly 700: "#b45309";
        };
        readonly info: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
        };
        readonly gray: {
            readonly 50: "#f9fafb";
            readonly 100: "#f3f4f6";
            readonly 200: "#e5e7eb";
            readonly 300: "#d1d5db";
            readonly 400: "#9ca3af";
            readonly 500: "#6b7280";
            readonly 600: "#4b5563";
            readonly 700: "#374151";
            readonly 800: "#1f2937";
            readonly 900: "#111827";
        };
        readonly white: "#ffffff";
        readonly black: "#000000";
        readonly background: "#f9fafb";
        readonly surface: "#ffffff";
        readonly border: "#e5e7eb";
        readonly text: {
            readonly primary: "#111827";
            readonly secondary: "#6b7280";
            readonly disabled: "#9ca3af";
            readonly inverse: "#ffffff";
        };
    };
    readonly spacing: {
        readonly xs: "0.25rem";
        readonly sm: "0.5rem";
        readonly md: "1rem";
        readonly lg: "1.5rem";
        readonly xl: "2rem";
        readonly '2xl': "3rem";
    };
    readonly radii: {
        readonly sm: "0.25rem";
        readonly md: "0.375rem";
        readonly lg: "0.5rem";
        readonly xl: "0.75rem";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        readonly md: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
        readonly lg: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        readonly xl: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        readonly '2xl': "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
    };
    readonly typography: {
        readonly fontFamily: {
            readonly base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            readonly mono: "'Courier New', Consolas, monospace";
        };
        readonly fontSize: {
            readonly xs: "0.75rem";
            readonly sm: "0.875rem";
            readonly base: "1rem";
            readonly lg: "1.125rem";
            readonly xl: "1.25rem";
            readonly '2xl': "1.5rem";
            readonly '3xl': "1.875rem";
        };
        readonly fontWeight: {
            readonly normal: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
        };
        readonly lineHeight: {
            readonly tight: 1.2;
            readonly normal: 1.4;
            readonly relaxed: 1.6;
        };
    };
    readonly breakpoints: {
        readonly sm: "480px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
    };
    readonly transitions: {
        readonly fast: "0.15s ease-in-out";
        readonly normal: "0.2s ease-in-out";
        readonly slow: "0.3s ease-in-out";
    };
    readonly zIndex: {
        readonly dropdown: 50;
        readonly sticky: 100;
        readonly header: 1000;
        readonly modal: 9999;
        readonly overlay: 9998;
    };
    readonly layout: {
        readonly headerHeight: "4rem";
        readonly sidebarWidth: "16rem";
        readonly sidebarCollapsedWidth: "4.5rem";
        readonly maxContentWidth: "1280px";
    };
};
export type AppTheme = typeof theme;
//# sourceMappingURL=theme.d.ts.map