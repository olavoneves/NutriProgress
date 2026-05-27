import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@lib/theme';
import { AuthProvider } from '@store/auth';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { AppRoutes } from './routes';
function App() {
    return (_jsx(ThemeProvider, { theme: theme, children: _jsx(ErrorBoundary, { showDetails: import.meta.env.DEV, children: _jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsx(AppRoutes, {}) }) }) }) }));
}
export default App;
