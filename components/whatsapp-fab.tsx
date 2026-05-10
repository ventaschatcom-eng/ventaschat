"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const PHONE = "573237037471";
const DEFAULT_MESSAGE = "Hola! Tengo una pregunta sobre VentasChat.";

// Horario laboral Colombia (UTC-5): 8am - 8pm, lunes a sábado
function isOnline() {
  const now = new Date();
  // Colombia es UTC-5 fijo
  const colombiaHour = (now.getUTCHours() - 5 + 24) % 24;
  const day = now.getUTCDay(); // 0 = domingo
  const isWeekday = day !== 0; // todos menos domingo
  return isWeekday && colombiaHour >= 8 && colombiaHour < 20;
}

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOnline(isOnline());
    const interval = setInterval(() => setOnline(isOnline()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  const statusLabel = online ? "En línea" : "Respondemos pronto";
  const subStatus = online
    ? "Respuesta típica: pocos minutos"
    : "Te responderemos al inicio del día";

  return (
    <>
      {open ? (
        <div className="wa-fab-card">
          <button
            type="button"
            className="wa-fab-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
          <div className="wa-fab-head">
            <div className="wa-fab-avatar">
              <MessageCircle size={22} />
            </div>
            <div>
              <strong>VentasChat</strong>
              <div className={`wa-fab-status ${online ? "wa-fab-status-on" : "wa-fab-status-off"}`}>
                <span className="wa-fab-dot" /> {statusLabel}
              </div>
            </div>
          </div>
          <p className="wa-fab-msg">
            ¡Hola! ¿Tienes una pregunta sobre VentasChat? Escríbenos por WhatsApp y te respondemos.
          </p>
          <span className="wa-fab-sub">{subStatus}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-fab-cta"
          >
            Abrir chat de WhatsApp
          </a>
        </div>
      ) : null}

      <button
        type="button"
        className="wa-fab"
        onClick={() => setOpen(!open)}
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
          <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.7L0 32l8.5-2.4c2.2 1.2 4.8 1.9 7.5 1.9C24.6 31.5 31.6 24.5 31.6 16S24.6.4 16 .4zm0 28.6c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-4.9 1.4 1.4-4.7-.3-.5C3.7 21 3 18.6 3 16.1 3 8.9 8.9 3 16.1 3s13 5.9 13 13.1c-.1 7.1-6 13-13.1 13zm7.1-9.7c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.5-.2.3-.5.3-.9.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.2-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.3-3-.3-.8-.7-.7-.9-.7H10c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1 0 1.8 1.3 3.6 1.5 3.8.2.3 2.6 4 6.4 5.6 1.6.7 2.8 1.1 3.7 1.4 1.6.5 3 .4 4.1.3 1.3-.2 2.9-1.2 3.3-2.4.4-1.2.4-2.2.3-2.4-.1-.3-.4-.4-.8-.6z"/>
        </svg>
        {online ? <span className="wa-fab-pulse" aria-hidden="true" /> : null}
      </button>
    </>
  );
}
