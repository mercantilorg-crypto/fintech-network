import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../lib/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      void router.replace('/login');
      return;
    }
    if (allowedRoles && !allowedRoles.some((role) => user.roles.includes(role))) {
      void router.replace('/dashboard');
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <p>Cargando sesión...</p>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.some((role) => user.roles.includes(role))) {
    return null;
  }

  return <>{children}</>;
};
