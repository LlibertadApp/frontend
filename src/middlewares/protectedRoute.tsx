import { useEffect, useCallback } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';

import { paths } from '#/routes/paths';

export function ProtectedRoute(): React.ReactElement {
  const location = useLocation();
  const { user, logout, checkUser } = useAuth();

  // Verifica user token por cada acceso a ruta protegida
  const verifyToken = useCallback(async () => {
    const verifiedToken = await checkUser(user);
    verifiedToken || logout();
  }, [checkUser, logout, user]);

  useEffect(() => {
    if (user) {
      verifyToken();
    }
  }, [verifyToken, user]);


  return <Outlet />;
}
