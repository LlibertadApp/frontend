import { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';

export function ProtectedRoute(): React.ReactElement {
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
