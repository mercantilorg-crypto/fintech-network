# 🤝 Contributing to Fintech Platform

¡Gracias por tu interés en contribuir a Fintech Platform! Este documento proporciona lineamientos y mejores prácticas para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commits y Pull Requests](#commits-y-pull-requests)
- [Testing](#testing)
- [Documentación](#documentación)

## 📜 Código de Conducta

Este proyecto sigue un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y profesional.

### Comportamientos Esperados

- ✅ Ser respetuoso con otros contribuyentes
- ✅ Aceptar críticas constructivas
- ✅ Enfocarse en lo que es mejor para la comunidad
- ✅ Mostrar empatía hacia otros miembros

### Comportamientos Inaceptables

- ❌ Lenguaje o imágenes sexualizadas
- ❌ Comentarios insultantes o despectivos
- ❌ Acoso público o privado
- ❌ Publicar información privada de otros

## 🚀 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor crea un issue con:

1. **Descripción clara** del problema
2. **Pasos para reproducir**
3. **Comportamiento esperado** vs **comportamiento actual**
4. **Screenshots** (si aplica)
5. **Información del sistema** (OS, versión de Node, etc.)

**Template:**
```markdown
## Descripción del Bug
[Descripción clara y concisa del bug]

## Pasos para Reproducir
1. Ir a '...'
2. Hacer click en '...'
3. Ver error

## Comportamiento Esperado
[Qué esperabas que sucediera]

## Screenshots
[Si aplica, agrega screenshots]

## Información del Sistema
- OS: [e.g. macOS 13.0]
- Node: [e.g. 18.0.0]
- Browser: [e.g. Chrome 119]
```

### Solicitar Features

Para solicitar nuevas funcionalidades:

1. Verifica que no exista un issue similar
2. Crea un nuevo issue con el tag `enhancement`
3. Describe el problema que resuelve
4. Propón una solución (opcional)

**Template:**
```markdown
## Descripción del Feature
[Descripción clara de la funcionalidad]

## Problema que Resuelve
[¿Qué problema o necesidad cubre?]

## Solución Propuesta
[Cómo crees que debería implementarse]

## Alternativas Consideradas
[Otras soluciones que consideraste]
```

## 💻 Proceso de Desarrollo

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/fintech-platform.git
cd fintech-platform
```

### 2. Crear una Rama

```bash
# Sincroniza con upstream
git checkout main
git pull upstream main

# Crea una rama para tu feature/fix
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

**Nomenclatura de Ramas:**
- `feature/` - Para nuevas funcionalidades
- `fix/` - Para corrección de bugs
- `docs/` - Para cambios en documentación
- `refactor/` - Para refactorización de código
- `test/` - Para agregar o mejorar tests
- `chore/` - Para tareas de mantenimiento

### 3. Desarrolla tu Cambio

```bash
# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev

# Ejecuta los tests
npm test
```

### 4. Commit tus Cambios

```bash
git add .
git commit -m "tipo: descripción breve del cambio"
```

### 5. Push y Crea un Pull Request

```bash
git push origin feature/nombre-descriptivo
```

Luego ve a GitHub y crea un Pull Request.

## 📝 Estándares de Código

### TypeScript/JavaScript

**Estilo de Código:**
- Usar TypeScript siempre que sea posible
- Seguir las reglas de ESLint configuradas
- Usar Prettier para formateo automático

```typescript
// ✅ Bueno
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

async function getUserById(id: string): Promise<User> {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

// ❌ Malo
function getUser(id) {
  return UserModel.findById(id);
}
```

**Naming Conventions:**
- Variables y funciones: `camelCase`
- Clases e interfaces: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Archivos: `kebab-case.ts`

```typescript
// Variables y funciones
const userName = 'John';
function getUserData() {}

// Clases e interfaces
class UserService {}
interface CardDetails {}

// Constantes
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// Archivos
user-service.ts
card-controller.ts
```

### React/React Native

**Componentes:**

```tsx
// ✅ Bueno - Functional Component con TypeScript
interface CardProps {
  cardNumber: string;
  holderName: string;
  balance: number;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  cardNumber, 
  holderName, 
  balance, 
  onPress 
}) => {
  return (
    <div onClick={onPress} className="card">
      <h3>{holderName}</h3>
      <p>{cardNumber}</p>
      <p>${balance.toFixed(2)}</p>
    </div>
  );
};

// ❌ Malo - Sin tipos, sin props interface
export const Card = ({ cardNumber, holderName, balance, onPress }) => {
  return (
    <div onClick={onPress}>
      <h3>{holderName}</h3>
      <p>{cardNumber}</p>
      <p>${balance}</p>
    </div>
  );
};
```

**Hooks:**

```typescript
// ✅ Bueno
import { useState, useEffect, useCallback } from 'react';

const useCards = (userId: string) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCards(userId);
      setCards(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return { cards, loading, error, refetch: fetchCards };
};
```

### Backend

**Controllers:**

```typescript
// ✅ Bueno
export class CardController {
  async getCards(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const cards = await cardService.getCardsByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: cards
      });
    } catch (error) {
      logger.error('Error fetching cards', { error, userId: req.user.id });
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch cards'
        }
      });
    }
  }
}
```

**Services:**

```typescript
// ✅ Bueno - Separation of concerns
export class CardService {
  constructor(
    private cardRepository: CardRepository,
    private notificationService: NotificationService
  ) {}

  async createCard(userId: string, cardData: CreateCardDto): Promise<Card> {
    // Validate
    await this.validateCardCreation(userId);
    
    // Create
    const card = await this.cardRepository.create({
      ...cardData,
      userId,
      status: 'pending'
    });
    
    // Notify
    await this.notificationService.sendCardCreatedNotification(userId, card);
    
    return card;
  }

  private async validateCardCreation(userId: string): Promise<void> {
    const activeCards = await this.cardRepository.countActiveCards(userId);
    if (activeCards >= MAX_CARDS_PER_USER) {
      throw new Error('Maximum number of cards reached');
    }
  }
}
```

## 💬 Commits y Pull Requests

### Mensaje de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(scope): descripción breve

[opcional] cuerpo del commit con más detalles

[opcional] footer con breaking changes o referencias
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formateo, punto y coma faltantes, etc.
- `refactor`: Refactorización de código
- `perf`: Mejoras de performance
- `test`: Agregar o corregir tests
- `chore`: Mantenimiento, dependencias, etc.

**Ejemplos:**

```bash
feat(cards): add virtual card creation endpoint
fix(auth): resolve JWT token expiration issue
docs(api): update authentication documentation
refactor(transactions): optimize database queries
test(cards): add unit tests for card service
```

### Pull Request

**Template:**

```markdown
## Descripción
[Descripción clara de los cambios realizados]

## Tipo de Cambio
- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva funcionalidad (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causa que funcionalidad existente no funcione como se esperaba)
- [ ] Requiere actualización de documentación

## ¿Cómo se ha Probado?
[Describe las pruebas realizadas]

## Checklist
- [ ] Mi código sigue las guías de estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código, particularmente en áreas difíciles de entender
- [ ] He realizado cambios correspondientes en la documentación
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado tests que prueban que mi fix es efectivo o que mi feature funciona
- [ ] Tests unitarios nuevos y existentes pasan localmente
- [ ] He verificado que no hay conflictos con la rama principal

## Screenshots (si aplica)
[Agrega screenshots si hay cambios visuales]

## Issues Relacionados
Closes #123
Related to #456
```

## 🧪 Testing

### Tests Obligatorios

Todo código nuevo debe incluir tests:

```typescript
// unit test example
describe('CardService', () => {
  let cardService: CardService;
  let mockRepository: jest.Mocked<CardRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
    } as any;
    cardService = new CardService(mockRepository);
  });

  describe('createCard', () => {
    it('should create a new card successfully', async () => {
      const userId = 'user123';
      const cardData = { type: 'virtual', currency: 'USD' };
      const expectedCard = { id: 'card123', ...cardData, userId };

      mockRepository.create.mockResolvedValue(expectedCard);

      const result = await cardService.createCard(userId, cardData);

      expect(result).toEqual(expectedCard);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...cardData,
        userId,
        status: 'pending'
      });
    });
  });
});
```

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests con cobertura
npm run test:coverage

# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests E2E
npm run test:e2e
```

### Cobertura Mínima

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

## 📚 Documentación

### JSDoc

Documenta funciones complejas:

```typescript
/**
 * Procesa una transacción P2P entre dos tarjetas
 * @param fromCardId - ID de la tarjeta origen
 * @param toCardId - ID de la tarjeta destino
 * @param amount - Monto a transferir
 * @param description - Descripción de la transacción
 * @returns Promise con los detalles de la transacción completada
 * @throws {InsufficientFundsError} Si el balance es insuficiente
 * @throws {CardBlockedError} Si alguna tarjeta está bloqueada
 */
async function processP2PTransaction(
  fromCardId: string,
  toCardId: string,
  amount: number,
  description?: string
): Promise<Transaction> {
  // Implementation
}
```

### README

Actualiza README cuando:
- Agregas nuevas features
- Cambias configuración
- Agregas nuevas dependencias
- Modificas scripts

## ✅ Checklist Final

Antes de enviar tu PR, verifica:

- [ ] ✅ Código pasa todos los tests
- [ ] ✅ Código pasa linting (`npm run lint`)
- [ ] ✅ Código está formateado (`npm run format`)
- [ ] ✅ TypeScript compila sin errores (`npm run typecheck`)
- [ ] ✅ Agregaste/actualizaste tests
- [ ] ✅ Actualizaste documentación
- [ ] ✅ Commits siguen convenciones
- [ ] ✅ PR tiene descripción clara
- [ ] ✅ No hay console.logs o código de debug
- [ ] ✅ No hay archivos innecesarios (build artifacts, etc.)

## 🙋 ¿Necesitas Ayuda?

- 📖 Revisa la [documentación](docs/)
- 💬 Abre una [Discussion](https://github.com/tu-usuario/fintech-platform/discussions)
- 🐛 Reporta [Issues](https://github.com/tu-usuario/fintech-platform/issues)

---

¡Gracias por contribuir a Fintech Platform! 🚀
