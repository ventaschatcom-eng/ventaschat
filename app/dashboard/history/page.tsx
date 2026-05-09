import Link from "next/link";

import { auth } from "@/lib/auth";
import { listAnalysesByUser } from "@/lib/db";
import { getLabelsForContext } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default async function HistoryPage() {
  const session = await auth();

  const analyses = await listAnalysesByUser(session!.user!.id);

  return (
    <div className="stack">
      <div className="section-heading">
        <h1>Analisis anteriores</h1>
        <p>
          Revisa conversaciones de ventas, trabajo o contexto personal y vuelve a ver la
          recomendacion de siguiente paso.
        </p>
      </div>

      <div className="history-grid">
        {analyses.length ? (
          analyses.map((analysis) => {
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
                  Abrir
                </Link>
              </article>
            );
          })
        ) : (
          <article className="history-card card">
            <h3>Aun no hay analisis guardados</h3>
            <p className="muted">
              Aqui apareceran tus revisiones de conversaciones una vez las completes.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
