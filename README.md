# FitnnestAI 🧬⚡

**FitnnestAI** es una plataforma integral de fitness de alto rendimiento que fusiona el seguimiento biométrico con inteligencia artificial avanzada. Diseñada con una estética *Biopunk Athletic*, la aplicación ofrece una experiencia inmersiva para atletas y entusiastas del bienestar.

---

## 🚀 Visión General

FitnnestAI no es solo un registrador de ejercicios; es tu gurú personal de fitness. Utiliza **Google Gemini AI** para auditar tu nutrición y hábitos, proporcionando insights accionables basados en datos reales.

### ✨ Características Principales

-   **🤖 Auditoría Nutricional con IA**: Análisis inteligente de comidas y sugerencias basadas en objetivos a través de Google Gemini Pro.
-   **📊 Dashboard Biométrico**: Visualización en tiempo real de actividad, hidratación y progreso calórico.
-   **🔋 Seguimiento de Actividad**: Registro detallado de entrenamientos con gráficos dinámicos y métricas de rendimiento.
-   **💧 Control de Hidratación**: Gestor interactivo de consumo de agua diario con metas personalizadas.
-   **📱 Diseño Ultra-Responsivo**: Experiencia fluida en móvil, tablet y desktop con componentes optimizados para cada tamaño.
-   **🎨 Estética Biopunk**: Interfaz premium con glassmorphism, neones activos y tipografía *Syne* para un look futurista.

---

## 🛠️ Stack Tecnológico

La aplicación utiliza un stack moderno y escalable (MERN evolucionado):

### Frontend (client-web)
-   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
-   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Estado**: [Zustand](https://docs.pmnd.rs/zustand/) (Manejo de auth y estados globales)
-   **Consultas API**: [TanStack Query v5](https://tanstack.com/query/latest) (Gestión de cache y peticiones)
-   **UI & Componentes**: React Icons, Sonner (notificaciones), Lucide (iconos adicionales).
-   **Documentación**: [Storybook](https://storybook.js.org/)
-   **Testing**: [Vitest](https://vitest.dev/) con React Testing Library y Playwright para integración en navegador.

### Backend (fitness-tracker-backend)
-   **Framework**: [NestJS](https://nestjs.com/) (Arquitectura robusta basada en Node.js)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
-   **IA**: [Google Generative AI](https://ai.google.dev/) (Integración directa con Gemini Pro)
-   **Autenticación**: Passport.js + JWT (JSON Web Tokens)
-   **Documentación API**: [Swagger / OpenAPI](https://swagger.io/)
-   **Almacenamiento**: [Cloudinary](https://cloudinary.com/) (Gestión de recursos multimedia y avatares)
-   **Testing**: [Jest](https://jestjs.io/) (Unitarios e integración)

---

## 📁 Estructura del Proyecto

```bash
FitnnestAI/
├── client-web/             # Aplicación Frontend (React + Vite)
│   ├── src/
│   │   ├── features/       # Lógica distribuida por módulos (auth, dashboard, food, activity, profile)
│   │   ├── shared/         # Componentes UI reutilizables y layout base
│   │   ├── stores/         # Estados globales con Zustand
│   │   └── config/         # Interceptores de Axios y constantes
│   └── stories/            # Historias de Storybook para componentes aislados
├── fitness-tracker-backend/# API Backend (NestJS + Prisma)
│   ├── src/
│   │   ├── modules/        # Módulos de la API (users, workouts, nutrition, ai)
│   │   └── prisma/         # Esquema de base de datos y migraciones
│   └── test/               # Pruebas integrales y unitarias
└── .github/                # Flujos de CI/CD para despliegue automático (Vercel/Render)
```

---

## ⚙️ Configuración y Despliegue

### Requisitos Previos
-   Node.js 20+
-   pnpm 10+ (gestor de paquetes recomendado para velocidad y eficiencia)
-   PostgreSQL instalado o base de datos en la nube (ej. Supabase)
-   API Key de Google Gemini Pro

### Instalación Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Johnmontoya/FitnnestAI.git
   cd FitnnestAI
   ```

2. **Backend:**
   ```bash
   cd fitness-tracker-backend
   pnpm install
   # Crea tu archivo .env basado en .env.example
   pnpm prisma:migrate
   pnpm start:dev
   ```

3. **Frontend:**
   ```bash
   cd ../client-web
   pnpm install
   # Configura .env si es necesario para apuntar al backend local
   pnpm dev
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**.

---

Desarrollado con ❤️ por el equipo de **John Montoya**. **FitnnestAI - Transforma tu cuerpo, un rep a la vez.**
