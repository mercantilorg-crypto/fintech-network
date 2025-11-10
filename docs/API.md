# 📚 API Reference - Fintech Platform

Documentación completa de la API RESTful de la plataforma fintech.

## 🌐 Base URL

```
Development: http://localhost:3000/api/v1
Production:  https://api.fintech-platform.com/v1
```

## 🔐 Autenticación

Todos los endpoints protegidos requieren un token JWT en el header:

```http
Authorization: Bearer {token}
```

---

## 📝 Autenticación (Auth)

### Registro de Usuario

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "kycStatus": "pending"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 86400
    }
  }
}
```

### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 86400
    }
  }
}
```

### Renovar Token

```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

### Recuperar Contraseña

```http
POST /auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

## 👤 Usuarios (Users)

### Obtener Perfil

```http
GET /users/me
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "phone": "+1234567890",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "kycStatus": "verified",
    "isActive": true,
    "createdAt": "2025-11-10T10:30:00Z",
    "updatedAt": "2025-11-10T10:30:00Z"
  }
}
```

### Actualizar Perfil

```http
PUT /users/me
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }
}
```

### Verificación KYC

```http
POST /users/kyc
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```
idDocument: [file]
proofOfAddress: [file]
selfie: [file]
documentType: "passport"
documentNumber: "AB123456"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "kycStatus": "pending",
    "submittedAt": "2025-11-10T10:30:00Z"
  }
}
```

---

## 💳 Tarjetas (Cards)

### Listar Tarjetas

```http
GET /cards
```

**Query Parameters:**
- `status` (optional): `pending`, `active`, `blocked`, `cancelled`
- `type` (optional): `virtual`, `physical`
- `page` (optional): número de página (default: 1)
- `limit` (optional): items por página (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "507f1f77bcf86cd799439011",
        "userId": "507f1f77bcf86cd799439012",
        "cardNumber": "**** **** **** 1234",
        "cardType": "virtual",
        "status": "active",
        "balance": 1500.00,
        "currency": "USD",
        "expiryDate": "2027-12-31",
        "limits": {
          "daily": 5000,
          "monthly": 20000,
          "transaction": 2000
        },
        "createdAt": "2025-11-10T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 2,
      "pages": 1
    }
  }
}
```

### Solicitar Nueva Tarjeta

```http
POST /cards
```

**Request Body:**
```json
{
  "cardType": "virtual",
  "currency": "USD",
  "initialBalance": 100.00
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "cardType": "virtual",
    "status": "pending",
    "currency": "USD",
    "balance": 100.00,
    "createdAt": "2025-11-10T10:30:00Z"
  }
}
```

### Detalle de Tarjeta

```http
GET /cards/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "cardNumber": "**** **** **** 1234",
    "cardType": "virtual",
    "status": "active",
    "balance": 1500.00,
    "currency": "USD",
    "expiryDate": "2027-12-31",
    "cvv": "***",
    "limits": {
      "daily": 5000,
      "monthly": 20000,
      "transaction": 2000
    },
    "usage": {
      "dailySpent": 250.00,
      "monthlySpent": 1250.00
    }
  }
}
```

### Activar Tarjeta

```http
PUT /cards/:id/activate
```

**Request Body:**
```json
{
  "activationCode": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "status": "active",
    "activatedAt": "2025-11-10T10:30:00Z"
  }
}
```

### Bloquear Tarjeta

```http
PUT /cards/:id/block
```

**Request Body:**
```json
{
  "reason": "lost_or_stolen"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "status": "blocked",
    "blockedAt": "2025-11-10T10:30:00Z"
  }
}
```

---

## 💸 Transacciones (Transactions)

### Listar Transacciones

```http
GET /transactions
```

**Query Parameters:**
- `cardId` (optional): filtrar por tarjeta
- `type` (optional): `payment`, `transfer`, `deposit`, `withdrawal`
- `status` (optional): `pending`, `completed`, `failed`, `reversed`
- `startDate` (optional): fecha inicio (ISO 8601)
- `endDate` (optional): fecha fin (ISO 8601)
- `page` (optional): número de página
- `limit` (optional): items por página

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "507f1f77bcf86cd799439011",
        "cardId": "507f1f77bcf86cd799439012",
        "type": "payment",
        "amount": 45.50,
        "currency": "USD",
        "status": "completed",
        "description": "Starbucks Coffee",
        "merchantInfo": {
          "name": "Starbucks",
          "category": "food_and_drink",
          "location": "New York, NY"
        },
        "createdAt": "2025-11-10T10:30:00Z",
        "completedAt": "2025-11-10T10:30:05Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 145,
      "pages": 8
    }
  }
}
```

### Detalle de Transacción

```http
GET /transactions/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "cardId": "507f1f77bcf86cd799439012",
    "type": "payment",
    "amount": 45.50,
    "currency": "USD",
    "status": "completed",
    "description": "Starbucks Coffee",
    "merchantInfo": {
      "name": "Starbucks",
      "merchantId": "STARBUCKS_NYC_001",
      "category": "food_and_drink",
      "location": "New York, NY"
    },
    "metadata": {
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "riskScore": 0.15
    },
    "createdAt": "2025-11-10T10:30:00Z",
    "completedAt": "2025-11-10T10:30:05Z"
  }
}
```

### Pago P2P

```http
POST /transactions/p2p
```

**Request Body:**
```json
{
  "fromCardId": "507f1f77bcf86cd799439011",
  "toCardNumber": "4111111111111234",
  "amount": 50.00,
  "currency": "USD",
  "description": "Payment for dinner"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "type": "transfer",
    "amount": 50.00,
    "status": "completed",
    "fromCardId": "507f1f77bcf86cd799439011",
    "toCardId": "507f1f77bcf86cd799439014",
    "createdAt": "2025-11-10T10:30:00Z"
  }
}
```

### Recargar Tarjeta

```http
POST /transactions/topup
```

**Request Body:**
```json
{
  "cardId": "507f1f77bcf86cd799439011",
  "amount": 100.00,
  "paymentMethod": "bank_transfer",
  "paymentMethodId": "pm_123456"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "type": "deposit",
    "amount": 100.00,
    "status": "pending",
    "estimatedCompletion": "2025-11-10T10:35:00Z"
  }
}
```

---

## 👨‍💼 Admin

### Dashboard

```http
GET /admin/dashboard
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 15420,
      "activeUsers": 12350,
      "totalCards": 23145,
      "activeCards": 18920,
      "totalTransactions": 145230,
      "transactionVolume": 5420350.50
    },
    "recentActivity": {
      "newUsers": 45,
      "newCards": 78,
      "transactionsToday": 1245
    }
  }
}
```

### Listar Usuarios (Admin)

```http
GET /admin/users
```

**Query Parameters:**
- `role` (optional): `user`, `admin`, `issuer`
- `kycStatus` (optional): `pending`, `verified`, `rejected`
- `isActive` (optional): `true`, `false`
- `search` (optional): buscar por email, nombre
- `page`, `limit`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "507f1f77bcf86cd799439011",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "user",
        "kycStatus": "verified",
        "isActive": true,
        "cardsCount": 2,
        "transactionsCount": 145,
        "createdAt": "2025-11-10T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15420,
      "pages": 771
    }
  }
}
```

### Aprobar Tarjeta

```http
PUT /admin/cards/:id/approve
```

**Request Body:**
```json
{
  "approved": true,
  "notes": "All documents verified"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "status": "active",
    "approvedBy": "507f1f77bcf86cd799439020",
    "approvedAt": "2025-11-10T10:30:00Z"
  }
}
```

---

## ❌ Errores

### Formato de Respuesta de Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| `VALIDATION_ERROR` | Datos de entrada inválidos |
| `UNAUTHORIZED` | Token inválido o expirado |
| `FORBIDDEN` | Sin permisos para la acción |
| `NOT_FOUND` | Recurso no encontrado |
| `CONFLICT` | Conflicto con estado actual |
| `RATE_LIMIT_EXCEEDED` | Demasiadas peticiones |
| `INTERNAL_ERROR` | Error interno del servidor |
| `INSUFFICIENT_FUNDS` | Fondos insuficientes |
| `CARD_BLOCKED` | Tarjeta bloqueada |
| `TRANSACTION_DECLINED` | Transacción rechazada |

---

## 🔄 Rate Limiting

- **Límite general**: 100 requests por 15 minutos
- **Auth endpoints**: 5 intentos por 15 minutos
- **Admin endpoints**: 200 requests por 15 minutos

Headers de respuesta:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699624800
```

---

## 📊 Paginación

Parámetros estándar:
- `page`: número de página (default: 1)
- `limit`: items por página (default: 20, max: 100)

Respuesta incluye:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "pages": 8
  }
}
```

---

## 🔍 Filtros y Búsqueda

Parámetros comunes:
- `search`: búsqueda de texto
- `sortBy`: campo para ordenar
- `sortOrder`: `asc` o `desc`
- `startDate`, `endDate`: rango de fechas

Ejemplo:
```
GET /transactions?search=starbucks&sortBy=createdAt&sortOrder=desc&startDate=2025-11-01
```

---

## 🌍 Internacionalización

Header para especificar idioma:
```
Accept-Language: es
```

Idiomas soportados: `en`, `es`, `pt`, `fr`

---

## 📝 Webhooks

Eventos disponibles:
- `card.created`
- `card.activated`
- `card.blocked`
- `transaction.completed`
- `transaction.failed`
- `user.kyc.verified`

Configurar webhook:
```http
POST /webhooks
{
  "url": "https://your-domain.com/webhook",
  "events": ["transaction.completed"],
  "secret": "your-webhook-secret"
}
```

---

Para más información, consultar la documentación completa en `/docs`.
