# Mobile Application

Aplicación móvil React Native para Android e iOS.

## Tecnologías

- React Native 0.72+
- TypeScript
- React Navigation
- React Query para datos del servidor
- AsyncStorage para almacenamiento local
- React Native Paper / NativeBase para UI

## Estructura del Proyecto

```
mobile/
├── src/
│   ├── screens/         # Pantallas de la app
│   ├── components/      # Componentes reutilizables
│   ├── navigation/      # Configuración de navegación
│   ├── services/        # Servicios API
│   ├── store/           # Estado global
│   ├── hooks/           # Custom hooks
│   └── utils/           # Utilidades
├── android/             # Código nativo Android
├── ios/                 # Código nativo iOS
├── .env.example
└── package.json
```

## Instalación

```bash
npm install
cd ios && pod install && cd ..  # Solo para iOS
```

## Configuración

1. Copiar `.env.example` a `.env`
2. Configurar la URL del backend API

## Desarrollo

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Build de Producción

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace FintechNetwork.xcworkspace -scheme FintechNetwork -configuration Release
```

## Pantallas Principales

- Login / Registro
- Dashboard (saldo, tarjetas)
- Gestión de Tarjetas
- Realizar Pago
- Historial de Transacciones
- Perfil

## Pruebas

```bash
npm test
```
