import useSWR from 'swr';
import { Layout } from '../../components/Layout';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { apiClient } from '../../lib/api';
import { useAuth } from '../../lib/hooks/useAuth';

const fetcher = async (url: string) => {
  const { data } = await apiClient.get(url);
  return data.data;
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { data: cards } = useSWR('/cards', fetcher);
  const { data: transactions } = useSWR('/transactions?limit=5', fetcher);
  const { data: adminSummary } = useSWR(user?.roles.includes('admin') ? '/admin/dashboard' : null, fetcher);

  return (
    <ProtectedRoute>
      <Layout>
        <section style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem' }}>
            <StatCard title="Tarjetas activas" value={cards?.length ?? 0} />
            <StatCard title="Transacciones recientes" value={transactions?.length ?? 0} />
            {adminSummary && (
              <StatCard title="Usuarios totales" value={adminSummary.users} accent="rgba(16,185,129,0.3)" />
            )}
            {adminSummary && (
              <StatCard
                title="Volumen procesado"
                value={Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(
                  adminSummary.totalProcessed
                )}
                accent="rgba(245,158,11,0.3)"
              />
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
              gap: '1.5rem'
            }}
          >
            <Panel title="Mis tarjetas">
              {!cards?.length && <EmptyState message="Aún no tienes tarjetas emitidas." />}
              {cards?.map((card: any) => (
                <CardSummary key={card.cardId} card={card} />
              ))}
            </Panel>
            <Panel title="Últimas transacciones">
              {!transactions?.length && <EmptyState message="No hay transacciones registradas." />}
              {transactions?.map((tx: any) => (
                <TransactionSummary key={tx.reference} transaction={tx} />
              ))}
            </Panel>
          </div>
        </section>
      </Layout>
    </ProtectedRoute>
  );
};

const StatCard: React.FC<{ title: string; value: number | string; accent?: string }> = ({ title, value, accent }) => (
  <div
    style={{
      padding: '1.75rem',
      borderRadius: '1.25rem',
      border: '1px solid rgba(59,130,246,0.2)',
      background: accent ? accent : 'rgba(59,130,246,0.12)'
    }}
  >
    <p style={{ margin: 0, color: '#cbd5f5', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
      {title}
    </p>
    <h3 style={{ margin: '0.75rem 0 0', fontSize: '2rem', fontWeight: 700 }}>{value}</h3>
  </div>
);

const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div
    style={{
      borderRadius: '1.5rem',
      border: '1px solid rgba(148,163,184,0.2)',
      padding: '1.75rem',
      backgroundColor: 'rgba(15,23,42,0.6)',
      minHeight: '320px'
    }}
  >
    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>{title}</h2>
    <div style={{ display: 'grid', gap: '1rem' }}>{children}</div>
  </div>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div
    style={{
      padding: '1.5rem',
      borderRadius: '1rem',
      backgroundColor: 'rgba(30,64,175,0.2)',
      border: '1px dashed rgba(96,165,250,0.5)'
    }}
  >
    <p style={{ margin: 0, color: '#93c5fd' }}>{message}</p>
  </div>
);

const CardSummary: React.FC<{ card: any }> = ({ card }) => (
  <div
    style={{
      padding: '1.25rem',
      borderRadius: '1rem',
      backgroundColor: 'rgba(30,64,175,0.25)',
      border: '1px solid rgba(96,165,250,0.3)'
    }}
  >
    <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', color: '#bfdbfe' }}>{card.type}</p>
    <h3 style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', letterSpacing: '0.2rem' }}>**** **** **** {card.last4}</h3>
    <p style={{ margin: '0.75rem 0 0', color: '#e0f2fe' }}>
      Saldo:{' '}
      <strong>
        {Intl.NumberFormat('es-PE', { style: 'currency', currency: card.currency ?? 'USD' }).format(card.balance)}
      </strong>
    </p>
    <p style={{ margin: '0.5rem 0 0', color: '#9ca3af', fontSize: '0.9rem' }}>Estado: {card.status}</p>
  </div>
);

const TransactionSummary: React.FC<{ transaction: any }> = ({ transaction }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      borderRadius: '1rem',
      backgroundColor: 'rgba(12,74,110,0.25)',
      border: '1px solid rgba(56,189,248,0.3)'
    }}
  >
    <div>
      <p style={{ margin: 0, fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>{transaction.type}</p>
      <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>{transaction.reference}</p>
    </div>
    <div style={{ textAlign: 'right' }}>
      <strong>
        {Intl.NumberFormat('es-PE', { style: 'currency', currency: transaction.currency ?? 'USD' }).format(
          transaction.amount
        )}
      </strong>
      <p style={{ margin: '0.25rem 0 0', color: '#9ca3af', fontSize: '0.85rem' }}>{transaction.status}</p>
    </div>
  </div>
);

export default DashboardPage;
