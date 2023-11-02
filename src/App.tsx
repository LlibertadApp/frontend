import { Suspense } from 'react';
import AppRoutes from './routes/routes';
import { LoadingPage } from './pages/loading-page';
import { AuthProvider } from './context/AuthContext';
import { HamburgerProvider } from './context/HamburgerContext';
import { CertificateProvider } from './context/CertificationContext';
import Overlay from './components/overlay';
import './App.css';

function App() {
  return (
    <AuthProvider>
      {/* TODO: Agregar un spinner de carga o algun mensaje mientras se carga la app. */}
      <CertificateProvider>
        <Suspense fallback={<LoadingPage />}>
          <HamburgerProvider>
            <Overlay>
              <AppRoutes />
            </Overlay>
          </HamburgerProvider>
        </Suspense>
      </CertificateProvider>
    </AuthProvider>
  );
}

export default App;
