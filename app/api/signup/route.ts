import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { createUser, getUserByEmail } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";
import { signupSchema } from "@/lib/validations";

export async function POST(request: Request) {
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
        { error: "Ya existe una cuenta con este email." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    const user = await createUser({ email, passwordHash });

    void sendWelcomeEmail(email).catch(() => {});

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
