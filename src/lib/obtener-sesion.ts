/**
 * Utilidad de servidor para obtener la sesión actual.
 *
 * Lee los encabezados de la petición en un entorno Next.js (Server Components,
 * acciones del servidor o Route Handlers) y los pasa a Better Auth para
 * resolver la sesión.
 *
 * Ejemplo de uso (Server Component):
 * ```ts
 * import { obtenerSesionServer } from '@/lib/obtener-sesion'
 *
 * export default async function Page() {
 *   const result = await obtenerSesionServer()
 *   const session = result.data
 *   // ... render según sesión
 * }
 * ```
 */
import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Obtiene la sesión del usuario en el contexto del servidor.
 *
 * Retorna el resultado de `auth.api.getSession`, que suele incluir
 * `{ data, error }`. Usa `next/headers` para extraer cookies/headers de la
 * petición actual.
 */
export async function obtenerSesionServer() {
    return await auth.api.getSession({
        headers:await headers()
    })
}