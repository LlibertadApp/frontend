import { Suspense } from 'react';
import AppRoutes from './routes/routes';
import { LoadingPage } from './pages/loading-page';
import { AuthProvider } from './context/AuthContext';
import './App.css';

import { LoaderProvider } from './context/LoaderContext';
import LoadingOverlay from './components/loadingOverlay';

import Overlay from './components/overlay';
import { HamburgerProvider } from './context/HamburgerContext';
import { CertificadoProvider } from './context/CertificationContext';

function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        {/* TODO: Agregar un spinner de carga o algun mensaje mientras se carga la app. */}
        <CertificadoProvider>
          <Suspense fallback={<LoadingPage />}>
            <HamburgerProvider>
              <Overlay>
                <LoadingOverlay />
                <AppRoutes />
              </Overlay>
            </HamburgerProvider>
          </Suspense>
        </CertificadoProvider>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;
