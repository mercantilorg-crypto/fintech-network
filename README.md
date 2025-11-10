# Fintech Network Platform

Base de trabajo para el desarrollo de una plataforma fintech estilo "Visa Network", incluyendo web, backend y app móvil.

## Documentación Principal
- `PLAN.md`: plan maestro con objetivos, arquitectura, backlog y consideraciones de cumplimiento.
- `docs/`: espacio para documentación técnica y operativa detallada.

## Estructura del Repositorio
```
backend/   → Servicios API y lógica de negocio.
frontend/  → Aplicación web (React/Next.js).
mobile/    → Aplicación móvil (React Native).
docs/      → Documentación extendida y diagramas.
```

## Stack Implementado
- `backend/`: API Express + TypeScript con módulos de autenticación, usuarios, tarjetas, transacciones y panel admin.
- `frontend/`: Next.js + TypeScript con pantallas para login, dashboard, gestión de tarjetas, transacciones y administración.
- `mobile/`: Carpeta reservada para el cliente React Native (pendiente de implementación).

## Cómo Ejecutar

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Ambos servicios utilizan por defecto `http://localhost:4000` como API base. Ajustar las variables de entorno según el despliegue deseado.

## Próximas Iteraciones
- Definir flujos de CI/CD (p. ej. GitHub Actions).
- Inicializar módulo `mobile/` con React Native.
- Añadir pruebas automatizadas (unitarias y end-to-end).
- Completar integraciones simuladas con procesadores externos descritas en `PLAN.md`.
