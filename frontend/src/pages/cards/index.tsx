import { FormEvent, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Layout } from '../../components/Layout';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { apiClient } from '../../lib/api';
import { useAuth } from '../../lib/hooks/useAuth';

const fetcher = async (url: string) => {
  const { data } = await apiClient.get(url);
  return data.data;
};

const CardsPage = () => {
  const { user } = useAuth();
  const { data: cards } = useSWR('/cards', fetcher);
  const isIssuer = user?.roles.some((role) => ['admin', 'emisor'].includes(role));

  const [form, setForm] = useState({
    userId: '',
    type: 'virtual',
    currency: 'USD',
    initialBalance: 0
  });
  const [statusForm, setStatusForm] = useState<{ cardId: string; status: string }>({ cardId: '', status: 'active' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleIssueCard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await apiClient.post('/cards', {
        userId: form.userId,
        type: form.type,
        currency: form.currency,
        initialBalance: Number(form.initialBalance)
      });
      setMessage('Tarjeta emitida con éxito');
      setForm((prev) => ({ ...prev, userId: '', initialBalance: 0 }));
      await mutate('/cards');
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await apiClient.patch(`/cards/${statusForm.cardId}/status`, { status: statusForm.status });
      setMessage('Estado de tarjeta actualizado');
      await mutate('/cards');
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
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Gestión de tarjetas</h1>
            <p style={{ margin: '0.5rem 0 0', color: '#94a3b8' }}>
              Emite tarjetas virtuales o físicas y controla su estado.
            </p>
          </header>

          {isIssuer ? (
            <div
              style={{
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))'
              }}
            >
              <FormPanel title="Emitir nueva tarjeta" onSubmit={handleIssueCard} loading={loading} message={message}>
                <label style={labelStyle}>
                  <span>ID de usuario</span>
                  <input
                    required
                    value={form.userId}
                    onChange={(event) => setForm((prev) => ({ ...prev, userId: event.target.value }))}
                    placeholder="64a9a5..."
                    style={inputStyle}
                  />
                </label>
                <label style={labelStyle}>
                  <span>Tipo</span>
                  <select
                    value={form.type}
                    onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                    style={inputStyle}
                  >
                    <option value="virtual">Virtual</option>
                    <option value="physical">Física</option>
                  </select>
                </label>
                <label style={labelStyle}>
                  <span>Moneda</span>
                  <input
                    value={form.currency}
                    onChange={(event) => setForm((prev) => ({ ...prev, currency: event.target.value.toUpperCase() }))}
                    style={inputStyle}
                  />
                </label>
                <label style={labelStyle}>
                  <span>Saldo inicial</span>
                  <input
                    type="number"
                    min={0}
                    value={form.initialBalance}
                    onChange={(event) => setForm((prev) => ({ ...prev, initialBalance: Number(event.target.value) }))}
                    style={inputStyle}
                  />
                </label>
                <button type="submit" style={buttonStyle} disabled={loading}>
                  {loading ? 'Procesando...' : 'Emitir tarjeta'}
                </button>
              </FormPanel>

              <FormPanel title="Actualizar estado" onSubmit={handleUpdateStatus} loading={loading} message={message}>
                <label style={labelStyle}>
                  <span>Card ID</span>
                  <input
                    required
                    value={statusForm.cardId}
                    onChange={(event) => setStatusForm((prev) => ({ ...prev, cardId: event.target.value }))}
                    placeholder="CARD-xxxx"
                    style={inputStyle}
                  />
                </label>
                <label style={labelStyle}>
                  <span>Estado</span>
                  <select
                    value={statusForm.status}
                    onChange={(event) => setStatusForm((prev) => ({ ...prev, status: event.target.value }))}
                    style={inputStyle}
                  >
                    <option value="active">Activo</option>
                    <option value="blocked">Bloqueado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </label>
                <button type="submit" style={buttonStyle} disabled={loading}>
                  {loading ? 'Actualizando...' : 'Guardar cambios'}
                </button>
              </FormPanel>
            </div>
          ) : (
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(30,64,175,0.25)',
                border: '1px solid rgba(59,130,246,0.3)'
              }}
            >
              <p style={{ margin: 0 }}>
                Para solicitar una tarjeta nueva contacta a soporte o espera aprobación automática.
              </p>
            </div>
          )}

          <section>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>Tarjetas asociadas</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {!cards?.length && <EmptyState message="Sin tarjetas registradas todavía." />}
              {cards?.map((card: any) => (
                <CardRow key={card.cardId} card={card} />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

const FormPanel: React.FC<{
  title: string;
  children: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  message: string | null;
}> = ({ title, children, onSubmit, message, loading }) => (
  <form
    onSubmit={onSubmit}
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
      <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{title}</h3>
      <p style={{ margin: '0.5rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
        Completa los datos necesarios y confirma la acción.
      </p>
    </div>
    {children}
    {message && (
      <div style={{ backgroundColor: 'rgba(30,64,175,0.2)', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}>
        <p style={{ margin: 0 }}>{message}</p>
      </div>
    )}
    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{loading ? 'Procesando solicitud...' : ''}</span>
  </form>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div
    style={{
      padding: '1.5rem',
      borderRadius: '1rem',
      backgroundColor: 'rgba(15,118,110,0.2)',
      border: '1px dashed rgba(45,212,191,0.4)'
    }}
  >
    <p style={{ margin: 0 }}>{message}</p>
  </div>
);

const CardRow: React.FC<{ card: any }> = ({ card }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '2fr repeat(3,1fr)',
      gap: '1rem',
      padding: '1.25rem 1.5rem',
      borderRadius: '1.25rem',
      border: '1px solid rgba(148,163,184,0.2)',
      backgroundColor: 'rgba(17,24,39,0.6)'
    }}
  >
    <div>
      <strong>**** **** **** {card.last4}</strong>
      <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>{card.cardId}</p>
    </div>
    <div>
      <span style={{ display: 'block', color: '#64748b', fontSize: '0.8rem' }}>Tipo</span>
      <strong>{card.type}</strong>
    </div>
    <div>
      <span style={{ display: 'block', color: '#64748b', fontSize: '0.8rem' }}>Saldo</span>
      <strong>
        {Intl.NumberFormat('es-PE', { style: 'currency', currency: card.currency ?? 'USD' }).format(card.balance)}
      </strong>
    </div>
    <div>
      <span style={{ display: 'block', color: '#64748b', fontSize: '0.8rem' }}>Estado</span>
      <strong>{card.status}</strong>
    </div>
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
  background: 'linear-gradient(90deg,#22d3ee 0%,#2563eb 100%)',
  color: '#fff'
};

export default CardsPage;
