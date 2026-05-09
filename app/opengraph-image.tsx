import { ImageResponse } from "next/og";

export const alt = "VentasChat — IA para cerrar más ventas en WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #00c72c 0%, #009b22 100%)",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "32px", fontWeight: 700 }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#009b22",
              fontSize: "32px",
              fontWeight: 900,
            }}
          >
            V
          </div>
          VentasChat
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "40px" }}>
          <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Sabe qué responder
          </div>
          <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginTop: "8px" }}>
            cuando dicen{" "}
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 24px",
                borderRadius: "16px",
                display: "inline-block",
              }}
            >
              "está caro"
            </span>
          </div>
          <div style={{ fontSize: "32px", marginTop: "32px", opacity: 0.9, lineHeight: 1.4 }}>
            IA que analiza tus chats de WhatsApp y te da puntaje de cierre, vocabulario y respuestas listas.
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px", fontSize: "24px", fontWeight: 600, opacity: 0.95 }}>
          <div>10 análisis gratis</div>
          <div>·</div>
          <div>Sin tarjeta</div>
          <div>·</div>
          <div>ventaschat.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
