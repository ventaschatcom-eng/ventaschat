import Link from "next/link";

import { auth } from "@/lib/auth";
import { getOutcomeStatsForUser, getUserById, listAnalysesByUser } from "@/lib/db";
import { getLabelsForContext } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  const [user, recentAnalyses, outcomeStats] = await Promise.all([
    getUserById(session!.user!.id),
    listAnalysesByUser(session!.user!.id, 4),
    getOutcomeStatsForUser(session!.user!.id),
  ]);

  const closedDeals = outcomeStats.won + outcomeStats.lost;
  const closeRate = closedDeals > 0 ? Math.round((outcomeStats.won / closedDeals) * 100) : null;

  return (
    <div className="stack">
      <section className="stats-grid">
        <article className="stat-card card">
          <p className="muted">Creditos disponibles</p>
          <p className="stat-value">{user?.credits ?? 0}</p>
        </article>
        <article className="stat-card card">
          <p className="muted">Plan actual</p>
          <p className="stat-value" style={{ fontSize: "1.5rem" }}>
            {user?.plan ?? "gratis"}
          </p>
        </article>
        <article className="stat-card card">
          <p className="muted">Miembro desde</p>
          <p className="stat-value" style={{ fontSize: "1.15rem" }}>
            {user ? formatDate(new Date(user.createdAt)) : "-"}
          </p>
        </article>
      </section>

      {outcomeStats.total > 0 ? (
        <section className="coaching-block card">
          <div className="coaching-head">
            <strong>Tu desempeño</strong>
            <p className="muted">
              Patrones que detectamos en tus conversaciones marcadas como ganadas o perdidas.
            </p>
          </div>
          <div className="coaching-grid">
            <div className="coaching-stat">
              <span className="coaching-stat-value coaching-stat-won">{outcomeStats.won}</span>
              <span className="coaching-stat-label">Ventas cerradas</span>
            </div>
            <div className="coaching-stat">
              <span className="coaching-stat-value coaching-stat-lost">{outcomeStats.lost}</span>
              <span className="coaching-stat-label">Perdidas</span>
            </div>
            <div className="coaching-stat">
              <span className="coaching-stat-value">{outcomeStats.pending}</span>
              <span className="coaching-stat-label">En curso</span>
            </div>
            <div className="coaching-stat">
              <span className="coaching-stat-value coaching-stat-rate">
                {closeRate !== null ? `${closeRate}%` : "—"}
              </span>
              <span className="coaching-stat-label">Tu close rate</span>
            </div>
          </div>
          {closedDeals < 5 ? (
            <p className="coaching-hint">
              💡 Marca al menos 5 conversaciones como cerradas o perdidas para empezar a ver
              tus patrones (qué palabras te funcionan, qué objeciones cierras mejor).
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="card feature-card">
        <div className="section-heading">
          <h1>{recentAnalyses.length === 0 ? "Empieza con un análisis de prueba" : "Analiza tu próxima conversación"}</h1>
          <p>
            {recentAnalyses.length === 0
              ? "En la página de análisis tienes 3 ejemplos listos para probar sin pegar nada. Te tomará 30 segundos ver el valor."
              : "Pega un chat de WhatsApp y recibe puntaje, vocabulario sugerido, métricas y 3 respuestas listas."}
          </p>
        </div>
        <Link href="/dashboard/analyze" className="button button-primary">
          {recentAnalyses.length === 0 ? "Probar con un ejemplo" : "Analizar nueva conversación"}
        </Link>
      </section>

      <section>
        <div className="section-heading compact">
          <h2>Analisis recientes</h2>
        </div>
        <div className="history-grid">
          {recentAnalyses.length ? (
            recentAnalyses.map((analysis) => {
              const labels = getLabelsForContext(analysis.conversationContext);

              return (
                <article key={analysis.id} className="history-card card">
                  <p className="muted">
                    {analysis.conversationContext} · {analysis.conversationType}
                  </p>
                  <h3>{analysis.intent}</h3>
                  <p className="muted">
                    {labels.scoreTitle}: {analysis.conversionScore}% ·{" "}
                    {formatDate(new Date(analysis.createdAt))}
                  </p>
                  <Link href={`/dashboard/analysis/${analysis.id}`} className="button button-secondary">
                    Ver analisis
                  </Link>
                </article>
              );
            })
          ) : (
            <article className="history-card card">
              <h3>Aun no hay analisis</h3>
              <p className="muted">
                Pega tu primera conversacion para generar insights y sugerencias de respuesta.
              </p>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
