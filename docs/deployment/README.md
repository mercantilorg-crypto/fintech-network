# Guía de Despliegue

## Requisitos Previos

- Node.js 18+
- MongoDB 6+
- Redis 7+
- (Opcional) Docker y Docker Compose

## Despliegue Local

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus configuraciones
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Editar .env.local con la URL del backend
npm run dev
```

### 3. Mobile

```bash
cd mobile
npm install
# Configurar según plataforma (Android/iOS)
npm run android  # o npm run ios
```

## Despliegue con Docker

### Docker Compose

Crear `docker-compose.yml` en la raíz:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
  
  redis:
    image: redis:7
    ports:
      - "6379:6379"
  
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/fintech-network
      - REDIS_URI=redis://redis:6379
    depends_on:
      - mongodb
      - redis
  
  frontend:
    build: ./frontend
    ports:
      - "3001:3001"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

## Despliegue en Producción

### Backend (Node.js)

1. Usar PM2 o similar para gestión de procesos
2. Configurar variables de entorno en producción
3. Habilitar HTTPS
4. Configurar rate limiting
5. Monitoreo y logs

### Frontend (Next.js)

1. Build de producción: `npm run build`
2. Desplegar en Vercel, Netlify, o servidor propio
3. Configurar dominio y SSL
4. Variables de entorno en producción

### Mobile

1. Build de producción para Android/iOS
2. Firmar aplicaciones
3. Subir a Google Play / App Store
4. Configurar notificaciones push

## Variables de Entorno de Producción

Asegúrate de configurar:

- `NODE_ENV=production`
- `MONGODB_URI` (producción)
- `REDIS_URI` (producción)
- `JWT_SECRET` (fuerte y seguro)
- `FRONTEND_URL` (URL de producción)
- Claves de API de servicios externos
