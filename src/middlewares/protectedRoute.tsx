import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';
import { paths } from '#/routes/paths';

export const ProtectedRoute: FC<any> = ({
  canActivate,
  redirectPath = paths.home,
}): React.ReactElement | any => {
  const { user, refreshToken } = useAuth();

  if (!user) refreshToken();

  if (!canActivate) return <Navigate to={redirectPath} replace />;

  return <Outlet />;
};
