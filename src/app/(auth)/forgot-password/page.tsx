import type { Metadata } from "next";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="space-y-6 w-full">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Contraseña olvidada</h1>
          <p className="text-muted-foreground">
            Introduce tu dirección de correo electrónico y te enviaremos un enlace para restablecer
            tu contraseña.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
