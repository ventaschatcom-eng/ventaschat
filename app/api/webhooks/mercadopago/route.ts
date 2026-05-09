import { NextResponse } from "next/server";

import { completeCheckoutSession } from "@/lib/db";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") ?? searchParams.get("type");
  const paymentId = searchParams.get("id") ?? searchParams.get("data.id");

  if (topic !== "payment" || !paymentId) {
    return NextResponse.json({ ok: true });
  }

  const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });

  if (!mpResponse.ok) {
    return NextResponse.json({ error: "No se pudo verificar el pago" }, { status: 400 });
  }

  const payment = await mpResponse.json();

  if (payment.status === "approved" && payment.external_reference) {
    await completeCheckoutSession(String(payment.external_reference));
  }

  return NextResponse.json({ ok: true });
}
