import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  activateProSubscription,
  deactivateProSubscription,
  getUserByEmail,
  isProActive,
  setUserCredits,
} from "@/lib/db";

const ADMIN_EMAIL = "ventaschat.com@gmail.com";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) return null;
  return session;
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const user = await getUserByEmail(email);
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    plan: user.plan,
    credits: user.credits,
    subscriptionActiveUntil: user.subscriptionActiveUntil,
    isProActive: isProActive(user),
    createdAt: user.createdAt,
  });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await req.json();
  const { userId, action, value } = body as {
    userId: string;
    action: "set_credits" | "activate_pro" | "deactivate_pro";
    value?: number;
  };

  if (!userId || !action) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  if (action === "set_credits") {
    const credits = Number(value);
    if (isNaN(credits) || credits < 0) {
      return NextResponse.json({ error: "Créditos inválidos" }, { status: 400 });
    }
    const user = await setUserCredits(userId, credits);
    return NextResponse.json({ ok: true, credits: user?.credits });
  }

  if (action === "activate_pro") {
    const days = Number(value) || 30;
    const until = await activateProSubscription(userId, days);
    return NextResponse.json({ ok: true, subscriptionActiveUntil: until });
  }

  if (action === "deactivate_pro") {
    await deactivateProSubscription(userId);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Acción desconocida" }, { status: 400 });
}
