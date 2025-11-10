# Backend API

API REST para la plataforma Fintech Network.

## Tecnologías

- Node.js 18+
- Express.js o NestJS
- MongoDB (Mongoose)
- Redis (ioredis)
- JWT para autenticación

## Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/    # Controladores de rutas
│   ├── models/         # Modelos de MongoDB
│   ├── routes/         # Definición de rutas
│   ├── middleware/     # Middleware personalizado
│   ├── services/       # Lógica de negocio
│   ├── utils/          # Utilidades
│   ├── config/         # Configuración
│   └── app.js          # Punto de entrada
├── tests/              # Pruebas
├── .env.example        # Variables de entorno ejemplo
└── package.json
```

## Instalación

```bash
npm install
```

## Configuración

1. Copiar `.env.example` a `.env`
2. Configurar las variables de entorno:
   - `MONGODB_URI`: URI de conexión a MongoDB
   - `REDIS_URI`: URI de conexión a Redis
   - `JWT_SECRET`: Secret para firmar tokens JWT
   - `PORT`: Puerto del servidor (default: 3000)

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm run build
npm start
```

## Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refrescar token

### Tarjetas
- `GET /api/cards` - Listar tarjetas del usuario
- `POST /api/cards/request` - Solicitar nueva tarjeta
- `POST /api/cards/:id/activate` - Activar tarjeta
- `POST /api/cards/:id/cancel` - Cancelar tarjeta

### Transacciones
- `GET /api/transactions` - Historial de transacciones
- `POST /api/transactions/p2p` - Pago P2P
- `POST /api/transactions/load` - Cargar fondos
- `POST /api/transactions/withdraw` - Retirar fondos

### Admin
- `GET /api/admin/users` - Listar usuarios
- `GET /api/admin/cards` - Listar todas las tarjetas
- `POST /api/admin/cards/:id/approve` - Aprobar tarjeta
- `GET /api/admin/stats` - Estadísticas del sistema

## Pruebas

```bash
npm test
```
