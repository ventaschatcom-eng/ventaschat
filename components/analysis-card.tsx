import type { AnalysisResult, ConversationContext } from "@/lib/types";
import { getLabelsForContext } from "@/lib/types";

type AnalysisCardProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

function AnalysisCard({ title, className, children }: AnalysisCardProps) {
  return (
    <section className={`card analysis-card ${className ?? ""}`.trim()}>
      <div className="section-heading compact">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function getScoreStatus(score: number) {
  if (score >= 75) {
    return {
      label: "Cierre bien encaminado",
      tone: "El cliente está cerca de avanzar si respondes con claridad y ritmo.",
    };
  }

  if (score >= 50) {
    return {
      label: "Hay interés, pero falta moverlo",
      tone: "La oportunidad existe, pero todavía necesita confianza, contexto o menos fricción.",
    };
  }

  return {
    label: "Conversación todavía frágil",
    tone: "Antes de empujar el cierre, conviene reforzar valor, confianza o necesidad.",
  };
}

export function AnalysisDetails({
  result,
  context,
}: {
  result: AnalysisResult;
  context: ConversationContext;
}) {
  const labels = getLabelsForContext(context);
  const score = Math.max(0, Math.min(100, result.conversion_score));
  const scoreStatus = getScoreStatus(score);
  const scoreStyle = {
    background: `conic-gradient(var(--primary) 0 ${score}%, rgba(20, 86, 51, 0.08) ${score}% 100%)`,
  };

  return (
    <div className="analysis-layout">
      <section className="card analysis-hero">
        <div className="analysis-hero-score">
          <div className="analysis-gauge" style={scoreStyle} aria-hidden="true">
            <div className="analysis-gauge-inner">
              <strong>{score}%</strong>
              <span>{labels.scoreTitle}</span>
            </div>
          </div>
        </div>

        <div className="analysis-hero-copy">
          <div className="section-heading compact">
            <h2>Que tan cerca estamos de la venta</h2>
            <p>{scoreStatus.tone}</p>
          </div>

          <div className="analysis-summary-grid">
            <div className="analysis-summary-item">
              <span>Lectura general</span>
              <strong>{scoreStatus.label}</strong>
            </div>
            <div className="analysis-summary-item">
              <span>Tono del cliente</span>
              <strong>{result.tone}</strong>
            </div>
            <div className="analysis-summary-item">
              <span>Siguiente movimiento</span>
              <strong>{result.best_next_action}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="card analysis-reading-card">
        <div className="section-heading compact">
          <h2>Lectura principal de la conversación</h2>
          <p>
            Primero mira qué está pasando. Luego revisa por qué eso importa para
            la venta.
          </p>
        </div>

        <div className="analysis-reading-grid">
          <div className="analysis-reading-block">
            <span className="analysis-reading-label">Lo que vemos</span>
            <h3>Intención</h3>
            <p>{result.intent}</p>
          </div>

          <div className="analysis-reading-block analysis-reading-block-accent">
            <span className="analysis-reading-label">Lo que significa</span>
            <h3>Por qué este puntaje</h3>
            <p>
              {result.conversion_explanation ||
                "Este puntaje refleja la intención visible, el nivel de apertura, las fricciones detectadas y qué tan cerca está la otra parte de dar el siguiente paso."}
            </p>
          </div>
        </div>
      </section>

      <div className="analysis-grid">
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

        <AnalysisCard title="Tip estrategico">
          <p>{result.strategy_tip}</p>
        </AnalysisCard>

        <AnalysisCard title="Respuestas sugeridas" className="analysis-card-span">
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

        {(result.recommended_words?.length || result.words_to_avoid?.length) ? (
          <AnalysisCard title="Vocabulario sugerido" className="analysis-card-span">
            <div className="vocab-grid">
              {result.recommended_words?.length ? (
                <div className="vocab-block vocab-block-good">
                  <span className="vocab-label">✅ Palabras o frases para usar</span>
                  <ul className="vocab-chip-list">
                    {result.recommended_words.map((word) => (
                      <li key={word} className="vocab-chip vocab-chip-good">{word}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {result.words_to_avoid?.length ? (
                <div className="vocab-block vocab-block-bad">
                  <span className="vocab-label">⚠️ Palabras o frases para evitar</span>
                  <ul className="vocab-chip-list">
                    {result.words_to_avoid.map((word) => (
                      <li key={word} className="vocab-chip vocab-chip-bad">{word}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </AnalysisCard>
        ) : null}

        {result.key_metrics ? (
          <AnalysisCard title="Métricas clave" className="analysis-card-span">
            <div className="metrics-grid">
              <MetricBar
                label="Engagement del cliente"
                value={result.key_metrics.customer_engagement}
                hint="Qué tan involucrado está en la conversación"
                color="var(--primary)"
              />
              <MetricBar
                label="Urgencia del momento"
                value={result.key_metrics.urgency_level}
                hint="Qué tan rápido conviene responder"
                color="#f59e0b"
              />
              <MetricBar
                label="Sensibilidad al precio"
                value={result.key_metrics.price_sensitivity}
                hint="Qué tan sensible es al costo (0 = no es factor)"
                color="#ef4444"
              />
            </div>
          </AnalysisCard>
        ) : null}
      </div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  hint,
  color,
}: {
  label: string;
  value: number;
  hint: string;
  color: string;
}) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="metric-row">
      <div className="metric-row-head">
        <strong>{label}</strong>
        <span className="metric-value">{safe}%</span>
      </div>
      <div className="metric-track">
        <div
          className="metric-fill"
          style={{ width: `${safe}%`, background: color }}
        />
      </div>
      <small className="metric-hint">{hint}</small>
    </div>
  );
}
