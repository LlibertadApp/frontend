import { Suspense } from 'react';
import AppRoutes from './routes/routes';
import { LoadingPage } from './pages/loading-page';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Overlay from './components/overlay';
import { HamburgerProvider } from './context/HamburgerContext';
import { CertificadoProvider } from './context/CertificationContext';

function App() {
  return (
    <AuthProvider>
      {/* TODO: Agregar un spinner de carga o algun mensaje mientras se carga la app. */}
      <CertificadoProvider>
      <Suspense fallback={<LoadingPage />}>
        <HamburgerProvider>
          <Overlay>
            <AppRoutes />
          </Overlay>
        </HamburgerProvider>
      </Suspense>
      </CertificadoProvider>
    </AuthProvider>
  );
}

export default App;
