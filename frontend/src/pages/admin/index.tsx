import useSWR from 'swr';
import { Layout } from '../../components/Layout';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { apiClient } from '../../lib/api';

const fetcher = async (url: string) => {
  const { data } = await apiClient.get(url);
  return data.data;
};

const AdminPage = () => {
  const { data: summary } = useSWR('/admin/dashboard', fetcher);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Layout>
        <div style={{ display: 'grid', gap: '2rem' }}>
          <header>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Panel administrativo</h1>
            <p style={{ margin: '0.5rem 0 0', color: '#94a3b8' }}>
              Control total de la red: usuarios, tarjetas y métricas operativas.
            </p>
          </header>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.5rem' }}>
            <StatCard label="Usuarios totales" value={summary?.users ?? 0} />
            <StatCard label="Tarjetas emitidas" value={summary?.cards ?? 0} accent="rgba(59,130,246,0.25)" />
            <StatCard label="Transacciones completadas" value={summary?.transactions ?? 0} accent="rgba(16,185,129,0.25)" />
            <StatCard
              label="Volumen procesado"
              value={Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(
                summary?.totalProcessed ?? 0
              )}
              accent="rgba(245,158,11,0.3)"
            />
          </section>

          <section
            style={{
              borderRadius: '1.5rem',
              border: '1px solid rgba(148,163,184,0.2)',
              padding: '1.75rem',
              backgroundColor: 'rgba(15,23,42,0.65)',
              display: 'grid',
              gap: '1.5rem'
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>Próximas tareas</h2>
              <p style={{ margin: '0.5rem 0 0', color: '#64748b' }}>
                Sugerencias estratégicas para evolucionar el sistema.
              </p>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Automatizar flujos de aprobación de tarjetas físicas.</li>
              <li>Implementar monitoreo de fraude con alertas en tiempo real.</li>
              <li>Desplegar integraciones mock con redes Visa/Mastercard.</li>
              <li>Construir reportes descargables para cumplimiento y auditoría.</li>
            </ul>
          </section>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

const StatCard: React.FC<{ label: string; value: string | number; accent?: string }> = ({ label, value, accent }) => (
  <div
    style={{
      padding: '1.75rem',
      borderRadius: '1.25rem',
      border: '1px solid rgba(148,163,184,0.25)',
      backgroundColor: accent ?? 'rgba(30,64,175,0.25)'
    }}
  >
    <p style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#cbd5f5' }}>
      {label}
    </p>
    <h3 style={{ margin: '0.75rem 0 0', fontSize: '2.25rem', fontWeight: 700 }}>{value}</h3>
  </div>
);

export default AdminPage;
