import { LoadingPage } from '#/pages/loading-page';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/protectedRoute';

const Login = lazy(() => import('#/pages/login/login'));
const Profile = lazy(() => import('#/pages/profile/profile'));
const SendSuccess = lazy(() => import('#/pages/send-success/sendSuccess'));
const LoadInformation = lazy(
  () => import('#/pages/load-information/loadInformation'),
);
const Home = lazy(() => import('#/pages/home/home'));
const UploadCertificate = lazy(
  () => import('#/pages/upload-certificate/uploadCertificate'),
);
const VerifyCertificate = lazy(
  () => import('#/pages/verify-certificate/verifyCertificate'),
);
const TotalResults = lazy(() => import('#/pages/total-results/totalResults'));
const FilterPage = lazy(() => import('#/pages/results/filter'));
const NotFound = lazy(() => import('#/pages/not-found/notFound'));

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Auth */}
    <Route path="/login" element={<Login />} />
    {/* Utils */}
    <Route path="/loading-page" element={<LoadingPage />} />
    {/* 404 Not found */}
    <Route path="*" element={<NotFound />} />

    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      {/* Cuenta */}
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />

      {/* Steps Formulario */}
      <Route path="/upload-certificate" element={<UploadCertificate />} />
      <Route path="/verify-certificate" element={<VerifyCertificate />} />
      <Route path="/load-information" element={<LoadInformation />} />
      <Route path="/send-success" element={<SendSuccess />} />

      {/* Filters & Results */}
      <Route path="/filter-results" element={<FilterPage />} />
      <Route path="/total-results" element={<TotalResults />} />
    </Route>
  </Routes>
);

export default AppRoutes;
