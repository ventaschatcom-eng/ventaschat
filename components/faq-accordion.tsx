"use client";

import { useState } from "react";

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

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-accordion">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
            <button
              className="faq-trigger"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="faq-question">{faq.q}</span>
              <span className="faq-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div className="faq-body" hidden={!isOpen}>
              <p className="faq-answer">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
