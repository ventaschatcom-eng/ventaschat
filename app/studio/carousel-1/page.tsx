import { MessageCircle } from "lucide-react";

const phrases = [
  {
    num: "01",
    bad: "Quedo atento a cualquier inquietud",
    why: "Traspasa el peso al cliente. Suena pasivo.",
    good: "Te llamo el martes a las 10 am para resolver dudas",
  },
  {
    num: "02",
    bad: "Cuéntame en qué te puedo ayudar",
    why: "Genérico. Suena a soporte, no a ventas.",
    good: "Vi que [contexto]. ¿Buscas X o Y?",
  },
  {
    num: "03",
    bad: "Aprovecha que está en promoción",
    why: "Urgencia falsa. El cliente la huele a 1km.",
    good: "El precio es hasta el viernes 15. Después sube a $X",
  },
  {
    num: "04",
    bad: "Es un excelente producto, te lo recomiendo",
    why: "'Excelente' no significa nada. Obvio que lo recomiendas.",
    good: "En tu caso lo veo bien por [razón]. Lo que NO te recomendaría es [opción menor]",
  },
  {
    num: "05",
    bad: "Cualquier cosa me avisas",
    why: "Le regalas el control. No vuelves a saber del cliente.",
    good: "El [día específico] te escribo para confirmar si avanzamos",
  },
  {
    num: "06",
    bad: "¿Qué te pareció?",
    why: "Pregunta abierta. Invita a postergar.",
    good: "De lo que vimos, ¿qué punto te quedó dando vueltas?",
  },
];

const SIZE = 1080;

function Slide({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="slide"
      style={{
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        background: bg ?? "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-display), 'Inter', sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function BrandMark({ light }: { light?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: 50,
        display: "flex",
        alignItems: "center",
        gap: 12,
        color: light ? "white" : "#122018",
        opacity: 0.85,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: light ? "rgba(255,255,255,0.18)" : "#00c72c",
          color: light ? "white" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 24,
        }}
      >
        V
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>
          VentasChat
        </div>
        <div style={{ fontSize: 14, opacity: 0.75 }}>ventaschat.com</div>
      </div>
    </div>
  );
}

export default function Carousel1Page() {
  return (
    <div className="studio-carousel">
      <div className="studio-carousel-meta">
        <h1>Carrusel #1 · 7 frases que matan tu venta</h1>
        <p>8 slides · 1080×1080 px · Captura cada uno y publícalo como carrusel</p>

        <div className="studio-caption-box">
          <strong>Caption para la publicación:</strong>
          <pre>{`La frase #1 la decimos todos sin pensarlo. Y nos cuesta el 30% de los leads que ya estaban listos para cerrar 💸

¿Cuál de las 7 usas tú? Cuéntame en comentarios y te digo cuál duele más para tu producto.

👇 Si quieres saber qué frases trampa estás usando en tus chats reales: link en bio. Te damos 10 análisis gratis y te decimos exactamente qué cambiar.

#VentasPorWhatsApp #VentasLATAM #Emprendimiento #CierreDeVentas #VentaConsultiva #VendedorPro #ManejoDeObjeciones #WhatsAppBusiness #Closer #EmprendedorLATAM`}</pre>
        </div>
      </div>

      {/* SLIDE 1 — COVER */}
      <Slide bg="linear-gradient(135deg, #122018 0%, #1a3024 100%)">
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <span
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(0, 199, 44, 0.18)",
              color: "#7dff98",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Tips de venta
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 200,
            left: 80,
            right: 80,
          }}
        >
          <div
            style={{
              fontSize: 300,
              fontWeight: 900,
              color: "#00c72c",
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              margin: 0,
            }}
          >
            7
          </div>
          <h1
            style={{
              fontSize: 100,
              fontWeight: 800,
              color: "white",
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
              margin: "20px 0 0",
              maxWidth: 880,
            }}
          >
            frases que <span style={{ color: "#ff6b6b" }}>matan</span> tu venta por WhatsApp
          </h1>
          <p
            style={{
              fontSize: 38,
              color: "rgba(255,255,255,0.75)",
              marginTop: 40,
              maxWidth: 850,
              lineHeight: 1.3,
            }}
          >
            Si usas alguna, estás perdiendo dinero sin saberlo.
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            color: "rgba(255,255,255,0.5)",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Desliza →
        </div>

        <BrandMark light />
      </Slide>

      {/* SLIDES 2-7 — UNA FRASE POR SLIDE */}
      {phrases.map((p) => (
        <Slide key={p.num}>
          {/* Patrón sutil de fondo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 90% 10%, rgba(0,199,44,0.06) 0%, transparent 40%)",
            }}
          />

          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 80,
              right: 80,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  background: "#ff6b6b",
                  color: "white",
                  borderRadius: 16,
                  padding: "10px 22px",
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: "0.04em",
                }}
              >
                FRASE PROHIBIDA
              </div>
              <span
                style={{
                  fontSize: 96,
                  fontWeight: 900,
                  color: "#122018",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {p.num}
              </span>
            </div>
          </div>

          {/* La frase mala */}
          <div
            style={{
              position: "absolute",
              top: 280,
              left: 80,
              right: 80,
              background: "rgba(255, 107, 107, 0.08)",
              border: "3px solid #ff6b6b",
              borderRadius: 24,
              padding: "40px 50px",
            }}
          >
            <div
              style={{
                color: "#ff6b6b",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 16,
                letterSpacing: "0.04em",
              }}
            >
              ❌ NO DIGAS
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: "#122018",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              &ldquo;{p.bad}&rdquo;
            </div>
          </div>

          {/* Por qué mata */}
          <div
            style={{
              position: "absolute",
              top: 580,
              left: 80,
              right: 80,
              fontSize: 30,
              color: "#617265",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            <strong style={{ color: "#122018" }}>Por qué mata: </strong>
            {p.why}
          </div>

          {/* Reemplazo */}
          <div
            style={{
              position: "absolute",
              bottom: 130,
              left: 80,
              right: 80,
              background: "linear-gradient(135deg, #00c72c 0%, #009b22 100%)",
              borderRadius: 24,
              padding: "36px 48px",
              boxShadow: "0 20px 40px rgba(0, 199, 44, 0.25)",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 14,
                letterSpacing: "0.04em",
              }}
            >
              ✅ REEMPLAZA POR
            </div>
            <div
              style={{
                color: "white",
                fontSize: 38,
                fontWeight: 600,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;{p.good}&rdquo;
            </div>
          </div>

          <BrandMark />
        </Slide>
      ))}

      {/* SLIDE 8 — CTA FINAL */}
      <Slide bg="linear-gradient(135deg, #00c72c 0%, #009b22 100%)">
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <MessageCircle size={64} color="white" />
          <span
            style={{
              color: "rgba(255,255,255,0.9)",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Última pregunta
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 240,
            left: 80,
            right: 80,
          }}
        >
          <h2
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            ¿Quieres ver qué frases trampa estás usando?
          </h2>
        </div>

        <div
          style={{
            position: "absolute",
            top: 600,
            left: 80,
            right: 80,
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.4,
              fontWeight: 500,
              margin: 0,
            }}
          >
            Pega tu chat en VentasChat y te decimos exactamente
            qué cambiar. Análisis en 15 segundos.
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 200,
            left: 80,
            right: 80,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "white",
              color: "#009b22",
              padding: "32px 50px",
              borderRadius: 20,
              fontWeight: 800,
              fontSize: 44,
              textAlign: "center",
              letterSpacing: "-0.02em",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            10 análisis GRATIS
          </div>
          <div
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "center",
              fontWeight: 600,
              opacity: 0.95,
            }}
          >
            👉 Link en bio · ventaschat.com
          </div>
        </div>

        <BrandMark light />
      </Slide>
    </div>
  );
}
