"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, Sparkles, FileText, Camera, Loader2 } from "lucide-react";

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
import { cn, parseConversationText } from "@/lib/utils";

const maxUploadSize = 1024 * 1024;

// Etiqueta visible por contexto. El valor interno se mantiene (ej. "Personal")
// para no romper análisis ya guardados ni el mapeo de etiquetas en getLabelsForContext.
const contextLabels: Record<ConversationContext, string> = {
  "Ventas / clientes": "Ventas / clientes",
  "Trabajo / profesional": "Trabajo / profesional",
  Personal: "💗 LoveChat (personal)",
};

type Template = { label: string; emoji: string; text: string };

const templatesByContext: Record<ConversationContext, Template[]> = {
  "Ventas / clientes": [
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
  ],
  "Trabajo / profesional": [
    {
      label: "Feedback difícil",
      emoji: "🗣️",
      text:
        "Tu: Hola Ana, ¿tienes un momento para hablar del informe?\n" +
        "Ana: Sí, dime.\n" +
        "Tu: Noté que se entregó tarde otra vez y afectó al equipo. Quiero entender qué está pasando.\n" +
        "Ana: La verdad me sobrecargaron con otras cosas y nadie me avisó las prioridades.",
    },
    {
      label: "Proyecto trabado",
      emoji: "🚧",
      text:
        "Tu: Equipo, llevamos dos semanas sin avanzar en la integración. ¿Qué nos está frenando?\n" +
        "Colega: Estamos esperando definiciones de producto.\n" +
        "Tu: Entiendo. ¿Qué necesitan exactamente para desbloquearse esta semana?\n" +
        "Colega: Una decisión sobre el alcance, sin eso no podemos estimar.",
    },
  ],
  Personal: [
    {
      label: "¿Le gusto?",
      emoji: "💘",
      text:
        "Tu: Oye, me quedé pensando en lo del otro día 😊\n" +
        "Sofía: jajaja sí, la verdad la pasé súper contigo 🙈\n" +
        "Sofía: habría que repetir en algún momento\n" +
        "Tu: total, me encantaría",
    },
    {
      label: "Dejó de responder",
      emoji: "👻",
      text:
        "Tu: Hola! ¿Cómo vas? 😄\n" +
        "Mateo: perdón, he tenido una semana de locos 😅\n" +
        "Tu: tranqui jaja, ¿todo bien?\n" +
        "Mateo: sí sí, solo full trabajo",
    },
    {
      label: "Tensión en pareja",
      emoji: "🌧️",
      text:
        "Valentina: siento que últimamente no me escuchas cuando te hablo\n" +
        "Tu: ¿por qué dices eso?\n" +
        "Valentina: porque te cuento cosas y estás en el celular\n" +
        "Tu: no es mi intención, perdón",
    },
  ],
};

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
  const [ocrPending, setOcrPending] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Preseleccionar contexto desde la URL (?context=Personal), ej. usuarios de LoveChat
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("context");
    if (raw && (conversationContexts as readonly string[]).includes(raw)) {
      const ctx = raw as ConversationContext;
      setConversationContext(ctx);
      setConversationType(getConversationTypesForContext(ctx)[0] as ConversationType);
    }
  }, []);

  const templates = templatesByContext[conversationContext];
  const isLoveContext = conversationContext === "Personal";

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

  async function handleImageOCR(file: File | null) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Solo aceptamos imagenes (.png, .jpg, .webp).");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError("La captura es demasiado grande. Maximo 4 MB.");
      return;
    }

    setOcrPending(true);
    setError("");

    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
        reader.onerror = () => reject(new Error("read_failed"));
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "No pudimos leer la imagen.");
        return;
      }

      setConversationText((prev) => (prev ? `${prev}\n${data.text}` : data.text));
      setUploadedFileName(file.name);
    } catch {
      setError("No pudimos procesar la imagen. Intenta otra vez.");
    } finally {
      setOcrPending(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
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
        <div className={cn("analyze-templates", isLoveContext && "analyze-templates-love")}>
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
              className={cn(isLoveContext && "field-select-love")}
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
                  {contextLabels[context]}
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

        <div className="analyze-import-row">
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
                {uploadedFileName ? uploadedFileName : "Arrastra .txt aquí"}
              </strong>
              <span>
                {uploadedFileName ? "Archivo cargado" : "o click para elegir"}
              </span>
            </label>
          </div>

          <button
            type="button"
            className="analyze-ocr-btn"
            onClick={() => imageInputRef.current?.click()}
            disabled={ocrPending}
          >
            {ocrPending ? <Loader2 size={18} className="spin" /> : <Camera size={18} />}
            <strong>{ocrPending ? "Leyendo captura..." : "Subir captura WhatsApp"}</strong>
            <span>{ocrPending ? "Espera unos segundos" : "Convertimos la imagen en texto"}</span>
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => handleImageOCR(event.target.files?.[0] ?? null)}
          />
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
        <div className="analyze-preview-header">
          <div>
            <h3 className="analyze-preview-title">Vista previa del chat</h3>
            <p className="analyze-preview-subtitle">
              {messages.length
                ? "Así se está parseando tu conversación."
                : "Aparecerá aquí mientras pegas o subes."}
            </p>
          </div>
          {messages.length ? (
            <div className="analyze-preview-stats-inline">
              <span><strong>{stats.messageCount}</strong> msj</span>
              <span><strong>{stats.speakers}</strong> {stats.speakers === 1 ? "pers" : "pers"}</span>
              <span><strong>{stats.wordCount}</strong> pal</span>
            </div>
          ) : null}
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
              <div className="analyze-preview-empty-icon">
                <FileText size={32} />
              </div>
              <strong>Esperando tu conversación</strong>
              <p>Pega texto, sube un .txt o una captura de WhatsApp.</p>
              <ul className="analyze-preview-empty-tips">
                <li>📋 Pegar funciona con cualquier formato</li>
                <li>📷 OCR convierte imágenes a texto</li>
                <li>✨ O prueba con un ejemplo (botones a la izquierda)</li>
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
