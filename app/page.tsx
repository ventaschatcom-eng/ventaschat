import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CreditCard,
  Landmark,
  Mail,
  MessageCircle,
  MessagesSquare,
  Send,
  Smartphone,
  WalletCards,
} from "lucide-react";

import { MarketingHeader } from "@/components/marketing-header";
import { StructuredData } from "@/components/structured-data";
import { GradientText } from "@/components/ui/gradient-text";

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
    before: "Está interesante, pero se me sale del presupuesto.",
    insight: "El cliente no rechazó el producto; necesita justificar el valor.",
    reply:
      "Te entiendo. Para que no compres a ciegas, te muestro qué incluye y cuál opción te da retorno más rápido según tu volumen actual.",
  },
  {
    situation: "Comparando opciones",
    before: "Estoy mirando otras alternativas antes de decidir.",
    insight: "Hay intención real, pero falta diferenciar la oferta.",
    reply:
      "Perfecto. Si estás comparando, te resumo en dos puntos dónde somos más fuertes y cuándo te conviene elegir otra opción.",
  },
  {
    situation: "Cliente frío",
    before: "Déjame pensarlo y te aviso.",
    insight: "Necesita un siguiente paso pequeño, no más presión.",
    reply:
      "Claro. Te dejo una recomendación rápida según lo que me contaste y mañana te escribo con una opción concreta para que decidas fácil.",
  },
];

const successExamples = [
  {
    title: "Cliente listo para pagar",
    stage: "Cierre inmediato",
    contact: "Laura Gomez",
    status: "en linea",
    avatar: "L",
    messages: [
      {
        side: "in",
        text: "Perfecto, me sirve. Si me mandas el link hoy mismo, hago el pago y arrancamos.",
        time: "11:42",
      },
      {
        side: "out",
        text: "Te lo envio ahora mismo con dos opciones de pago para que elijas la mas comoda.",
        time: "11:43",
      },
      {
        side: "out",
        text: "Te dejo Wompi y transferencia para que avances hoy mismo.",
        time: "11:43",
      },
    ],
    closeLabel: "Pago listo",
    close:
      "VentasChat refuerza velocidad, claridad y siguiente paso para no enfriar una decision ya tomada.",
  },
  {
    title: "Seguimiento bien llevado",
    stage: "Confianza ganada",
    contact: "Santiago Rojas",
    status: "activo hoy",
    avatar: "S",
    messages: [
      {
        side: "in",
        text: "Gracias por explicarme todo. Me dio mucha confianza como lo manejaste.",
        time: "4:18",
      },
      {
        side: "out",
        text: "Con gusto. Si quieres, te dejo el resumen final y agendamos el inicio para no perder ritmo.",
        time: "4:19",
      },
      {
        side: "in",
        text: "Dale, mandamelo. Asi cierro eso hoy.",
        time: "4:20",
      },
    ],
    closeLabel: "Seguimiento ganado",
    close:
      "La recomendacion mantiene el tono consultivo y convierte buena energia en un compromiso concreto.",
  },
  {
    title: "Comparacion resuelta",
    stage: "Decision clara",
    contact: "Valentina Ruiz",
    status: "escribiendo...",
    avatar: "V",
    messages: [
      {
        side: "in",
        text: "Ya compare con las otras opciones y con ustedes lo veo mucho mas claro.",
        time: "6:07",
      },
      {
        side: "out",
        text: "Buenisimo. Entonces avanzamos con el plan que mejor se ajusta a tu volumen y te acompano en el arranque.",
        time: "6:08",
      },
      {
        side: "in",
        text: "Hagamoslo con el mensual. Quiero empezar esta semana.",
        time: "6:09",
      },
    ],
    closeLabel: "Decision tomada",
    close:
      "VentasChat ayuda a cerrar sin sonar agresivo: confirma la decision y propone el proximo paso.",
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

const faqs = [
  {
    q: "¿Por qué pagar por esto si tengo ChatGPT gratis?",
    a: "ChatGPT te da un párrafo bonito cada vez que pegas un chat. VentasChat te da estructura: puntaje de cierre 0-100%, palabras concretas a usar y a evitar, métricas de engagement/urgencia/precio, historial buscable de cada cliente y posibilidad de iterar el score conforme la conversación avanza. Eso ChatGPT no lo guarda ni lo estructura.",
  },
  {
    q: "¿Cuántos análisis necesito para tener idea?",
    a: "Te damos 10 gratis al registrarte. Con 3-4 chats ya verás si la lectura te aporta. No pedimos tarjeta para probar.",
  },
  {
    q: "¿VentasChat es un CRM?",
    a: "No. VentasChat es un motor de análisis y decisión comercial. Convive perfectamente con tu CRM o con un Excel.",
  },
  {
    q: "¿Sirve para vendedores independientes o solo para equipos?",
    a: "Sirve para ambos. Está pensado para freelancers, agencias, closers, consultores y pequeños equipos comerciales.",
  },
  {
    q: "¿Funciona solo con WhatsApp o también con otras plataformas?",
    a: "Funciona con cualquier chat de ventas: WhatsApp, Instagram DM, Telegram, Messenger, LinkedIn, Discord. Solo pegas el texto de la conversación o subes una captura (OCR la procesa automáticamente). El análisis se ajusta al tono de cada plataforma.",
  },
  {
    q: "¿Mis chats son privados?",
    a: "Sí. Los chats se almacenan cifrados en tu cuenta y solo tú los ves. No los compartimos, no los usamos para entrenar modelos públicos.",
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
              VentasChat lee tu conversación de <strong>WhatsApp, Instagram DM, Telegram</strong> o
              cualquier chat de ventas, te da un{" "}
              <strong>puntaje de cierre 0-100%</strong>, las{" "}
              <strong>palabras exactas a usar y evitar</strong>, y 3 respuestas listas
              para mandar. Sin pegar nada en ChatGPT cada vez.
            </p>
            <div className="hero-actions">
              <Link href="/signup" className="button button-primary">
                Empieza con 10 análisis gratis
              </Link>
              <Link href="#vs-chatgpt" className="button button-secondary">
                ¿En qué es diferente a ChatGPT?
              </Link>
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
            Pensado para equipos que venden en Colombia, México, Chile, Perú y Argentina
          </p>
          <div className="latam-proof-marquee" aria-label="Referencias visuales de marcas conocidas en Latinoamérica">
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
            <div className="eyebrow">Cómo funciona</div>
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
                <div className="conversion-card-top">
                  <span>{example.situation}</span>
                  <BadgeCheck size={18} />
                </div>
                <div className="mini-chat">
                  <div className="mini-message mini-message-in">{example.before}</div>
                  <div className="mini-insight">
                    <strong>VentasChat detecta</strong>
                    <span>{example.insight}</span>
                  </div>
                  <div className="mini-message mini-message-out">{example.reply}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section success-section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Mas ejemplos</div>
            <h2>
              Conversaciones que ya se sienten como{" "}
              <GradientText className="section-title-accent">venta encaminada</GradientText>.
            </h2>
            <p>
              Cuando la conversacion esta bien llevada, el cliente avanza con mas claridad,
              confianza y disposicion para comprar.
            </p>
          </div>
          <div className="success-grid">
            {successExamples.map((example) => (
              <article key={example.title} className="success-card card">
                <div className="success-card-top">
                  <div>
                    <strong>{example.title}</strong>
                    <span>{example.stage}</span>
                  </div>
                  <BadgeCheck size={18} />
                </div>
                <div className="success-chat-shell">
                  <div className="success-chat-header">
                    <div className="success-chat-avatar">{example.avatar}</div>
                    <div className="success-chat-contact">
                      <strong>{example.contact}</strong>
                      <span>{example.status}</span>
                    </div>
                  </div>
                  <div className="success-chat-body">
                    <div className="success-chat-day">Hoy</div>
                    {example.messages.map((message, index) => (
                      <div
                        key={`${example.title}-${index}`}
                        className={`success-bubble success-bubble-${message.side}`}
                      >
                        <p>{message.text}</p>
                        <span>{message.time}</span>
                      </div>
                    ))}
                    <div className="success-payment-pill">{example.closeLabel}</div>
                  </div>
                </div>
                <div className="success-note">
                  <strong>Por que funciona</strong>
                  <span>{example.close}</span>
                </div>
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
              créditos o suscripción.
            </h2>
            <p>
              Primero validas valor. Luego eliges entre paquetes de análisis o un
              plan mensual si tu volumen ya lo justifica.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="pricing-card card">
              <h3>Gratis</h3>
              <p>3 análisis incluidos para probar el flujo y validar el resultado.</p>
            </article>
            <article className="pricing-card card highlighted">
              <h3>Paquetes de créditos</h3>
              <p>20, 50 o 120 análisis para vendedores que prefieren flexibilidad y pago por uso.</p>
            </article>
            <article className="pricing-card card">
              <h3>Suscripción</h3>
              <p>Para equipos que revisan conversaciones todas las semanas y necesitan volumen constante.</p>
            </article>
          </div>
        </section>

        <section className="section payment-section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">Opciones de pago</div>
            <h2>Pagos pensados para Colombia y LATAM</h2>
            <p>
              Sí conviene mostrarlo en la home: reduce dudas antes del registro y
              deja claro que el producto no depende solo de Stripe o PayPal.
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
          <div className="payment-note card">
            <Landmark size={18} />
            <span>
              Para el MVP podemos presentarlo como opciones planeadas o disponibles
              según la integración que activemos primero.
            </span>
            <Building2 size={18} />
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
              <a href="mailto:ventaschat.com@gmail.com">ventaschat.com@gmail.com</a>
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
            <a href="mailto:ventaschat.com@gmail.com">Contacto</a>
          </div>
        </div>
      </footer>
    </>
  );
}
