"use client";

import { useMemo, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, Sparkles, FileText } from "lucide-react";

import {
  type ConversationContext,
  type ConversationType,
  type DesiredTone,
  conversationContexts,
  defaultConversationContext,
  defaultConversationType,
  desiredTones,
  getConversationTypesForContext,
} from "@/lib/types";
import { parseConversationText } from "@/lib/utils";

const maxUploadSize = 1024 * 1024;

const templates: Array<{ label: string; emoji: string; text: string }> = [
  {
    label: "Objeción de precio",
    emoji: "💰",
    text:
      "Cliente: Hola, vi su producto pero esta un poco caro para lo que estoy buscando.\n" +
      "Tu: Hola! Gracias por escribir. ¿Con cuál opción lo estas comparando?\n" +
      "Cliente: Vi otros parecidos a la mitad de precio.\n" +
      "Tu: Entiendo. ¿Te interesa que te explique la diferencia o prefieres una opción más liviana?\n" +
      "Cliente: Cuéntame la diferencia, pero la verdad es que no quiero gastar tanto.",
  },
  {
    label: "Lead frío",
    emoji: "❄️",
    text:
      "Tu: Hola Carlos! Vi que descargaste la guía. ¿Te sirvió?\n" +
      "Cliente: Hola, sí gracias.\n" +
      "Tu: Genial. ¿Estás buscando resolver algo puntual o solo investigando?\n" +
      "Cliente: Por ahora investigando.\n" +
      "Tu: Perfecto, sin presión. ¿Qué te llamó la atención de la guía?",
  },
  {
    label: "Post-venta",
    emoji: "🎯",
    text:
      "Cliente: Hola, ya recibí el producto pero tengo una duda con la configuración.\n" +
      "Tu: Hola! Cuéntame qué duda tienes y te ayudo.\n" +
      "Cliente: No me deja conectar con mi cuenta, sale error.\n" +
      "Tu: ¿Me puedes mandar una captura del error? Así te oriento más rápido.\n" +
      "Cliente: Listo, ya te la mando.",
  },
];

export function AnalyzeForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [conversationText, setConversationText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [conversationContext, setConversationContext] =
    useState<ConversationContext>(defaultConversationContext);
  const [conversationType, setConversationType] =
    useState<ConversationType>(defaultConversationType);
  const [extraContext, setExtraContext] = useState("");
  const [desiredTone, setDesiredTone] = useState<DesiredTone | "">("");

  const availableTypes = useMemo(
    () => getConversationTypesForContext(conversationContext),
    [conversationContext],
  );

  const messages = useMemo(
    () => parseConversationText(conversationText),
    [conversationText],
  );

  const stats = useMemo(() => {
    const wordCount = conversationText
      .split(/\s+/)
      .filter(Boolean).length;
    const speakers = new Set(messages.map((m) => m.author.toLowerCase())).size;
    return { messageCount: messages.length, speakers, wordCount };
  }, [conversationText, messages]);

  function getMessageTone(author: string, index: number) {
    const lower = author.toLowerCase();
    if (lower.includes("tu") || lower.includes("vendedor") || lower.includes("asesor")) {
      return "out";
    }
    if (lower.includes("cliente") || lower.includes("lead")) {
      return "in";
    }
    return index % 2 === 0 ? "in" : "out";
  }

  async function handleSubmit() {
    setError("");
    setPending(true);

    try {
      const payload = {
        conversationText,
        conversationContext,
        conversationType,
        extraContext: extraContext || undefined,
        desiredTone: desiredTone || undefined,
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
    if (!file) return;

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

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  }

  return (
    <div className="analyze-grid">
      <form
        className="card analyze-form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="analyze-templates">
          <span className="analyze-templates-label">
            <Sparkles size={14} /> Probar con un ejemplo
          </span>
          <div className="analyze-template-row">
            {templates.map((tpl) => (
              <button
                key={tpl.label}
                type="button"
                className="analyze-template-btn"
                onClick={() => {
                  setConversationText(tpl.text);
                  setUploadedFileName("");
                }}
              >
                <span>{tpl.emoji}</span>
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field-grid">
          <label className="field">
            <span>Contexto</span>
            <select
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

        <div
          className={`analyze-dropzone ${dragActive ? "analyze-dropzone-active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".txt,text/plain"
            id="chat-file"
            onChange={(event) => handleFileUpload(event.target.files?.[0] ?? null)}
            className="analyze-dropzone-input"
          />
          <label htmlFor="chat-file" className="analyze-dropzone-label">
            <Upload size={18} />
            <strong>
              {uploadedFileName ? uploadedFileName : "Arrastra tu chat .txt aquí"}
            </strong>
            <span>
              {uploadedFileName ? "Archivo cargado" : "o haz click para elegir un archivo"}
            </span>
          </label>
        </div>

        <label className="field">
          <span>Pega la conversación de WhatsApp</span>
          <textarea
            rows={14}
            value={conversationText}
            onChange={(event) => {
              setConversationText(event.target.value);
              setUploadedFileName("");
            }}
            placeholder={`Persona A: Hola, queria entender mejor esto.\nPersona B: Claro, te explico el contexto...`}
            required
          />
        </label>

        <details className="analyze-extra">
          <summary>+ Agregar contexto extra (opcional, mejora el análisis)</summary>
          <div className="analyze-extra-body">
            <label className="field">
              <span>¿Qué vendes? ¿Algún detalle clave del cliente?</span>
              <textarea
                rows={3}
                value={extraContext}
                onChange={(event) => setExtraContext(event.target.value)}
                placeholder="Ej: Vendo software de facturación a $89.000/mes. El cliente es contador independiente, ya probó la competencia."
                maxLength={1000}
              />
              <small className="helper-text">{extraContext.length}/1000</small>
            </label>

            <label className="field">
              <span>Tono deseado para las respuestas sugeridas</span>
              <select
                value={desiredTone}
                onChange={(event) => setDesiredTone(event.target.value as DesiredTone | "")}
              >
                <option value="">Automático (según contexto)</option>
                {desiredTones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </details>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="button button-primary" type="submit" disabled={pending}>
          {pending ? "Analizando..." : "Analizar conversación"}
        </button>
      </form>

      <aside className="analyze-preview card">
        <div className="section-heading compact">
          <h2>Vista previa del chat</h2>
          <p>Así se está parseando tu conversación.</p>
        </div>

        <div className="analyze-preview-stats">
          <div>
            <strong>{stats.messageCount}</strong>
            <span>mensajes</span>
          </div>
          <div>
            <strong>{stats.speakers}</strong>
            <span>{stats.speakers === 1 ? "persona" : "personas"}</span>
          </div>
          <div>
            <strong>{stats.wordCount}</strong>
            <span>palabras</span>
          </div>
        </div>

        <div className="analyze-preview-body">
          {messages.length ? (
            messages.map((m, idx) => {
              const tone = getMessageTone(m.author, idx);
              return (
                <div
                  key={`${m.author}-${idx}`}
                  className={`analysis-chat-preview-bubble analysis-chat-preview-bubble-${tone}`}
                >
                  <small>{m.author}</small>
                  <p>{m.text}</p>
                </div>
              );
            })
          ) : (
            <div className="analyze-preview-empty">
              <FileText size={28} />
              <p>Pega o sube tu conversación para ver el preview en vivo.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
