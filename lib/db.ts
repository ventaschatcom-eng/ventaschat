import { neon } from "@neondatabase/serverless";

import type { AnalysisResult, ConversationContext, ConversationType } from "@/lib/types";

const sql = neon(process.env.DATABASE_URL!);

export type DbUser = {
  id: string;
  email: string;
  passwordHash: string;
  plan: string;
  credits: number;
  createdAt: string;
};

export type DbAnalysis = {
  id: string;
  userId: string;
  inputText: string;
  conversationContext: ConversationContext;
  conversationType: ConversationType;
  intent: string;
  tone: string;
  positioning: string | null;
  conversionScore: number;
  outputJson: string;
  createdAt: string;
};

function mapUser(row: Record<string, unknown>): DbUser {
  return {
    id: String(row.id),
    email: String(row.email),
    passwordHash: String(row.password_hash),
    plan: String(row.plan),
    credits: Number(row.credits),
    createdAt: String(row.created_at),
  };
}

function mapAnalysis(row: Record<string, unknown>): DbAnalysis {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    inputText: String(row.input_text),
    conversationContext: String(row.conversation_context) as ConversationContext,
    conversationType: String(row.conversation_type) as ConversationType,
    intent: String(row.intent),
    tone: String(row.tone),
    positioning: row.positioning ? String(row.positioning) : null,
    conversionScore: Number(row.conversion_score),
    outputJson: String(row.output_json),
    createdAt: String(row.created_at),
  };
}

export async function createUser(input: { email: string; passwordHash: string }) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await sql`
    INSERT INTO users (id, email, password_hash, plan, credits, created_at)
    VALUES (${id}, ${input.email}, ${input.passwordHash}, 'free', 3, ${createdAt})
  `;

  return getUserById(id);
}

export async function getUserByEmail(email: string) {
  const rows = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  return rows[0] ? mapUser(rows[0] as Record<string, unknown>) : null;
}

export async function getUserById(id: string) {
  const rows = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  return rows[0] ? mapUser(rows[0] as Record<string, unknown>) : null;
}

export async function decrementUserCredits(userId: string, amount = 1) {
  await sql`UPDATE users SET credits = credits - ${amount} WHERE id = ${userId}`;
  return getUserById(userId);
}

export async function addUserCredits(userId: string, amount: number) {
  await sql`UPDATE users SET credits = credits + ${amount} WHERE id = ${userId}`;
  return getUserById(userId);
}

export async function createAnalysis(input: {
  userId: string;
  inputText: string;
  conversationContext: ConversationContext;
  conversationType: ConversationType;
  result: AnalysisResult;
}) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await sql`
    INSERT INTO analyses
      (id, user_id, input_text, conversation_context, conversation_type, intent, tone, positioning, conversion_score, output_json, created_at)
    VALUES (
      ${id}, ${input.userId}, ${input.inputText}, ${input.conversationContext},
      ${input.conversationType}, ${input.result.intent}, ${input.result.tone},
      ${input.result.main_positioning ?? null}, ${input.result.conversion_score},
      ${JSON.stringify(input.result)}, ${createdAt}
    )
  `;

  return getAnalysisByIdForUser(id, input.userId);
}

export async function createUsageLog(input: {
  userId: string;
  analysisId: string;
  creditsUsed?: number;
}) {
  await sql`
    INSERT INTO usage_logs (id, user_id, analysis_id, credits_used, action_type, created_at)
    VALUES (
      ${crypto.randomUUID()}, ${input.userId}, ${input.analysisId},
      ${input.creditsUsed ?? 1}, 'conversation_analysis', ${new Date().toISOString()}
    )
  `;
}

export async function getAnalysisByIdForUser(id: string, userId: string) {
  const rows = await sql`
    SELECT * FROM analyses WHERE id = ${id} AND user_id = ${userId} LIMIT 1
  `;
  return rows[0] ? mapAnalysis(rows[0] as Record<string, unknown>) : null;
}

export async function listAnalysesByUser(userId: string, limit?: number) {
  const rows = limit
    ? await sql`SELECT * FROM analyses WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT ${limit}`
    : await sql`SELECT * FROM analyses WHERE user_id = ${userId} ORDER BY created_at DESC`;

  return rows.map((row) => mapAnalysis(row as Record<string, unknown>));
}

export async function createCheckoutSession(input: {
  userId: string;
  credits: number;
  provider: "wompi" | "mercadopago";
}) {
  const id = crypto.randomUUID();
  await sql`
    INSERT INTO checkout_sessions (id, user_id, credits, provider, status, created_at)
    VALUES (${id}, ${input.userId}, ${input.credits}, ${input.provider}, 'pending', ${new Date().toISOString()})
  `;
  return id;
}

export async function completeCheckoutSession(reference: string) {
  const rows = await sql`
    SELECT * FROM checkout_sessions WHERE id = ${reference} AND status = 'pending' LIMIT 1
  `;
  if (!rows[0]) return null;

  const session = rows[0] as Record<string, unknown>;
  await sql`UPDATE checkout_sessions SET status = 'completed' WHERE id = ${reference}`;
  await addUserCredits(String(session.user_id), Number(session.credits));

  return session;
}

export async function getAdminStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  const [totalUsers, totalAnalyses, analysesToday, checkoutsCompleted, creditsConsumed, recentUsers] =
    await Promise.all([
      sql`SELECT COUNT(*) AS count FROM users`,
      sql`SELECT COUNT(*) AS count FROM analyses`,
      sql`SELECT COUNT(*) AS count FROM analyses WHERE created_at >= ${todayIso}`,
      sql`SELECT COUNT(*) AS count, COALESCE(SUM(credits), 0) AS credits FROM checkout_sessions WHERE status = 'completed'`,
      sql`SELECT COALESCE(SUM(credits_used), 0) AS total FROM usage_logs`,
      sql`SELECT id, email, plan, credits, created_at FROM users ORDER BY created_at DESC LIMIT 20`,
    ]);

  return {
    totalUsers: Number((totalUsers[0] as Record<string, unknown>).count),
    totalAnalyses: Number((totalAnalyses[0] as Record<string, unknown>).count),
    analysesToday: Number((analysesToday[0] as Record<string, unknown>).count),
    checkoutsCompleted: Number((checkoutsCompleted[0] as Record<string, unknown>).count),
    creditsFromPayments: Number((checkoutsCompleted[0] as Record<string, unknown>).credits),
    creditsConsumed: Number((creditsConsumed[0] as Record<string, unknown>).total),
    recentUsers: recentUsers.map((r) => {
      const row = r as Record<string, unknown>;
      return {
        id: String(row.id),
        email: String(row.email),
        plan: String(row.plan),
        credits: Number(row.credits),
        createdAt: String(row.created_at),
      };
    }),
  };
}
