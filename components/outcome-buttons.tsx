"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

import type { AnalysisOutcome } from "@/lib/db";

export function OutcomeButtons({
  analysisId,
  initialOutcome,
}: {
  analysisId: string;
  initialOutcome: AnalysisOutcome;
}) {
  const [outcome, setOutcome] = useState<AnalysisOutcome>(initialOutcome);
  const [pending, setPending] = useState(false);

  async function update(next: AnalysisOutcome) {
    if (pending) return;
    setPending(true);
    setOutcome(next);
    try {
      await fetch(`/api/analysis/${analysisId}/outcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outcome: next }),
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="outcome-block card">
      <div>
        <strong>¿Cómo terminó esta conversación?</strong>
        <p className="muted">
          Marcar el resultado nos permite aprender de tus chats ganadores y
          mostrarte tus patrones de cierre.
        </p>
      </div>
      <div className="outcome-actions">
        <button
          type="button"
          className={`outcome-btn ${outcome === "won" ? "outcome-btn-won" : ""}`}
          onClick={() => update("won")}
          disabled={pending}
        >
          <CheckCircle2 size={18} />
          Venta cerrada
        </button>
        <button
          type="button"
          className={`outcome-btn ${outcome === "lost" ? "outcome-btn-lost" : ""}`}
          onClick={() => update("lost")}
          disabled={pending}
        >
          <XCircle size={18} />
          Perdida
        </button>
        <button
          type="button"
          className={`outcome-btn ${outcome === "pending" ? "outcome-btn-pending" : ""}`}
          onClick={() => update("pending")}
          disabled={pending}
        >
          <Clock size={18} />
          En curso
        </button>
      </div>
    </div>
  );
}
