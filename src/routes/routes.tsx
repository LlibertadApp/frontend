import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '#/middlewares/protectedRoute';
import { LoadingPage } from '#/pages/loading-page';
import { paths } from './paths';
import AnimatedRoute from '#/components/animatedRoute';

const Login = lazy(() => import('#/pages/login/login'));
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

const FilterPage = lazy(() => import('#/pages/filter-results/filterResults'));
const Irregularities = lazy(
  () => import('#/pages/irregularities/irregularities'),
);
const NotFound = lazy(() => import('#/pages/not-found/notFound'));
const DeskList = lazy(() => import('#/pages/desk-list/deskList'));

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<AnimatedRoute />}>
        {/* Public routes */}
        {/* <Route element={<PublicRoute path={paths.home} />}> */}
        {/* Auth */}
        <Route path={paths.index} element={<Login />} />
        {/* </Route> */}
        {/* Utils */}
        <Route path={paths.loadingPage} element={<LoadingPage />} />
        {/* 404 Not found */}
        <Route path="*" element={<NotFound />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* Cuenta */}
          <Route path={paths.home} element={<Home />} />

          {/* Steps Formulario */}
          <Route
            path={paths.uploadCertificate}
            element={<UploadCertificate />}
          />
          <Route
            path={paths.verifyCertificate}
            element={<VerifyCertificate />}
          />
          <Route path={paths.loadInformation} element={<LoadInformation />} />
          <Route path={paths.sendSuccess} element={<SendSuccess />} />
          <Route path={paths.uploadFailed} element={<UploadFailed />} />

          {/* Filters, Results & Irregularities */}
          <Route path={paths.filterResults} element={<FilterPage />} />
          <Route path={paths.totalResults} element={<TotalResults />} />
          <Route path={paths.irregularities} element={<Irregularities />} />
          <Route path={paths.deskList} element={<DeskList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
