import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { completeCheckoutSession } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const { event, data, signature } = body as {
    event: string;
    data: { transaction: Record<string, unknown> };
    signature: { properties: string[]; checksum: string };
  };

  // Verify Wompi signature
  const properties = signature?.properties ?? [];
  let concatenated = "";
  for (const prop of properties) {
    const keys = prop.split(".");
    let val: unknown = data;
    for (const k of keys) {
      val = (val as Record<string, unknown>)?.[k];
    }
    concatenated += String(val ?? "");
  }
  concatenated += process.env.WOMPI_EVENTS_SECRET!;

  const expectedChecksum = createHash("sha256").update(concatenated).digest("hex");

  if (signature?.checksum !== expectedChecksum) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event === "transaction.updated" && data?.transaction?.status === "APPROVED") {
    const reference = String(data.transaction.reference ?? "");
    if (reference) {
      await completeCheckoutSession(reference);
    }
  }

  return NextResponse.json({ ok: true });
}
