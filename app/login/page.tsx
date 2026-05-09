import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Accede a tu cuenta de VentasChat para analizar conversaciones de WhatsApp y mejorar tus cierres.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-shell">
      <AuthForm mode="login" />
    </main>
  );
}
