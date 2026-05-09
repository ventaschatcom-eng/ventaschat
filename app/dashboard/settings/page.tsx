import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="stack">
      <div className="section-heading">
        <h1>Configuración</h1>
        <p>Información básica de la cuenta para el MVP.</p>
      </div>

      <article className="feature-card card">
        <h2>Cuenta</h2>
        <p>Email: {session?.user?.email}</p>
        <p>Plan: {session?.user?.plan}</p>
        <p>Créditos: {session?.user?.credits}</p>
      </article>
    </div>
  );
}
