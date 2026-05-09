import { auth } from "@/lib/auth";
import { getUserById, isProActive } from "@/lib/db";
import { CREDIT_PACKS, PRO_SUBSCRIPTION } from "@/lib/plans";
import { CheckoutButton } from "@/components/checkout-button";

export default async function BillingPage() {
  const session = await auth();
  const user = await getUserById(session!.user!.id);
  const proActive = isProActive(user);
  const proUntil = user?.subscriptionActiveUntil
    ? new Date(user.subscriptionActiveUntil).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="stack">
      <div className="section-heading">
        <h1>Facturación y créditos</h1>
        {proActive ? (
          <p>
            <span className="pro-badge">PRO ACTIVO</span> Tu plan Pro Ilimitado está
            activo hasta el <strong>{proUntil}</strong>. Análisis sin contar créditos.
          </p>
        ) : (
          <p>
            Tienes <strong>{user?.credits ?? 0} créditos</strong> disponibles. Cada
            análisis consume 1 crédito.
          </p>
        )}
      </div>

      <section className="card pro-hero">
        <div className="pro-hero-left">
          <span className="pro-hero-tag">⭐ Recomendado</span>
          <h2>{PRO_SUBSCRIPTION.label}</h2>
          <p className="pro-hero-price">
            ${PRO_SUBSCRIPTION.amountCOP.toLocaleString("es-CO")}
            <span> COP / mes</span>
          </p>
          <ul className="pro-hero-perks">
            {PRO_SUBSCRIPTION.perks.map((perk) => (
              <li key={perk}>✓ {perk}</li>
            ))}
          </ul>
        </div>
        <div className="pro-hero-right">
          {proActive ? (
            <p className="muted">
              Renovación manual: cuando se acerque la fecha {proUntil}, podrás
              renovar desde aquí. Pronto tendremos renovación automática.
            </p>
          ) : (
            <>
              <CheckoutButton
                provider="wompi"
                pro
                label="Activar Pro con Wompi"
                className="button button-primary"
              />
              <CheckoutButton
                provider="mercadopago"
                pro
                label="Activar Pro con MercadoPago"
              />
              <p className="muted" style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Pago de un mes. Renovación manual hasta que llegue auto-renovación.
              </p>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="section-heading compact">
          <h2>O compra créditos sueltos</h2>
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
              <p className="muted" style={{ marginBottom: "0.5rem" }}>
                {pack.description}
              </p>
              <p className="muted" style={{ fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                ${pack.perAnalysis.toLocaleString("es-CO")} COP por análisis
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
