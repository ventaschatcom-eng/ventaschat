import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { setAnalysisOutcome, type AnalysisOutcome } from "@/lib/db";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { outcome?: string };
  const outcome = String(body.outcome || "") as AnalysisOutcome;

  if (!["won", "lost", "pending"].includes(outcome)) {
    return NextResponse.json({ error: "Outcome invalido." }, { status: 400 });
  }

  await setAnalysisOutcome(id, session.user.id, outcome);
  return NextResponse.json({ ok: true, outcome });
}
