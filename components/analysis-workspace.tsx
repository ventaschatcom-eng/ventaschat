"use client";

import { useMemo, useState } from "react";

import { AnalysisDetails } from "@/components/analysis-card";
import type { AnalysisResult, ConversationContext, ConversationType } from "@/lib/types";
import {
  appendConversationMessage,
  formatDate,
  parseConversationText,
  type ConversationMessage,
} from "@/lib/utils";

type IterationSummary = {
  id: string;
  conversionScore: number;
  createdAt: string;
};

const senderOptions = [
  { value: "Cliente", label: "Mensaje del cliente" },
  { value: "Tu", label: "Tu respuesta" },
] as const;

export function AnalysisWorkspace({
  analysisId,
  initialConversationText,
  initialResult,
  context,
  type,
  initialIterations,
}: {
  analysisId: string;
  initialConversationText: string;
  initialResult: AnalysisResult;
  context: ConversationContext;
  type: ConversationType;
  initialIterations: IterationSummary[];
}) {
  const [result, setResult] = useState(initialResult);
  const [conversationText, setConversationText] = useState(initialConversationText);
  const [draftSender, setDraftSender] =
    useState<(typeof senderOptions)[number]["value"]>("Tu");
  const [draftMessage, setDraftMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [scoreDelta, setScoreDelta] = useState(0);
  const [iterations, setIterations] = useState(initialIterations);

  const messages = useMemo(() => parseConversationText(conversationText), [conversationText]);
  const currentScore = result.conversion_score;
  const lastIterationId = iterations[iterations.length - 1]?.id;

  async function recalculate(nextConversationText: string) {
    setPending(true);
    setError("");

    try {
      const response = await fetch(`/api/analysis/${analysisId}/follow-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationText: nextConversationText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "No pudimos actualizar el analisis.",
        );
        return;
      }

      setConversationText(data.conversationText);
      setResult(data.result);
      setScoreDelta(data.scoreDelta ?? 0);
      setIterations(data.iterations ?? []);
      setDraftMessage("");
    } finally {
      setPending(false);
    }
  }

  function handleAppendMessage() {
    if (!draftMessage.trim()) {
      setError("Escribe el siguiente mensaje antes de recalcular.");
      return;
    }

    const nextConversationText = appendConversationMessage(
      conversationText,
      draftSender,
      draftMessage,
    );

    void recalculate(nextConversationText);
  }

  function applySuggestedReply(reply: string) {
    setDraftSender("Tu");
    setDraftMessage(reply);
    setError("");
  }

  function getMessageTone(message: ConversationMessage, index: number) {
    const lowerAuthor = message.author.toLowerCase();

    if (
      lowerAuthor.includes("tu") ||
      lowerAuthor.includes("ventaschat") ||
      lowerAuthor.includes("asesor")
    ) {
      return "out";
    }

    if (lowerAuthor.includes("cliente") || lowerAuthor.includes("lead")) {
      return "in";
    }

    return index % 2 === 0 ? "in" : "out";
  }

  return (
    <div className="analysis-workspace">
      <div className="analysis-live-panel card">
        <div className="section-heading compact">
          <h2>Seguimiento en vivo</h2>
          <p>
            Agrega el siguiente mensaje y recalcula el cierre sin salir del
            analisis.
          </p>
        </div>

        <div className="analysis-live-summary">
          <div className="analysis-live-score">
            <span>Puntaje actual</span>
            <strong>{currentScore}%</strong>
          </div>
          <div
            className={`analysis-live-delta ${
              scoreDelta >= 0 ? "analysis-live-delta-up" : "analysis-live-delta-down"
            }`}
          >
            <span>Ultimo cambio</span>
            <strong>{scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}%</strong>
          </div>
          <div className="analysis-live-meta">
            <span>Contexto</span>
            <strong>
              {context} · {type}
            </strong>
          </div>
        </div>

        <div className="analysis-chat-preview">
          <div className="analysis-chat-preview-header">
            <strong>Conversacion actual</strong>
            <span>{messages.length} mensajes detectados</span>
          </div>

          <div className="analysis-chat-preview-body">
            {messages.slice(-8).map((message, index) => {
              const tone = getMessageTone(message, index);

              return (
                <div
                  key={`${message.author}-${index}`}
                  className={`analysis-chat-preview-bubble analysis-chat-preview-bubble-${tone}`}
                >
                  <small>{message.author}</small>
                  <p>{message.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="analysis-live-actions">
          <div className="analysis-live-suggestions">
            <span>Usa una sugerencia como base</span>
            <div className="analysis-live-suggestion-list">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => applySuggestedReply(result.suggested_replies.soft)}
              >
                Persuasiva suave
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => applySuggestedReply(result.suggested_replies.direct)}
              >
                Cierre directo
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() =>
                  applySuggestedReply(result.suggested_replies.objection_handling)
                }
              >
                Manejar objecion
              </button>
            </div>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Quien envia el siguiente mensaje</span>
              <select
                value={draftSender}
                onChange={(event) =>
                  setDraftSender(
                    event.target.value as (typeof senderOptions)[number]["value"],
                  )
                }
              >
                {senderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Siguiente mensaje</span>
              <textarea
                rows={5}
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                placeholder="Escribe la siguiente respuesta o el nuevo mensaje del cliente..."
              />
            </label>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <div className="analysis-live-footer">
            <button
              type="button"
              className="button button-primary"
              onClick={handleAppendMessage}
              disabled={pending}
            >
              {pending ? "Recalculando..." : "Agregar mensaje y recalcular"}
            </button>

            <div className="analysis-iteration-strip">
              {iterations.slice(-4).map((iteration) => (
                <div key={iteration.id} className="analysis-iteration-chip">
                  <strong>{iteration.conversionScore}%</strong>
                  <span>
                    {iteration.id === lastIterationId
                      ? "Actual"
                      : formatDate(new Date(iteration.createdAt))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnalysisDetails result={result} context={context} />
    </div>
  );
}
