import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const SECRET = "vc-init-2025-x9k";

export async function POST(req: NextRequest) {
  const { secret, email, password } = await req.json();

  if (secret !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  const hash = await bcrypt.hash(password, 12);

  // Check if user exists
  const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;

  if (existing.length > 0) {
    await sql`UPDATE users SET password_hash = ${hash} WHERE email = ${email}`;
    return NextResponse.json({ ok: true, action: "updated" });
  } else {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    await sql`
      INSERT INTO users (id, email, password_hash, plan, credits, created_at)
      VALUES (${id}, ${email}, ${hash}, 'free', 999, ${createdAt})
    `;
    return NextResponse.json({ ok: true, action: "created" });
  }
}
