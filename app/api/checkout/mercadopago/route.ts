import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/db";
import { getPackById } from "@/lib/plans";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { packId } = await request.json();
  const pack = getPackById(packId);

  if (!pack) {
    return NextResponse.json({ error: "Paquete no válido" }, { status: 400 });
  }

  const reference = await createCheckoutSession({
    userId: session.user.id,
    credits: pack.credits,
    provider: "mercadopago",
  });

  const baseUrl = process.env.NEXTAUTH_URL!;

  const preference = {
    items: [
      {
        title: `${pack.description} - VentasChat`,
        quantity: 1,
        unit_price: pack.amountCOP,
        currency_id: "COP",
      },
    ],
    external_reference: reference,
    back_urls: {
      success: `${baseUrl}/dashboard/billing/success`,
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
