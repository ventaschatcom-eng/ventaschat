import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Sparkles, Zap, MessageCircle } from "lucide-react";

import { MarketingHeader } from "@/components/marketing-header";
import { PricingCTA } from "@/components/pricing-cta";
import { CREDIT_PACKS, PRO_SUBSCRIPTION } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Precios y planes — Desde $20.000 COP",
  description:
    "Plan Pro Ilimitado por $89.000 COP/mes o paquetes de créditos desde $20.000 COP. Pagos en COP con Wompi y MercadoPago. 10 análisis gratis al registrarte.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Precios — VentasChat",
    description: "Análisis ilimitados a $89.000/mes o paquetes desde $20.000 COP.",
  },
};

const featuresComparison = [
  { label: "Puntaje de cierre 0-100%", free: true, packs: true, pro: true },
  { label: "Vocabulario sugerido (usar / evitar)", free: true, packs: true, pro: true },
  { label: "3 respuestas listas para enviar", free: true, packs: true, pro: true },
  { label: "Métricas: engagement, urgencia, precio", free: true, packs: true, pro: true },
  { label: "OCR de capturas WhatsApp", free: true, packs: true, pro: true },
  { label: "Iteración: agrega mensaje y recalcula", free: true, packs: true, pro: true },
  { label: "Tono calibrable de respuestas", free: true, packs: true, pro: true },
  { label: "Marcar venta cerrada / perdida", free: true, packs: true, pro: true },
  { label: "Coaching de patrones (tu close rate)", free: true, packs: true, pro: true },
  { label: "Análisis incluidos al mes", free: "10", packs: "20-120", pro: "Ilimitados" },
  { label: "Costo por análisis", free: "Gratis", packs: "$750-1.000", pro: "$0" },
  { label: "Renovación", free: "—", packs: "Pago único", pro: "Mensual" },
  { label: "Soporte prioritario", free: false, packs: false, pro: true },
];

const faqs = [
  {
    q: "¿Cuántos análisis trae el registro gratis?",
    a: "10 análisis sin tarjeta. Suficiente para que veas si la herramienta te aporta antes de pagar nada.",
  },
  {
    q: "¿Los créditos comprados expiran?",
    a: "No mientras tu cuenta esté activa. Si compras 50 créditos y los usas en 6 meses, está perfecto.",
  },
  {
    q: "¿Puedo cancelar el plan Pro cuando quiera?",
    a: "Sí. Por ahora es renovación manual: pagas un mes y tienes 30 días de acceso ilimitado. Si no renuevas, vuelves al modo créditos. Auto-renovación llega pronto.",
  },
  {
    q: "¿Qué pasa si tengo créditos y me suscribo a Pro?",
    a: "Tus créditos quedan guardados. Mientras Pro esté activo, los análisis no descuentan créditos. Si Pro vence, vuelves a usar tus créditos guardados.",
  },
  {
    q: "¿Aceptan PSE, Nequi, Daviplata?",
    a: "Sí. Vía Wompi (Colombia) aceptamos PSE, Nequi, Daviplata, tarjetas. Vía MercadoPago también tarjetas, PSE y efectivo.",
  },
  {
    q: "¿Hay descuentos para equipos?",
    a: "Por ahora no, pero estamos trabajando en planes de equipo con descuento por volumen. Si tienes 5+ vendedores, escríbenos a ventaschat.com@gmail.com.",
  },
];

export default function PricingPage() {
  const monthlyPackEquivalent = CREDIT_PACKS.find((p) => p.id === "pack_120");

  return (
    <>
      <MarketingHeader />
      <main className="page-shell pricing-page">
        <section className="pricing-hero">
          <div className="eyebrow">Precios transparentes en pesos colombianos</div>
          <h1>
            Empieza con <span className="hero-accent-green">10 análisis gratis</span>.
            Paga solo cuando te aporte valor.
          </h1>
          <p>
            Sin tarjeta para arrancar. Sin sorpresas. Si te enamoras del producto, pasa
            a Pro Ilimitado o compra paquetes de créditos.
          </p>
        </section>

        <section className="pricing-tiers">
          {/* GRATIS */}
          <article className="pricing-tier card">
            <div className="pricing-tier-head">
              <h2>Gratis</h2>
              <div className="pricing-tier-price">
                <span className="pricing-amount">$0</span>
                <span className="pricing-period">para siempre</span>
              </div>
              <p className="pricing-tier-tagline">Para probar antes de comprar.</p>
            </div>
            <ul className="pricing-feature-list">
              <li><Check size={16} /> 10 análisis al registrarte</li>
              <li><Check size={16} /> Todas las features del producto</li>
              <li><Check size={16} /> OCR de capturas incluido</li>
              <li><Check size={16} /> Sin tarjeta requerida</li>
              <li className="pricing-feature-muted"><X size={16} /> No incluye créditos recurrentes</li>
            </ul>
            <Link href="/signup" className="button button-secondary" style={{ width: "100%", textAlign: "center" }}>
              Empezar gratis
            </Link>
          </article>

          {/* PRO ILIMITADO */}
          <article className="pricing-tier card pricing-tier-featured">
            <div className="pricing-tier-tag">⭐ Más popular</div>
            <div className="pricing-tier-head">
              <h2>{PRO_SUBSCRIPTION.label}</h2>
              <div className="pricing-tier-price">
                <span className="pricing-amount">
                  ${PRO_SUBSCRIPTION.amountCOP.toLocaleString("es-CO")}
                </span>
                <span className="pricing-period">COP / mes</span>
              </div>
              <p className="pricing-tier-tagline">
                Para vendedores con uso recurrente. Mejor valor por análisis.
              </p>
            </div>
            <ul className="pricing-feature-list">
              {PRO_SUBSCRIPTION.perks.map((perk) => (
                <li key={perk}><Check size={16} /> {perk}</li>
              ))}
            </ul>
            <PricingCTA type="pro" className="button button-primary">
              Activar Pro ahora
            </PricingCTA>
            <p className="pricing-fineprint">
              Renovación manual por ahora · Cancela cuando quieras
            </p>
          </article>

          {/* PACKS */}
          <article className="pricing-tier card">
            <div className="pricing-tier-head">
              <h2>Pago por uso</h2>
              <div className="pricing-tier-price">
                <span className="pricing-amount">
                  ${CREDIT_PACKS[0].amountCOP.toLocaleString("es-CO")}
                </span>
                <span className="pricing-period">desde · pago único</span>
              </div>
              <p className="pricing-tier-tagline">
                Sin compromisos. Compras los créditos que necesitas.
              </p>
            </div>
            <ul className="pricing-feature-list">
              {CREDIT_PACKS.map((pack) => (
                <li key={pack.id}>
                  <Check size={16} />
                  <strong>{pack.credits} análisis</strong> — ${pack.amountCOP.toLocaleString("es-CO")} COP
                  <span className="pricing-feature-extra">
                    (${pack.perAnalysis.toLocaleString("es-CO")} c/u)
                  </span>
                </li>
              ))}
              <li><Check size={16} /> Créditos no expiran</li>
              <li><Check size={16} /> Todas las features</li>
            </ul>
            <PricingCTA type="pack" className="button button-secondary">
              Comprar paquete
            </PricingCTA>
          </article>
        </section>

        <section className="pricing-savings card">
          <Sparkles size={20} />
          <div>
            <strong>¿Cuándo conviene Pro vs paquetes?</strong>
            <p>
              Si analizas más de <strong>{Math.ceil(PRO_SUBSCRIPTION.amountCOP / (monthlyPackEquivalent?.perAnalysis ?? 750))} chats al mes</strong>, Pro
              te sale más barato y nunca te quedas sin créditos. Si haces menos, los
              paquetes son más eficientes.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Comparativa completa</div>
            <h2>¿Qué incluye cada plan?</h2>
          </div>

          <div className="pricing-table card">
            <div className="pricing-table-row pricing-table-head">
              <div className="pricing-table-feature">Característica</div>
              <div className="pricing-table-cell">Gratis</div>
              <div className="pricing-table-cell pricing-table-cell-featured">Pro</div>
              <div className="pricing-table-cell">Paquetes</div>
            </div>
            {featuresComparison.map((row) => (
              <div key={row.label} className="pricing-table-row">
                <div className="pricing-table-feature">{row.label}</div>
                <div className="pricing-table-cell">
                  {typeof row.free === "boolean"
                    ? row.free
                      ? <Check size={18} className="check-yes" />
                      : <X size={18} className="check-no" />
                    : <span>{row.free}</span>}
                </div>
                <div className="pricing-table-cell pricing-table-cell-featured">
                  {typeof row.pro === "boolean"
                    ? row.pro
                      ? <Check size={18} className="check-yes" />
                      : <X size={18} className="check-no" />
                    : <span>{row.pro}</span>}
                </div>
                <div className="pricing-table-cell">
                  {typeof row.packs === "boolean"
                    ? row.packs
                      ? <Check size={18} className="check-yes" />
                      : <X size={18} className="check-no" />
                    : <span>{row.packs}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Métodos de pago</div>
            <h2>Paga como prefieras (todo en COP)</h2>
          </div>
          <div className="payments-row">
            {[
              { name: "Wompi", desc: "PSE · Tarjeta · Nequi · Daviplata" },
              { name: "MercadoPago", desc: "Tarjeta · PSE · Efectivo · Cuotas" },
              { name: "Bancos colombianos", desc: "Bancolombia · Davivienda · BBVA" },
            ].map((p) => (
              <article key={p.name} className="payment-pill card">
                <strong>{p.name}</strong>
                <span>{p.desc}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Preguntas frecuentes</div>
            <h2>Todo lo que necesitas saber antes de pagar</h2>
          </div>
          <div className="feature-grid">
            {faqs.map((faq) => (
              <article key={faq.q} className="feature-card card">
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pricing-final-cta card">
          <Zap size={32} />
          <h2>10 análisis gratis te están esperando</h2>
          <p>
            En 30 segundos pegas tu primer chat y recibes el análisis completo.
            Después decides si te aporta valor.
          </p>
          <Link href="/signup" className="button button-primary">
            Empezar ahora — sin tarjeta
          </Link>
          <div className="pricing-final-meta">
            <MessageCircle size={14} /> ¿Dudas? Escribe a{" "}
            <a href="mailto:ventaschat.com@gmail.com">ventaschat.com@gmail.com</a>
          </div>
        </section>
      </main>
    </>
  );
}
