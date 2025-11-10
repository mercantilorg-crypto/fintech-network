import { FormEvent, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Layout } from '../../components/Layout';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { apiClient } from '../../lib/api';

const fetcher = async (url: string) => {
  const { data } = await apiClient.get(url);
  return data.data;
};

const TransactionsPage = () => {
  const { data: transactions } = useSWR('/transactions', fetcher);
  const { data: cards } = useSWR('/cards', fetcher);

  const [form, setForm] = useState({
    type: 'p2p',
    fromCardId: '',
    toCardId: '',
    amount: 0,
    currency: 'USD'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const availableCards = useMemo(() => cards ?? [], [cards]);

  const handleCreateTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await apiClient.post('/transactions', {
        type: form.type,
        fromCardId: form.fromCardId || undefined,
        toCardId: form.toCardId || undefined,
        amount: Number(form.amount),
        currency: form.currency
      });
      setMessage('Transacción registrada');
      setForm((prev) => ({ ...prev, amount: 0 }));
      await Promise.all([mutate('/transactions'), mutate('/cards')]);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div style={{ display: 'grid', gap: '2rem' }}>
          <header>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Transacciones</h1>
            <p style={{ margin: '0.5rem 0 0', color: '#94a3b8' }}>
              Registra pagos P2P, recargas o retiros dentro de la red.
            </p>
          </header>

          <div
            style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))'
            }}
          >
            <form
              onSubmit={handleCreateTransaction}
              style={{
                borderRadius: '1.5rem',
                border: '1px solid rgba(148,163,184,0.2)',
                padding: '1.75rem',
                backgroundColor: 'rgba(15,23,42,0.6)',
                display: 'grid',
                gap: '1rem'
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Nueva transacción</h3>
                <p style={{ margin: '0.5rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                  Selecciona el tipo de operación y completa los detalles.
                </p>
              </div>

              <label style={labelStyle}>
                <span>Tipo</span>
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      type: event.target.value,
                      fromCardId: '',
                      toCardId: ''
                    }))
                  }
                  style={inputStyle}
                >
                  <option value="p2p">Transferencia P2P</option>
                  <option value="load">Recarga de fondos</option>
                  <option value="withdrawal">Retiro</option>
                  <option value="purchase">Compra en comercio</option>
                </select>
              </label>

              {['p2p', 'withdrawal', 'purchase'].includes(form.type) && (
                <label style={labelStyle}>
                  <span>Tarjeta origen</span>
                  <select
                    required
                    value={form.fromCardId}
                    onChange={(event) => setForm((prev) => ({ ...prev, fromCardId: event.target.value }))}
                    style={inputStyle}
                  >
                    <option value="">Selecciona tarjeta</option>
                    {availableCards.map((card: any) => (
                      <option key={card.cardId} value={card.cardId}>
                        ****{card.last4} • {card.currency} • {card.balance}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {['p2p', 'load'].includes(form.type) && (
                <label style={labelStyle}>
                  <span>Tarjeta destino</span>
                  <select
                    required
                    value={form.toCardId}
                    onChange={(event) => setForm((prev) => ({ ...prev, toCardId: event.target.value }))}
                    style={inputStyle}
                  >
                    <option value="">Selecciona tarjeta</option>
                    {availableCards.map((card: any) => (
                      <option key={card.cardId} value={card.cardId}>
                        ****{card.last4} • {card.currency} • {card.balance}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label style={labelStyle}>
                <span>Monto</span>
                <input
                  type="number"
                  min={1}
                  value={form.amount}
                  onChange={(event) => setForm((prev) => ({ ...prev, amount: Number(event.target.value) }))}
                  style={inputStyle}
                  required
                />
              </label>

              <label style={labelStyle}>
                <span>Moneda</span>
                <input
                  value={form.currency}
                  onChange={(event) => setForm((prev) => ({ ...prev, currency: event.target.value.toUpperCase() }))}
                  style={inputStyle}
                />
              </label>

              {message && (
                <div style={{ backgroundColor: 'rgba(30,64,175,0.2)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
                  <p style={{ margin: 0 }}>{message}</p>
                </div>
              )}

              <button type="submit" style={buttonStyle} disabled={loading}>
                {loading ? 'Procesando...' : 'Registrar transacción'}
              </button>
            </form>

            <div
              style={{
                borderRadius: '1.5rem',
                border: '1px solid rgba(148,163,184,0.2)',
                padding: '1.75rem',
                backgroundColor: 'rgba(17,24,39,0.6)'
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Consejos de operación</h3>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.7 }}>
                <li>Las transferencias P2P requieren tarjeta origen y destino.</li>
                <li>Las recargas solo necesitan tarjeta destino.</li>
                <li>Los retiros y compras solo descuentan de la tarjeta origen.</li>
                <li>El saldo se valida en tiempo real desde el backend.</li>
              </ul>
            </div>
          </div>

          <section>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>Historial reciente</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {!transactions?.length && <EmptyState message="Aún no se registran transacciones." />}
              {transactions?.map((tx: any) => (
                <TransactionRow key={tx.reference} transaction={tx} />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

const TransactionRow: React.FC<{ transaction: any }> = ({ transaction }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1.2fr repeat(4,1fr)',
      gap: '1rem',
      padding: '1.25rem 1.5rem',
      borderRadius: '1.25rem',
      border: '1px solid rgba(148,163,184,0.2)',
      backgroundColor: 'rgba(12,74,110,0.35)'
    }}
  >
    <div>
      <strong>{transaction.reference}</strong>
      <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>{transaction.type}</p>
    </div>
    <Info label="Origen" value={transaction.fromCardId ?? '-'} />
    <Info label="Destino" value={transaction.toCardId ?? '-'} />
    <Info
      label="Monto"
      value={Intl.NumberFormat('es-PE', { style: 'currency', currency: transaction.currency ?? 'USD' }).format(
        transaction.amount
      )}
    />
    <Info label="Estado" value={transaction.status} />
  </div>
);

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <span style={{ display: 'block', color: '#64748b', fontSize: '0.8rem' }}>{label}</span>
    <strong>{value}</strong>
  </div>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div
    style={{
      padding: '1.5rem',
      borderRadius: '1rem',
      backgroundColor: 'rgba(30,64,175,0.2)',
      border: '1px dashed rgba(96,165,250,0.4)'
    }}
  >
    <p style={{ margin: 0 }}>{message}</p>
  </div>
);

const labelStyle: React.CSSProperties = { display: 'grid', gap: '0.3rem', fontSize: '0.9rem' };

const inputStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid rgba(148,163,184,0.3)',
  backgroundColor: 'rgba(15,23,42,0.6)',
  color: '#e2e8f0'
};

const buttonStyle: React.CSSProperties = {
  borderRadius: '9999px',
  padding: '0.85rem',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
  background: 'linear-gradient(90deg,#38bdf8 0%,#2563eb 100%)',
  color: '#fff'
};

export default TransactionsPage;
