"use client";

import { useState } from "react";

type AccordionItem = { q: string; a: string };

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  /** Índice abierto por defecto. null = todos cerrados. */
  defaultOpen?: number | null;
};

export function Accordion({ items, className = "", defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={`faq-accordion ${className}`.trim()}>
      {items.map((faq, i) => {
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
