import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { lightTheme } from '@styles/theme';
import { GlobalStyles } from '@styles/global';
import { setupInterceptors } from '@lib/api';
import App from './App';

setupInterceptors();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </ThemeProvider>
  </StrictMode>
);
