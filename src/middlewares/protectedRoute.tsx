import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';

export function ProtectedRoute(): React.ReactElement {
  const { user, logout } = useAuth();

  if (!user) logout();

  return <Outlet />;
}
