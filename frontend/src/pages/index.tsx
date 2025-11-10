import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../lib/hooks/useAuth';

const HomePage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) {
      void router.replace('/dashboard');
    } else {
      void router.replace('/login');
    }
  }, [user, loading, router]);

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <p>Redirigiendo...</p>
    </div>
  );
};

export default HomePage;
