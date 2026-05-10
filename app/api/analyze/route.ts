import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { analyzeConversation } from "@/lib/ai";
import { createAnalysis, createUsageLog, decrementUserCredits, getUserById, isProActive } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { analyzeSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Rate limit por usuario: 30 análisis / minuto. Pro o no, evita abuso de la API OpenAI.
  const rl = checkRateLimit({ key: `analyze:${session.user.id}`, windowMs: 60_000, max: 30 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Estás analizando demasiado rápido. Espera un momento." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  const body = await request.json();
  const parsed = analyzeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
  }

  const proActive = isProActive(user);

  if (!proActive && user.credits < 1) {
    return NextResponse.json(
      { error: "No tienes créditos disponibles. Compra más análisis o suscríbete al plan Pro Ilimitado en Facturación." },
      { status: 402 },
    );
  }

  try {
    const result = await analyzeConversation({
      conversationText: parsed.data.conversationText,
      conversationContext: parsed.data.conversationContext,
      conversationType: parsed.data.conversationType,
      extraContext: parsed.data.extraContext,
      desiredTone: parsed.data.desiredTone,
    });

    const analysis = await createAnalysis({
      userId: user.id,
      inputText: parsed.data.conversationText,
      conversationContext: parsed.data.conversationContext,
      conversationType: parsed.data.conversationType,
      result,
    });

    if (!analysis) {
      throw new Error("No se pudo crear el registro del análisis.");
    }

    await createUsageLog({
      userId: user.id,
      analysisId: analysis.id,
    });

    if (!proActive) {
      await decrementUserCredits(user.id, 1);
    }

    return NextResponse.json({ id: analysis.id });
  } catch {
    return NextResponse.json(
      { error: "No se pudo completar el análisis en este momento." },
      { status: 500 },
    );
  }
}
