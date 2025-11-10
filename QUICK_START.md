# ⚡ Quick Start Guide

Esta es una guía ultrarrápida para poner en marcha la plataforma en 5 minutos.

## 🎯 Opción 1: Docker (Más Rápido)

```bash
# 1. Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 2. Levantar todo con Docker
docker-compose up -d

# 3. ¡Listo! Acceder a:
# - Frontend: http://localhost:3001
# - Backend API: http://localhost:3000
# - MongoDB: localhost:27017
# - Redis: localhost:6379
```

## 💻 Opción 2: Local (Desarrollo)

### Prerequisitos
- Node.js 18+
- MongoDB
- Redis

### Setup

```bash
# 1. Instalar dependencias
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 2. Configurar .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Editar backend/.env con:
# - MONGODB_URI=mongodb://localhost:27017/fintech-platform
# - REDIS_URL=redis://localhost:6379
# - JWT_SECRET=your-secret-key

# 3. Iniciar servicios
# Terminal 1: MongoDB
mongod

# Terminal 2: Redis  
redis-server

# Terminal 3: Backend
cd backend && npm run dev

# Terminal 4: Frontend
cd frontend && npm run dev
```

## 🎉 Verificar

```bash
# API Health Check
curl http://localhost:3000/health

# Frontend
# Abrir http://localhost:3001 en el navegador
```

## 🔑 Usuario Admin Inicial

```bash
cd backend
npm run seed

# Credenciales:
# Email: admin@fintech-platform.com
# Password: Admin123!
```

## 📚 Siguientes Pasos

1. **Documentación completa**: [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md)
2. **Plan del proyecto**: [PLAN.md](PLAN.md)
3. **API Reference**: [docs/API.md](docs/API.md)
4. **Arquitectura**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 🆘 Problemas?

- MongoDB no conecta? → Verifica que esté corriendo: `mongosh`
- Puerto ocupado? → Mata el proceso: `kill -9 $(lsof -ti:3000)`
- Más ayuda: [docs/GETTING_STARTED.md#troubleshooting](docs/GETTING_STARTED.md#troubleshooting)

---

**¡Ya puedes empezar a desarrollar!** 🚀
