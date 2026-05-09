import Link from "next/link";

import { auth } from "@/lib/auth";
import { computeCoachingInsight } from "@/lib/coaching";
import { getAnalysesByOutcome } from "@/lib/db";

export default async function CoachingPage() {
  const session = await auth();

  const [won, lost] = await Promise.all([
    getAnalysesByOutcome(session!.user!.id, "won"),
    getAnalysesByOutcome(session!.user!.id, "lost"),
  ]);

  const insight = computeCoachingInsight(won, lost);

  if (!insight.enoughData) {
    return (
      <div className="stack">
        <div className="section-heading">
          <h1>Coaching de patrones</h1>
          <p>
            Analiza tus chats ganados vs perdidos para ver qué palabras y enfoques te
            funcionan a ti específicamente.
          </p>
        </div>

        <section className="card coaching-empty">
          <div>
            <h2>Necesitas al menos 5 conversaciones cerradas</h2>
            <p className="muted">
              Marca tus análisis como &ldquo;Venta cerrada&rdquo; o &ldquo;Perdida&rdquo;
              al final de cada conversación. Cuando tengas 5 cerradas (entre ganadas y
              perdidas), aquí verás los patrones únicos que te funcionan.
            </p>
            <p className="muted">
              Llevas <strong>{insight.totalWon} ganadas</strong> y{" "}
              <strong>{insight.totalLost} perdidas</strong> marcadas. Te faltan{" "}
              <strong>
                {Math.max(0, 5 - (insight.totalWon + insight.totalLost))}
              </strong>{" "}
              para empezar a ver tus patrones.
            </p>
          </div>
          <Link href="/dashboard/history" className="button button-primary">
            Ir al historial y marcar análisis
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="section-heading">
        <h1>Coaching de patrones</h1>
        <p>
          Estos son los patrones que detectamos en tus conversaciones marcadas.
          Información que ChatGPT no puede darte porque no conoce tu historial.
        </p>
      </div>

      <section className="coaching-summary card">
        <div className="coaching-stat-big">
          <span className="coaching-stat-value coaching-stat-rate">{insight.closeRate}%</span>
          <span className="coaching-stat-label">Tu close rate</span>
        </div>
        <div className="coaching-stat-big">
          <span className="coaching-stat-value coaching-stat-won">{insight.totalWon}</span>
          <span className="coaching-stat-label">Ganadas</span>
        </div>
        <div className="coaching-stat-big">
          <span className="coaching-stat-value coaching-stat-lost">{insight.totalLost}</span>
          <span className="coaching-stat-label">Perdidas</span>
        </div>
        <div className="coaching-stat-big">
          <span className="coaching-stat-value">
            {insight.avgScoreWon ?? "—"}%
          </span>
          <span className="coaching-stat-label">Puntaje avg ganadas</span>
        </div>
        <div className="coaching-stat-big">
          <span className="coaching-stat-value">
            {insight.avgScoreLost ?? "—"}%
          </span>
          <span className="coaching-stat-label">Puntaje avg perdidas</span>
        </div>
      </section>

      {insight.winningWords.length > 0 ? (
        <section className="card">
          <div className="section-heading compact">
            <h2>🏆 Tu vocabulario que cierra</h2>
            <p className="muted">
              Palabras y frases más frecuentes en tus conversaciones ganadas. Úsalas más.
            </p>
          </div>
          <ul className="vocab-chip-list">
            {insight.winningWords.map((w) => (
              <li
                key={w.word}
                className="vocab-chip vocab-chip-good"
                title={`Aparece en ${w.count} chats ganados`}
              >
                {w.word} <span style={{ opacity: 0.6, marginLeft: 6 }}>×{w.count}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {insight.losingWords.length > 0 ? (
        <section className="card">
          <div className="section-heading compact">
            <h2>⚠️ Palabras que aparecen cuando pierdes</h2>
            <p className="muted">
              Vocabulario que se detectó en tus chats perdidos como &ldquo;a evitar&rdquo;.
              Considera reemplazarlas.
            </p>
          </div>
          <ul className="vocab-chip-list">
            {insight.losingWords.map((w) => (
              <li
                key={w.word}
                className="vocab-chip vocab-chip-bad"
                title={`Aparece en ${w.count} chats perdidos`}
              >
                {w.word} <span style={{ opacity: 0.6, marginLeft: 6, textDecoration: "none" }}>×{w.count}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="analyze-grid">
        {insight.topObjectionsWon.length ? (
          <section className="card">
            <div className="section-heading compact">
              <h2>Objeciones que cierras</h2>
              <p className="muted">Las objeciones más comunes en tus chats ganados.</p>
            </div>
            <ul className="pill-list">
              {insight.topObjectionsWon.map((o) => (
                <li key={o.word}>{o.word} <span style={{ opacity: 0.6 }}>·{o.count}</span></li>
              ))}
            </ul>
          </section>
        ) : null}

        {insight.topObjectionsLost.length ? (
          <section className="card">
            <div className="section-heading compact">
              <h2>Objeciones que te ganan</h2>
              <p className="muted">Las objeciones más comunes en tus chats perdidos. Estudia cómo manejarlas.</p>
            </div>
            <ul className="pill-list">
              {insight.topObjectionsLost.map((o) => (
                <li key={o.word}>{o.word} <span style={{ opacity: 0.6 }}>·{o.count}</span></li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <section className="card coaching-actionable">
        <h2>💡 Insight accionable</h2>
        <ul>
          {insight.avgScoreWon && insight.avgScoreLost ? (
            <li>
              Tus ganadas tienen un puntaje promedio de{" "}
              <strong>{insight.avgScoreWon}%</strong> y las perdidas{" "}
              <strong>{insight.avgScoreLost}%</strong>. Si una conversación nueva
              está por debajo de <strong>{insight.avgScoreLost + 10}%</strong>,
              probablemente necesite trabajo serio antes de empujar el cierre.
            </li>
          ) : null}
          {insight.avgEngagementWon && insight.avgEngagementLost ? (
            <li>
              Cuando ganas, el engagement promedio del cliente es{" "}
              <strong>{insight.avgEngagementWon}%</strong>; cuando pierdes,{" "}
              <strong>{insight.avgEngagementLost}%</strong>. Cliente con engagement
              bajo = momento de aportar valor, no de cerrar.
            </li>
          ) : null}
          <li>
            Tus 3 palabras más frecuentes en chats ganados son: <strong>
              {insight.winningWords.slice(0, 3).map((w) => w.word).join(", ") || "—"}
            </strong>. Considera incluirlas más conscientemente.
          </li>
        </ul>
      </section>
    </div>
  );
}
