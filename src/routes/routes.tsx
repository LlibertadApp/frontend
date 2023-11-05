import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '#/middlewares/protectedRoute';
import { LoadingPage } from '#/pages/loading-page';
import { paths } from './paths';

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

const FilterPage = lazy(() => import('#/pages/filter-results/filter-results'));
const Irregularities = lazy(
  () => import('#/pages/irregularities/irregularities'),
);
const NotFound = lazy(() => import('#/pages/not-found/notFound'));
const DeskList = lazy(() => import('#/pages/desk-list/deskList'));

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Auth */}
    <Route path={paths.login} element={<Login />} />
    {/* Utils */}
    <Route path={paths.loadingPage} element={<LoadingPage />} />
    {/* 404 Not found */}
    <Route path="*" element={<NotFound />} />

    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      {/* Cuenta */}
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.profile} element={<Profile />} />

      {/* Steps Formulario */}
      <Route path={paths.uploadCertificate} element={<UploadCertificate />} />
      <Route path={paths.verifyCertificate} element={<VerifyCertificate />} />
      <Route path={paths.loadInformation} element={<LoadInformation />} />
      <Route path={paths.sendSuccess} element={<SendSuccess />} />
      <Route path={paths.uploadFailed} element={<UploadFailed />} />

      {/* Filters, Results & Irregularities */}
      <Route path={paths.filterResults} element={<FilterPage />} />
      <Route path={paths.totalResults} element={<TotalResults />} />
      <Route path={paths.irregularities} element={<Irregularities />} />
      <Route path={paths.deskList} element={<DeskList />} />
    </Route>
  </Routes>
);

export default AppRoutes;
