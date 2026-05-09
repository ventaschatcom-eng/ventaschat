import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const SECRET = "vc-migrate-pro-2025-x9k";

export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (secret !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_active_until TEXT`;

  return NextResponse.json({ ok: true });
}
