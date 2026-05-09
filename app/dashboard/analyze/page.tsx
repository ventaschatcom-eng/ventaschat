import { AnalyzeForm } from "@/components/analyze-form";

export default function AnalyzePage() {
  return (
    <div className="stack analyze-page-layout">
      <div className="section-heading">
        <h1>Analizador de conversaciones</h1>
        <p>
          Pega una conversacion de WhatsApp y elige si quieres analizarla desde un
          contexto de ventas, trabajo o comunicacion personal. Recibiras intencion,
          tono, fricciones, puntaje, explicacion, respuestas y siguiente paso.
        </p>
      </div>
      <AnalyzeForm />
    </div>
  );
}
