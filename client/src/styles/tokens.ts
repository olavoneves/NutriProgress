export const tokens = {
  colors: {
    primary: {
      50:  '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },

    brand: '#10b981',
    brandHover: '#059669',
    brandActive: '#047857',

    white: '#ffffff',
    black: '#000000',
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

    error: {
      light: '#fef2f2',
      main:  '#ef4444',
      dark:  '#dc2626',
    },
    warning: {
      light: '#fffbeb',
      main:  '#f59e0b',
      dark:  '#d97706',
    },
    success: {
      light: '#f0fdf4',
      main:  '#22c55e',
      dark:  '#16a34a',
    },
    info: {
      light: '#eff6ff',
      main:  '#3b82f6',
      dark:  '#2563eb',
    },
  },

  typography: {
    fontFamily: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      xs:   '0.75rem',
      sm:   '0.875rem',
      base: '1rem',
      lg:   '1.125rem',
      xl:   '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal:    400,
      medium:    500,
      semibold:  600,
      bold:      700,
      extrabold: 800,
    },
    lineHeight: {
      tight:   1.25,
      snug:    1.375,
      normal:  1.5,
      relaxed: 1.625,
    },
  },

  spacing: {
    0:  '0',
    1:  '0.25rem',
    2:  '0.5rem',
    3:  '0.75rem',
    4:  '1rem',
    5:  '1.25rem',
    6:  '1.5rem',
    8:  '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },

  borderRadius: {
    none: '0',
    sm:   '0.25rem',
    md:   '0.375rem',
    lg:   '0.5rem',
    xl:   '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  shadows: {
    sm:    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md:    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  breakpoints: {
    xs:   '480px',
    sm:   '640px',
    md:   '768px',
    lg:   '1024px',
    xl:   '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    hide:     -1,
    base:     0,
    raised:   1,
    dropdown: 1000,
    sticky:   1100,
    overlay:  1300,
    modal:    1400,
    popover:  1500,
    toast:    1600,
  },

  transitions: {
    fast:   'all 0.15s ease-in-out',
    normal: 'all 0.2s ease-in-out',
    slow:   'all 0.3s ease-in-out',
  },
} as const;

export type Tokens = typeof tokens;
