import { createGlobalStyle } from 'styled-components';
import { tokens } from './tokens';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --color-brand:       ${tokens.colors.brand};
    --color-brand-hover: ${tokens.colors.brandHover};
    --color-error:       ${tokens.colors.error.main};
    --color-success:     ${tokens.colors.success.main};
    --color-warning:     ${tokens.colors.warning.main};
    --color-info:        ${tokens.colors.info.main};
    --color-bg:          ${tokens.colors.gray[50]};
    --color-surface:     ${tokens.colors.white};
    --color-text:        ${tokens.colors.gray[900]};
    --color-text-muted:  ${tokens.colors.gray[500]};
    --color-border:      ${tokens.colors.gray[200]};
    --shadow-md:         ${tokens.shadows.md};
    --radius-lg:         ${tokens.borderRadius.lg};
    --transition:        ${tokens.transitions.normal};
    --font-sans:         ${tokens.typography.fontFamily.sans};
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-sans);
    font-size: ${tokens.typography.fontSize.base};
    line-height: ${tokens.typography.lineHeight.normal};
    color: var(--color-text);
    background-color: var(--color-bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${tokens.typography.fontWeight.bold};
    line-height: ${tokens.typography.lineHeight.tight};
    color: ${tokens.colors.gray[900]};
  }

  h1 { font-size: ${tokens.typography.fontSize['3xl']}; }
  h2 { font-size: ${tokens.typography.fontSize['2xl']}; }
  h3 { font-size: ${tokens.typography.fontSize.xl}; }
  h4 { font-size: ${tokens.typography.fontSize.lg}; }
  h5 { font-size: ${tokens.typography.fontSize.base}; }
  h6 { font-size: ${tokens.typography.fontSize.sm}; }

  p {
    line-height: ${tokens.typography.lineHeight.relaxed};
    color: ${tokens.colors.gray[700]};
  }

  a {
    color: var(--color-brand);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--color-brand-hover);
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${tokens.colors.gray[100]};
    border-radius: ${tokens.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${tokens.colors.gray[300]};
    border-radius: ${tokens.borderRadius.full};

    &:hover {
      background: ${tokens.colors.gray[400]};
    }
  }

  :focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  ::selection {
    background-color: ${tokens.colors.primary[100]};
    color: ${tokens.colors.primary[900]};
  }
`;
