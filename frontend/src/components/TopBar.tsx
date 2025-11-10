import { useAuth } from '../lib/hooks/useAuth';

export const TopBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backgroundColor: 'rgba(17,24,39,0.5)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>Panel Financiero</h1>
        <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
          Estado operativo de tu red de pagos
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600 }}>{user?.fullName}</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{user?.roles.join(', ')}</div>
        </div>
        <button
          onClick={logout}
          style={{
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.5rem 1.25rem',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};
