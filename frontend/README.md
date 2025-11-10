# Frontend Web Application

Aplicación web React/Next.js para la plataforma Fintech Network.

## Tecnologías

- React 18+
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS (opcional)
- React Query / SWR para gestión de estado del servidor
- Zustand / Redux para estado global

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Rutas de autenticación
│   │   ├── (dashboard)/  # Panel de usuario
│   │   └── admin/        # Panel administrativo
│   ├── components/       # Componentes reutilizables
│   ├── lib/              # Utilidades y helpers
│   ├── hooks/            # Custom hooks
│   ├── store/            # Estado global
│   └── types/            # TypeScript types
├── public/               # Archivos estáticos
├── .env.example
└── package.json
```

## Instalación

```bash
npm install
```

## Configuración

1. Copiar `.env.example` a `.env.local`
2. Configurar:
   - `NEXT_PUBLIC_API_URL`: URL del backend API

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001)

## Producción

```bash
npm run build
npm start
```

## Páginas Principales

- `/` - Landing page
- `/login` - Login
- `/register` - Registro
- `/dashboard` - Panel de usuario
- `/dashboard/cards` - Gestión de tarjetas
- `/dashboard/transactions` - Historial de transacciones
- `/admin` - Panel administrativo

## Pruebas

```bash
npm test
```
