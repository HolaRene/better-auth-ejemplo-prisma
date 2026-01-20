import { obtenerSesionServer } from "@/lib/obtener-sesion";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata = {
  title: "Autenticación",
  description: "Inicia sesión o regístrate para acceder a la aplicación.",
};

export default async function AuthLayout({ children }: { children: ReactNode }) {
  // TODO: Redirect already logged-in users
  const sesion = await obtenerSesionServer();

  const user = sesion?.user;

  if (user) redirect('/dashboard');

  return children;
}
