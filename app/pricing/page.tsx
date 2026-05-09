import type { Metadata } from "next";
import Link from "next/link";

import { MarketingHeader } from "@/components/marketing-header";

export const metadata: Metadata = {
  title: "Precios y planes — Desde $20.000 COP",
  description: "Paquetes de análisis desde $20.000 COP por 20 chats o plan Pro Ilimitado mensual a $89.000 COP. Pagos en COP con Wompi y MercadoPago. 10 análisis gratis al registrarte.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Precios — VentasChat",
    description: "Análisis desde $20.000 COP o ilimitados a $89.000/mes.",
  },
};

const plans = [
  {
    name: "Gratis",
    price: "$0",
    description: "Perfecto para probar el flujo antes de comprar créditos o suscribirte.",
    features: ["3 análisis gratis", "Acceso al dashboard", "Insights estructurados con IA"],
  },
  {
    name: "Paquetes de créditos",
    price: "$5 a $20",
    description: "La mejor puerta de entrada para Colombia y LATAM si prefieres flexibilidad en lugar de suscripción.",
    features: ["20 análisis por $5", "50 análisis por $10", "120 análisis por $20"],
  },
  {
    name: "Suscripción",
    price: "$15 a $25 / mes",
    description: "Plan opcional para usuarios con uso recurrente cada semana.",
    features: ["100 análisis / mes", "300 análisis / mes", "Ideal para equipos y agencias activas"],
  },
];

const payments = ["Wompi", "MercadoPago", "PayU Latam", "Nequi / Daviplata", "Transferencia bancaria"];

export default function PricingPage() {
  return (
    <>
      <MarketingHeader />
      <main className="page-shell section">
        <div className="section-heading">
          <div className="eyebrow">Precios</div>
          <h1>Precios pensados primero en créditos para ventas en LATAM</h1>
          <p>Compra volumen de análisis cuando lo necesites y pasa a suscripción solo si tu uso recurrente lo justifica.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <article key={plan.name} className={`pricing-card card ${index === 1 ? "highlighted" : ""}`}>
              <h2>{plan.name}</h2>
              <p className="stat-value">{plan.price}</p>
              <p>{plan.description}</p>
              <ul className="pill-list">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="section">
          <div className="section-heading">
            <h2>Paquetes de créditos</h2>
            <p>Ruta de monetización recomendada para Colombia y LATAM.</p>
          </div>
          <div className="feature-grid">
            {["20 análisis - $5", "50 análisis - $10", "120 análisis - $20"].map((pack) => (
              <article key={pack} className="feature-card card">
                <h3>{pack}</h3>
                <p>Recargas simples para vendedores que quieren valor inmediato sin compromiso mensual.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>Métodos de pago</h2>
            <p>Configura opciones que se adapten a las preferencias locales, no solo Stripe o PayPal.</p>
          </div>
          <ul className="pill-list">
            {payments.map((payment) => (
              <li key={payment}>{payment}</li>
            ))}
          </ul>
        </section>

        <Link href="/signup" className="button button-primary">
          Empieza gratis
        </Link>
      </main>
    </>
  );
}
