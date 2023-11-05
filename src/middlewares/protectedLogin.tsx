import { useAuth } from '#/context/AuthContext';
import { paths } from '#/routes/paths';
import { ReactNode } from 'react';
import { Navigate } from 'react-router';

interface ProtectedLoginProps {
  children: ReactNode;
}

export const ProtectedLogin: React.FC<ProtectedLoginProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (user && isAuthenticated) return <Navigate to={paths.home} />;

  return children;
};
