# 📱 Mobile App - Fintech Platform

Aplicación móvil nativa para iOS y Android construida con React Native.

## 🏗️ Estructura del Proyecto

```
mobile/
├── android/            # Código nativo Android
├── ios/                # Código nativo iOS
├── src/
│   ├── screens/        # Pantallas de la app
│   │   ├── Auth/       # Login, Register
│   │   ├── Home/       # Dashboard
│   │   ├── Cards/      # Gestión de tarjetas
│   │   ├── Transactions/ # Historial
│   │   └── Profile/    # Perfil de usuario
│   ├── components/     # Componentes reutilizables
│   │   ├── Card/       # Componente de tarjeta
│   │   ├── Button/     # Botones
│   │   └── Input/      # Inputs
│   ├── navigation/     # React Navigation
│   ├── services/       # API calls
│   ├── store/          # Estado global (Redux)
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utilidades
│   ├── theme/          # Colores, fuentes
│   └── types/          # TypeScript types
├── assets/             # Imágenes, fuentes
├── .env.example
├── app.json
├── package.json
└── README.md
```

## 📦 Instalación

### Prerequisitos
- Node.js >= 18
- React Native CLI
- Xcode (para iOS)
- Android Studio (para Android)
- CocoaPods (para iOS)

### Instalar dependencias

```bash
npm install

# iOS
cd ios && pod install && cd ..
```

## ⚙️ Configuración

Crear archivo `.env` basado en `.env.example`:

```env
# API
API_URL=http://localhost:3000/api/v1
WS_URL=ws://localhost:3000

# OneSignal (Push Notifications)
ONESIGNAL_APP_ID=your-onesignal-app-id

# Google Services
GOOGLE_MAPS_API_KEY=AIza...

# Environment
ENV=development
```

## 🚀 Ejecución

### iOS

```bash
# Desarrollo
npm run ios

# Específico simulador
npm run ios -- --simulator="iPhone 14 Pro"

# Device físico
npm run ios -- --device "iPhone de [Nombre]"
```

### Android

```bash
# Desarrollo
npm run android

# Release
npm run android -- --variant=release

# Específico emulador
npm run android -- --deviceId emulator-5554
```

## 📱 Pantallas Principales

### Autenticación
- **Login** - Inicio de sesión con email/teléfono
- **Register** - Registro de nuevo usuario
- **ForgotPassword** - Recuperar contraseña
- **OTP** - Verificación de código

### Dashboard
- **Home** - Dashboard con resumen de tarjetas y transacciones
- **Balance** - Vista detallada de balance

### Tarjetas
- **CardList** - Lista de tarjetas
- **CardDetail** - Detalle de tarjeta con opciones
- **RequestCard** - Solicitar nueva tarjeta
- **CardSettings** - Configuración de límites y seguridad

### Transacciones
- **TransactionHistory** - Historial completo
- **TransactionDetail** - Detalle de transacción
- **Transfer** - Transferir fondos P2P
- **TopUp** - Recargar tarjeta

### Perfil
- **Profile** - Información personal
- **Settings** - Configuración de la app
- **Security** - Cambiar contraseña, MFA
- **Help** - Centro de ayuda

## 🎨 Componentes Principales

### Card Component

```tsx
<Card
  cardNumber="**** **** **** 1234"
  holderName="John Doe"
  expiryDate="12/25"
  balance={1500.00}
  type="virtual"
  onPress={() => navigation.navigate('CardDetail')}
/>
```

### Transaction Item

```tsx
<TransactionItem
  type="payment"
  merchant="Starbucks"
  amount={-4.50}
  date="2025-11-10"
  status="completed"
/>
```

### Button

```tsx
<Button
  title="Transfer"
  onPress={handleTransfer}
  variant="primary"
  loading={isLoading}
/>
```

## 🎨 Sistema de Diseño

### Colores

```typescript
export const colors = {
  primary: '#2563eb',
  secondary: '#7c3aed',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#0f172a',
  textSecondary: '#64748b',
};
```

### Typography

```typescript
export const typography = {
  h1: { fontSize: 32, fontWeight: '700' },
  h2: { fontSize: 24, fontWeight: '700' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 14, fontWeight: '400' },
};
```

## 🔐 Autenticación

### Navegación Protegida

```tsx
// navigation/AppNavigator.tsx
const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
```

### Secure Storage

```typescript
import * as SecureStore from 'expo-secure-store';

// Guardar token
await SecureStore.setItemAsync('auth_token', token);

// Recuperar token
const token = await SecureStore.getItemAsync('auth_token');
```

## 🔔 Notificaciones Push

### Configuración OneSignal

```typescript
import OneSignal from 'react-native-onesignal';

OneSignal.setAppId(Config.ONESIGNAL_APP_ID);

OneSignal.setNotificationOpenedHandler((notification) => {
  console.log('Notification opened:', notification);
});
```

## 📊 Estado Global

### Redux Store

```typescript
// store/slices/cardSlice.ts
const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    selectedCard: null,
    loading: false,
  },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    selectCard: (state, action) => {
      state.selectedCard = action.payload;
    },
  },
});
```

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests E2E con Detox
npm run test:e2e:ios
npm run test:e2e:android

# Cobertura
npm run test:coverage
```

## 📦 Build y Deployment

### iOS

```bash
# Build de desarrollo
npm run build:ios:dev

# Build de producción
npm run build:ios:prod

# TestFlight
npm run deploy:ios:testflight
```

### Android

```bash
# Build APK
npm run build:android:apk

# Build AAB (Play Store)
npm run build:android:aab

# Deploy a Play Store (beta)
npm run deploy:android:beta
```

## 🔧 Configuración de Build

### iOS (ios/Podfile)

```ruby
platform :ios, '13.0'
use_frameworks!

target 'FintechApp' do
  # Pods
end
```

### Android (android/build.gradle)

```gradle
android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.fintech.app"
        minSdkVersion 24
        targetSdkVersion 33
    }
}
```

## 🚀 Performance

### Optimizaciones
- ✅ React Navigation v6 con native stack
- ✅ Lazy loading de pantallas
- ✅ Optimización de imágenes con FastImage
- ✅ Memoización con useMemo/useCallback
- ✅ FlatList optimizado para listas grandes
- ✅ Hermes JavaScript engine

## 🎯 Features Específicas de Plataforma

### iOS
- Face ID / Touch ID
- Apple Pay integration
- iCloud Keychain
- Widget de tarjetas

### Android
- Biometric authentication
- Google Pay integration
- Home screen widgets
- Deep linking

## 📝 Scripts Disponibles

```bash
npm run ios              # Correr en iOS
npm run android          # Correr en Android
npm test                 # Tests
npm run lint             # Linting
npm run format           # Formatear código
npm run clean            # Limpiar cache
npm run reset            # Reset completo
```

## 🐛 Debugging

### React Native Debugger

```bash
# Instalar
brew install --cask react-native-debugger

# Abrir
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

### Flipper

```bash
# iOS
npm run ios -- --configuration Debug

# Android
npm run android -- --variant=debug
```

## 📝 Próximas Mejoras

- [ ] Implementar biometría en todas las transacciones sensibles
- [ ] Agregar widgets para iOS y Android
- [ ] Implementar modo offline completo
- [ ] Mejorar animaciones con Reanimated
- [ ] Agregar más tests E2E
- [ ] Implementar deep linking completo
- [ ] Soporte para tablets

## 🤝 Contribuir

Ver [CONTRIBUTING.md](../CONTRIBUTING.md) para lineamientos.

## 📄 Licencia

MIT License - ver [LICENSE](../LICENSE) para detalles.
