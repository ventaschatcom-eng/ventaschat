import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Check, Heart, MessageCircle, Send, Sparkles } from "lucide-react";

import { ForceLightTheme } from "@/components/force-light-theme";
import { LoveChatTikTokCTA } from "@/components/lovechat-tiktok-cta";
import { MarketingHeader } from "@/components/marketing-header";
import { GradientText } from "@/components/ui/gradient-text";

export const metadata: Metadata = {
  title: "LoveChat — Sabe qué responder cuando le escribes a alguien que te importa",
  description:
    "Pega tu conversación de WhatsApp, Instagram o apps de citas y, en 15 segundos, LoveChat te dice qué tan abierta está la otra persona y cómo responder. Sin manipulación. 10 análisis gratis.",
  keywords: [
    "que responder en una cita",
    "como responder a alguien que te gusta",
    "le gusto o no",
    "como saber si le intereso",
    "dejo de responder que hago",
    "como invitar a salir por chat",
    "como reconciliarse por mensaje",
    "consejos de citas",
    "que escribir en tinder",
    "como responder en bumble",
  ],
  alternates: {
    canonical: "/lovechat",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://ventaschat.com/lovechat",
    siteName: "VentasChat",
    title: "LoveChat — Qué responder cuando le escribes a alguien que te importa",
    description:
      "Lee la conversación, te dice el nivel de interés real y cómo responder bien. Sin trucos ni manipulación. 10 análisis gratis.",
  },
};

const trust = [
  "10 análisis gratis al registrarte",
  "Sin tarjeta para empezar",
  "Resultado en 15 segundos",
  "Funciona con WhatsApp, Instagram, Tinder y Bumble",
];

const channels = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Instagram DM", icon: Send },
  { label: "Tinder", icon: Heart },
  { label: "Bumble", icon: Sparkles },
];

const metrics = [
  { value: "78%", label: "de apertura e interés visible en segundos" },
  { value: "3", label: "formas de responder según el momento" },
  { value: "0", label: "trucos baratos o frases de manipulación" },
];

const workflow = [
  {
    step: "01",
    title: "Pega la conversación",
    body: "Copia el chat tal como está, desde WhatsApp, Instagram, Tinder, Bumble o cualquier app. También sirve una captura de pantalla.",
  },
  {
    step: "02",
    title: "Elige el contexto",
    body: "Alguien que te gusta, una primera cita, reconectar con alguien o una conversación de pareja que se puso tensa.",
  },
  {
    step: "03",
    title: "Recibe la lectura",
    body: "Nivel de interés real, qué está pasando entre líneas y 3 formas distintas de responder — cálida, directa o ligera.",
  },
];

const situations = [
  {
    emoji: "💘",
    title: "No sabes si le gustas",
    body: "Lees y relees los mensajes buscando señales. LoveChat te dice el nivel de interés real y si vale la pena dar el siguiente paso.",
  },
  {
    emoji: "👻",
    title: "Dejó de responder de la nada",
    body: "Antes de escribir tres veces seguidas, mira si la puerta sigue abierta y con qué mensaje retomar sin sonar desesperado.",
  },
  {
    emoji: "🥂",
    title: "Quieres invitar a salir",
    body: "Te dice si es buen momento para proponer algo o si conviene esperar, y cómo hacerlo natural sin arruinar el ambiente.",
  },
  {
    emoji: "🌧️",
    title: "La charla se puso tensa",
    body: "Detecta el malentendido latente y te sugiere cómo bajar la tensión sin rendirte ni quedar pidiendo perdón por todo.",
  },
  {
    emoji: "🔁",
    title: "Reconectar con alguien",
    body: "Después de tiempo sin hablar, encuentra el tono justo para volver a escribir sin que se sienta forzado o random.",
  },
  {
    emoji: "❤️‍🩹",
    title: "Después de una discusión",
    body: "Cuando quieres reconciliarte pero no sabes por dónde empezar, te ayuda a expresar lo que sientes con claridad y respeto.",
  },
];

const detects = [
  {
    title: "Nivel de interés y apertura real",
    body: "Más allá de los emojis. Detecta si hay interés genuino, simple cortesía o solo está siendo amable.",
  },
  {
    title: "Si es el momento de avanzar o esperar",
    body: "Te dice cuándo proponer una cita, cuándo bajar la intensidad y cuándo simplemente dejar respirar la conversación.",
  },
  {
    title: "Tensiones y malentendidos latentes",
    body: "Eso que se siente raro pero no sabes nombrar. Lo identifica y te explica qué está pasando entre líneas.",
  },
];

const examples = [
  {
    situation: "¿Le gusto?",
    contact: "Sofía",
    avatar: "S",
    status: "en línea",
    score: 78,
    msg: "jajaja sí, la verdad la pasé súper contigo el otro día 🙈",
    time: "21:14",
    insight: "Interés genuino y abierta a repetir. No la fuerces: propón algo concreto y ligero.",
    reply:
      "Yo también la pasé increíble. ¿Te animas a repetir el finde? Conozco un sitio que te va a gustar.",
    replyTime: "21:16",
  },
  {
    situation: "Dejó de responder",
    contact: "Mateo",
    avatar: "M",
    status: "hace 2 h",
    score: 54,
    msg: "perdón, he tenido una semana de locos 😅",
    time: "13:02",
    insight: "La puerta sigue abierta, pero no quiere presión. Responde liviano, sin reproches.",
    reply:
      "Tranqui, te entiendo total. Cuando bajes el ritmo me cuentas y nos tomamos algo 👌",
    replyTime: "13:05",
  },
  {
    situation: "Tensión en pareja",
    contact: "Valentina",
    avatar: "V",
    status: "escribiendo...",
    score: 41,
    msg: "siento que últimamente no me escuchas cuando te hablo",
    time: "20:47",
    insight: "Necesita sentirse validada antes que soluciones. Reconoce primero, defiende después.",
    reply:
      "Tienes razón y lo siento. Quiero entender mejor qué necesitas de mí. ¿Hablamos hoy con calma?",
    replyTime: "20:49",
  },
];

export default function LoveChatPage() {
  return (
    <>
      <ForceLightTheme />
      <div className="lovechat-theme">
        <LoveChatTikTokCTA />
      </div>
      <MarketingHeader />
      <div className="lovechat-theme">
        <main className="page-shell">
          <section className="hero hero-shell">
            <div className="hero-copy hero-copy-tight">
              <div className="hero-kicker">💬 Para conversaciones que de verdad te importan</div>
              <h1>
                Sabe qué responder cuando le escribes a{" "}
                <GradientText className="hero-title-accent hero-title-accent-strong">alguien que te importa</GradientText>.
              </h1>
              <p>
                <strong>
                  Pegas la conversación y, en 15 segundos, LoveChat te dice qué tan abierta
                  está la otra persona y cómo responder bien.
                </strong>
              </p>
              <p>
                Funciona con <strong>WhatsApp, Instagram, Tinder o Bumble</strong>. Recibes una
                lectura clara del <strong>nivel de interés</strong>, qué está pasando entre líneas
                y <strong>3 formas distintas de responder</strong> según el momento.
              </p>
              <p className="hero-tagline-secondary">
                <strong>Sin manipulación, sin trucos. Te ayudamos a comunicar mejor lo que ya sientes.</strong>
              </p>
              <div className="hero-actions">
                <Link href="/signup" className="button button-primary">
                  Empieza con 10 análisis gratis
                </Link>
                <Link href="#situaciones" className="button button-secondary">
                  ¿En qué te ayuda?
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
                  <span><strong>Resultado en 15 segundos</strong></span>
                </li>
                <li>
                  <span className="hero-trust-icon">✓</span>
                  <span><strong>Lee capturas</strong> de pantalla</span>
                </li>
              </ul>
            </div>

            <aside className="hero-device-area">
              <div className="hero-device-stage">
                <div className="whatsapp-phone">
                  <div className="phone-notch" />
                  <div className="whatsapp-app">
                    <div className="wa-statusbar">
                      <span>21:14</span>
                      <div className="wa-status-icons">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="wa-header">
                      <div className="wa-back">&#8249;</div>
                      <div className="wa-avatar">
                        <div className="wa-avatar-inner">S</div>
                      </div>
                      <div className="wa-contact">
                        <strong>Sofía</strong>
                        <span>en línea</span>
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

                      <div className="wa-bubble wa-bubble-out">
                        <p>Oye, me quedé pensando en lo del otro día 😊</p>
                        <span>
                          21:12 <i className="ticks">&#10003;&#10003;</i>
                        </span>
                      </div>

                      <div className="wa-bubble wa-bubble-in">
                        <p>jajaja sí, la verdad la pasé súper contigo 🙈</p>
                        <span>21:14</span>
                      </div>

                      <div className="wa-bubble wa-bubble-in">
                        <p>habría que repetir en algún momento</p>
                        <span>21:14</span>
                      </div>

                      <div className="wa-bubble wa-bubble-out highlight">
                        <p>Yo también la pasé increíble. ¿Te animas este finde? Conozco un sitio que te va a encantar.</p>
                        <span>Respuesta sugerida</span>
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
                    <span className="insight-badge">LoveChat AI</span>
                    <strong>Lectura</strong>
                  </div>
                  <div className="insight-grid">
                    <div className="insight-box">
                      <span>Señal</span>
                      <strong>Interés genuino, abierta a verte</strong>
                    </div>
                    <div className="insight-box">
                      <span>Apertura</span>
                      <strong>78% — buen momento para proponer</strong>
                    </div>
                  </div>
                  <p className="insight-inline-note">
                    No la fuerces: propón algo concreto y ligero, sin sonar ansioso.
                  </p>
                </div>
              </div>
            </aside>

            <div className="hero-support">
              <div className="proof-strip">
                {trust.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="channel-strip" aria-label="Apps compatibles">
                {channels.map(({ label, icon: Icon }) => (
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

          <section className="section">
            <div className="section-heading section-heading-wide">
              <div className="eyebrow">Cómo funciona</div>
              <h2>
                Pegas el chat, eliges el contexto y{" "}
                <GradientText className="section-title-accent">recibes la lectura</GradientText>.
              </h2>
              <p>
                Sin instalar nada ni conectar tus cuentas. Copias la conversación tal cual
                — o subes una captura — y LoveChat hace el resto.
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
          </section>

          <section className="section" id="situaciones">
            <div className="section-heading section-heading-wide">
              <div className="eyebrow">Para qué lo usa la gente</div>
              <h2>
                Esas conversaciones donde{" "}
                <GradientText className="section-title-accent">no sabes qué contestar</GradientText>.
              </h2>
              <p>
                Cuando un mensaje te importa de verdad, una palabra cambia todo. LoveChat te
                da contexto antes de responder.
              </p>
            </div>
            <div className="feature-grid feature-grid-strong">
              {situations.map((s) => (
                <article key={s.title} className="feature-card card">
                  <h3>
                    <span style={{ marginRight: "0.5rem" }}>{s.emoji}</span>
                    {s.title}
                  </h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section conversion-section">
            <div className="section-heading section-heading-wide">
              <div className="eyebrow">Ejemplos reales</div>
              <h2>
                De &ldquo;¿qué le pongo?&rdquo; a una respuesta con{" "}
                <GradientText className="section-title-accent">intención clara</GradientText>.
              </h2>
              <p>
                Así se ve la lectura: detecta lo que está pasando y te propone una respuesta
                natural, honesta y con el tono justo.
              </p>
            </div>
            <div className="conversion-grid">
              {examples.map((ex) => (
                <article key={ex.situation} className="conversion-card card">
                  <div className="mini-wa">
                    <div className="mini-wa-header">
                      <div className="mini-wa-avatar">{ex.avatar}</div>
                      <div className="mini-wa-contact">
                        <strong>{ex.contact}</strong>
                        <span>{ex.status}</span>
                      </div>
                      <span className="mini-wa-situation">{ex.situation}</span>
                    </div>

                    <div className="mini-wa-body">
                      <div className="mini-wa-day">Hoy</div>

                      <div className="mini-wa-bubble mini-wa-bubble-in">
                        <p>{ex.msg}</p>
                        <span className="mini-wa-time">{ex.time}</span>
                      </div>

                      <div className="mini-wa-insight">
                        <div className="mini-wa-insight-head">
                          <BadgeCheck size={14} />
                          <strong>LoveChat detecta</strong>
                          <span className="mini-wa-score">{ex.score}%</span>
                        </div>
                        <p>{ex.insight}</p>
                      </div>

                      <div className="mini-wa-bubble mini-wa-bubble-out">
                        <span className="mini-wa-sugg-badge">✨ Sugerido</span>
                        <p>{ex.reply}</p>
                        <span className="mini-wa-time">
                          {ex.replyTime} <i className="mini-wa-ticks">✓✓</i>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-heading section-heading-wide">
              <div className="eyebrow">Qué detecta</div>
              <h2>
                No te da una frase bonita. Te da{" "}
                <GradientText className="section-title-accent">criterio para responder</GradientText>.
              </h2>
            </div>
            <div className="feature-grid feature-grid-strong">
              {detects.map((d) => (
                <article key={d.title} className="feature-card card">
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </article>
              ))}
            </div>
            <div className="mid-cta-strip">
              <Link href="/signup" className="button button-primary">Empieza con 10 análisis gratis</Link>
              <span className="mid-cta-hint">Sin tarjeta · Resultado en 15 segundos</span>
            </div>
          </section>

          <section className="section">
            <div className="positioning-note card">
              <strong>💚 Sin manipulación:</strong> LoveChat no te enseña trucos para
              engañar a nadie ni frases de &ldquo;levante&rdquo;. Te ayuda a entender la
              conversación y a expresar lo que sientes con claridad y respeto. La decisión
              y las palabras finales siempre son tuyas.
            </div>
          </section>

          <section className="section">
            <div className="section-heading section-heading-wide">
              <div className="eyebrow">Empieza gratis</div>
              <h2>
                Prueba con{" "}
                <GradientText className="section-title-accent">10 análisis gratis</GradientText>.
              </h2>
              <p>
                Sin tarjeta. Pega tu próxima conversación importante y mira la diferencia
                antes de responder.
              </p>
            </div>
            <div className="mid-cta-strip">
              <Link href="/signup" className="button button-primary">Crear cuenta gratis</Link>
              <span className="mid-cta-hint">
                LoveChat usa el mismo motor de <Link href="/" style={{ textDecoration: "underline" }}>VentasChat</Link>, aplicado a tus conversaciones personales.
              </span>
            </div>
          </section>
        </main>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <span>© {new Date().getFullYear()} VentasChat — IA para comunicar mejor por chat.</span>
          <div className="footer-links">
            <Link href="/">VentasChat</Link>
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
