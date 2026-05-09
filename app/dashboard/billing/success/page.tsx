import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <div className="stack" style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
      <section className="card feature-card">
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "0.5rem",
          }}
        >
          ✓
        </div>
        <h1>Pago recibido</h1>
        <p>
          Tu pago fue procesado correctamente. Los créditos se acreditarán a tu cuenta en los
          próximos segundos.
        </p>
        <p className="muted" style={{ fontSize: "0.875rem" }}>
          Si los créditos no aparecen en 2 minutos, recarga la página del dashboard.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="button button-primary">
            Ir al dashboard
          </Link>
          <Link href="/dashboard/analyze" className="button button-secondary">
            Analizar conversación
          </Link>
        </div>
      </section>
    </div>
  );
}
