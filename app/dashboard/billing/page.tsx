import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/db";
import { CREDIT_PACKS } from "@/lib/plans";
import { CheckoutButton } from "@/components/checkout-button";

export default async function BillingPage() {
  const session = await auth();
  const user = await getUserById(session!.user!.id);

  return (
    <div className="stack">
      <div className="section-heading">
        <h1>Facturación y créditos</h1>
        <p>
          Tienes <strong>{user?.credits ?? 0} créditos</strong> disponibles. Cada análisis consume
          1 crédito.
        </p>
      </div>

      <section>
        <div className="section-heading compact">
          <h2>Comprar créditos</h2>
          <p className="muted">Paquetes de un solo pago, sin suscripción.</p>
        </div>
        <div className="pricing-grid">
          {CREDIT_PACKS.map((pack) => (
            <article
              key={pack.id}
              className={`pricing-card card${pack.highlight ? " highlighted" : ""}`}
            >
              <h3>{pack.label}</h3>
              <p className="stat-value" style={{ fontSize: "2rem", margin: "0.5rem 0" }}>
                ${pack.amountCOP.toLocaleString("es-CO")}
                <span style={{ fontSize: "0.9rem", fontWeight: 400 }}> COP</span>
              </p>
              <p className="muted" style={{ marginBottom: "1.25rem" }}>
                {pack.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <CheckoutButton
                  packId={pack.id}
                  provider="wompi"
                  label="Pagar con Wompi"
                  className="button button-primary"
                />
                <CheckoutButton
                  packId={pack.id}
                  provider="mercadopago"
                  label="Pagar con MercadoPago"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <article className="feature-card card">
        <h2>Métodos de pago aceptados</h2>
        <ul className="pill-list">
          {[
            "Tarjeta débito / crédito (Wompi)",
            "PSE (Wompi)",
            "Nequi (Wompi)",
            "Daviplata (Wompi)",
            "MercadoPago (tarjeta, PSE, efectivo)",
          ].map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
