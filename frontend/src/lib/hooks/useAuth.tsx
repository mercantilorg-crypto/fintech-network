import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../api';
import { AuthUser, clearSession, getStoredUser, setSession } from '../auth';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { email: string; fullName: string; password: string; phone?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    setSession(data.data.token, data.data.user);
    setUser(data.data.user);
    await router.push('/dashboard');
  }, [router]);

  const register = useCallback(
    async (payload: { email: string; fullName: string; password: string; phone?: string }) => {
      const { data } = await apiClient.post('/auth/register', payload);
      setSession(data.data.token, data.data.user);
      setUser(data.data.user);
      await router.push('/dashboard');
    },
    [router]
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    void router.push('/login');
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout
    }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
