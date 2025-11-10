# 🚀 Getting Started - Fintech Platform

Guía rápida para empezar a trabajar con la plataforma fintech.

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (>= 18.0.0) - [Descargar](https://nodejs.org/)
- **npm** (>= 9.0.0) - Viene con Node.js
- **MongoDB** (>= 6.0) - [Descargar](https://www.mongodb.com/try/download/community)
- **Redis** (>= 7.0) - [Descargar](https://redis.io/download/)
- **Git** - [Descargar](https://git-scm.com/)

### Verificar Instalación

```bash
node --version   # v18.x.x o superior
npm --version    # 9.x.x o superior
mongod --version # v6.x.x o superior
redis-server --version # 7.x.x o superior
```

## 📦 Instalación Rápida

### 1. Clonar el Repositorio

```bash
git clone https://github.com/your-username/fintech-platform.git
cd fintech-platform
```

### 2. Configurar Variables de Entorno

#### Backend

```bash
cd backend
cp .env.example .env
```

Edita `backend/.env` con tus valores:

```env
# Mínimo requerido para empezar
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fintech-platform
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-key-change-this
JWT_REFRESH_SECRET=your-refresh-secret-key-change-this
```

#### Frontend

```bash
cd ../frontend
cp .env.example .env.local
```

Edita `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_NAME=Fintech Platform
```

#### Mobile (Opcional)

```bash
cd ../mobile
cp .env.example .env
```

### 3. Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Mobile (opcional)
cd ../mobile
npm install
```

### 4. Iniciar Servicios

Necesitarás 4 terminales abiertas:

#### Terminal 1: MongoDB

```bash
# macOS con Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Iniciar MongoDB desde Servicios

# O manualmente
mongod --dbpath /path/to/data/db
```

#### Terminal 2: Redis

```bash
# macOS con Homebrew
brew services start redis

# Linux
sudo systemctl start redis

# O manualmente
redis-server
```

#### Terminal 3: Backend

```bash
cd backend
npm run dev
```

Deberías ver:

```
🚀 Server running on port 3000
✅ Connected to MongoDB
✅ Connected to Redis
```

#### Terminal 4: Frontend

```bash
cd frontend
npm run dev
```

Deberías ver:

```
✓ Ready on http://localhost:3001
```

## 🎉 ¡Listo!

Abre tu navegador en:
- **Frontend**: http://localhost:3001
- **API Backend**: http://localhost:3000/api/v1

## 🧪 Verificar Instalación

### Test de API

```bash
# Health check
curl http://localhost:3000/health

# Debería responder:
# {"status":"ok","timestamp":"..."}
```

### Test de Frontend

Visita http://localhost:3001 - deberías ver la landing page de la aplicación.

## 📱 Configurar Mobile App

### iOS

```bash
cd mobile

# Instalar pods
cd ios && pod install && cd ..

# Iniciar en simulador
npm run ios
```

### Android

```bash
cd mobile

# Iniciar emulador (o conectar dispositivo)
# Luego:
npm run android
```

## 🔑 Crear Usuario Admin Inicial

```bash
cd backend

# Opción 1: Script de seed
npm run seed

# Esto creará un usuario admin con:
# Email: admin@fintech-platform.com
# Password: Admin123!

# Opción 2: Manualmente via API
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin"
  }'
```

## 📚 Próximos Pasos

### 1. Explorar la API

Revisa la [documentación de API](API.md) para ver todos los endpoints disponibles.

```bash
# Ejemplo: Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@fintech-platform.com",
    "password": "Admin123!"
  }'
```

### 2. Familiarizarte con el Código

```
backend/
├── src/
│   ├── models/       # Modelos de MongoDB
│   ├── controllers/  # Lógica de endpoints
│   ├── routes/       # Definición de rutas
│   ├── services/     # Lógica de negocio
│   └── middlewares/  # Auth, validación, etc.

frontend/
├── src/
│   ├── app/          # Páginas (Next.js App Router)
│   ├── components/   # Componentes React
│   └── lib/          # Utilidades y API client
```

### 3. Ejecutar Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### 4. Leer Documentación

- [Architecture](ARCHITECTURE.md) - Diseño del sistema
- [API Reference](API.md) - Endpoints y ejemplos
- [Contributing](../CONTRIBUTING.md) - Guía de contribución
- [Security](../SECURITY.md) - Políticas de seguridad

## 🐛 Troubleshooting

### Puerto ya en uso

```bash
# Encontrar proceso en puerto 3000
lsof -ti:3000

# Matar proceso
kill -9 $(lsof -ti:3000)
```

### MongoDB no conecta

```bash
# Verificar que MongoDB esté corriendo
mongosh

# Si falla, iniciar MongoDB
mongod --dbpath /path/to/data/db
```

### Redis no conecta

```bash
# Verificar Redis
redis-cli ping
# Debe responder: PONG

# Si falla, iniciar Redis
redis-server
```

### Error de instalación de dependencias

```bash
# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json
npm install

# O usar npm ci para instalación limpia
npm ci
```

### Frontend no puede conectar a API

1. Verifica que el backend esté corriendo
2. Verifica `NEXT_PUBLIC_API_URL` en `.env.local`
3. Verifica CORS en backend (debe permitir `http://localhost:3001`)

## 💡 Consejos

### VS Code Extensions Recomendadas

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- MongoDB for VS Code
- Docker
- GitLens

### Shortcuts Útiles

```bash
# Reiniciar todo rápidamente
pkill -f node && npm run dev

# Ver logs en tiempo real
tail -f backend/logs/combined.log

# Limpiar base de datos de desarrollo
mongosh fintech-platform --eval "db.dropDatabase()"
```

## 📞 ¿Necesitas Ayuda?

- 📖 [Documentación completa](../README.md)
- 💬 [GitHub Discussions](https://github.com/your-org/fintech-platform/discussions)
- 🐛 [Reportar un Bug](https://github.com/your-org/fintech-platform/issues)
- 📧 Email: support@fintech-platform.com

## 🎓 Tutoriales

### Crear tu Primer Endpoint

```typescript
// backend/src/controllers/example.controller.ts
export class ExampleController {
  async hello(req: Request, res: Response) {
    res.json({ message: 'Hello World!' });
  }
}

// backend/src/routes/example.routes.ts
router.get('/hello', exampleController.hello);
```

### Crear tu Primer Componente

```tsx
// frontend/src/components/HelloWorld.tsx
export const HelloWorld = () => {
  return <div>Hello from Fintech Platform!</div>;
};
```

### Hacer tu Primera Llamada a la API

```typescript
// frontend/src/lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getCards = async () => {
  const { data } = await apiClient.get('/cards');
  return data;
};
```

---

¡Felicitaciones! 🎉 Ya tienes todo listo para empezar a desarrollar.

**Siguiente paso**: Revisa el [Plan Maestro](../PLAN.md) para entender la visión completa del proyecto.
