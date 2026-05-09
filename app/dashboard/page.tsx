import Link from "next/link";

import { auth } from "@/lib/auth";
import { getUserById, listAnalysesByUser } from "@/lib/db";
import { getLabelsForContext } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  const [user, recentAnalyses] = await Promise.all([
    getUserById(session!.user!.id),
    listAnalysesByUser(session!.user!.id, 4),
  ]);

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

      <section className="card feature-card">
        <div className="section-heading">
          <h1>Entiende mejor cualquier conversacion y responde con claridad</h1>
          <p>
            Analiza conversaciones de ventas, trabajo o contexto personal para ver
            intencion, tono, fricciones, puntaje, explicacion y respuestas sugeridas.
          </p>
        </div>
        <Link href="/dashboard/analyze" className="button button-primary">
          Analizar nueva conversacion
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
