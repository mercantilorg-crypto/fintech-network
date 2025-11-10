import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useAuth } from '../lib/hooks/useAuth';

const navItems = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/cards', label: 'Tarjetas' },
  { href: '/transactions', label: 'Transacciones' },
  { href: '/admin', label: 'Panel Admin', roles: ['admin'] }
] as const;

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <aside
      style={{
        width: '240px',
        backgroundColor: '#111827',
        minHeight: '100vh',
        padding: '1.5rem 1rem',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Fintech Network</h2>
        <p style={{ margin: '0.25rem 0 0', color: '#9ca3af', fontSize: '0.85rem' }}>
          Hola, {user?.fullName ?? 'usuario'}
        </p>
      </div>
      <nav style={{ display: 'grid', gap: '0.75rem' }}>
        {navItems.map((item) => {
          if (item.roles && !item.roles.some((role) => user?.roles.includes(role))) {
            return null;
          }
          const isActive = router.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx('sidebar-link', { active: isActive })}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: isActive ? 'rgba(59,130,246,0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(59,130,246,0.5)' : '1px solid transparent',
                color: '#e5e7eb',
                fontWeight: 500
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
