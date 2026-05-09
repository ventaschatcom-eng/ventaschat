import Link from "next/link";
import { Mail, MessageCircle, MessagesSquare, Send, Smartphone } from "lucide-react";

import { MarketingHeader } from "@/components/marketing-header";
import { GradientText } from "@/components/ui/gradient-text";

const proofItems = [
  "WhatsApp, Instagram y mas",
  "Optimizado para LATAM",
  "Respuestas en espanol natural",
  "Pensado para cerrar ventas",
];

const channelIcons = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Instagram DM", icon: Mail },
  { label: "Telegram", icon: Send },
  { label: "Chat", icon: MessagesSquare },
  { label: "Movil", icon: Smartphone },
];

const metrics = [
  { value: "74%", label: "probabilidad de cierre visible en segundos" },
  { value: "3", label: "estilos de respuesta para avanzar la conversacion" },
  { value: "1", label: "siguiente paso claro para el vendedor" },
];

const latamBrands = [
  "Rappi",
  "Mercado Libre",
  "Nubank",
  "Falabella",
  "Kavak",
  "NotCo",
  "Cornershop",
  "Bancolombia",
];

const features = [
  {
    title: "Lee la intencion real del cliente",
    body: "Detecta si el lead esta comparando, frenado por precio, buscando confianza o realmente listo para comprar.",
  },
  {
    title: "Explica por que el cierre se ve fuerte o debil",
    body: "No solo entrega un puntaje. Tambien explica que senales empujan la venta y que objeciones la frenan.",
  },
  {
    title: "Entrega respuestas que si suenan a vendedor",
    body: "Respuestas directas, naturales y orientadas a cerrar, no texto generico que parece escrito por una IA fria.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Pega la conversacion",
    body: "Copia el chat tal como lo tienes desde WhatsApp, Instagram, Telegram u otra mensajeria, sin integraciones complejas.",
  },
  {
    step: "02",
    title: "Elige el contexto de venta",
    body: "Lead nuevo, negociacion, seguimiento o manejo de objeciones.",
  },
  {
    step: "03",
    title: "Recibe criterio accionable",
    body: "Obten intencion, objeciones, puntaje, explicacion, respuestas y estrategia en una sola vista.",
  },
];

const faqs = [
  {
    q: "VentasChat es un CRM?",
    a: "No. VentasChat es un motor de analisis y decision comercial para ayudarte a responder mejor y cerrar mas ventas.",
  },
  {
    q: "Sirve para vendedores independientes o solo para equipos?",
    a: "Sirve para ambos. Esta pensado para freelancers, agencias, closers, consultores y pequenos equipos comerciales.",
  },
  {
    q: "Necesito conectar una plataforma para probarlo?",
    a: "No. En el MVP solo pegas la conversacion o subes el chat exportado y recibes el analisis al instante.",
  },
];

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main className="page-shell">
        <section className="hero hero-shell hero-whatsapp">
          <div className="hero-copy hero-copy-tight">
            <div className="hero-kicker">Analisis comercial para conversaciones de mensajeria</div>
            <h1>
              Convierte conversaciones de{" "}
              <GradientText className="hero-title-accent">mensajeria</GradientText>{" "}
              en decisiones de{" "}
              <GradientText className="hero-title-accent hero-title-accent-strong">venta</GradientText>
              .
            </h1>
            <p>
              VentasChat analiza chats de WhatsApp, Instagram, Telegram y otras
              plataformas para decirte que esta pensando el cliente, que bloquea
              el cierre y que responder para avanzar la conversacion.
            </p>
            <div className="hero-actions">
              <Link href="/signup" className="button button-primary">
                Empieza gratis
              </Link>
              <Link href="/pricing" className="button button-secondary">
                Ver precios
              </Link>
            </div>
            <div className="proof-strip">
              {proofItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="channel-strip" aria-label="Plataformas de mensajeria compatibles">
              {channelIcons.map(({ label, icon: Icon }) => (
                <span key={label} className="channel-pill">
                  <Icon size={16} />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>

          <aside className="hero-device-area">
            <div className="hero-device-stage">
              <div className="whatsapp-phone">
                <div className="phone-notch" />
                <div className="whatsapp-app">
                  <div className="wa-statusbar">
                    <span>9:41</span>
                    <div className="wa-status-icons">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="wa-header">
                    <div className="wa-back">&#8249;</div>
                    <div className="wa-avatar">
                      <div className="wa-avatar-inner">C</div>
                    </div>
                    <div className="wa-contact">
                      <strong>Camila Lopez</strong>
                      <span>escribiendo...</span>
                    </div>
                    <div className="wa-actions">
                      <span className="wa-call" />
                      <span className="wa-video" />
                      <span className="wa-menu" />
                    </div>
                  </div>

                  <div className="wa-encrypted">
                    Los mensajes y las llamadas estan cifrados de extremo a extremo.
                  </div>

                  <div className="wa-chat">
                    <div className="wa-day">Hoy</div>

                    <div className="wa-bubble wa-bubble-in">
                      <p>Hola, me interesa el servicio. Cual es el precio y como seria el pago?</p>
                      <span>10:14</span>
                    </div>

                    <div className="wa-bubble wa-bubble-out">
                      <p>Tenemos plan mensual y tambien un paquete trimestral con descuento.</p>
                      <span>
                        10:15 <i className="ticks">&#10003;&#10003;</i>
                      </span>
                    </div>

                    <div className="wa-bubble wa-bubble-in">
                      <p>Suena bien, pero quiero pensarlo porque tambien estoy comparando otras opciones.</p>
                      <span>10:16</span>
                    </div>

                    <div className="wa-bubble wa-bubble-in wa-audio">
                      <div className="audio-play" />
                      <div className="audio-wave">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="audio-meta">
                        <strong>0:12</strong>
                        <small>10:17</small>
                      </div>
                    </div>

                    <div className="wa-bubble wa-bubble-out highlight">
                      <p>Te entiendo. Si quieres, te muestro cual opcion te conviene mas segun lo que necesitas y asi decides con mas seguridad.</p>
                      <span>Respuesta sugerida</span>
                    </div>

                    <div className="wa-location">
                      <div className="wa-map">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="wa-location-meta">
                        <strong>Punto de encuentro</strong>
                        <small>Ubicacion compartida</small>
                      </div>
                    </div>
                  </div>

                  <div className="wa-compose">
                    <div className="wa-compose-left">
                      <span className="compose-icon smile" />
                      <div className="wa-compose-field">Escribe un mensaje</div>
                    </div>
                    <div className="wa-compose-right">
                      <span className="compose-icon clip" />
                      <span className="compose-icon camera" />
                      <div className="wa-send" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="insight-overlay card">
                <div className="insight-top">
                  <span className="insight-badge">VentasChat AI</span>
                  <strong>Analisis</strong>
                </div>
                <div className="insight-grid">
                  <div className="insight-box">
                    <span>Intencion</span>
                    <strong>Interesado, pero sensible al precio</strong>
                  </div>
                  <div className="insight-box">
                    <span>Puntaje</span>
                    <strong>74% de probabilidad de cierre</strong>
                  </div>
                </div>
                <p className="insight-inline-note">
                  Interes real, pero falta reforzar valor para mover el cierre.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="metric-band card">
          {metrics.map((item) => (
            <article key={item.label} className="metric-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="latam-proof">
          <p className="latam-proof-label">
            Pensado para equipos que venden en Colombia, Mexico, Chile, Peru y Argentina
          </p>
          <div className="latam-proof-marquee" aria-label="Referencias visuales de marcas conocidas en Latinoamerica">
            <div className="latam-proof-track">
              {[...latamBrands, ...latamBrands].map((brand, index) => (
                <span key={`${brand}-${index}`} className="latam-proof-logo">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
            <div className="section-heading section-heading-wide">
            <div className="eyebrow">Que resuelve</div>
            <h2>
              No administra chats. Te ayuda a{" "}
              <GradientText className="section-title-accent">vender mejor</GradientText>.
            </h2>
            <p>
              VentasChat esta disenado para interpretar conversaciones comerciales
              de mensajeria y convertirlas en criterio util para el vendedor.
            </p>
          </div>
          <div className="feature-grid feature-grid-strong">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card card">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Como funciona</div>
            <h2>Un flujo simple con una salida clara</h2>
          </div>
          <div className="workflow-grid">
            {workflow.map((item) => (
              <article key={item.step} className="workflow-card card">
                <span className="workflow-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Precios</div>
            <h2>
              Empieza{" "}
              <GradientText className="section-title-accent">gratis</GradientText>. Escala con
              creditos o suscripcion.
            </h2>
            <p>
              Primero validas valor. Luego eliges entre paquetes de analisis o un
              plan mensual si tu volumen ya lo justifica.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="pricing-card card">
              <h3>Gratis</h3>
              <p>3 analisis incluidos para probar el flujo y validar el resultado.</p>
            </article>
            <article className="pricing-card card highlighted">
              <h3>Paquetes de creditos</h3>
              <p>20, 50 o 120 analisis para vendedores que prefieren flexibilidad y pago por uso.</p>
            </article>
            <article className="pricing-card card">
              <h3>Suscripcion</h3>
              <p>Para equipos que revisan conversaciones todas las semanas y necesitan volumen constante.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Preguntas frecuentes</div>
            <h2>Antes de probarlo, esto es lo importante</h2>
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
      </main>
      <footer className="footer">Convierte conversaciones de mensajeria en ventas.</footer>
    </>
  );
}
