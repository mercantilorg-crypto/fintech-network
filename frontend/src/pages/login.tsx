import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/hooks/useAuth';

type Mode = 'login' | 'register';

const LoginPage = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formState.email, formState.password);
      } else {
        await register({
          email: formState.email,
          password: formState.password,
          fullName: formState.fullName,
          phone: formState.phone
        });
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#0f172a 0%,#312e81 100%)',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'rgba(15,23,42,0.85)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          border: '1px solid rgba(148,163,184,0.2)',
          boxShadow: '0 30px 60px -20px rgba(59,130,246,0.5)'
        }}
      >
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Fintech Network</h1>
          <p style={{ margin: '0.5rem 0 0', color: '#94a3b8' }}>
            Accede a tu red de pagos segura
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          {mode === 'register' && (
            <>
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                <span>Nombre completo</span>
                <input
                  value={formState.fullName}
                  onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))}
                  required
                  placeholder="Jane Doe"
                  style={inputStyle}
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                <span>Teléfono (opcional)</span>
                <input
                  value={formState.phone}
                  onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="+51 999 999 999"
                  style={inputStyle}
                />
              </label>
            </>
          )}
          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span>Correo electrónico</span>
            <input
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              required
              placeholder="usuario@fintech.com"
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span>Contraseña</span>
            <input
              type="password"
              value={formState.password}
              onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
              required
              placeholder="********"
              style={inputStyle}
            />
          </label>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.15)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
              <p style={{ margin: 0, color: '#fca5a5' }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              borderRadius: '9999px',
              padding: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(90deg,#2563eb 0%,#4f46e5 100%)',
              color: '#fff',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Procesando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
          {mode === 'login' ? (
            <>
              ¿No tienes cuenta?{' '}
              <Link
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setMode('register');
                }}
                style={{ color: '#60a5fa', fontWeight: 600 }}
              >
                Regístrate
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <Link
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setMode('login');
                }}
                style={{ color: '#60a5fa', fontWeight: 600 }}
              >
                Inicia sesión
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid rgba(148,163,184,0.3)',
  backgroundColor: 'rgba(15,23,42,0.6)',
  color: '#e2e8f0'
};

export default LoginPage;
