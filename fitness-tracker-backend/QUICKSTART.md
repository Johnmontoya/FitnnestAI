# 🚀 Guía de Inicio Rápido

## Configuración en 5 Minutos

### 1. Instalar PostgreSQL

**macOS (usando Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Descarga el instalador desde [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Crear Base de Datos

```bash
# Conectarse a PostgreSQL
psql postgres

# Dentro de psql, ejecutar:
CREATE DATABASE fitness_tracker;
CREATE USER fitness_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE fitness_tracker TO fitness_user;
\q
```

### 3. Configurar el Proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar archivo de entorno
cp .env.example .env

# 3. Editar .env con tus credenciales
nano .env
# Actualizar DATABASE_URL con tu usuario y contraseña

# 4. Generar cliente Prisma
npm run prisma:generate

# 5. Ejecutar migraciones
npm run prisma:migrate

# 6. Poblar con datos de prueba
npm run prisma:seed
```

### 4. Iniciar el Servidor

```bash
npm run start:dev
```

¡Listo! El servidor estará corriendo en `http://localhost:3000/api`

## 🧪 Probar la API

### Opción 1: Usar curl

```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "DemoUser",
    "password": "demo123456"
  }'

# Guarda el token que recibes

# 2. Obtener perfil
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### Opción 2: Usar Postman/Insomnia

1. Importa el archivo `api-collection.json`
2. Ejecuta el request "Login" para obtener tu token
3. Copia el token en las demás requests

### Opción 3: Usar Prisma Studio

```bash
npm run prisma:studio
```

Abre tu navegador en `http://localhost:5555` para ver y editar datos directamente.

## 📊 Datos de Prueba

Después del seed, tendrás:

**Usuario:**
- Username: `DemoUser`
- Password: `demo123456`
- Email: `demo@example.com`

**2 Entradas de Comida:**
- Oatmeal with Blueberries (300 cal, Breakfast)
- Grilled Chicken Salad (450 cal, Lunch)

**1 Entrada de Actividad:**
- Morning Run (30 min, 300 cal)

## 🔧 Comandos Útiles

```bash
# Ver logs en tiempo real
npm run start:dev

# Reiniciar base de datos
npm run prisma:migrate reset

# Abrir Prisma Studio
npm run prisma:studio

# Ver estructura de base de datos
npx prisma studio
```

## ⚠️ Solución de Problemas Comunes

### Error: "Can't reach database server"
- Verifica que PostgreSQL esté corriendo: `pg_isready`
- Verifica las credenciales en `.env`

### Error: "Schema needs migration"
```bash
npm run prisma:generate
npm run prisma:migrate
```

### Error: "Port 3000 already in use"
Cambia el puerto en `.env`:
```env
PORT=3001
```

### Error al importar bcrypt
```bash
npm rebuild bcrypt --build-from-source
```

## 📱 Conectar con tu Frontend

En tu aplicación frontend, configura la URL base:

```javascript
// React/Next.js
const API_URL = 'http://localhost:3000/api';

// Ejemplo de login
const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
};

// Ejemplo de request autenticado
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.json();
};
```

## 🎯 Próximos Pasos

1. ✅ Backend funcionando
2. 📱 Conectar con tu frontend React/Vue/Angular
3. 🎨 Personalizar los endpoints según tus necesidades
4. 🚀 Desplegar en producción (Vercel, Railway, Render, etc.)

## 💡 Tips

- Usa Prisma Studio para inspeccionar datos visualmente
- Los tokens JWT expiran en 7 días (configurable en .env)
- Todas las contraseñas se hashean automáticamente
- Las fechas deben estar en formato YYYY-MM-DD
- El userId se obtiene automáticamente del token JWT

¿Tienes preguntas? Revisa el README.md completo o abre un issue.
