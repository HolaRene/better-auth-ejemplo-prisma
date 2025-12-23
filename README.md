## Descripción
Proyecto Next.js (App Router) con autenticación mediante Better Auth y persistencia en PostgreSQL a través de Prisma. Incluye páginas de registro, inicio de sesión, recuperación y verificación de correo, además de áreas protegidas (dashboard, perfil) y componentes UI con Tailwind.

## Stack
- Next.js 15 (App Router) + Turbopack
- React 19
- Prisma Client + Prisma Accelerate
- PostgreSQL
- Better Auth (email+password)
- Tailwind CSS 4

## Requisitos
- Node.js 18+
- PostgreSQL accesible y `DATABASE_URL`
- Opcional: cuenta Vercel para despliegue

## Instalación
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
Aplicación dev en http://localhost:3000.

## Variables de entorno
- `DATABASE_URL`: cadena de conexión PostgreSQL. Ejemplo: `postgresql://user:pass@localhost:5432/dbname`.

## Base de datos y Prisma
- Esquema en [prisma/schema.prisma](prisma/schema.prisma).
- El cliente se genera en [src/generated/prisma](src/generated/prisma).
- Inicialización del cliente en [src/lib/prisma.ts](src/lib/prisma.ts).

## Autenticación (Better Auth)
- Configuración del servidor en [src/lib/auth.ts](src/lib/auth.ts). Autenticación por email y contraseña habilitada; campo extra `role` en usuario.
- Cliente web en [src/lib/auth-client.ts](src/lib/auth-client.ts) con `nextCookies` para gestionar sesión.
- Endpoint Next.js API en [src/app/api/auth/[...all]/route.ts](src/app/api/auth/[...all]/route.ts) exponiendo `GET` y `POST`.

### Páginas de Auth
- Registro: [src/app/(auth)/sign-up/page.tsx](src/app/(auth)/sign-up/page.tsx)
- Inicio de sesión: [src/app/(auth)/sign-in/page.tsx](src/app/(auth)/sign-in/page.tsx)
- Olvidé mi contraseña: [src/app/(auth)/forgot-password/page.tsx](src/app/(auth)/forgot-password/page.tsx)
- Restablecer contraseña: [src/app/(auth)/reset-password/page.tsx](src/app/(auth)/reset-password/page.tsx)
- Verificar email: [src/app/(main)/verify-email/page.tsx](src/app/(main)/verify-email/page.tsx)
- Email verificado: [src/app/(main)/email-verified/page.tsx](src/app/(main)/email-verified/page.tsx)

### Áreas protegidas
- Dashboard: [src/app/(main)/dashboard/page.tsx](src/app/(main)/dashboard/page.tsx)
- Perfil: [src/app/(main)/profile/page.tsx](src/app/(main)/profile/page.tsx)

## Scripts
- `dev`: arranca en modo desarrollo con Turbopack.
- `build`: compila la aplicación.
- `start`: inicia la compilación producida.
- `lint`: ejecuta ESLint.

## Flujo de trabajo
1. Configura `DATABASE_URL`.
2. `npm install` y genera cliente: `npx prisma generate`.
3. Aplica migraciones: `npx prisma migrate dev --name init`.
4. Inicia `npm run dev`.

## Recursos
- Guía Better Auth + Next.js: https://www.prisma.io/docs/guides/betterauth-nextjs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
