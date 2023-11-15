import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';
import jwt_decode from 'jwt-decode';

export function ProtectedRoute(): React.ReactElement {
  const { logout } = useAuth();

  useEffect(() => {
    const uid = sessionStorage.getItem('uid');
    const userToken = sessionStorage.getItem('token');

    if (!uid || !userToken) {
      logout();
    }
  }, [logout]);

  return <Outlet />;
}
