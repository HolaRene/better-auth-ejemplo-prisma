"use server";

import { obtenerSesionServer } from "@/lib/obtener-sesion";
import { forbidden, unauthorized } from "next/navigation";
import { setTimeout } from "node:timers/promises";

export async function deleteApplication() {
  // TODO: Handle authentication + authorization

  const sesion = await obtenerSesionServer();
  const usuario = sesion?.user;

  if (!usuario) unauthorized();

  if (usuario?.role !== "admin") forbidden();

  // Delete app...

  await setTimeout(800);
}
