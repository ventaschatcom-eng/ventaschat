"use client";

import { useState } from "react";

type Provider = "wompi" | "mercadopago";

type CheckoutButtonProps = {
  packId: string;
  provider: Provider;
  label: string;
  className?: string;
};

export function CheckoutButton({ packId, provider, label, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch(`/api/checkout/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        alert("No se pudo iniciar el pago. Intenta de nuevo.");
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch {
      alert("Error al conectar con el servidor de pagos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={className ?? "button button-secondary"}
      style={{ width: "100%" }}
    >
      {loading ? "Redirigiendo..." : label}
    </button>
  );
}
