import { createHash } from "crypto";
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
    provider: "wompi",
  });

  const currency = "COP";
  const redirectUrl = `${process.env.NEXTAUTH_URL}/dashboard/billing/success?plan=pro`;
  const integrityString = `${reference}${PRO_SUBSCRIPTION.amountCOPCents}${currency}${process.env.WOMPI_INTEGRITY_SECRET}`;
  const signature = createHash("sha256").update(integrityString).digest("hex");

  const checkoutUrl = new URL("https://checkout.wompi.co/p/");
  checkoutUrl.searchParams.set("public-key", process.env.WOMPI_PUBLIC_KEY!);
  checkoutUrl.searchParams.set("currency", currency);
  checkoutUrl.searchParams.set("amount-in-cents", String(PRO_SUBSCRIPTION.amountCOPCents));
  checkoutUrl.searchParams.set("reference", reference);
  checkoutUrl.searchParams.set("redirect-url", redirectUrl);
  checkoutUrl.searchParams.set("signature:integrity", signature);

  return NextResponse.json({ checkoutUrl: checkoutUrl.toString() });
}
