import { NextResponse } from "next/server";

import { analyzeConversation } from "@/lib/ai";
import { auth } from "@/lib/auth";
import {
  createAnalysisIteration,
  getAnalysisByIdForUser,
  listAnalysisIterationsForUser,
} from "@/lib/db";
import type { AnalysisResult } from "@/lib/types";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await context.params;
  const analysis = await getAnalysisByIdForUser(id, session.user.id);

  if (!analysis) {
    return NextResponse.json({ error: "Analisis no encontrado." }, { status: 404 });
  }

  const body = (await request.json()) as { conversationText?: string };
  const conversationText = String(body.conversationText || "").trim();

  if (conversationText.length < 30) {
    return NextResponse.json(
      { error: "Agrega un poco mas de conversacion para recalcular el analisis." },
      { status: 400 },
    );
  }

  try {
    const previousResult = JSON.parse(analysis.outputJson) as AnalysisResult;
    const result = await analyzeConversation({
      conversationText,
      conversationContext: analysis.conversationContext,
      conversationType: analysis.conversationType,
    });

    const iteration = await createAnalysisIteration({
      analysisId: analysis.id,
      userId: session.user.id,
      inputText: conversationText,
      result,
    });

    if (!iteration) {
      throw new Error("No se pudo guardar la iteracion.");
    }

    const iterations = await listAnalysisIterationsForUser(analysis.id, session.user.id);

    return NextResponse.json({
      result,
      conversationText,
      scoreDelta: result.conversion_score - previousResult.conversion_score,
      latestIteration: iteration,
      iterations: iterations.map((item) => ({
        id: item.id,
        conversionScore: item.conversionScore,
        createdAt: item.createdAt,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "No pudimos recalcular el analisis en este momento." },
      { status: 500 },
    );
  }
}
