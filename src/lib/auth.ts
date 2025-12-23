/**
 * Configuración de autenticación para la aplicación usando Better Auth.
 *
 * Características:
 * - Adaptador Prisma apuntando a PostgreSQL.
 * - Autenticación por email y contraseña habilitada.
 *
 * Requisitos:
 * - Prisma Client inicializado (ver `src/lib/prisma.ts`).
 * - Base de datos PostgreSQL accesible y migraciones aplicadas.
 *
 * Uso básico:
 * ```ts
 * import { auth } from '@/lib/auth'
 *
 * // Ejemplo: obtener la sesión actual
 * const session = await auth.session.get()
 * ```
 */
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './prisma'

/**
 * Instancia de Better Auth configurada con el adaptador de Prisma.
 * Cambia `provider` si usas una base de datos distinta a PostgreSQL.
 */
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
    },
})