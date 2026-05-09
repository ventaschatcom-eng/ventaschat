-- VentasChat — Schema inicial para Neon Postgres
-- Ejecutar una sola vez en Neon SQL Editor: https://console.neon.tech

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  credits INTEGER NOT NULL DEFAULT 10,
  created_at TEXT NOT NULL,
  subscription_active_until TEXT
);

CREATE TABLE IF NOT EXISTS analyses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  input_text TEXT NOT NULL,
  conversation_context TEXT NOT NULL DEFAULT 'Ventas / clientes',
  conversation_type TEXT NOT NULL,
  intent TEXT NOT NULL,
  tone TEXT NOT NULL,
  positioning TEXT,
  conversion_score INTEGER NOT NULL,
  output_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  outcome TEXT NOT NULL DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usage_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  analysis_id TEXT NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 1,
  action_type TEXT NOT NULL DEFAULT 'conversation_analysis',
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS checkout_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  credits INTEGER NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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
);
