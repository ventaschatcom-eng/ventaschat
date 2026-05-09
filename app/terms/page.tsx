import type { Metadata } from "next";

import { MarketingHeader } from "@/components/marketing-header";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos de uso del servicio VentasChat. Cuenta, créditos, suscripción y reglas de uso.",
  alternates: { canonical: "/terms" },
};

const lastUpdate = "Mayo 2026";

export default function TermsPage() {
  return (
    <>
      <MarketingHeader />
      <main className="page-shell section legal-page">
        <div className="section-heading">
          <div className="eyebrow">Legal</div>
          <h1>Términos y condiciones</h1>
          <p>Última actualización: {lastUpdate}</p>
        </div>

        <article className="legal-content card">
          <h2>1. Aceptación</h2>
          <p>
            Al crear una cuenta y usar VentasChat aceptas estos términos. Si no estás de
            acuerdo, no uses el servicio.
          </p>

          <h2>2. Descripción del servicio</h2>
          <p>
            VentasChat es una plataforma SaaS que analiza conversaciones de mensajería
            (WhatsApp, Instagram, Telegram, etc) usando inteligencia artificial para
            entregar insights comerciales. El servicio se ofrece tal cual, sin garantías
            específicas de resultado de venta.
          </p>

          <h2>3. Cuenta y registro</h2>
          <ul>
            <li>Debes ser mayor de 18 años para usar el servicio.</li>
            <li>Eres responsable de mantener la confidencialidad de tu contraseña.</li>
            <li>No puedes compartir tu cuenta con terceros.</li>
            <li>Puedes solicitar la eliminación de tu cuenta en cualquier momento.</li>
          </ul>

          <h2>4. Uso aceptable</h2>
          <p>No puedes usar VentasChat para:</p>
          <ul>
            <li>Analizar conversaciones obtenidas sin consentimiento legal.</li>
            <li>Generar contenido que viole leyes locales o internacionales.</li>
            <li>Hacer ingeniería inversa, scraping masivo o ataques al servicio.</li>
            <li>Suplantar identidades o engañar a otros usuarios.</li>
            <li>Acumular créditos por medios fraudulentos.</li>
          </ul>

          <h2>5. Créditos y pagos</h2>
          <ul>
            <li>
              Cada análisis consume créditos. Los créditos se otorgan al registrarte (10
              gratuitos) y se compran en paquetes pagados o se incluyen en suscripción.
            </li>
            <li>
              Los pagos se procesan a través de Wompi y MercadoPago. Los precios están en
              pesos colombianos (COP).
            </li>
            <li>
              Los créditos comprados no expiran mientras tu cuenta esté activa.
            </li>
            <li>
              <strong>Reembolsos:</strong> dado que cada análisis consume recursos de IA
              en el momento del cobro, no ofrecemos reembolso por créditos ya consumidos.
              Si el servicio falla por problema nuestro, podemos restituir los créditos
              afectados.
            </li>
            <li>
              <strong>Suscripciones recurrentes:</strong> puedes cancelar en cualquier
              momento; el servicio sigue activo hasta el final del período pagado y no se
              cobra el siguiente.
            </li>
          </ul>

          <h2>6. Propiedad intelectual</h2>
          <ul>
            <li>
              El código, marca, diseño y contenido de VentasChat son propiedad nuestra.
            </li>
            <li>
              El contenido que tú subas (conversaciones) sigue siendo tuyo. Nos otorgas
              licencia limitada para procesarlo y entregarte el análisis.
            </li>
            <li>
              Los análisis generados los puedes usar libremente para tu actividad
              comercial.
            </li>
          </ul>

          <h2>7. Limitación de responsabilidad</h2>
          <p>
            VentasChat entrega análisis e insights comerciales basados en IA. No
            garantizamos cierres de venta ni resultados específicos. Las decisiones
            comerciales que tomes basándote en el análisis son tu responsabilidad. El
            servicio puede tener errores, interrupciones o resultados imprecisos.
          </p>

          <h2>8. Modificación del servicio</h2>
          <p>
            Podemos modificar funcionalidades, precios o estos términos en cualquier
            momento. Cambios significativos te serán comunicados por correo o en la
            plataforma.
          </p>

          <h2>9. Suspensión y terminación</h2>
          <p>
            Podemos suspender o cerrar tu cuenta si violas estos términos. Tú puedes
            cerrar tu cuenta en cualquier momento.
          </p>

          <h2>10. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier
            disputa se resolverá en los tribunales competentes de Colombia.
          </p>

          <h2>11. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos términos, escribe a{" "}
            <a href="mailto:ventaschat.com@gmail.com">ventaschat.com@gmail.com</a>.
          </p>
        </article>
      </main>
    </>
  );
}
