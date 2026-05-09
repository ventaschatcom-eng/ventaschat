import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const SECRET = "vc-reset-2025-x9k";

export async function POST(req: NextRequest) {
  const { secret, email, password } = await req.json();

  if (secret !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  const hash = await bcrypt.hash(password, 12);
  await sql`UPDATE users SET password_hash = ${hash} WHERE email = ${email}`;

  return NextResponse.json({ ok: true });
}
