import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAdminStats } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const ADMIN_EMAIL = "ventaschat.com@gmail.com";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.email !== ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const stats = await getAdminStats();

  return (
    <div className="stack">
      <div className="section-heading">
        <h1>Panel de administrador</h1>
        <p className="muted">Estadisticas globales de VentasChat</p>
      </div>

      <section className="stats-grid">
        <article className="stat-card card">
          <p className="muted">Usuarios registrados</p>
          <p className="stat-value">{stats.totalUsers}</p>
        </article>
        <article className="stat-card card">
          <p className="muted">Analisis totales</p>
          <p className="stat-value">{stats.totalAnalyses}</p>
        </article>
        <article className="stat-card card">
          <p className="muted">Analisis hoy</p>
          <p className="stat-value">{stats.analysesToday}</p>
        </article>
        <article className="stat-card card">
          <p className="muted">Pagos completados</p>
          <p className="stat-value">{stats.checkoutsCompleted}</p>
        </article>
        <article className="stat-card card">
          <p className="muted">Creditos vendidos</p>
          <p className="stat-value">{stats.creditsFromPayments}</p>
        </article>
        <article className="stat-card card">
          <p className="muted">Creditos consumidos</p>
          <p className="stat-value">{stats.creditsConsumed}</p>
        </article>
      </section>

      <section>
        <div className="section-heading compact">
          <h2>Usuarios recientes</h2>
        </div>
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", color: "var(--muted)" }}>Email</th>
                <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", color: "var(--muted)" }}>Plan</th>
                <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", color: "var(--muted)" }}>Creditos</th>
                <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", color: "var(--muted)" }}>Registro</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "0.6rem 0.75rem" }}>{user.email}</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>{user.plan}</td>
                  <td style={{ padding: "0.6rem 0.75rem", textAlign: "right" }}>{user.credits}</td>
                  <td style={{ padding: "0.6rem 0.75rem", textAlign: "right", color: "var(--muted)" }}>
                    {formatDate(new Date(user.createdAt))}
                  </td>
                </tr>
              ))}
              {stats.recentUsers.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "1rem 0.75rem", color: "var(--muted)" }}>
                    Sin usuarios aun
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
