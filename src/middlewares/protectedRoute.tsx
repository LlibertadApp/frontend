import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';

export function ProtectedRoute(): React.ReactElement {
  const { user, refreshToken } = useAuth();

  if (!user) refreshToken();

  return <Outlet />;
}
