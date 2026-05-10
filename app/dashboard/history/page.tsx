import Link from "next/link";

import { EditableLabel } from "@/components/editable-label";
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
        <h1>Análisis anteriores</h1>
        <p>
          Revisa tus conversaciones guardadas. Click en el ícono ✏️ para renombrar cada
          análisis con el nombre del cliente y encontrarlas más fácil.
        </p>
      </div>

      <div className="history-grid">
        {analyses.length ? (
          analyses.map((analysis) => {
            const labels = getLabelsForContext(analysis.conversationContext);
            const outcomeBadge = analysis.outcome === "won"
              ? { label: "Cerrada", className: "outcome-pill outcome-pill-won" }
              : analysis.outcome === "lost"
              ? { label: "Perdida", className: "outcome-pill outcome-pill-lost" }
              : null;

            return (
              <article key={analysis.id} className="history-card card">
                <div className="history-card-top">
                  <span className="muted">
                    {analysis.conversationContext} · {analysis.conversationType}
                  </span>
                  {outcomeBadge ? (
                    <span className={outcomeBadge.className}>{outcomeBadge.label}</span>
                  ) : null}
                </div>
                <EditableLabel
                  analysisId={analysis.id}
                  initialLabel={analysis.label}
                  fallback={analysis.intent}
                />
                <p className="muted">
                  {labels.scoreTitle}: <strong>{analysis.conversionScore}%</strong> ·{" "}
                  {formatDate(new Date(analysis.createdAt))}
                </p>
                <Link href={`/dashboard/analysis/${analysis.id}`} className="button button-secondary">
                  Abrir análisis
                </Link>
              </article>
            );
          })
        ) : (
          <article className="history-card card">
            <h3>Aún no hay análisis guardados</h3>
            <p className="muted">
              Aquí aparecerán tus revisiones de conversaciones una vez las completes.
            </p>
            <Link href="/dashboard/analyze" className="button button-primary">
              Analizar mi primer chat
            </Link>
          </article>
        )}
      </div>
    </div>
  );
}
