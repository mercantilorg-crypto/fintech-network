# 🎨 Frontend - Plataforma Web Fintech

Aplicación web construida con Next.js y React para la gestión de tarjetas y transacciones.

## 🏗️ Estructura del Proyecto

```
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── app/            # App Router (Next.js 13+)
│   │   ├── (auth)/     # Rutas de autenticación
│   │   ├── (dashboard)/ # Rutas del dashboard
│   │   ├── admin/      # Panel administrativo
│   │   └── layout.tsx  # Layout principal
│   ├── components/     # Componentes React
│   │   ├── ui/         # Componentes base UI
│   │   ├── cards/      # Componentes de tarjetas
│   │   ├── transactions/ # Componentes de transacciones
│   │   └── layout/     # Componentes de layout
│   ├── lib/            # Utilidades y helpers
│   │   ├── api/        # Cliente API
│   │   ├── hooks/      # Custom hooks
│   │   └── utils/      # Funciones auxiliares
│   ├── store/          # Estado global (Redux/Zustand)
│   ├── styles/         # Estilos globales
│   └── types/          # TypeScript types
├── .env.example
├── next.config.js
├── package.json
└── README.md
```

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crear archivo `.env.local` basado en `.env.example`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# Authentication
NEXT_PUBLIC_JWT_STORAGE_KEY=fintech_token

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true

# External Services
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...
```

## 🚀 Ejecución

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint

# Tests
npm test
```

La aplicación estará disponible en `http://localhost:3001`

## 🎯 Páginas Principales

### Públicas
- `/` - Landing page
- `/login` - Inicio de sesión
- `/register` - Registro de usuario
- `/forgot-password` - Recuperar contraseña

### Usuario Autenticado
- `/dashboard` - Dashboard principal
- `/cards` - Gestión de tarjetas
- `/cards/new` - Solicitar nueva tarjeta
- `/transactions` - Historial de transacciones
- `/transfer` - Transferir fondos
- `/profile` - Perfil del usuario
- `/settings` - Configuración

### Admin
- `/admin` - Dashboard administrativo
- `/admin/users` - Gestión de usuarios
- `/admin/cards` - Gestión de tarjetas
- `/admin/transactions` - Todas las transacciones
- `/admin/reports` - Reportes y estadísticas

## 🎨 Componentes Principales

### Card Component

```tsx
<Card
  cardNumber="**** **** **** 1234"
  holderName="John Doe"
  expiryDate="12/25"
  balance={1500.00}
  type="virtual"
  status="active"
/>
```

### Transaction List

```tsx
<TransactionList
  transactions={transactions}
  onTransactionClick={handleClick}
  showPagination
/>
```

### Dashboard Stats

```tsx
<DashboardStats
  totalBalance={5000.00}
  totalTransactions={45}
  activeCards={2}
  pendingTransactions={3}
/>
```

## 🎨 Sistema de Diseño

### Colores

```css
--primary: #2563eb      /* Azul principal */
--secondary: #7c3aed    /* Púrpura */
--success: #10b981      /* Verde */
--warning: #f59e0b      /* Amarillo */
--error: #ef4444        /* Rojo */
--background: #ffffff
--foreground: #0f172a
```

### Typography

```css
--font-sans: 'Inter', sans-serif
--font-mono: 'Fira Code', monospace

Headings: font-weight: 700
Body: font-weight: 400
Small: font-weight: 500
```

## 🔐 Autenticación

### Protected Routes

```tsx
// Proteger rutas en layout.tsx
export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) redirect('/login');
  
  return <>{children}</>;
}
```

### API Calls con Auth

```typescript
// lib/api/client.ts
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('fintech_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📱 Responsive Design

- Mobile First approach
- Breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

## 🧪 Testing

```bash
# Tests unitarios
npm run test:unit

# Tests E2E con Cypress
npm run test:e2e

# Tests con cobertura
npm run test:coverage
```

## 🚀 Optimizaciones

### Performance
- ✅ Lazy loading de componentes
- ✅ Code splitting automático (Next.js)
- ✅ Image optimization
- ✅ Prefetching de rutas
- ✅ Static generation donde sea posible

### SEO
- ✅ Metadata optimizado
- ✅ Sitemap generado
- ✅ robots.txt configurado
- ✅ Open Graph tags

### Accesibilidad
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast AAA

## 🔧 Scripts Disponibles

```bash
npm run dev            # Desarrollo
npm run build          # Build producción
npm start              # Iniciar producción
npm run lint           # Linting
npm run format         # Formatear código
npm run analyze        # Analizar bundle
npm run storybook      # Iniciar Storybook
```

## 📊 Estado Global

Usando Zustand para estado simple y performante:

```typescript
// store/useCardStore.ts
import create from 'zustand';

export const useCardStore = create((set) => ({
  cards: [],
  selectedCard: null,
  fetchCards: async () => {
    const cards = await apiClient.get('/cards');
    set({ cards });
  },
  selectCard: (card) => set({ selectedCard: card }),
}));
```

## 🎨 Theming

Soporte para modo oscuro:

```tsx
// app/providers.tsx
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

## 📝 Próximas Mejoras

- [ ] Implementar PWA completo
- [ ] Agregar notificaciones web push
- [ ] Mejorar animaciones y transiciones
- [ ] Implementar modo offline
- [ ] Agregar más tests E2E
- [ ] Implementar Storybook para documentación de componentes

## 🤝 Contribuir

Ver [CONTRIBUTING.md](../CONTRIBUTING.md) para lineamientos.

## 📄 Licencia

MIT License - ver [LICENSE](../LICENSE) para detalles.
