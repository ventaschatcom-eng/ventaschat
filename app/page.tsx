import Link from "next/link";
import {
  BadgeCheck,
  Check,
  CreditCard,
  Mail,
  MessageCircle,
  MessagesSquare,
  Send,
  Smartphone,
  WalletCards,
  X,
} from "lucide-react";

import { FaqAccordion } from "@/components/faq-accordion";
import { MarketingHeader } from "@/components/marketing-header";
import { PricingCTA } from "@/components/pricing-cta";
import { StructuredData } from "@/components/structured-data";
import { GradientText } from "@/components/ui/gradient-text";
import { CREDIT_PACKS, PRO_SUBSCRIPTION } from "@/lib/plans";

const proofItems = [
  "10 análisis gratis al registrarte",
  "Resultados en 15 segundos",
  "Pensado para WhatsApp Business",
  "Sin instalar nada, sin conectar cuentas",
];

const testimonials = [
  {
    name: "Camilo Restrepo",
    role: "Asesor comercial — software contable",
    avatar: "C",
    text: "Antes pegaba mis chats en ChatGPT y daba consejos genéricos. VentasChat me dice exactamente qué palabra usar y cuál evitar. Cerré 3 leads en una semana que llevaba meses persiguiendo.",
  },
  {
    name: "Mariana Vélez",
    role: "Freelance — agencia digital",
    avatar: "M",
    text: "Lo uso antes de responder cualquier cliente difícil. El puntaje me dice si vale la pena empujar o si hay que esperar. Vale cada peso.",
  },
  {
    name: "Andres Quintero",
    role: "Coordinador de ventas — academia online",
    avatar: "A",
    text: "Mi equipo de 6 vendedores ya no manda respuestas planas. El historial me deja ver quién está mejorando y quién necesita coaching.",
  },
];

const vsChatGPT = [
  {
    label: "Puntaje numérico de cierre",
    chat: false,
    vc: true,
    note: "0-100% basado en señales reales",
  },
  {
    label: "Palabras concretas a usar y evitar",
    chat: false,
    vc: true,
    note: "Vocabulario específico de tu chat",
  },
  {
    label: "Historial de tus clientes y mejoras",
    chat: false,
    vc: true,
    note: "ChatGPT olvida cada conversación",
  },
  {
    label: "Métricas: engagement, urgencia, sensibilidad al precio",
    chat: false,
    vc: true,
    note: "Sub-medidores accionables",
  },
  {
    label: "Tono de respuesta calibrable",
    chat: true,
    vc: true,
    note: "Profesional / cercano / urgente / consultivo",
  },
  {
    label: "Iteración: agrega mensaje y recalcula",
    chat: false,
    vc: true,
    note: "Ve cómo cambia el score en vivo",
  },
];

const channelIcons = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Instagram DM", icon: Mail },
  { label: "Telegram", icon: Send },
  { label: "Chat", icon: MessagesSquare },
  { label: "Móvil", icon: Smartphone },
];

const metrics = [
  { value: "74%", label: "probabilidad de cierre visible en segundos" },
  { value: "3", label: "estilos de respuesta para avanzar la conversación" },
  { value: "1", label: "siguiente paso claro para el vendedor" },
];

const latamBrands = [
  "Bienes Raíces",
  "Agencias Digitales",
  "E-commerce",
  "Seguros",
  "Educación Online",
  "Software B2B",
  "Consultoría",
  "Salud y Bienestar",
  "Moda y Retail",
  "Servicios Financieros",
];

const features = [
  {
    title: "Lee la intención real del cliente",
    body: "Detecta si el lead está comparando, frenado por precio, buscando confianza o realmente listo para comprar.",
  },
  {
    title: "Explica por qué el cierre se ve fuerte o débil",
    body: "No solo entrega un puntaje. También explica qué señales empujan la venta y qué objeciones la frenan.",
  },
  {
    title: "Entrega respuestas que sí suenan a vendedor",
    body: "Respuestas directas, naturales y orientadas a cerrar, no texto genérico que parece escrito por una IA fría.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Pega la conversación",
    body: "Copia el chat tal como lo tienes desde WhatsApp, Instagram, Telegram u otra mensajería, sin integraciones complejas.",
  },
  {
    step: "02",
    title: "Elige el contexto de venta",
    body: "Lead nuevo, negociación, seguimiento o manejo de objeciones.",
  },
  {
    step: "03",
    title: "Recibe criterio accionable",
    body: "Obtén intención, objeciones, puntaje, explicación, respuestas y estrategia en una sola vista.",
  },
];

const salesExamples = [
  {
    situation: "Objeción de precio",
    contact: "Andrea M.",
    avatar: "A",
    status: "en línea",
    score: 62,
    customerMsg: "Está interesante, pero se me sale del presupuesto.",
    customerTime: "10:14",
    insight: "El cliente no rechazó el producto; necesita justificar el valor.",
    reply:
      "Te entiendo. Para que no compres a ciegas, te muestro qué incluye y cuál opción te da retorno más rápido según tu volumen actual.",
    replyTime: "10:15",
  },
  {
    situation: "Comparando opciones",
    contact: "Daniel R.",
    avatar: "D",
    status: "escribiendo...",
    score: 71,
    customerMsg: "Estoy mirando otras alternativas antes de decidir.",
    customerTime: "4:08",
    insight: "Hay intención real, pero falta diferenciar la oferta.",
    reply:
      "Perfecto. Si estás comparando, te resumo en dos puntos dónde somos más fuertes y cuándo te conviene elegir otra opción.",
    replyTime: "4:09",
  },
  {
    situation: "Cliente frío",
    contact: "Sofia P.",
    avatar: "S",
    status: "hace 5 min",
    score: 38,
    customerMsg: "Déjame pensarlo y te aviso.",
    customerTime: "6:22",
    insight: "Necesita un siguiente paso pequeño, no más presión.",
    reply:
      "Claro. Te dejo una recomendación rápida según lo que me contaste y mañana te escribo con una opción concreta para que decidas fácil.",
    replyTime: "6:23",
  },
];


const paymentGroups = [
  {
    title: "Pasarelas listas para LATAM",
    description: "Wompi y MercadoPago para activar pagos locales sin fricción.",
    icon: WalletCards,
    methods: [
      { name: "Wompi", brand: "wompi" },
      { name: "Mercado Pago", brand: "mercadopago" },
      { name: "Link de pago", brand: "link" },
      { name: "Recurrentes", brand: "recurring" },
    ],
  },
  {
    title: "Medios populares en Colombia",
    description: "Opciones que los vendedores y clientes ya reconocen.",
    icon: Smartphone,
    methods: [
      { name: "Nequi", brand: "nequi" },
      { name: "Bancolombia", brand: "bancolombia" },
      { name: "PSE", brand: "pse" },
      { name: "Transferencia", brand: "transfer" },
    ],
  },
  {
    title: "Tarjetas y respaldo",
    description: "Cobertura para compradores que prefieren métodos tradicionales.",
    icon: CreditCard,
    methods: [
      { name: "Visa", brand: "visa" },
      { name: "Mastercard", brand: "mastercard" },
      { name: "Amex", brand: "amex" },
      { name: "Débito / crédito", brand: "cards" },
    ],
  },
];

const altContexts = [
  {
    emoji: "💼",
    tag: "Trabajo / profesional",
    title: "Conversaciones de trabajo que se traban",
    description:
      "Feedback difícil con un colega, alineación que no avanza, negociación interna que se complica. El mismo motor analiza el tono, detecta fricciones y te da respuestas que destraban sin quemar la relación.",
    signals: ["Nivel de receptividad del interlocutor", "Fricciones o bloqueos detectados", "Respuesta diplomática vs. respuesta ejecutiva", "Siguiente paso claro para retomar el hilo"],
    types: ["Colaboración de trabajo", "Feedback o tensión", "Alineación de proyecto", "Seguimiento profesional"],
  },
  {
    emoji: "💬",
    tag: "Personal",
    title: "Una conversación personal que se puso rara",
    description:
      "Cuando no sabes si estás leyendo bien la situación. VentasChat detecta el nivel de apertura, los malentendidos latentes y sugiere respuestas claras y respetuosas. Sin manipulación, sin drama.",
    signals: ["Nivel de apertura de la otra persona", "Tensiones o malentendidos latentes", "Respuesta cálida vs. respuesta directa", "Cómo bajar la tensión sin rendirte"],
    types: ["Aclarar malentendidos", "Límites y tono", "Seguimiento personal", "Conversación difícil"],
  },
];


const positioningPoints = [
  {
    title: "Una IA general responde",
    body: "VentasChat interpreta la intención, la objeción y el momento comercial para ayudarte a decidir qué hacer con la conversación.",
  },
  {
    title: "Pensado para ventas por chat",
    body: "No parte de una hoja en blanco. Está diseñado para WhatsApp, Instagram y DMs donde importan el tono, el timing y el siguiente paso.",
  },
  {
    title: "Menos texto suelto, más criterio",
    body: "En lugar de darte una sola respuesta bonita, te entrega señales útiles para cerrar: contexto, dirección y respuesta sugerida.",
  },
];

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <MarketingHeader />
      <main className="page-shell">
        <section className="hero hero-shell hero-whatsapp">
          <div className="hero-copy hero-copy-tight">
            <div className="hero-kicker">Para vendedores que pelean cada cierre por chat</div>
            <h1>
              Sabe qué responder cuando el cliente dice{" "}
              <GradientText className="hero-title-accent hero-title-accent-strong">&ldquo;está caro&rdquo;</GradientText>
              .
            </h1>
            <p>
              <strong>Pegas el chat de tu cliente y, en 15 segundos, VentasChat te dice
              qué tan cerca estás de cerrar y qué responder.</strong>
            </p>
            <p>
              Funciona con <strong>WhatsApp, Instagram DM, Telegram</strong> o cualquier chat
              de ventas. Recibes un <strong>puntaje de cierre 0-100%</strong>, las{" "}
              <strong>palabras exactas a usar y evitar</strong>, y 3 respuestas listas
              para mandar. Sin pegar nada en ChatGPT cada vez.
            </p>
            <p className="hero-tagline-secondary">
              <strong>No respondemos por ti. Te hacemos mejor vendedor, un chat a la vez.</strong>
            </p>
            <div className="hero-actions">
              <Link href="/signup" className="button button-primary">
                Empieza con 10 análisis gratis
              </Link>
              <Link href="#vs-chatgpt" className="button button-secondary">
                ¿En qué es diferente a ChatGPT?
              </Link>
            </div>

            <ul className="hero-trust-strip">
              <li>
                <span className="hero-trust-icon">✓</span>
                <span><strong>10 análisis gratis</strong> al registrarte</span>
              </li>
              <li>
                <span className="hero-trust-icon">✓</span>
                <span><strong>Sin tarjeta</strong> para empezar</span>
              </li>
              <li>
                <span className="hero-trust-icon">✓</span>
                <span><strong>Resultado en 15 segundos</strong> por chat</span>
              </li>
              <li>
                <span className="hero-trust-icon">✓</span>
                <span><strong>OCR de capturas</strong> incluido</span>
              </li>
            </ul>
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
                    Los mensajes y las llamadas están cifrados de extremo a extremo.
                  </div>

                  <div className="wa-chat">
                    <div className="wa-day">Hoy</div>

                    <div className="wa-bubble wa-bubble-in">
                      <p>Hola, me interesa el servicio. ¿Cuál es el precio y cómo sería el pago?</p>
                      <span>10:14</span>
                    </div>

                    <div className="wa-bubble wa-bubble-out">
                      <p>Tenemos plan mensual y también un paquete trimestral con descuento.</p>
                      <span>
                        10:15 <i className="ticks">&#10003;&#10003;</i>
                      </span>
                    </div>

                    <div className="wa-bubble wa-bubble-in">
                      <p>Suena bien, pero quiero pensarlo porque también estoy comparando otras opciones.</p>
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
                      <p>Te entiendo. Si quieres, te muestro cuál opción te conviene más según lo que necesitas y así decides con más seguridad.</p>
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
                        <small>Ubicación compartida</small>
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
                  <strong>Análisis</strong>
                </div>
                <div className="insight-grid">
                  <div className="insight-box">
                    <span>Intención</span>
                    <strong>Interesado, pero sensible al precio</strong>
                  </div>
                  <div className="insight-box">
                    <span>Puntaje</span>
                    <strong>74% de probabilidad de cierre</strong>
                  </div>
                </div>
                <p className="insight-inline-note">
                  Interés real, pero falta reforzar valor para mover el cierre.
                </p>
              </div>
            </div>
          </aside>

          <div className="hero-support">
            <div className="proof-strip">
              {proofItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="channel-strip" aria-label="Plataformas de mensajería compatibles">
              {channelIcons.map(({ label, icon: Icon }) => (
                <span key={label} className="channel-pill">
                  <Icon size={16} />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section dont-ask-section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">💗 LoveChat</div>
            <h2>
              ¿Le escribes a alguien que te gusta?{" "}
              <GradientText className="section-title-accent">No la aburras</GradientText>.
            </h2>
            <p>
              Las preguntas de siempre matan la conversación. Cámbialas por algo que
              la deje pensando en ti.
            </p>
          </div>
          <div className="dont-ask-grid">
            <article className="dont-ask-card dont-ask-bad">
              <div className="dont-ask-tag">🚩 Preguntas que NO debes hacerle</div>
              <ul>
                <li>&ldquo;¿A qué te dedicas?&rdquo;</li>
                <li>&ldquo;¿Cómo estás?&rdquo;</li>
                <li>&ldquo;¿De dónde eres?&rdquo;</li>
              </ul>
            </article>
            <article className="dont-ask-card dont-ask-good">
              <div className="dont-ask-tag">💬 Pregúntale mejor esto</div>
              <ul>
                <li>&ldquo;Descríbete en 3 palabras… pero que una sea mentira 😏&rdquo;</li>
                <li>&ldquo;¿Qué fue lo último que te hizo reír como tonta?&rdquo;</li>
                <li>&ldquo;¿Café tranquilo o algo con más adrenalina?&rdquo;</li>
              </ul>
            </article>
          </div>
          <div className="dont-ask-cta">
            <span>LoveChat te dice qué responder en cualquier chat que te importa.</span>
            <Link href="/lovechat" className="alt-context-love-cta">Conoce LoveChat 💗 →</Link>
          </div>
        </section>

        <section className="metric-band card">
          {metrics.map((item) => (
            <article key={item.label} className="metric-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Cómo funciona</div>
            <h2>
              Tres pasos: pegas el chat, eliges el contexto y{" "}
              <GradientText className="section-title-accent">recibes el análisis</GradientText>.
            </h2>
            <p>
              Sin instalar nada y sin conectar tus cuentas. Copias la conversación
              tal cual, y VentasChat hace el resto.
            </p>
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
          <div className="dashboard-preview-frame" style={{ marginTop: "2.5rem" }}>
            <div className="dashboard-preview-window">
              <div className="dashboard-preview-bar">
                <span /><span /><span />
              </div>
              {/* Para mostrar el gesto real, reemplaza este src por tu GIF: /brand/demo.gif */}
              <img
                src="/brand/dashboard-preview.png.png"
                alt="Demostración de VentasChat analizando una conversación de ventas paso a paso"
                className="dashboard-preview-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Posicionamiento claro</div>
            <h2>
              VentasChat es{" "}
              <GradientText className="section-title-accent">coach</GradientText>,
              no bot ni inbox.
            </h2>
            <p>
              Hay tres tipos de herramientas para vendedores en chat. Cada una resuelve
              algo distinto. Es importante saber cuál necesitas.
            </p>
          </div>

          <div className="positioning-grid">
            <article className="positioning-col card">
              <div className="positioning-tag positioning-tag-other">🤖 Bots / Auto-respuesta</div>
              <h3>Reemplazan al vendedor</h3>
              <p className="muted">
                Manychat, Wati, Heybot, WAI. Configuras flujos y la IA contesta sola
                24/7. El cliente habla con un robot.
              </p>
              <ul className="positioning-list">
                <li>+ Atención 24/7 sin humano</li>
                <li>+ Bueno para FAQs y soporte básico</li>
                <li>− No vende productos complejos bien</li>
                <li>− Suena impersonal en deals importantes</li>
              </ul>
            </article>

            <article className="positioning-col card">
              <div className="positioning-tag positioning-tag-other">📥 Inbox unificado</div>
              <h3>Gestionan al equipo</h3>
              <p className="muted">
                Respond.io, B2Chat, Sirena, Trengo. Centralizan todos los canales en una
                bandeja para varios agentes.
              </p>
              <ul className="positioning-list">
                <li>+ Equipos B2C medianos/grandes</li>
                <li>+ Asignación de tickets entre agentes</li>
                <li>− Setup complejo y costoso</li>
                <li>− No te enseña a vender mejor</li>
              </ul>
            </article>

            <article className="positioning-col card positioning-col-featured">
              <div className="positioning-tag positioning-tag-vc">⭐ VentasChat</div>
              <h3>Te entrena para cerrar más</h3>
              <p className="muted">
                Es tu coach personal. Lee tus chats reales y te dice qué decir y por qué.
                Tú vendes, nosotros te hacemos mejor vendiendo.
              </p>
              <ul className="positioning-list">
                <li>+ Para vendedor individual o pequeño equipo</li>
                <li>+ Setup en 30 segundos</li>
                <li>+ Aprende de tus ventas cerradas</li>
                <li>+ 10 análisis gratis sin tarjeta</li>
              </ul>
            </article>
          </div>

          <div className="positioning-note card">
            <strong>💡 Analogía:</strong> Si Gong.io es el coach IA para llamadas de
            ventas en inglés enterprise, VentasChat es el coach IA para chats de
            WhatsApp en español LATAM. Mismo principio, mercado distinto.
          </div>
        </section>

        <section className="latam-proof">
          <p className="latam-proof-label">
            Pensado para equipos que venden en{" "}
            <strong>Colombia, México, Chile, Perú y Argentina</strong>
          </p>
          <div className="latam-proof-marquee" aria-label="Sectores donde vendedores usan VentasChat">
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
            <div className="eyebrow">Qué resuelve</div>
            <h2>
              No administra chats. Te ayuda a{" "}
              <GradientText className="section-title-accent">vender mejor</GradientText>.
            </h2>
            <p>
              VentasChat está diseñado para interpretar conversaciones comerciales
              de mensajería y convertirlas en criterio útil para el vendedor.
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
            <div className="eyebrow">Lo que dicen vendedores reales</div>
            <h2>
              Personas que ya{" "}
              <GradientText className="section-title-accent">cierran mejor</GradientText>{" "}
              con VentasChat.
            </h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <article key={t.name} className="testimonial-card card">
                <div className="testimonial-head">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
                <p>&ldquo;{t.text}&rdquo;</p>
              </article>
            ))}
          </div>
          <div className="mid-cta-strip">
            <Link href="/signup" className="button button-primary">Empieza con 10 análisis gratis</Link>
            <span className="mid-cta-hint">Sin tarjeta · Resultado en 15 segundos</span>
          </div>
        </section>

        <section className="section dashboard-preview-section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Output real</div>
            <h2>
              Esto es lo que ves después de{" "}
              <GradientText className="section-title-accent">analizar tu chat</GradientText>.
            </h2>
            <p>
              No es un resumen genérico. Es un diagnóstico completo: intención, puntaje,
              objeciones, respuestas listas y vocabulario exacto a usar y evitar.
            </p>
          </div>
          <div className="dashboard-preview-frame">
            <div className="dashboard-preview-labels">
              <span className="dashboard-preview-pill">📊 Puntaje de cierre</span>
              <span className="dashboard-preview-pill">💬 Respuestas listas</span>
              <span className="dashboard-preview-pill">🔤 Vocabulario</span>
              <span className="dashboard-preview-pill">📈 Métricas</span>
            </div>
            <div className="dashboard-preview-window">
              <div className="dashboard-preview-bar">
                <span /><span /><span />
              </div>
              <div className="dashboard-email-mask" aria-hidden="true" />
              <img
                src="/brand/dashboard-preview.png.png"
                alt="Dashboard de VentasChat mostrando análisis completo de una conversación de ventas"
                className="dashboard-preview-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section conversion-section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Ejemplos de cierre</div>
            <h2>
              De una respuesta tibia a una conversación con{" "}
              <GradientText className="section-title-accent">siguiente paso</GradientText>.
            </h2>
            <p>
              Estos mockups muestran cómo VentasChat convierte señales del cliente
              en respuestas más claras, naturales y orientadas a cerrar.
            </p>
          </div>
          <div className="conversion-grid">
            {salesExamples.map((example) => (
              <article key={example.situation} className="conversion-card card">
                <div className="mini-wa">
                  <div className="mini-wa-header">
                    <div className="mini-wa-avatar">{example.avatar}</div>
                    <div className="mini-wa-contact">
                      <strong>{example.contact}</strong>
                      <span>{example.status}</span>
                    </div>
                    <span className="mini-wa-situation">{example.situation}</span>
                  </div>

                  <div className="mini-wa-body">
                    <div className="mini-wa-day">Hoy</div>

                    <div className="mini-wa-bubble mini-wa-bubble-in">
                      <p>{example.customerMsg}</p>
                      <span className="mini-wa-time">{example.customerTime}</span>
                    </div>

                    <div className="mini-wa-insight">
                      <div className="mini-wa-insight-head">
                        <BadgeCheck size={14} />
                        <strong>VentasChat detecta</strong>
                        <span className="mini-wa-score">{example.score}%</span>
                      </div>
                      <p>{example.insight}</p>
                    </div>

                    <div className="mini-wa-bubble mini-wa-bubble-out">
                      <span className="mini-wa-sugg-badge">✨ Sugerido</span>
                      <p>{example.reply}</p>
                      <span className="mini-wa-time">
                        {example.replyTime} <i className="mini-wa-ticks">✓✓</i>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>


        <section className="section alt-context-section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Más allá de ventas</div>
            <h2>
              El mismo análisis para{" "}
              <GradientText className="section-title-accent">cualquier conversación</GradientText>{" "}
              difícil.
            </h2>
            <p>
              VentasChat no es solo para cerrar clientes. También lo usan personas que
              necesitan entender qué está pasando en un chat y cómo responder bien.
            </p>
          </div>
          <div className="alt-context-grid">
            {altContexts.map((ctx) => (
              <article key={ctx.tag} className="alt-context-card card">
                <div className="alt-context-tag">
                  <span>{ctx.emoji}</span>
                  <span>{ctx.tag}</span>
                </div>
                <h3>{ctx.title}</h3>
                <p className="alt-context-desc">{ctx.description}</p>
                <ul className="alt-context-signals">
                  {ctx.signals.map((s) => (
                    <li key={s}>
                      <Check size={14} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="alt-context-types">
                  {ctx.types.map((t) => (
                    <span key={t} className="alt-context-type-pill">{t}</span>
                  ))}
                </div>
                {ctx.tag === "Personal" ? (
                  <Link href="/lovechat" className="alt-context-love-cta">
                    Esto es LoveChat 💗 — conócelo →
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
          <div className="alt-context-note">
            <span>Elige el contexto dentro del análisis — el motor se adapta automáticamente.</span>
            <Link href="/signup" className="button button-secondary">Probarlo gratis</Link>
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Precios</div>
            <h2>
              Empieza{" "}
              <GradientText className="section-title-accent">gratis</GradientText>. Escala con
              créditos o suscripción.
            </h2>
            <p>
              Primero validas valor. Luego eliges entre paquetes de análisis o un
              plan mensual si tu volumen ya lo justifica.
            </p>
          </div>
          <div className="pricing-tiers">
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
          </div>
        </section>

        <section className="section payment-section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Opciones de pago</div>
            <h2>Pagos pensados para Colombia y LATAM</h2>
            <p>
              Paga con los métodos que ya usas. Sin depender de Stripe o PayPal.
            </p>
          </div>
          <div className="payment-grid">
            {paymentGroups.map(({ title, description, icon: Icon, methods }) => (
              <article key={title} className="payment-card card">
                <div className="payment-icon">
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="payment-methods">
                  {methods.map((method) => (
                    <span
                      key={method.name}
                      className={`payment-brand payment-brand-${method.brand}`}
                    >
                      {method.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="vs-chatgpt">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">VentasChat vs ChatGPT</div>
            <h2>
              ChatGPT da párrafos. VentasChat da{" "}
              <GradientText className="section-title-accent">criterio para cerrar</GradientText>.
            </h2>
            <p>
              Cualquiera puede pegar un chat en ChatGPT y pedir consejo. Lo que pasa después es lo que importa:
              ¿cuánta probabilidad real de cierre? ¿qué palabra está matando la venta? ¿cómo evolucionó este cliente?
              VentasChat responde con datos. ChatGPT, con prosa.
            </p>
          </div>
          <div className="comparison-table card">
            <div className="comparison-row comparison-row-head">
              <div className="comparison-label">Característica</div>
              <div className="comparison-cell">ChatGPT genérico</div>
              <div className="comparison-cell comparison-cell-vc">VentasChat</div>
            </div>
            {vsChatGPT.map((row) => (
              <div key={row.label} className="comparison-row">
                <div className="comparison-label">
                  <strong>{row.label}</strong>
                  <small>{row.note}</small>
                </div>
                <div className="comparison-cell">
                  {row.chat ? <span className="comparison-yes">✓</span> : <span className="comparison-no">—</span>}
                </div>
                <div className="comparison-cell comparison-cell-vc">
                  {row.vc ? <span className="comparison-yes">✓</span> : <span className="comparison-no">—</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="feature-grid feature-grid-strong">
            {positioningPoints.map((point) => (
              <article key={point.title} className="feature-card card">
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
          <div className="mid-cta-strip">
            <Link href="/signup" className="button button-primary">Empieza con 10 análisis gratis</Link>
            <span className="mid-cta-hint">Sin tarjeta · Resultado en 15 segundos</span>
          </div>
        </section>

        <section className="section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Preguntas frecuentes</div>
            <h2>Antes de probarlo, esto es lo importante</h2>
          </div>
          <FaqAccordion />
        </section>
      </main>
      <section className="section contact-section">
        <div className="contact-card card">
          <div className="contact-info">
            <div className="eyebrow">Contáctanos</div>
            <h2>¿Tienes dudas antes de empezar?</h2>
            <p>
              Escríbenos por WhatsApp y te respondemos rápido. Sin formularios, sin
              esperas largas. Hablamos contigo directamente.
            </p>
            <div className="contact-meta">
              <strong>Email:</strong>{" "}
              <a href="mailto:hola@ventaschat.com">hola@ventaschat.com</a>
            </div>
          </div>
          <a
            href="https://wa.me/573237037471?text=Hola!%20Tengo%20una%20pregunta%20sobre%20VentasChat."
            target="_blank"
            rel="noopener noreferrer"
            className="contact-wa-btn"
          >
            <svg viewBox="0 0 32 32" width="22" height="22" fill="white">
              <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.7L0 32l8.5-2.4c2.2 1.2 4.8 1.9 7.5 1.9C24.6 31.5 31.6 24.5 31.6 16S24.6.4 16 .4zm0 28.6c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.9 1.4 1.4-4.7-.3-.5C3.7 21 3 18.6 3 16.1 3 8.9 8.9 3 16.1 3s13 5.9 13 13.1c-.1 7.1-6 13-13.1 13zm7.1-9.7c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.5-.2.3-.5.3-.9.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.2-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.3-3-.3-.8-.7-.7-.9-.7H10c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1 0 1.8 1.3 3.6 1.5 3.8.2.3 2.6 4 6.4 5.6 1.6.7 2.8 1.1 3.7 1.4 1.6.5 3 .4 4.1.3 1.3-.2 2.9-1.2 3.3-2.4.4-1.2.4-2.2.3-2.4-.1-.3-.4-.4-.8-.6z"/>
            </svg>
            <span>Escribir por WhatsApp</span>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <span>© {new Date().getFullYear()} VentasChat — IA para vender mejor por chat.</span>
          <div className="footer-links">
            <Link href="/blog">Blog</Link>
            <Link href="/pricing">Precios</Link>
            <Link href="/privacy">Privacidad</Link>
            <Link href="/terms">Términos</Link>
            <a href="mailto:hola@ventaschat.com">Contacto</a>
          </div>
        </div>
      </footer>
    </>
  );
}
