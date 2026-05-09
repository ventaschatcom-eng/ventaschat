import OpenAI from "openai";

import { getAnalysisPrompt } from "@/lib/prompt";
import type { AnalysisResult, ConversationContext, ConversationType } from "@/lib/types";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function extractJsonBlock(content: string) {
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON found in model response.");
  }

  return match[0];
}

function fallbackAnalysis(
  conversationContext: ConversationContext,
  conversationType: ConversationType,
): AnalysisResult {
  if (conversationContext === "Trabajo / profesional") {
    return {
      intent:
        "La otra persona quiere avanzar, pero necesita mas claridad, alineacion y menos ambiguedad para responder con confianza.",
      tone: "Profesional pero cauteloso",
      buying_signals: [
        "La conversacion sigue activa",
        "Hay interes en aclarar el siguiente paso",
        "Existe apertura para ordenar expectativas",
      ],
      objections: [
        "Falta alineacion o contexto suficiente",
        "Puede haber friccion por tono o prioridades distintas",
      ],
      conversion_score: 64,
      conversion_explanation:
        "Hay receptividad para avanzar, pero todavia hace falta ordenar el mensaje y reducir ambiguedad para que la otra parte responda mejor.",
      best_next_action:
        "Responde con contexto breve, baja la friccion y deja un siguiente paso muy claro y facil de contestar.",
      suggested_replies: {
        soft: "Claro, para alinearnos mejor te resumo el punto principal y vemos cual es el siguiente paso mas conveniente.",
        direct:
          "Para avanzar sin enredarnos, te propongo esto: definimos el punto pendiente y cerramos hoy el siguiente paso.",
        objection_handling:
          "Entiendo la confusion. Si quieres, lo ordeno en dos puntos concretos para que quede claro que se espera y como seguimos.",
      },
      strategy_tip: `Trata esta conversacion como ${conversationType.toLowerCase()} y prioriza claridad, tono sereno y proximo paso concreto.`,
      main_positioning:
        "Posiciona tu respuesta como una forma de dar orden, contexto y claridad sin escalar tension innecesaria.",
    };
  }

  if (conversationContext === "Personal") {
    return {
      intent:
        "La otra persona mantiene la conversacion abierta, pero necesita mas claridad y menos presion para seguir conectando bien.",
      tone: "Abierto pero cuidadoso",
      buying_signals: [
        "La conversacion no esta cerrada",
        "Todavia hay espacio para aclarar el mensaje",
        "La otra persona muestra alguna apertura a seguir hablando",
      ],
      objections: [
        "Puede haber malentendidos en el tono",
        "Hace falta bajar tension o presion emocional",
      ],
      conversion_score: 61,
      conversion_explanation:
        "Hay apertura para seguir conversando, pero la respuesta necesita mas claridad y menos carga para evitar malinterpretaciones.",
      best_next_action:
        "Responde con calma, valida el contexto y haz una invitacion clara a seguir la conversacion sin presionar.",
      suggested_replies: {
        soft: "Te entiendo. Si quieres, te explico mejor lo que quise decir para que no se malinterprete.",
        direct:
          "Prefiero decirlo claro: mi intencion es conversar bien contigo y evitar confusiones innecesarias.",
        objection_handling:
          "No quiero que esto se sienta pesado. Si algo sono raro, lo aclaro con gusto para que quede mas simple y tranquilo.",
      },
      strategy_tip: `En ${conversationType.toLowerCase()}, prioriza claridad, respeto y menos presion para que la conversacion se mantenga abierta.`,
      main_positioning:
        "Enfoca tu respuesta en bajar malentendidos, mostrar respeto y facilitar una conversacion mas clara.",
    };
  }

  return {
    intent:
      "El cliente muestra interes, pero todavia necesita mas claridad y seguridad antes de tomar la decision de compra.",
    tone: "Interesado pero cauteloso",
    buying_signals: [
      "Hizo una pregunta de seguimiento",
      "Se mantuvo involucrado en la conversacion",
      "Esta evaluando si la oferta se ajusta a su necesidad",
    ],
    objections: [
      "Necesita mas confianza o prueba",
      "Sensibilidad al precio o comparacion de valor",
    ],
    conversion_score: 58,
    conversion_explanation:
      "El lead esta interesado y comprometido con la conversacion, pero todavia necesita mas confianza en el valor y un siguiente paso con menos friccion antes de decidir.",
    best_next_action:
      "Responde con un mensaje breve enfocado en valor, reduce la friccion y pide un siguiente paso pequeno y claro.",
    suggested_replies: {
      soft: "Claro, te cuento rapido como te puede ayudar y vemos si realmente te conviene.",
      direct:
        "Si te parece, lo dejamos listo hoy y te comparto el siguiente paso para empezar.",
      objection_handling:
        "Entiendo la duda. Lo importante es que te funcione de verdad, por eso te muestro el resultado esperado y como evitamos que pagues por algo que no te aporte valor.",
    },
    strategy_tip: `Trata esta conversacion como ${conversationType.toLowerCase()}. Enfocate en claridad, confianza y una llamada a la accion concreta.`,
    main_positioning:
      "Posiciona la oferta como una solucion practica que ahorra tiempo, reduce la incertidumbre y facilita la decision.",
  };
}

export async function analyzeConversation(params: {
  conversationText: string;
  conversationContext: ConversationContext;
  conversationType: ConversationType;
}): Promise<AnalysisResult> {
  if (!openai) {
    return fallbackAnalysis(params.conversationContext, params.conversationType);
  }

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: getAnalysisPrompt(params.conversationContext) }],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              `Context:\n${params.conversationContext}\n\n` +
              `Conversation type:\n${params.conversationType}\n\n` +
              `Conversation:\n${params.conversationText}`,
          },
        ],
      },
    ],
  });

  const outputText = response.output_text?.trim();

  if (!outputText) {
    throw new Error("Model returned an empty response.");
  }

  const parsed = JSON.parse(extractJsonBlock(outputText)) as AnalysisResult;

  return {
    ...parsed,
    conversion_explanation:
      parsed.conversion_explanation ||
      "Este puntaje refleja la intencion visible, el nivel de apertura, las fricciones detectadas y que tan cerca esta la otra parte de dar el siguiente paso.",
    main_positioning:
      parsed.main_positioning ||
      "Responde con claridad, reduce friccion y orienta la conversacion hacia un siguiente paso facil de aceptar.",
  };
}
