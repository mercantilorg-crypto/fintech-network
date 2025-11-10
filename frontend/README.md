# Frontend Web

Aplicación web creada con Next.js + TypeScript que entrega el panel de usuarios, tablero administrativo y flujo de autenticación para la red fintech.

## Scripts disponibles

```bash
# Desarrollo
npm install
npm run dev

# Compilar y ejecutar en producción
npm run build
npm start

# Lint
npm run lint
```

## Entorno

Copiar `.env.local.example` a `.env.local` y ajustar `NEXT_PUBLIC_API_BASE_URL` con la URL del backend.

## Arquitectura de carpetas

- `src/pages`: rutas públicas y privadas (`/login`, `/dashboard`, `/cards`, `/transactions`, `/admin`).
- `src/components`: layout reutilizable, barra lateral, protección de rutas.
- `src/lib`: cliente HTTP (Axios), helpers de autenticación y hooks de sesión.
- `src/styles`: hoja global de estilos.

## Características actuales
- Autenticación basada en JWT (consume `/auth/login` y `/auth/register`).
- Panel de usuario con resumen de tarjetas y transacciones recientes.
- Módulo de gestión de tarjetas con emisión y control de estado (roles `admin`/`emisor`).
- Registro de transacciones P2P, recargas y retiros.
- Dashboard administrativo con métricas clave de la red.
