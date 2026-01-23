import type { Metadata } from "next";
import { EmailForm } from "./email-form";
import { LogoutEverywhereButton } from "./logout-everywhere-button";
import { PasswordForm } from "./password-form";
import { ProfileDetailsForm } from "./profile-details-form";
import { obtenerSesionServer } from "@/lib/obtener-sesion";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Perfil",
};

export default async function ProfilePage() {
  // TODO: Check for authentication
  const session = await obtenerSesionServer()
  const user = session?.user

  if (!user) return unauthorized()

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <p className="text-muted-foreground">
            Actualiza los datos de tu cuenta, correo y contraseña.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <ProfileDetailsForm usuario={user} />
          </div>
          <div className="flex-1 space-y-6">
            <EmailForm currentEmail={user.email} />
            <PasswordForm />
            <LogoutEverywhereButton />
          </div>
        </div>
      </div>
    </main>
  );
}
