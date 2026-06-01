import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@store/auth';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { AppRoutes } from './routes';

function App() {
  return (
    <ErrorBoundary showDetails={import.meta.env.DEV}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
