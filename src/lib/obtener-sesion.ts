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
import { cache } from "react";

/**
 * Obtiene la sesión del usuario en el contexto del servidor.
 *
 * Implementación como función flecha envuelta en `cache(...)` de React:
 * - `cache(fn)` memoiza el resultado por ciclo de render/solicitud
 *   para las mismas entradas, evitando trabajo duplicado.
 * - En desarrollo (Strict Mode), React puede invocar funciones de servidor
 *   más de una vez para detectar efectos secundarios; sin cache, verás
 *   `console.log` repetido. Con `cache`, llamadas con los mismos argumentos
 *   reutilizan el resultado y el cuerpo no se ejecuta de nuevo, reduciendo
 *   logs duplicados.
 *
 * Retorna el resultado de `auth.api.getSession`, que suele incluir
 * `{ data, error }`. Usa `next/headers` para extraer cookies/headers de la
 * petición actual.
 */
export const obtenerSesionServer = cache(async () => {
    return await auth.api.getSession({
        headers: await headers()
    })
})