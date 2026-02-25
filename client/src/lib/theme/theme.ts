/**
 * NutriProgress Design Token System
 * 
 * Centraliza todas as cores, espaçamentos, tipografia, sombras,
 * border-radius e breakpoints da aplicação.
 */

export const theme = {
  colors: {
    // === Primary (Green) ===
    primary: {
      50:  '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },

    // === Success (Green lighter) ===
    success: {
      50:  '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },

    // === Danger / Error (Red) ===
    danger: {
      50:  '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },

    // === Warning (Amber) ===
    warning: {
      50:  '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },

    // === Info (Blue) ===
    info: {
      50:  '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },

    // === Gray (Neutral) ===
    gray: {
      50:  '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },

    // === Semantic ===
    white: '#ffffff',
    black: '#000000',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#e5e7eb',
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      disabled: '#9ca3af',
      inverse: '#ffffff',
    },
  },

  spacing: {
    xs:   '0.25rem',  // 4px
    sm:   '0.5rem',   // 8px
    md:   '1rem',     // 16px
    lg:   '1.5rem',   // 24px
    xl:   '2rem',     // 32px
    '2xl': '3rem',    // 48px
  },

  radii: {
    sm:   '0.25rem',  // 4px
    md:   '0.375rem', // 6px
    lg:   '0.5rem',   // 8px
    xl:   '0.75rem',  // 12px
    full: '9999px',
  },

  shadows: {
    sm:  '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md:  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    lg:  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    xl:  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '2xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  typography: {
    fontFamily: {
      base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'Courier New', Consolas, monospace",
    },
    fontSize: {
      xs:   '0.75rem',   // 12px
      sm:   '0.875rem',  // 14px
      base: '1rem',      // 16px
      lg:   '1.125rem',  // 18px
      xl:   '1.25rem',   // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },

  breakpoints: {
    sm:  '480px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
  },

  transitions: {
    fast:   '0.15s ease-in-out',
    normal: '0.2s ease-in-out',
    slow:   '0.3s ease-in-out',
  },

  zIndex: {
    dropdown: 50,
    sticky: 100,
    header: 1000,
    modal: 9999,
    overlay: 9998,
  },

  layout: {
    headerHeight: '4rem',
    sidebarWidth: '16rem',
    sidebarCollapsedWidth: '4.5rem',
    maxContentWidth: '1280px',
  },
} as const;

export type AppTheme = typeof theme;
