import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { countUsersByIp, createUser, createVerificationToken, getUserByEmail } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { signupSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit({ key: `signup:${ip}`, windowMs: 60_000, max: 5 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos. Intenta más tarde." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase();

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "No fue posible crear la cuenta. Si ya tienes cuenta, intenta iniciar sesión." },
        { status: 400 },
      );
    }

    if (ip) {
      const ipCount = await countUsersByIp(ip);
      if (ipCount >= 2) {
        return NextResponse.json(
          { error: "No fue posible crear la cuenta en este momento." },
          { status: 429 },
        );
      }
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    const user = await createUser({ email, passwordHash, signupIp: ip ?? undefined });

    if (user) {
      const token = await createVerificationToken(user.id);
      void sendVerificationEmail(email, token).catch(() => {});
    }

    return NextResponse.json({
      id: user?.id,
      email: user?.email,
    });
  } catch {
    return NextResponse.json(
      { error: "No fue posible crear la cuenta en este momento." },
      { status: 500 },
    );
  }
}
