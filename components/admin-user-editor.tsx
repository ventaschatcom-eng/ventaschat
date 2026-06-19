"use client";

import { useState } from "react";

type UserResult = {
  id: string;
  email: string;
  plan: string;
  credits: number;
  subscriptionActiveUntil: string | null;
  isProActive: boolean;
  createdAt: string;
};

export function AdminUserEditor() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<UserResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState("");
  const [proDays, setProDays] = useState("30");
  const [msg, setMsg] = useState("");

  async function searchUser(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");
    setUser(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setUser(data);
      setCredits(String(data.credits));
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  async function patchUser(action: string, value?: number) {
    if (!user) return;
    setMsg("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, action, value }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }

      if (action === "set_credits") {
        setUser((u) => u ? { ...u, credits: data.credits } : u);
        setMsg(`Créditos actualizados a ${data.credits}`);
      } else if (action === "activate_pro") {
        const until = new Date(data.subscriptionActiveUntil).toLocaleDateString("es-CO");
        setUser((u) => u ? { ...u, isProActive: true, subscriptionActiveUntil: data.subscriptionActiveUntil, plan: "pro" } : u);
        setMsg(`Pro activado hasta ${until}`);
      } else if (action === "deactivate_pro") {
        setUser((u) => u ? { ...u, isProActive: false, subscriptionActiveUntil: null, plan: "free" } : u);
        setMsg("Pro desactivado");
      }
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="section-heading compact">
        <h2>Editar usuario</h2>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <form onSubmit={searchUser} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="email"
            className="input"
            placeholder="Email del usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ flex: 1, minWidth: "220px" }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Buscando…" : "Buscar"}
          </button>
        </form>

        {error && <p style={{ color: "var(--error, #e53e3e)", fontSize: "0.9rem" }}>{error}</p>}
        {msg && <p style={{ color: "var(--success, #38a169)", fontSize: "0.9rem" }}>{msg}</p>}

        {user && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "0.75rem", background: "var(--surface-2, var(--bg-secondary))", borderRadius: "8px", fontSize: "0.9rem" }}>
              <span><strong>Email:</strong> {user.email}</span>
              <span><strong>Plan:</strong> {user.plan}</span>
              <span><strong>Créditos:</strong> {user.credits}</span>
              <span>
                <strong>Pro:</strong>{" "}
                {user.isProActive
                  ? `activo hasta ${new Date(user.subscriptionActiveUntil!).toLocaleDateString("es-CO")}`
                  : "inactivo"}
              </span>
              <span><strong>Registro:</strong> {new Date(user.createdAt).toLocaleDateString("es-CO")}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Créditos</label>
                <input
                  type="number"
                  className="input"
                  min={0}
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  style={{ width: "100px" }}
                />
              </div>
              <button
                className="btn btn-secondary"
                disabled={loading}
                onClick={() => patchUser("set_credits", Number(credits))}
              >
                Guardar créditos
              </button>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Días Pro</label>
                <input
                  type="number"
                  className="input"
                  min={1}
                  value={proDays}
                  onChange={(e) => setProDays(e.target.value)}
                  style={{ width: "80px" }}
                />
              </div>
              <button
                className="btn btn-primary"
                disabled={loading}
                onClick={() => patchUser("activate_pro", Number(proDays))}
              >
                Activar Pro
              </button>
              {user.isProActive && (
                <button
                  className="btn btn-secondary"
                  disabled={loading}
                  onClick={() => patchUser("deactivate_pro")}
                  style={{ color: "var(--error, #e53e3e)" }}
                >
                  Desactivar Pro
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
