const RESEND_API = "https://api.resend.com/emails";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "VentasChat <hola@ventaschat.com>";

async function sendEmail(input: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set, skipping email");
    return { ok: false, reason: "no_api_key" };
  }

  try {
    const response = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [input.to],
        subject: input.subject,
        html: input.html,
      }),
    });

    if (!response.ok) {
      console.warn("[email] Resend API returned non-OK:", response.status);
      return { ok: false, reason: "api_error" };
    }
    return { ok: true };
  } catch (error) {
    console.warn("[email] Failed to send:", error);
    return { ok: false, reason: "exception" };
  }
}

export async function sendWelcomeEmail(to: string) {
  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #122018;">
  <div style="background: linear-gradient(135deg, #00c72c, #009b22); color: white; padding: 32px 24px; border-radius: 16px; text-align: center;">
    <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a VentasChat!</h1>
    <p style="margin: 12px 0 0; font-size: 16px; opacity: 0.95;">Tienes 10 análisis gratis listos para usar.</p>
  </div>

  <div style="margin-top: 32px;">
    <h2 style="font-size: 20px;">Empieza con un ejemplo en 30 segundos</h2>
    <p>No tienes que pegar nada. Te dejamos 3 chats de prueba para que veas cómo funciona:</p>
    <ul>
      <li><strong>💰 Objeción de precio</strong> — el clásico "está caro"</li>
      <li><strong>❄️ Lead frío</strong> — recuperar un cliente que no responde</li>
      <li><strong>🎯 Post-venta</strong> — convertir soporte en upsell</li>
    </ul>
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://ventaschat.com/dashboard/analyze" style="background: #00c72c; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block;">
        Probar mi primer análisis
      </a>
    </div>
  </div>

  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eef0ed;">
    <h3 style="font-size: 16px;">Lo que recibirás en cada análisis</h3>
    <ul style="line-height: 1.7;">
      <li>Puntaje de probabilidad de cierre 0-100%</li>
      <li>Palabras concretas a usar y a evitar</li>
      <li>3 respuestas listas para enviar (suave, directa, manejo de objeción)</li>
      <li>Métricas: engagement del cliente, urgencia, sensibilidad al precio</li>
    </ul>
  </div>

  <div style="margin-top: 32px; padding: 16px; background: #f6faf7; border-radius: 12px; font-size: 14px;">
    <strong>💡 Tip:</strong> funciona con WhatsApp, Instagram DM, Telegram y Messenger. Puedes pegar el chat o subir capturas — las leemos con OCR y convertimos en texto automáticamente.
  </div>

  <p style="margin-top: 24px; padding: 12px 16px; background: #f0f7f1; border-radius: 8px; font-size: 13px; color: #617265; text-align: center;">
    ¿Este correo llegó a spam? Márcalo como "No es spam" para recibirnos directo en tu bandeja.
  </p>
  <p style="margin-top: 16px; color: #617265; font-size: 13px; text-align: center;">
    Si tienes preguntas, simplemente responde a este correo.<br>
    <a href="https://ventaschat.com" style="color: #00c72c;">ventaschat.com</a> ·
    <a href="https://ventaschat.com/privacy" style="color: #617265;">Privacidad</a> ·
    <a href="https://ventaschat.com/terms" style="color: #617265;">Términos</a>
  </p>
</body>
</html>
`;

  return sendEmail({
    to,
    subject: "Tu cuenta de VentasChat está lista",
    html,
  });
}
