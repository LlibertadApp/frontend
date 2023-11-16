import { useEffect, useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';

export function ProtectedRoute(): React.ReactElement {
  const { user, logout, checkUser } = useAuth();
  console.log(user)

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
