import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '#/middlewares/protectedRoute';
import { LoadingPage } from '#/pages/loading-page';
import { pathTree } from './pathTree';

const Login = lazy(() => import('#/pages/login/login'));
const Profile = lazy(() => import('#/pages/profile/profile'));
const SendSuccess = lazy(() => import('#/pages/send-success/sendSuccess'));
const UploadFailed = lazy(() => import('#/pages/upload-failed/uploadFailed'));
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
    <Route path={pathTree.login.path} element={<Login />} />
    {/* Utils */}
    <Route path={pathTree.loadingPage.path}  element={<LoadingPage />} />
    {/* 404 Not found */}
    <Route path="*" element={<NotFound />} />

    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      {/* Cuenta */}
      <Route path={pathTree.home.path} element={<Home />} />
      <Route path={pathTree.profile.path} element={<Profile />} />

      {/* Steps Formulario */}
      <Route path={pathTree.uploadCertificate.path}  element={<UploadCertificate />} />
      <Route path={pathTree.verifyCertificate.path}  element={<VerifyCertificate />} />
      <Route path={pathTree.loadInformation.path}  element={<LoadInformation />} />
      <Route path={pathTree.sendSuccess.path}  element={<SendSuccess />} />
      <Route path={pathTree.uploadFailed.path}  element={<UploadFailed />} />

      {/* Filters & Results */}
      <Route path={pathTree.filterResults.path}  element={<FilterPage />} />
      <Route path={pathTree.totalResults.path}  element={<TotalResults />} />
    </Route>
  </Routes>
);

export default AppRoutes;
