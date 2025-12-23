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
    /**
     * Configuración del modelo de usuario en Better Auth.
     *
     * - `additionalFields`: añade campos personalizados al modelo `User` que
     *   deben existir también en Prisma (ver `prisma/schema.prisma`).
     * - `role`: campo de tipo cadena para control de roles/RBAC.
     *   - `type`: indica el tipo de dato manejado por Better Auth (p.ej. 'string').
     *   - `input: false`: evita que el campo se pueda establecer desde los flujos
     *     de entrada del usuario (registro/inicio de sesión). Debe gestionarse
     *     desde lógica del servidor o administración.
     *
     * Notas sobre `type`:
     * - Determina validación/serialización en Better Auth.
     * - Debe ser coherente con el tipo declarado en Prisma.
     * - Tipos habituales: 'string', 'number', 'boolean', 'date'.
     */
    user: {
        additionalFields: {
            role: {
                type: 'string',
                input: false,
            },
        },
    },
})

/**
 * Tipo utilitario para la sesión actual.
 *
 * Derivado de `auth.$Infer.Session`, representa la forma tipada de la sesión
 * devuelta por Better Auth en servidor o cliente.
 *
 * Uso:
 * ```ts
 * const sesion: Sesion | null = await auth.session.get()
 * if (sesion) {
 *   // sesion.user contiene datos del usuario autenticado
 * }
 * ```
 */
export type Sesion = typeof auth.$Infer.Session

/**
 * Tipo utilitario para el usuario autenticado dentro de la sesión.
 *
 * Derivado de `auth.$Infer.Session.user`. Incluye los campos estándar de Better Auth
 * y cualquier `additionalField` definido (p.ej., `role`).
 *
 * Uso:
 * ```ts
 * const sesion = await auth.session.get()
 * const usuario: Usuario | undefined = sesion?.user
 * ```
 */
export type Usuario = typeof auth.$Infer.Session.user