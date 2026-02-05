# Fitness Tracker Backend API

Backend API RESTful construida con NestJS y Prisma para una aplicación de seguimiento de fitness y nutrición.

## 🚀 Características

- ✅ Autenticación JWT
- ✅ CRUD completo para usuarios
- ✅ Gestión de entradas de comida (food entries)
- ✅ Gestión de entradas de actividad (activity entries)
- ✅ Estadísticas por fecha
- ✅ Cálculo automático de calorías basado en edad
- ✅ Validación de datos con class-validator
- ✅ Base de datos PostgreSQL con Prisma ORM

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
cd fitness-tracker-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/fitness_tracker?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"
PORT=3000
```

4. **Configurar la base de datos**
```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Poblar con datos de prueba (opcional)
npm run prisma:seed
```

## 🏃‍♂️ Ejecutar la Aplicación

### Modo desarrollo
```bash
npm run start:dev
```

### Modo producción
```bash
npm run build
npm run start:prod
```

La API estará disponible en: `http://localhost:3000/api`

## 📚 Endpoints de la API

### Autenticación

#### Registro de Usuario
```http
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "name": "John Doe",
  "age": 30,
  "weight": 75,
  "height": 175,
  "goal": "MAINTAIN"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    ...
  }
}
```

### Usuarios

#### Obtener Perfil
```http
GET /api/users/profile
Authorization: Bearer {token}
```

#### Actualizar Usuario
```http
PATCH /api/users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "age": 31,
  "weight": 70,
  "goal": "LOSE"
}
```

#### Eliminar Usuario
```http
DELETE /api/users/:id
Authorization: Bearer {token}
```

### Entradas de Comida

#### Crear Entrada de Comida
```http
POST /api/food-entries
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Grilled Chicken Salad",
  "calories": 450,
  "mealType": "LUNCH",
  "date": "2026-02-04"
}
```

Tipos de comida válidos: `BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`

#### Obtener Todas las Entradas
```http
GET /api/food-entries
Authorization: Bearer {token}

# Filtrar por fecha
GET /api/food-entries?date=2026-02-04
```

#### Obtener Estadísticas por Fecha
```http
GET /api/food-entries/stats/2026-02-04
Authorization: Bearer {token}

Response:
{
  "date": "2026-02-04",
  "totalCalories": 1200,
  "totalEntries": 4,
  "byMealType": {
    "BREAKFAST": { "count": 1, "calories": 300 },
    "LUNCH": { "count": 1, "calories": 450 },
    "DINNER": { "count": 1, "calories": 400 },
    "SNACK": { "count": 1, "calories": 50 }
  },
  "entries": [...]
}
```

#### Actualizar Entrada
```http
PATCH /api/food-entries/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "calories": 500
}
```

#### Eliminar Entrada
```http
DELETE /api/food-entries/:id
Authorization: Bearer {token}
```

### Entradas de Actividad

#### Crear Entrada de Actividad
```http
POST /api/activity-entries
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Morning Run",
  "duration": 30,
  "calories": 300,
  "date": "2026-02-04"
}
```

#### Obtener Todas las Actividades
```http
GET /api/activity-entries
Authorization: Bearer {token}

# Filtrar por fecha
GET /api/activity-entries?date=2026-02-04
```

#### Obtener Estadísticas por Fecha
```http
GET /api/activity-entries/stats/2026-02-04
Authorization: Bearer {token}

Response:
{
  "date": "2026-02-04",
  "totalCalories": 600,
  "totalDuration": 90,
  "totalActivities": 2,
  "entries": [...]
}
```

#### Actualizar Actividad
```http
PATCH /api/activity-entries/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "duration": 45,
  "calories": 400
}
```

#### Eliminar Actividad
```http
DELETE /api/activity-entries/:id
Authorization: Bearer {token}
```

## 🗄️ Esquema de Base de Datos

### User
- `id`: String (CUID)
- `email`: String (único)
- `username`: String (único)
- `password`: String (hasheado)
- `name`: String (opcional)
- `age`: Int (opcional)
- `weight`: Float (opcional)
- `height`: Float (opcional)
- `goal`: Enum (LOSE, MAINTAIN, GAIN)
- `dailyCalorieIntake`: Int
- `dailyCalorieBurn`: Int
- `createdAt`: DateTime
- `updatedAt`: DateTime

### FoodEntry
- `id`: String (CUID)
- `documentId`: String (único)
- `name`: String
- `calories`: Int
- `mealType`: Enum (BREAKFAST, LUNCH, DINNER, SNACK)
- `date`: String (YYYY-MM-DD)
- `userId`: String (FK)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### ActivityEntry
- `id`: String (CUID)
- `documentId`: String (único)
- `name`: String
- `duration`: Int (minutos)
- `calories`: Int
- `date`: String (YYYY-MM-DD)
- `userId`: String (FK)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt (10 rounds)
- Autenticación basada en JWT
- Protección CORS configurada
- Validación de datos en todos los endpoints
- Las rutas protegidas requieren token de autenticación

## 📊 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Inicia el servidor en modo desarrollo con hot-reload

# Producción
npm run build             # Compila el proyecto
npm run start:prod        # Ejecuta la versión compilada

# Prisma
npm run prisma:generate   # Genera el cliente de Prisma
npm run prisma:migrate    # Ejecuta migraciones
npm run prisma:studio     # Abre Prisma Studio (GUI)
npm run prisma:seed       # Ejecuta el seed de datos

# Testing
npm run test              # Ejecuta tests
npm run test:watch        # Ejecuta tests en modo watch
npm run test:cov          # Genera reporte de cobertura

# Linting
npm run lint              # Ejecuta ESLint
npm run format            # Formatea código con Prettier
```

## 🧪 Usuario de Prueba

Después de ejecutar el seed, puedes usar estas credenciales:

- **Username**: `DemoUser`
- **Password**: `demo123456`
- **Email**: `demo@example.com`

## 🎯 Cálculo de Calorías por Edad

El sistema calcula automáticamente las calorías diarias recomendadas basándose en la edad del usuario:

- **15-18 años**: 2500-2550 cal (intake) / 600 cal (burn)
- **19-30 años**: 2350-2500 cal (intake) / 500-550 cal (burn)
- **31-45 años**: 2050-2300 cal (intake) / 425-475 cal (burn)
- **46-60 años**: 1850-2000 cal (intake) / 375-400 cal (burn)
- **60+ años**: 1500-1850 cal (intake) / 300-375 cal (burn)

## 🚀 Próximas Características

- [ ] Endpoints para gráficas y tendencias
- [ ] Sistema de logros y badges
- [ ] Notificaciones push
- [ ] Integración con wearables
- [ ] Planes de comida sugeridos
- [ ] Recetas y base de datos de alimentos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.
