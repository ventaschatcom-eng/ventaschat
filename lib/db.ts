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
  subscriptionActiveUntil: string | null;
  emailVerified: boolean;
  signupIp: string | null;
};

export type AnalysisOutcome = "won" | "lost" | "pending";

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
  outcome: AnalysisOutcome;
  label: string | null;
};

function mapUser(row: Record<string, unknown>): DbUser {
  return {
    id: String(row.id),
    email: String(row.email),
    passwordHash: String(row.password_hash),
    plan: String(row.plan),
    credits: Number(row.credits),
    createdAt: String(row.created_at),
    subscriptionActiveUntil: row.subscription_active_until ? String(row.subscription_active_until) : null,
    emailVerified: Boolean(row.email_verified),
    signupIp: row.signup_ip ? String(row.signup_ip) : null,
  };
}

export function isProActive(user: DbUser | null) {
  if (!user?.subscriptionActiveUntil) return false;
  return new Date(user.subscriptionActiveUntil).getTime() > Date.now();
}

export async function activateProSubscription(userId: string, days = 30) {
  const until = new Date();
  until.setDate(until.getDate() + days);
  await sql`
    UPDATE users SET subscription_active_until = ${until.toISOString()}, plan = 'pro'
    WHERE id = ${userId}
  `;
  return until.toISOString();
}

function mapAnalysis(row: Record<string, unknown>): DbAnalysis {
  const outcome = (row.outcome ? String(row.outcome) : "pending") as AnalysisOutcome;
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
    outcome: ["won", "lost", "pending"].includes(outcome) ? outcome : "pending",
    label: row.label ? String(row.label) : null,
  };
}

export async function updateAnalysisLabel(
  analysisId: string,
  userId: string,
  label: string,
) {
  const trimmed = label.trim().slice(0, 80);
  await sql`
    UPDATE analyses SET label = ${trimmed || null}
    WHERE id = ${analysisId} AND user_id = ${userId}
  `;
}

export async function setAnalysisOutcome(
  analysisId: string,
  userId: string,
  outcome: AnalysisOutcome,
) {
  await sql`
    UPDATE analyses SET outcome = ${outcome}
    WHERE id = ${analysisId} AND user_id = ${userId}
  `;
}

export async function getAnalysesByOutcome(userId: string, outcome: AnalysisOutcome) {
  const rows = await sql`
    SELECT * FROM analyses
    WHERE user_id = ${userId} AND outcome = ${outcome}
    ORDER BY created_at DESC
    LIMIT 100
  `;
  return rows.map((row) => mapAnalysis(row as Record<string, unknown>));
}

export async function getOutcomeStatsForUser(userId: string) {
  const rows = await sql`
    SELECT outcome, COUNT(*) AS count
    FROM analyses
    WHERE user_id = ${userId}
    GROUP BY outcome
  `;
  const stats = { won: 0, lost: 0, pending: 0, total: 0 };
  for (const r of rows) {
    const row = r as Record<string, unknown>;
    const o = String(row.outcome || "pending") as AnalysisOutcome;
    const n = Number(row.count);
    if (o === "won") stats.won = n;
    else if (o === "lost") stats.lost = n;
    else stats.pending += n;
    stats.total += n;
  }
  return stats;
}

export async function countUsersByIp(ip: string): Promise<number> {
  const rows = await sql`SELECT COUNT(*) AS count FROM users WHERE signup_ip = ${ip}`;
  return Number((rows[0] as Record<string, unknown>).count);
}

export async function createUser(input: { email: string; passwordHash: string; signupIp?: string }) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const signupIp = input.signupIp ?? null;

  await sql`
    INSERT INTO users (id, email, password_hash, plan, credits, created_at, email_verified, signup_ip)
    VALUES (${id}, ${input.email}, ${input.passwordHash}, 'free', 0, ${createdAt}, false, ${signupIp})
  `;

  return getUserById(id);
}

export async function createVerificationToken(userId: string): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID();

  await sql`DELETE FROM email_verification_tokens WHERE user_id = ${userId}`;
  await sql`
    INSERT INTO email_verification_tokens (id, user_id, token, expires_at, created_at)
    VALUES (${id}, ${userId}, ${token}, ${expiresAt}, ${createdAt})
  `;

  return token;
}

export async function consumeVerificationToken(token: string): Promise<string | null> {
  const rows = await sql`
    SELECT * FROM email_verification_tokens WHERE token = ${token} LIMIT 1
  `;
  if (!rows[0]) return null;

  const row = rows[0] as Record<string, unknown>;
  const expiresAt = new Date(String(row.expires_at)).getTime();

  await sql`DELETE FROM email_verification_tokens WHERE token = ${token}`;

  if (Date.now() > expiresAt) return null;

  return String(row.user_id);
}

export async function markEmailVerified(userId: string): Promise<void> {
  await sql`
    UPDATE users
    SET email_verified = true,
        credits = CASE WHEN email_verified = false THEN credits + 10 ELSE credits END
    WHERE id = ${userId}
  `;
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
  const credits = Number(session.credits);
  const userId = String(session.user_id);

  await sql`UPDATE checkout_sessions SET status = 'completed' WHERE id = ${reference}`;

  if (credits === 0) {
    await activateProSubscription(userId, 30);
  } else {
    await addUserCredits(userId, credits);
  }

  return session;
}

export type DbAnalysisIteration = {
  id: string;
  analysisId: string;
  userId: string;
  inputText: string;
  conversionScore: number;
  outputJson: string;
  createdAt: string;
};

function mapIteration(row: Record<string, unknown>): DbAnalysisIteration {
  return {
    id: String(row.id),
    analysisId: String(row.analysis_id),
    userId: String(row.user_id),
    inputText: String(row.input_text),
    conversionScore: Number(row.conversion_score),
    outputJson: String(row.output_json),
    createdAt: String(row.created_at),
  };
}

export async function createAnalysisIteration(input: {
  analysisId: string;
  userId: string;
  inputText: string;
  result: AnalysisResult;
}) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await sql`
    INSERT INTO analysis_iterations (id, analysis_id, user_id, input_text, conversion_score, output_json, created_at)
    VALUES (${id}, ${input.analysisId}, ${input.userId}, ${input.inputText}, ${input.result.conversion_score}, ${JSON.stringify(input.result)}, ${createdAt})
  `;

  await sql`
    UPDATE analyses
    SET input_text = ${input.inputText},
        intent = ${input.result.intent},
        tone = ${input.result.tone},
        positioning = ${input.result.main_positioning ?? null},
        conversion_score = ${input.result.conversion_score},
        output_json = ${JSON.stringify(input.result)}
    WHERE id = ${input.analysisId} AND user_id = ${input.userId}
  `;

  const rows = await sql`SELECT * FROM analysis_iterations WHERE id = ${id} LIMIT 1`;
  return rows[0] ? mapIteration(rows[0] as Record<string, unknown>) : null;
}

export async function listAnalysisIterationsForUser(analysisId: string, userId: string) {
  const rows = await sql`
    SELECT * FROM analysis_iterations
    WHERE analysis_id = ${analysisId} AND user_id = ${userId}
    ORDER BY created_at ASC
  `;
  return rows.map((row) => mapIteration(row as Record<string, unknown>));
}

export async function setUserCredits(userId: string, credits: number) {
  await sql`UPDATE users SET credits = ${credits} WHERE id = ${userId}`;
  return getUserById(userId);
}

export async function deactivateProSubscription(userId: string) {
  await sql`UPDATE users SET subscription_active_until = NULL, plan = 'free' WHERE id = ${userId}`;
  return getUserById(userId);
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
