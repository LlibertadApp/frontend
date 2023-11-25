import { Suspense } from 'react';
import AppRoutes from './routes/routes';
import { LoadingPage } from './pages/loading-page';
import { AuthProvider } from './context/AuthContext';
import { HamburgerProvider } from './context/HamburgerContext';
import { CertificateProvider } from './context/CertificationContext';
import Overlay from './components/overlay';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import TranslationWrapper from './context/TranslationContext';

function App() {
    // Colores definidos
    const colors = {
        violetBrandLight: '#714FB6',
        violetBrand: '#493570',
        white: '#FFFFFF',
        black: '#000000',
        lightGray: '#E3E3E9',
        darkGray: '#363745',
        brandRed: '#AD3459',
    };

    // Creación del tema personalizado
    const theme = createTheme({
        palette: {
            primary: {
                main: colors.violetBrand,
                light: colors.violetBrandLight,
            },
            secondary: {
                main: colors.brandRed,
            },
            error: {
                main: colors.brandRed,
            },
            background: {
                default: colors.lightGray,
                paper: colors.white,
            },
            text: {
                primary: colors.black,
                secondary: colors.darkGray,
            },
        },
    });

    return (
        <TranslationWrapper>
            <AuthProvider>
                <CertificateProvider>
                    <ThemeProvider theme={theme}>
                        <Suspense fallback={<LoadingPage />}>
                            <HamburgerProvider>
                                <Overlay>
                                    <AnimatePresence>
                                        <AppRoutes />
                                    </AnimatePresence>
                                </Overlay>
                            </HamburgerProvider>
                        </Suspense>
                    </ThemeProvider>
                </CertificateProvider>
            </AuthProvider>
        </TranslationWrapper>
    );
}

export default App;
