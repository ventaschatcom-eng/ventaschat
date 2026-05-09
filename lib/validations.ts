import { z } from "zod";

import {
  allConversationTypes,
  conversationContexts,
  conversationTypeOptions,
} from "@/lib/types";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres."),
});

export const loginSchema = signupSchema;

import { desiredTones } from "@/lib/types";

export const analyzeSchema = z
  .object({
    conversationText: z
      .string()
      .min(30, "Pega una conversacion mas completa de WhatsApp para obtener un analisis util.")
      .max(12000, "La conversacion es demasiado larga para el limite actual del MVP."),
    conversationContext: z.enum(conversationContexts),
    conversationType: z.enum(allConversationTypes as [string, ...string[]]),
    extraContext: z.string().max(1000).optional(),
    desiredTone: z.enum(desiredTones).optional(),
  })
  .superRefine((data, ctx) => {
    const validTypes = conversationTypeOptions[data.conversationContext] as readonly string[];

    if (!validTypes.includes(data.conversationType)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["conversationType"],
        message: "Ese tipo de conversacion no corresponde al contexto seleccionado.",
      });
    }
  });
