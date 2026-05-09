import type { AnalysisResult, ConversationContext } from "@/lib/types";
import { getLabelsForContext } from "@/lib/types";

type AnalysisCardProps = {
  title: string;
  children: React.ReactNode;
};

function AnalysisCard({ title, children }: AnalysisCardProps) {
  return (
    <section className="card analysis-card">
      <div className="section-heading compact">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function AnalysisDetails({
  result,
  context,
}: {
  result: AnalysisResult;
  context: ConversationContext;
}) {
  const labels = getLabelsForContext(context);

  return (
    <div className="analysis-grid">
      <AnalysisCard title="Intencion">
        <p>{result.intent}</p>
      </AnalysisCard>

      <AnalysisCard title="Tono emocional">
        <p>{result.tone}</p>
      </AnalysisCard>

      <AnalysisCard title={labels.scoreTitle}>
        <p className="score">
          {result.conversion_score}% {labels.scoreText}
        </p>
      </AnalysisCard>

      <AnalysisCard title="Por que este puntaje">
        <p>
          {result.conversion_explanation ||
            "Este puntaje refleja la intencion visible, el nivel de apertura, las fricciones detectadas y que tan cerca esta la otra parte de dar el siguiente paso."}
        </p>
      </AnalysisCard>

      <AnalysisCard title={labels.positioningTitle}>
        <p>{result.main_positioning}</p>
      </AnalysisCard>

      <AnalysisCard title={labels.signalsTitle}>
        <ul className="pill-list">
          {result.buying_signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </AnalysisCard>

      <AnalysisCard title={labels.objectionsTitle}>
        <ul className="pill-list">
          {result.objections.map((objection) => (
            <li key={objection}>{objection}</li>
          ))}
        </ul>
      </AnalysisCard>

      <AnalysisCard title="Respuestas sugeridas">
        <div className="reply-stack">
          <div>
            <strong>{labels.softReplyTitle}</strong>
            <p>{result.suggested_replies.soft}</p>
          </div>
          <div>
            <strong>{labels.directReplyTitle}</strong>
            <p>{result.suggested_replies.direct}</p>
          </div>
          <div>
            <strong>{labels.objectionReplyTitle}</strong>
            <p>{result.suggested_replies.objection_handling}</p>
          </div>
        </div>
      </AnalysisCard>

      <AnalysisCard title="Mejor siguiente accion">
        <p>{result.best_next_action}</p>
      </AnalysisCard>

      <AnalysisCard title="Tip estrategico">
        <p>{result.strategy_tip}</p>
      </AnalysisCard>
    </div>
  );
}
