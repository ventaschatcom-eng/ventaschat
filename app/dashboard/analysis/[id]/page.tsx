import Link from "next/link";
import { notFound } from "next/navigation";

import { AnalysisDetails } from "@/components/analysis-card";
import { auth } from "@/lib/auth";
import { getAnalysisByIdForUser } from "@/lib/db";
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

  return (
    <div className="stack">
      <section className="card feature-card">
        <div className="section-heading compact">
          <h1>Resultado del analisis</h1>
          <p>
            {analysis.conversationContext} · {analysis.conversationType} ·{" "}
            {formatDate(new Date(analysis.createdAt))}
          </p>
        </div>
        <Link href="/dashboard/analyze" className="button button-primary">
          Analizar otro chat
        </Link>
      </section>

      <AnalysisDetails result={result} context={analysis.conversationContext} />
    </div>
  );
}
