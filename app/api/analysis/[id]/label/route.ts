import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { updateAnalysisLabel } from "@/lib/db";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { label?: string };
  const label = String(body.label ?? "");

  await updateAnalysisLabel(id, session.user.id, label);
  return NextResponse.json({ ok: true, label: label.trim().slice(0, 80) });
}
