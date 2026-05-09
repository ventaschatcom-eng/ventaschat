import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const SECRET = "vc-migrate-2025-x9k";

export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (secret !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    CREATE TABLE IF NOT EXISTS analysis_iterations (
      id TEXT PRIMARY KEY,
      analysis_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      input_text TEXT NOT NULL,
      conversion_score INTEGER NOT NULL,
      output_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  return NextResponse.json({ ok: true });
}
