import type { Metadata } from "next";

import { MarketingHeader } from "@/components/marketing-header";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo VentasChat recolecta, usa y protege tus datos. Información sobre conversaciones, cuenta y cookies.",
  alternates: { canonical: "/privacy" },
};

const lastUpdate = "Mayo 2026";

export default function PrivacyPage() {
  return (
    <>
      <MarketingHeader />
      <main className="page-shell section legal-page">
        <div className="section-heading">
          <div className="eyebrow">Legal</div>
          <h1>Política de privacidad</h1>
          <p>Última actualización: {lastUpdate}</p>
        </div>

        <article className="legal-content card">
          <h2>1. Quiénes somos</h2>
          <p>
            VentasChat es un servicio operado para ofrecer análisis de conversaciones
            comerciales de mensajería con inteligencia artificial. Si necesitas contactarnos,
            puedes escribir a <a href="mailto:hola@ventaschat.com">hola@ventaschat.com</a>.
          </p>

          <h2>2. Datos que recolectamos</h2>
          <ul>
            <li>
              <strong>Datos de cuenta:</strong> correo electrónico y contraseña cifrada
              (hash bcrypt). Nunca almacenamos tu contraseña en texto plano.
            </li>
            <li>
              <strong>Conversaciones que analizas:</strong> el texto del chat que pegas o
              subes a la plataforma, junto con el contexto y tipo seleccionados. Estos datos
              se almacenan asociados a tu cuenta para que puedas revisarlos en tu historial.
            </li>
            <li>
              <strong>Resultados de análisis:</strong> los insights generados por la IA
              (puntaje, intención, vocabulario sugerido, etc).
            </li>
            <li>
              <strong>Datos de uso:</strong> registros básicos de cuándo y cuánto usas la
              plataforma para gestión de créditos y mejora del servicio.
            </li>
            <li>
              <strong>Datos de pago:</strong> procesados directamente por Wompi o
              MercadoPago. VentasChat no almacena números de tarjeta, CVV ni datos
              financieros sensibles.
            </li>
          </ul>

          <h2>3. Cómo usamos tus datos</h2>
          <ul>
            <li>Para entregar el análisis solicitado y guardarlo en tu historial.</li>
            <li>Para gestionar tu cuenta, créditos y pagos.</li>
            <li>Para enviarte notificaciones sobre tu cuenta (registro, pago confirmado).</li>
            <li>Para mejorar la calidad del servicio y la precisión del análisis.</li>
          </ul>

          <h2>4. Lo que NO hacemos con tus datos</h2>
          <ul>
            <li>No vendemos tus datos a terceros.</li>
            <li>No compartimos tus conversaciones con otros usuarios.</li>
            <li>No usamos tus chats para entrenar modelos de IA públicos.</li>
            <li>No publicamos tu información de cuenta.</li>
          </ul>

          <h2>5. Procesadores de IA</h2>
          <p>
            Para generar el análisis, enviamos el texto de tu conversación a OpenAI a
            través de su API. OpenAI procesa estos datos de forma transitoria y, según su
            política para uso vía API, no los usa para entrenar sus modelos. Más detalles
            en la política de OpenAI.
          </p>

          <h2>6. Cookies y analítica</h2>
          <p>
            Usamos cookies estrictamente necesarias para la sesión de usuario. Si activamos
            herramientas de analítica (PostHog, Plausible, Google Analytics), usaremos
            datos agregados y pseudonimizados para entender uso, sin identificarte
            personalmente.
          </p>

          <h2>7. Tus derechos</h2>
          <ul>
            <li>Puedes acceder a tus datos en cualquier momento desde el dashboard.</li>
            <li>Puedes solicitar eliminación de tu cuenta y datos asociados escribiendo a soporte.</li>
            <li>Puedes corregir o actualizar tu información.</li>
            <li>Puedes exportar el historial de tus análisis (próximamente).</li>
          </ul>

          <h2>8. Seguridad</h2>
          <p>
            Usamos HTTPS/TLS en todas las comunicaciones, contraseñas almacenadas como
            hash bcrypt con salt único, y la base de datos está alojada en infraestructura
            cifrada (Neon Postgres). Aun así, ningún sistema es 100% invulnerable; te
            recomendamos no incluir datos confidenciales innecesarios (números de tarjeta,
            credenciales) en las conversaciones que analices.
          </p>

          <h2>9. Cambios en esta política</h2>
          <p>
            Si actualizamos esta política, publicaremos la nueva versión en esta misma
            página y actualizaremos la fecha de "Última actualización". Para cambios
            significativos, te avisaremos por correo.
          </p>

          <h2>10. Contacto</h2>
          <p>
            Para cualquier consulta sobre esta política o tus datos, escríbenos a{" "}
            <a href="mailto:hola@ventaschat.com">hola@ventaschat.com</a>.
          </p>
        </article>
      </main>
    </>
  );
}
