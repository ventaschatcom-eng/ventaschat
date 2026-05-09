import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/db";
import { PRO_SUBSCRIPTION } from "@/lib/plans";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const reference = await createCheckoutSession({
    userId: session.user.id,
    credits: 0, // sentinel for Pro subscription
    provider: "mercadopago",
  });

  const baseUrl = process.env.NEXTAUTH_URL!;

  const preference = {
    items: [
      {
        title: `${PRO_SUBSCRIPTION.label} - VentasChat (1 mes)`,
        quantity: 1,
        unit_price: PRO_SUBSCRIPTION.amountCOP,
        currency_id: "COP",
      },
    ],
    external_reference: reference,
    back_urls: {
      success: `${baseUrl}/dashboard/billing/success?plan=pro`,
      failure: `${baseUrl}/dashboard/billing`,
      pending: `${baseUrl}/dashboard/billing`,
    },
    auto_return: "approved",
    notification_url: `${baseUrl}/api/webhooks/mercadopago`,
  };

  const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(preference),
  });

  if (!mpResponse.ok) {
    return NextResponse.json({ error: "Error al crear el checkout" }, { status: 500 });
  }

  const data = await mpResponse.json();

  return NextResponse.json({ checkoutUrl: data.init_point });
}
