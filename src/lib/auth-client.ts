/**
 * Cliente de Better Auth para el front-end (React/Next.js).
 *
 * Características:
 * - Incluye el plugin `nextCookies` para gestionar sesión vía cookies en Next.js.
 * - Preparado para usarse en hooks o acciones del cliente (`authClient.session`, `authClient.signIn`, etc.).
 *
 * Uso típico:
 * ```ts
 * import { authClient } from '@/lib/auth-client'
 *
 * const session = await authClient.session.get();
 * await authClient.signIn.email({ email, password });
 * ```
 */
import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react'

/**
 * Instancia de cliente Better Auth con soporte de cookies para Next.js.
 * Agrega o cambia plugins aquí si necesitas almacenamiento distinto o más features.
 */
export const authClient = createAuthClient({
    plugins: [nextCookies()],
})