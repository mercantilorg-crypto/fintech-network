# API Documentation

Documentación de endpoints de la API REST.

## Base URL

```
http://localhost:3000/api
```

## Autenticación

La mayoría de los endpoints requieren autenticación mediante JWT token en el header:

```
Authorization: Bearer <token>
```

## Endpoints

### Autenticación

- `POST /api/auth/register` - Registro de nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Refrescar token
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/forgot-password` - Solicitar recuperación de contraseña
- `POST /api/auth/reset-password` - Restablecer contraseña

### Tarjetas

- `GET /api/cards` - Listar tarjetas del usuario autenticado
- `GET /api/cards/:id` - Obtener detalles de una tarjeta
- `POST /api/cards/request` - Solicitar nueva tarjeta
- `POST /api/cards/:id/activate` - Activar tarjeta
- `POST /api/cards/:id/cancel` - Cancelar tarjeta
- `PUT /api/cards/:id/limits` - Actualizar límites de la tarjeta

### Transacciones

- `GET /api/transactions` - Historial de transacciones
- `GET /api/transactions/:id` - Detalles de una transacción
- `POST /api/transactions/p2p` - Realizar pago P2P
- `POST /api/transactions/load` - Cargar fondos a tarjeta
- `POST /api/transactions/withdraw` - Retirar fondos

### Administración

- `GET /api/admin/users` - Listar usuarios (admin)
- `GET /api/admin/cards` - Listar todas las tarjetas (admin)
- `POST /api/admin/cards/:id/approve` - Aprobar tarjeta (admin)
- `GET /api/admin/stats` - Estadísticas del sistema (admin)

## Códigos de Estado

- `200` - Éxito
- `201` - Creado
- `400` - Solicitud inválida
- `401` - No autorizado
- `403` - Prohibido
- `404` - No encontrado
- `500` - Error del servidor

## Formato de Respuesta

### Éxito
```json
{
  "success": true,
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```
