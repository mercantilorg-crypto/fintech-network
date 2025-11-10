import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{ flex: 1, padding: '2rem', background: 'linear-gradient(180deg,#0f172a 0%,#020617 100%)' }}>
          {children}
        </div>
      </main>
    </div>
  );
};
