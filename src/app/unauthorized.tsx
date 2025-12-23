import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex grow items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Sin autorización</h1>
          <p className="text-muted-foreground">Por favor, inicie sesión para continuar.</p>
        </div>
        <div>
          <Button asChild>
            <Link href="/sign-in">Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
