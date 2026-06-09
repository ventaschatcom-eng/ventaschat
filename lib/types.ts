export const conversationContexts = [
  "Ventas / clientes",
  "Trabajo / profesional",
  "Personal",
] as const;

export type ConversationContext = (typeof conversationContexts)[number];

export const conversationTypeOptions = {
  "Ventas / clientes": [
    "Lead / cliente",
    "Negociacion de venta",
    "Seguimiento comercial",
    "Manejo de objeciones",
  ],
  "Trabajo / profesional": [
    "Colaboracion de trabajo",
    "Seguimiento profesional",
    "Alineacion de proyecto",
    "Feedback o tension",
  ],
  Personal: [
    "Alguien que me gusta",
    "Primera cita / conociendo",
    "Dejo de responder (visto)",
    "Reconquistar / retomar",
    "Tension o discusion de pareja",
    "Aclarar un malentendido",
  ],
} as const satisfies Record<ConversationContext, readonly string[]>;

export const defaultConversationContext: ConversationContext = "Ventas / clientes";

export const defaultConversationType = conversationTypeOptions[defaultConversationContext][0];

export const allConversationTypes = Object.values(conversationTypeOptions).flat() as string[];

export type ConversationType = (typeof allConversationTypes)[number];

export const desiredTones = [
  "Profesional",
  "Cercano",
  "Urgente",
  "Consultivo",
] as const;

export type DesiredTone = (typeof desiredTones)[number];

export type AnalysisResult = {
  intent: string;
  tone: string;
  buying_signals: string[];
  objections: string[];
  conversion_score: number;
  conversion_explanation: string;
  best_next_action: string;
  suggested_replies: {
    soft: string;
    direct: string;
    objection_handling: string;
  };
  strategy_tip: string;
  main_positioning: string;
  recommended_words?: string[];
  words_to_avoid?: string[];
  key_metrics?: {
    customer_engagement: number;
    urgency_level: number;
    price_sensitivity: number;
  };
};

export function getConversationTypesForContext(context: ConversationContext) {
  return conversationTypeOptions[context];
}

export function getLabelsForContext(context: ConversationContext) {
  switch (context) {
    case "Ventas / clientes":
      return {
        scoreTitle: "Probabilidad de cierre",
        scoreText: "de probabilidad de cierre",
        signalsTitle: "Senales favorables",
        objectionsTitle: "Objeciones o fricciones",
        positioningTitle: "Posicionamiento principal",
        softReplyTitle: "Respuesta persuasiva suave",
        directReplyTitle: "Respuesta directa de cierre",
        objectionReplyTitle: "Respuesta para manejar objeciones",
      };
    case "Trabajo / profesional":
      return {
        scoreTitle: "Nivel de receptividad",
        scoreText: "de receptividad",
        signalsTitle: "Senales favorables",
        objectionsTitle: "Fricciones o bloqueos",
        positioningTitle: "Enfoque principal",
        softReplyTitle: "Respuesta diplomatica",
        directReplyTitle: "Respuesta clara y ejecutiva",
        objectionReplyTitle: "Respuesta para destrabar la conversacion",
      };
    case "Personal":
      return {
        scoreTitle: "Nivel de apertura",
        scoreText: "de apertura en la conversacion",
        signalsTitle: "Senales favorables",
        objectionsTitle: "Tensiones o malentendidos",
        positioningTitle: "Enfoque sugerido",
        softReplyTitle: "Respuesta calida",
        directReplyTitle: "Respuesta clara",
        objectionReplyTitle: "Respuesta para bajar tension",
      };
  }
}
