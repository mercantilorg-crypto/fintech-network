# 🔧 Backend - API de Plataforma Fintech

API RESTful para la gestión de red de pagos, usuarios, tarjetas y transacciones.

## 🏗️ Arquitectura

```
backend/
├── src/
│   ├── config/          # Configuración (DB, Redis, env)
│   ├── models/          # Modelos de MongoDB
│   ├── controllers/     # Lógica de negocio
│   ├── routes/          # Definición de endpoints
│   ├── middlewares/     # Auth, validación, error handling
│   ├── services/        # Servicios externos (pagos, email)
│   ├── utils/           # Utilidades y helpers
│   └── app.js           # Inicialización de Express
├── tests/               # Tests unitarios e integración
├── .env.example         # Variables de entorno ejemplo
├── package.json
└── README.md
```

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crear archivo `.env` basado en `.env.example`:

```env
# Server
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/fintech-platform
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d

# External Services
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...

# Security
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## 🚀 Ejecución

```bash
# Desarrollo con hot-reload
npm run dev

# Producción
npm start

# Tests
npm test

# Tests con cobertura
npm run test:coverage

# Linting
npm run lint
```

## 📍 Endpoints Principales

### Autenticación

```http
POST   /api/v1/auth/register       # Registro de usuario
POST   /api/v1/auth/login          # Login
POST   /api/v1/auth/refresh        # Renovar token
POST   /api/v1/auth/logout         # Cerrar sesión
POST   /api/v1/auth/forgot-password # Recuperar contraseña
POST   /api/v1/auth/reset-password # Resetear contraseña
```

### Usuarios

```http
GET    /api/v1/users/me            # Perfil del usuario
PUT    /api/v1/users/me            # Actualizar perfil
POST   /api/v1/users/kyc           # Verificación KYC
GET    /api/v1/users/:id           # Obtener usuario (admin)
```

### Tarjetas

```http
POST   /api/v1/cards               # Solicitar nueva tarjeta
GET    /api/v1/cards               # Listar tarjetas del usuario
GET    /api/v1/cards/:id           # Detalle de tarjeta
PUT    /api/v1/cards/:id/activate  # Activar tarjeta
PUT    /api/v1/cards/:id/block     # Bloquear tarjeta
DELETE /api/v1/cards/:id           # Cancelar tarjeta
```

### Transacciones

```http
POST   /api/v1/transactions        # Crear transacción
GET    /api/v1/transactions        # Historial de transacciones
GET    /api/v1/transactions/:id    # Detalle de transacción
POST   /api/v1/transactions/p2p    # Pago entre usuarios
```

### Admin

```http
GET    /api/v1/admin/dashboard     # Dashboard con métricas
GET    /api/v1/admin/users         # Listar todos los usuarios
GET    /api/v1/admin/cards         # Listar todas las tarjetas
PUT    /api/v1/admin/cards/:id/approve # Aprobar tarjeta
GET    /api/v1/admin/transactions  # Todas las transacciones
```

## 🗄️ Modelos de Datos

### User

```javascript
{
  _id: ObjectId,
  email: String,
  phone: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: ['user', 'admin', 'issuer'],
  kycStatus: ['pending', 'verified', 'rejected'],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Card

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  cardNumber: String (encrypted),
  cardType: ['virtual', 'physical'],
  status: ['pending', 'active', 'blocked', 'cancelled'],
  balance: Number,
  currency: String,
  expiryDate: Date,
  cvv: String (encrypted),
  limits: {
    daily: Number,
    monthly: Number,
    transaction: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction

```javascript
{
  _id: ObjectId,
  cardId: ObjectId,
  type: ['payment', 'transfer', 'deposit', 'withdrawal'],
  amount: Number,
  currency: String,
  status: ['pending', 'completed', 'failed', 'reversed'],
  description: String,
  merchantInfo: Object,
  recipientCardId: ObjectId, // Para P2P
  metadata: Object,
  createdAt: Date,
  completedAt: Date
}
```

## 🔒 Seguridad

### Autenticación
- JWT con tokens de acceso y refresh
- Passwords hasheados con bcrypt
- MFA para roles administrativos

### Encriptación
- Datos sensibles encriptados (números de tarjeta, CVV)
- TLS/SSL en todas las comunicaciones
- Claves de encriptación rotativas

### Rate Limiting
- 100 requests por 15 minutos por IP
- Límites especiales para endpoints sensibles

### Validación
- Validación de inputs con Joi
- Sanitización de datos
- CORS configurado

## 🧪 Testing

```bash
# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests E2E
npm run test:e2e

# Cobertura
npm run test:coverage
```

## 📊 Monitoreo

- Logs estructurados con Winston
- Métricas con Prometheus
- Tracing con OpenTelemetry
- Health check en `/health`

## 🔧 Scripts Disponibles

```bash
npm run dev           # Desarrollo con nodemon
npm start             # Producción
npm test              # Tests
npm run lint          # Linting
npm run format        # Formatear código
npm run migrate       # Migraciones de DB
npm run seed          # Seed de datos de prueba
```

## 📝 Próximas Mejoras

- [ ] Implementar GraphQL como alternativa
- [ ] Agregar WebSockets para notificaciones en tiempo real
- [ ] Implementar sistema de webhooks
- [ ] Mejorar sistema de auditoría
- [ ] Agregar más tests de integración

## 🤝 Contribuir

Ver [CONTRIBUTING.md](../CONTRIBUTING.md) para lineamientos de contribución.

## 📄 Licencia

MIT License - ver [LICENSE](../LICENSE) para detalles.
