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
 *
 * Sobre `inferAdditionalFields`:
 * - Significa que el cliente infiere (a nivel de tipos) los campos adicionales
 *   definidos en el modelo de usuario del servidor (p.ej., `role` en `user.additionalFields`).
 * - Cuando está habilitado, `session.user` incluirá dichos campos con tipado fuerte,
 *   mejorando la DX sin cambiar la lógica de runtime.
 * - Si no está habilitado, `session.user` expone únicamente los campos estándar.
 *
 * Ejemplo (comentado) de configuración:
 * ```ts
 * // export const authClient = createAuthClient({
 * //   plugins: [nextCookies()],
 * //   inferAdditionalFields: true // habilita la inferencia de campos extra del usuario
 * // })
 * ```
 * Nota: Asegúrate de que los campos adicionales existen en Prisma y en la
 * configuración del servidor (ver `src/lib/auth.ts`).
 */
import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from './auth'

/**
 * Instancia de cliente Better Auth con soporte de cookies para Next.js.
 * Agrega o cambia plugins aquí si necesitas almacenamiento distinto o más features.
 */
export const authClient = createAuthClient({
    plugins: [nextCookies(), inferAdditionalFields<typeof auth>()],
})