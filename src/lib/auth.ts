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
import { envioEmail } from './email';

import { APIError, createAuthMiddleware } from 'better-auth/api'
import { passwordSchema } from './validation';

/**
 * Instancia de Better Auth configurada con el adaptador de Prisma.
 * Cambia `provider` si usas una base de datos distinta a PostgreSQL.
 */
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),

    // integración con proveedores sociales (OAuth)
    socialProviders:{
        // para crear las credenciales, ver:
        // Google: https://console.developers.google.com/
        // GitHub: https://github.com/settings/developers
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        github:{
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }
    },
    emailAndPassword: {
        enabled: true,
        // reseteo de contraseña
        sendResetPassword({user, url}){
            console.log(`Enviar email de reseteo de contraseña a ${user.email} con la URL: ${url}`);
            // Aquí integrar con un servicio de email real para enviar la URL
            return envioEmail({to: user.email, subject: 'Resetear contraseña', texto: `Para resetear tu contraseña ve a ${url}`});
        }
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
    emailVerification:{
        sendOnSignUp:true,
        autoSignInAfterVerification:true,
        async sendVerificationEmail({user,url, token}){
            console.log(`Enviar email de verificación a ${user.email} con el token: ${token}`);
            // Aquí integrar con un servicio de email real para enviar el token
            await envioEmail({to: user.email, subject: 'Verificación de email', texto: `Para verificar tu email ve a ${url}`});
        }
    }, 
    hooks:{
        // Middleware "before": se ejecuta antes de las rutas de auth.
        // Útil para validaciones y reglas de negocio previas.
        before:createAuthMiddleware(async ctx=>{
            // Filtro de rutas: aplica la validación solo a flujos de
            // registro por email, reseteo y cambio de contraseña.
            if(ctx.path === '/sign-up/email' || ctx.path === '/reset-password' || ctx.path === '/change-password'){
                // Obtiene la contraseña ingresada: nueva o actual según el flujo.
                const pasword = ctx.body.password || ctx.body.newPassword;

                // Valida la fortaleza/formato de la contraseña con `passwordSchema`.
                // `safeParse` retorna un objeto con `error` si no cumple reglas.
                const { error} = passwordSchema.safeParse(pasword);
                if(error){
                    // Detiene la petición con error 400 y un mensaje claro.
                    throw new APIError("BAD_REQUEST", {
                        message: "La contraseña no cumple los requisitos de seguridad.",
                    });
                }
            }
        })
    }
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