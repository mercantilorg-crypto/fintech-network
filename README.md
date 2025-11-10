# Fintech Network - Plataforma de Tarjetas Estilo Visa

Plataforma full stack para emisión, gestión y operación de tarjetas en una red propia. Incluye aplicación web, backend API, y aplicación móvil.

## 🎯 Objetivo

Crear una plataforma completa que permita:
- Emisión y gestión de tarjetas virtuales y físicas
- Red interna de pagos y transacciones
- Panel administrativo para control y aprobaciones
- Aplicación móvil para usuarios finales
- Integración con procesadores de pago externos

## 📁 Estructura del Proyecto

```
fintech-network/
├── backend/          # API REST (Node.js/Express/NestJS)
├── frontend/         # Aplicación web (React/Next.js)
├── mobile/          # App móvil (React Native)
├── docs/            # Documentación técnica
└── PLAN.md          # Plan maestro del proyecto
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ y npm/yarn
- MongoDB 6+
- Redis 7+
- (Opcional) Docker y Docker Compose

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Configurar variables de entorno
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env  # Configurar variables de entorno
npm run dev
```

### Mobile

```bash
cd mobile
npm install
# Configurar archivos de entorno según plataforma
npm run android  # o npm run ios
```

## 📋 Módulos Principales

1. **Usuarios y Seguridad**: Registro, login, KYC, roles
2. **Red de Tarjetas**: Solicitud, emisión, activación, gestión
3. **Transacciones**: Pagos P2P, recargas, retiros, historial
4. **Panel Administrativo**: Dashboard, estadísticas, aprobaciones
5. **Integraciones**: Procesadores de pago, notificaciones
6. **App Móvil**: Flujos esenciales para usuarios finales

## 🛠️ Tecnologías

- **Backend**: Node.js, Express/NestJS, MongoDB, Redis
- **Frontend**: React, Next.js, TypeScript
- **Mobile**: React Native, TypeScript
- **Autenticación**: JWT
- **CI/CD**: GitHub Actions

## 📖 Documentación

Ver [PLAN.md](./PLAN.md) para el plan maestro completo y roadmap detallado.

Documentación técnica adicional en `/docs`.

## 🔒 Seguridad

- Encriptación de datos sensibles
- Autenticación multifactor (MFA) para admins
- Auditoría de transacciones
- Control de roles y permisos
- Cumplimiento AML/KYC

## 📝 Licencia

Apache License 2.0 - Ver [LICENSE](./LICENSE)

## 🤝 Contribución

Este es un proyecto en desarrollo activo. Ver el plan maestro para issues y tareas pendientes.
