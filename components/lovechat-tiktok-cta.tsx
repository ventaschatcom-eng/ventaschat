"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Banner de bienvenida que SOLO aparece cuando el visitante llega desde TikTok
 * (vía ?utm_source=tiktok o referrer de tiktok). Saluda a ese tráfico y lo
 * empuja a registrarse. Si PostHog está activo, registra el evento.
 */
export function LoveChatTikTokCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUtm = params.get("utm_source")?.toLowerCase() === "tiktok";

      // Validar el hostname real del referrer (no el texto suelto, para no
      // activar el banner con links internos que llevan ?utm_source=tiktok).
      let fromRef = false;
      if (document.referrer) {
        try {
          const host = new URL(document.referrer).hostname.toLowerCase();
          fromRef = host === "tiktok.com" || host.endsWith(".tiktok.com");
        } catch {}
      }

      const dismissed = sessionStorage.getItem("lovechat-tiktok-dismissed") === "1";

      if ((fromUtm || fromRef) && !dismissed) {
        setShow(true);
        // @ts-expect-error posthog se inyecta globalmente si está configurado
        window.posthog?.capture?.("lovechat_tiktok_landing");
      }
    } catch {}
  }, []);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    try {
      sessionStorage.setItem("lovechat-tiktok-dismissed", "1");
    } catch {}
  };

  return (
    <div className="lovechat-welcome" role="region" aria-label="Bienvenida desde TikTok">
      <div className="lovechat-welcome-inner">
        <span className="lovechat-welcome-text">
          <span className="lovechat-welcome-emoji">👋</span>
          <span>
            <strong>¿Llegaste de TikTok?</strong> Sube ese chat que te tiene
            dudando y mira qué responder.
          </span>
        </span>
        <Link href="/signup?ref=tiktok" className="button button-primary lovechat-welcome-cta">
          Probar gratis
        </Link>
        <button
          type="button"
          className="lovechat-welcome-close"
          onClick={dismiss}
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
