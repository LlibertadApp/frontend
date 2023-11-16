import { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';

export function ProtectedRoute(): React.ReactElement {
  const { user, logout, checkUser } = useAuth();

  // Checks user each time a protected route is visited
  const verifyToken = useCallback(async () => {
    try {
      await checkUser(user);
    } catch (error) {
      logout();
    }
  }, [checkUser, logout, user]);

  useEffect(() => {
    if (user) {
      verifyToken();
    }
  }, [verifyToken, user]);

  return <Outlet />;
}
