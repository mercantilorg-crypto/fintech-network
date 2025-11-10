# Backend API

Servicio Node.js + Express + TypeScript que expone los endpoints centrales de la red fintech.

## Requisitos
- Node.js >= 18
- MongoDB en ejecución (`MONGODB_URI`)
- Redis opcional para sesiones/token revocation (`REDIS_URL`)

## Configuración

```bash
cp .env.example .env
npm install
npm run dev      # Desarrollo con recarga
npm run build    # Compilación a dist/
npm start        # Ejecuta desde dist/
```

Variables principales en `.env`:
- `PORT`: puerto HTTP (default 4000)
- `MONGODB_URI`: cadena de conexión a MongoDB
- `REDIS_URL`: URL de Redis (opcional)
- `JWT_SECRET` y `JWT_EXPIRES_IN`

## Estructura
- `src/app.ts`: configuración de Express y middlewares.
- `src/modules/*`: módulos para auth, usuarios, tarjetas, transacciones y panel admin.
- `src/config/*`: conexión a Mongo, Redis y logger.
- `src/middleware/*`: validación, protección JWT y manejo de errores.

## Endpoints clave
- `POST /api/auth/register` y `POST /api/auth/login`
- `GET /api/users/me`
- `POST /api/cards` (roles `admin`/`emisor`), `GET /api/cards`, `PATCH /api/cards/:cardId/status`
- `POST /api/transactions`, `GET /api/transactions`
- `GET /api/admin/dashboard` (rol `admin`)

Los módulos incluyen validaciones `zod`, manejo de errores consistente (`AppError`) y modelos Mongoose para persistencia.
