import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-shell">
      <div className="card feature-card">
        <h1>Página no encontrada</h1>
        <p className="muted">El recurso que buscas no existe o no tienes acceso a él.</p>
        <Link href="/" className="button button-primary">
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
