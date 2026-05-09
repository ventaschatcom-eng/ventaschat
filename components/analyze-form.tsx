"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  type ConversationContext,
  type ConversationType,
  conversationContexts,
  defaultConversationContext,
  defaultConversationType,
  getConversationTypesForContext,
} from "@/lib/types";

const maxUploadSize = 1024 * 1024;

export function AnalyzeForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [conversationText, setConversationText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [conversationContext, setConversationContext] =
    useState<ConversationContext>(defaultConversationContext);
  const [conversationType, setConversationType] =
    useState<ConversationType>(defaultConversationType);

  const availableTypes = useMemo(
    () => getConversationTypesForContext(conversationContext),
    [conversationContext],
  );

  async function handleSubmit(formData: FormData) {
    setError("");
    setPending(true);

    try {
      const payload = {
        conversationText: String(formData.get("conversationText") || ""),
        conversationContext: String(formData.get("conversationContext") || ""),
        conversationType: String(formData.get("conversationType") || ""),
      };

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data.error === "string"
            ? data.error
            : "No pudimos analizar esta conversacion todavia.";
        setError(message);
        return;
      }

      router.push(`/dashboard/analysis/${data.id}`);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  function handleFileUpload(file: File | null) {
    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".txt")) {
      setError("Por ahora solo puedes subir archivos .txt exportados desde WhatsApp.");
      return;
    }

    if (file.size > maxUploadSize) {
      setError("El archivo es demasiado grande. Usa un chat exportado de hasta 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setConversationText(text);
      setUploadedFileName(file.name);
      setError("");
    };

    reader.onerror = () => {
      setError("No pudimos leer el archivo. Intenta subirlo otra vez.");
    };

    reader.readAsText(file);
  }

  return (
    <form className="card analyze-form" action={handleSubmit}>
      <div className="field-grid">
        <label className="field">
          <span>Contexto</span>
          <select
            name="conversationContext"
            value={conversationContext}
            onChange={(event) => {
              const nextContext = event.target.value as ConversationContext;
              const nextTypes = getConversationTypesForContext(nextContext);
              setConversationContext(nextContext);
              setConversationType(nextTypes[0] as ConversationType);
            }}
          >
            {conversationContexts.map((context) => (
              <option key={context} value={context}>
                {context}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Tipo de conversacion</span>
          <select
            name="conversationType"
            value={conversationType}
            onChange={(event) => setConversationType(event.target.value as ConversationType)}
          >
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Sube un chat exportado (.txt)</span>
        <input
          type="file"
          accept=".txt,text/plain"
          onChange={(event) => handleFileUpload(event.target.files?.[0] ?? null)}
        />
        <small className="helper-text">
          {uploadedFileName
            ? `Archivo cargado: ${uploadedFileName}`
            : "Tambien puedes pegar la conversacion manualmente en el campo de abajo."}
        </small>
      </label>

      <label className="field">
        <span>Pega la conversacion de WhatsApp</span>
        <textarea
          name="conversationText"
          rows={18}
          value={conversationText}
          onChange={(event) => setConversationText(event.target.value)}
          placeholder={`Persona A: Hola, queria entender mejor esto.\nPersona B: Claro, te explico el contexto...\nPersona A: Perfecto, y que me recomiendas responder ahora?`}
          required
        />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? "Analizando..." : "Analizar conversacion"}
      </button>
    </form>
  );
}
