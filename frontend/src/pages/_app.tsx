import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../lib/hooks/useAuth';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Head>
        <title>Fintech Network Platform</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
