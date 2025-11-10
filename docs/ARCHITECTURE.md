# 🏛️ Arquitectura del Sistema - Fintech Platform

Documentación detallada de la arquitectura de la plataforma fintech.

## 📊 Visión General

La plataforma está diseñada siguiendo una arquitectura de microservicios con separación clara entre frontend, backend y servicios externos.

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                         │
└───────────────────┬──────────────────┬──────────────────────┘
                    │                  │
        ┌───────────▼──────────┐  ┌───▼────────────┐
        │   Frontend (CDN)     │  │  Mobile App    │
        │   Next.js + React    │  │  React Native  │
        └───────────┬──────────┘  └───┬────────────┘
                    │                 │
                    └─────────┬───────┘
                              │
                    ┌─────────▼─────────┐
                    │   API Gateway     │
                    │   (Rate Limiting) │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│  Auth Service  │  │  Card Service   │  │  Transaction    │
│                │  │                 │  │    Service      │
└───────┬────────┘  └────────┬────────┘  └────────┬────────┘
        │                    │                     │
        └────────────────────┼─────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│    MongoDB     │  │     Redis      │  │   PostgreSQL   │
│  (Main Store)  │  │   (Sessions)   │  │  (Analytics)   │
└────────────────┘  └────────────────┘  └────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
├─────────────┬───────────────┬──────────────┬────────────────┤
│   Stripe    │   SendGrid    │  Twilio SMS  │   OneSignal    │
│  (Payments) │    (Email)    │   (Phone)    │    (Push)      │
└─────────────┴───────────────┴──────────────┴────────────────┘
```

## 🎯 Principios de Diseño

### 1. Separación de Responsabilidades
- **Frontend**: UI/UX, validación de entrada, caché local
- **Backend**: Lógica de negocio, validación, persistencia
- **Base de datos**: Almacenamiento y consultas optimizadas

### 2. Escalabilidad
- Servicios stateless para fácil escalado horizontal
- Caché distribuido con Redis
- CDN para assets estáticos
- Load balancing para distribución de carga

### 3. Seguridad
- Encriptación en tránsito (TLS) y en reposo
- Autenticación multi-factor
- Rate limiting por IP y usuario
- Auditoría completa de acciones sensibles

### 4. Resiliencia
- Circuit breakers para servicios externos
- Retry logic con backoff exponencial
- Timeouts configurables
- Fallbacks y degradación elegante

## 🔧 Componentes Principales

### API Gateway

**Responsabilidades:**
- Enrutamiento de requests
- Autenticación y autorización
- Rate limiting
- Logging y métricas
- Transformación de requests/responses

**Tecnologías:**
- Express.js / NestJS
- JWT para autenticación
- Redis para rate limiting
- Winston para logging

### Authentication Service

**Funcionalidades:**
- Registro y login
- Gestión de tokens JWT
- Refresh tokens
- Recuperación de contraseña
- MFA (Multi-Factor Authentication)
- Integración con OAuth providers

**Flujo de Autenticación:**

```
┌──────┐                ┌──────────┐                ┌──────────┐
│Client│                │   Auth   │                │  Redis   │
└──┬───┘                └────┬─────┘                └────┬─────┘
   │                         │                           │
   │  POST /auth/login       │                           │
   ├────────────────────────>│                           │
   │                         │                           │
   │                         │  Validate credentials     │
   │                         │  Generate tokens          │
   │                         │                           │
   │                         │  Store refresh token      │
   │                         ├──────────────────────────>│
   │                         │                           │
   │  200 + tokens           │                           │
   │<────────────────────────┤                           │
   │                         │                           │
```

### Card Service

**Funcionalidades:**
- Emisión de tarjetas (virtuales/físicas)
- Gestión de estado de tarjetas
- Control de límites
- Generación segura de números de tarjeta
- Activación y bloqueo

**Modelo de Datos:**

```typescript
interface Card {
  id: string;
  userId: string;
  cardNumber: string; // Encrypted
  cardType: 'virtual' | 'physical';
  status: 'pending' | 'active' | 'blocked' | 'cancelled';
  balance: number;
  currency: string;
  expiryDate: Date;
  cvv: string; // Encrypted
  limits: {
    daily: number;
    monthly: number;
    transaction: number;
  };
  metadata: {
    lastUsed?: Date;
    failedAttempts: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction Service

**Funcionalidades:**
- Procesamiento de transacciones
- Validación de fondos
- Sistema de autorización
- Detección de fraude
- Reconciliación
- Historial y reportes

**Flujo de Transacción:**

```
┌──────┐     ┌─────────────┐     ┌────────┐     ┌─────────┐
│Client│     │Transaction  │     │  Card  │     │Fraud    │
│      │     │   Service   │     │Service │     │Detection│
└──┬───┘     └──────┬──────┘     └───┬────┘     └────┬────┘
   │                │                 │               │
   │ Create txn     │                 │               │
   ├───────────────>│                 │               │
   │                │                 │               │
   │                │ Validate card   │               │
   │                ├────────────────>│               │
   │                │                 │               │
   │                │ Check balance   │               │
   │                │<────────────────┤               │
   │                │                 │               │
   │                │ Check fraud     │               │
   │                ├─────────────────────────────────>│
   │                │                 │               │
   │                │ Risk score      │               │
   │                │<─────────────────────────────────┤
   │                │                 │               │
   │                │ Update balance  │               │
   │                ├────────────────>│               │
   │                │                 │               │
   │ 200 success    │                 │               │
   │<───────────────┤                 │               │
   │                │                 │               │
```

## 💾 Estrategia de Datos

### MongoDB - Base de Datos Principal

**Colecciones:**
- `users` - Información de usuarios
- `cards` - Datos de tarjetas
- `transactions` - Transacciones
- `kyc_documents` - Documentos de verificación
- `audit_logs` - Logs de auditoría

**Índices Críticos:**
```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ phone: 1 }, { unique: true });

// Cards
db.cards.createIndex({ userId: 1, status: 1 });
db.cards.createIndex({ cardNumber: 1 }, { unique: true });

// Transactions
db.transactions.createIndex({ cardId: 1, createdAt: -1 });
db.transactions.createIndex({ status: 1, createdAt: -1 });
db.transactions.createIndex({ userId: 1, createdAt: -1 });
```

### Redis - Caché y Sesiones

**Uso:**
- Sesiones de usuario (TTL: 24h)
- Tokens de refresh (TTL: 7d)
- Rate limiting
- Caché de consultas frecuentes
- Cola de trabajos (Bull)

**Estructura de Claves:**
```
session:{userId}:{sessionId}
token:refresh:{tokenId}
ratelimit:{ip}:{endpoint}
cache:user:{userId}
cache:cards:{userId}
queue:email:*
```

### PostgreSQL - Analytics (Opcional)

Para análisis y reportes complejos:
- Agregaciones de transacciones
- Reportes financieros
- Data warehouse para BI

## 🔐 Seguridad

### Encriptación

**Datos en Tránsito:**
- TLS 1.3 para todas las comunicaciones
- Certificate pinning en mobile app
- HSTS habilitado

**Datos en Reposo:**
```javascript
// Encriptación de campos sensibles
const encryptedData = encrypt(cardNumber, {
  algorithm: 'aes-256-gcm',
  key: process.env.ENCRYPTION_KEY,
});

// Hash de passwords
const hashedPassword = await bcrypt.hash(password, 10);
```

### Autenticación y Autorización

**JWT Token Structure:**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "user",
    "iat": 1699624800,
    "exp": 1699711200
  }
}
```

**Role-Based Access Control:**
```javascript
const permissions = {
  user: ['read:own-cards', 'read:own-transactions', 'create:transaction'],
  admin: ['*'],
  issuer: ['create:card', 'approve:card', 'read:cards']
};
```

### Detección de Fraude

**Reglas de Validación:**
1. Velocidad de transacciones
2. Monto inusual
3. Ubicación geográfica
4. Patrón de compra
5. Dispositivo no reconocido

**Risk Scoring:**
```javascript
function calculateRiskScore(transaction, userHistory) {
  let score = 0;
  
  // Amount check
  if (transaction.amount > user.averageTransaction * 3) {
    score += 0.3;
  }
  
  // Velocity check
  const recentTxns = getRecentTransactions(user, '5m');
  if (recentTxns.length > 3) {
    score += 0.4;
  }
  
  // Location check
  if (isNewLocation(transaction.location, user.locations)) {
    score += 0.2;
  }
  
  return score; // 0-1 scale
}
```

## 📈 Escalabilidad

### Horizontal Scaling

**Backend:**
```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    spec:
      containers:
      - name: api
        image: fintech-api:latest
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
```

**Database:**
- MongoDB replica set con 3 nodos
- Read replicas para queries pesadas
- Sharding por `userId` si es necesario

### Caching Strategy

```javascript
// Cache-aside pattern
async function getCard(cardId) {
  // 1. Check cache
  const cached = await redis.get(`card:${cardId}`);
  if (cached) return JSON.parse(cached);
  
  // 2. Query DB
  const card = await Card.findById(cardId);
  
  // 3. Update cache
  await redis.setex(`card:${cardId}`, 3600, JSON.stringify(card));
  
  return card;
}
```

## 🔄 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker image
        run: docker build -t fintech-api:${{ github.sha }} .
      - name: Push to registry
        run: docker push fintech-api:${{ github.sha }}
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: kubectl set image deployment/api api=fintech-api:${{ github.sha }}
```

## 📊 Monitoreo y Observabilidad

### Métricas Clave

**Business Metrics:**
- Total de transacciones por hora
- Monto total procesado
- Tasa de éxito de transacciones
- Tiempo promedio de procesamiento
- Tarjetas activas

**Technical Metrics:**
- Request rate (req/s)
- Error rate (%)
- Response time (p50, p95, p99)
- Database query time
- Cache hit rate

### Logging

```javascript
// Structured logging
logger.info('Transaction processed', {
  transactionId: txn.id,
  userId: user.id,
  amount: txn.amount,
  status: txn.status,
  duration: Date.now() - startTime,
  riskScore: txn.riskScore
});
```

### Alerting

**Critical Alerts:**
- Error rate > 5%
- Response time > 2s (p95)
- Database connections > 80%
- Redis memory > 80%
- Failed transactions > 10%

## 🚀 Deployment

### Ambientes

1. **Development** - Local development
2. **Staging** - Pre-production testing
3. **Production** - Live environment

### Infrastructure as Code

```terraform
# main.tf
resource "aws_ecs_cluster" "main" {
  name = "fintech-cluster"
}

resource "aws_ecs_service" "api" {
  name            = "api-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 3
}
```

## 📝 Mejoras Futuras

### Corto Plazo
- [ ] Implementar GraphQL
- [ ] WebSockets para notificaciones real-time
- [ ] Sistema de webhooks
- [ ] API rate limiting por usuario

### Mediano Plazo
- [ ] Machine learning para detección de fraude
- [ ] Multi-currency support
- [ ] Integración con blockchain
- [ ] Sistema de recompensas

### Largo Plazo
- [ ] Migración a arquitectura event-driven
- [ ] Implementar CQRS
- [ ] Multi-region deployment
- [ ] Open Banking integration

---

**Última actualización:** 2025-11-10
**Versión:** 1.0.0
