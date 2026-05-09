import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Empieza gratis — 10 análisis sin tarjeta",
  description: "Crea tu cuenta de VentasChat y obtén 10 análisis gratis. Descubre cómo responder mejor en WhatsApp y cerrar más ventas.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Empieza gratis — VentasChat",
    description: "10 análisis gratis al registrarte. Sin tarjeta.",
  },
};

export default async function SignupPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-shell">
      <AuthForm mode="signup" />
    </main>
  );
}
