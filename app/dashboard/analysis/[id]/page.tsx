import Link from "next/link";
import { notFound } from "next/navigation";

import { AnalysisWorkspace } from "@/components/analysis-workspace";
import { OutcomeButtons } from "@/components/outcome-buttons";
import { auth } from "@/lib/auth";
import { getAnalysisByIdForUser, listAnalysisIterationsForUser } from "@/lib/db";
import type { AnalysisResult } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  const analysis = await getAnalysisByIdForUser(id, session!.user!.id);

  if (!analysis) {
    notFound();
  }

  const result = JSON.parse(analysis.outputJson) as AnalysisResult;
  const iterations = await listAnalysisIterationsForUser(analysis.id, session!.user!.id);

  return (
    <div className="stack">
      <section className="card feature-card">
        <div className="section-heading compact">
          <h1>Resultado del analisis</h1>
          <p>
            {analysis.conversationContext} · {analysis.conversationType} ·{" "}
            {formatDate(new Date(analysis.createdAt))}
          </p>
          <p className="muted">
            Empieza por el medidor de cierre, luego revisa la lectura principal y
            despues baja al detalle.
          </p>
        </div>
        <Link href="/dashboard/analyze" className="button button-primary">
          Analizar otro chat
        </Link>
      </section>

      <OutcomeButtons analysisId={analysis.id} initialOutcome={analysis.outcome} />

      <AnalysisWorkspace
        analysisId={analysis.id}
        initialConversationText={analysis.inputText}
        initialResult={result}
        context={analysis.conversationContext}
        type={analysis.conversationType}
        initialIterations={iterations.map((item) => ({
          id: item.id,
          conversionScore: item.conversionScore,
          createdAt: item.createdAt,
        }))}
      />
    </div>
  );
}
