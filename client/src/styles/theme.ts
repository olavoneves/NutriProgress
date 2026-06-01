import { theme } from '@lib/theme/theme';

export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    error:       theme.colors.danger,
    brand:       theme.colors.primary[500],
    brandHover:  theme.colors.primary[600],
    brandActive: theme.colors.primary[700],
  },
  borderRadius: theme.radii,
} as const;

export type Theme = typeof lightTheme;
export type ThemeColors = Theme['colors'];
