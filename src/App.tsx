import { Suspense } from 'react';
import AppRoutes from './routes/routes';
import { LoadingPage } from './pages/loading-page';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { LoaderProvider } from './context/LoaderContext';
import LoadingOverlay from './components/loadingOverlay';

function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <Suspense fallback={<LoadingPage />}>
          <LoadingOverlay />
          <AppRoutes />
        </Suspense>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
