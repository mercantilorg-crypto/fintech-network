# Cumplimiento y Seguridad

## Requisitos AML/KYC
- Definir política de verificación de identidad con proveedores externos o processes manuales.
- Mantener registros de clientes y transacciones conforme a normativas locales.
- Establecer umbrales de monitoreo y alertas para actividades sospechosas.

## Protección de Datos
- Encriptar datos sensibles en reposo y en tránsito.
- Segregar información de tarjetas utilizando servicios seguros (PCI DSS alineado).
- Implementar rotación periódica de llaves y secretos.

## Controles de Acceso
- Autenticación multifactor para administradores.
- Registro de auditoría para eventos críticos (aprobaciones, cambios de límites, fraudes).
- Revisión periódica de roles y permisos.

## Pruebas y Auditorías
- Ejecutar pentesting en cada release mayor.
- Automatizar pruebas de cumplimiento en pipelines de CI/CD.
- Mantener runbooks de respuesta a incidentes y proceso de notificación.
