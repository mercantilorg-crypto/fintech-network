# Inicio Rápido

Guía rápida para comenzar con el desarrollo de Fintech Network.

## Prerrequisitos

Asegúrate de tener instalado:
- Node.js 18+ y npm/yarn
- MongoDB 6+ (o usar Docker)
- Redis 7+ (o usar Docker)
- Git

## Opción 1: Desarrollo Local

### 1. Iniciar Base de Datos (Docker)

```bash
docker-compose up -d
```

Esto iniciará MongoDB en el puerto 27017 y Redis en el puerto 6379.

### 2. Configurar Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus configuraciones si es necesario
npm run dev
```

El backend estará disponible en `http://localhost:3000`

### 3. Configurar Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Editar .env.local si es necesario
npm run dev
```

El frontend estará disponible en `http://localhost:3001`

### 4. Configurar Mobile (Opcional)

```bash
cd mobile
npm install
# Para Android: npm run android
# Para iOS: npm run ios (requiere macOS y Xcode)
```

## Opción 2: Solo Base de Datos con Docker

Si prefieres instalar Node.js localmente pero usar Docker solo para las bases de datos:

```bash
docker-compose up -d mongodb redis
```

Luego sigue los pasos 2-4 de la Opción 1.

## Verificar Instalación

### Backend
```bash
curl http://localhost:3000/health
```

Deberías recibir: `{"status":"ok","timestamp":"..."}`

### Frontend
Abre `http://localhost:3001` en tu navegador.

## Próximos Pasos

1. Revisa el [PLAN.md](./PLAN.md) para entender la arquitectura completa
2. Lee la [documentación de la API](./docs/api/README.md)
3. Explora los modelos de datos en `backend/src/models/`
4. Comienza a desarrollar según el roadmap del MVP

## Estructura de Desarrollo

- **Backend**: `backend/src/` - Lógica de negocio y API
- **Frontend**: `frontend/src/` - Aplicación web React/Next.js
- **Mobile**: `mobile/src/` - Aplicación móvil React Native
- **Docs**: `docs/` - Documentación técnica

## Comandos Útiles

### Backend
```bash
npm run dev      # Desarrollo con nodemon
npm test         # Ejecutar tests
npm run lint     # Linter
```

### Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm test         # Tests
```

### Mobile
```bash
npm start        # Metro bundler
npm run android  # Ejecutar en Android
npm run ios      # Ejecutar en iOS
```

## Troubleshooting

### MongoDB no conecta
- Verifica que MongoDB esté corriendo: `docker ps`
- Revisa la URI en `.env`: `MONGODB_URI=mongodb://localhost:27017/fintech-network`

### Redis no conecta
- Verifica que Redis esté corriendo: `docker ps`
- Revisa la URI en `.env`: `REDIS_URI=redis://localhost:6379`

### Puerto ocupado
- Cambia el puerto en `.env` o `.env.local`
- Backend default: 3000
- Frontend default: 3001

## Recursos

- [Plan Maestro](./PLAN.md)
- [Documentación de API](./docs/api/README.md)
- [Arquitectura](./docs/architecture/README.md)
- [Guía de Despliegue](./docs/deployment/README.md)
- [Seguridad](./docs/security/README.md)
