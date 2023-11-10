// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '#/context/AuthContext';

// interface PublicRouteProps {
//   path: string;
// }

// export function PublicRoute({ path }: PublicRouteProps): React.ReactElement {
//   const { user, isAuthenticated } = useAuth();

//   if (user && isAuthenticated) {
//     return <Navigate to={path} replace />;
//   }

//   return <Outlet />;
// }
