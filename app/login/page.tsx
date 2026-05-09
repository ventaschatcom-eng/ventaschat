import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

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
