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

export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `https://ventaschat.com/api/verify-email?token=${token}`;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #122018;">
  <div style="text-align: center; margin-bottom: 24px;">
    <img src="https://ventaschat.com/brand/ventaschat-logo-clean.png" alt="VentasChat" height="40" style="height: 40px;" />
  </div>

  <div style="background: linear-gradient(135deg, #00c72c, #009b22); color: white; padding: 32px 24px; border-radius: 16px; text-align: center;">
    <h1 style="margin: 0; font-size: 26px;">Confirma tu correo</h1>
    <p style="margin: 12px 0 0; font-size: 16px; opacity: 0.95;">Un solo clic y tus 10 análisis gratis quedan activos.</p>
  </div>

  <div style="margin-top: 32px; text-align: center;">
    <p style="font-size: 16px; color: #344a37;">Haz clic en el botón para verificar tu cuenta:</p>
    <a href="${verifyUrl}" style="background: #00c72c; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 16px; margin-top: 8px;">
      Confirmar mi correo
    </a>
    <p style="margin-top: 24px; font-size: 13px; color: #617265;">
      O copia este enlace en tu navegador:<br />
      <a href="${verifyUrl}" style="color: #00c72c; word-break: break-all;">${verifyUrl}</a>
    </p>
    <p style="font-size: 12px; color: #9aab98; margin-top: 16px;">Este enlace vence en 24 horas.</p>
  </div>

  <p style="margin-top: 24px; padding: 12px 16px; background: #f0f7f1; border-radius: 8px; font-size: 13px; color: #617265; text-align: center;">
    ¿Este correo llegó a spam? Márcalo como "No es spam" para recibirnos directo en tu bandeja.
  </p>

  <p style="margin-top: 16px; color: #617265; font-size: 13px; text-align: center;">
    Si no creaste esta cuenta, ignora este correo.<br />
    <a href="https://ventaschat.com" style="color: #00c72c;">ventaschat.com</a> ·
    <a href="https://ventaschat.com/privacy" style="color: #617265;">Privacidad</a> ·
    <a href="https://ventaschat.com/terms" style="color: #617265;">Términos</a>
  </p>
</body>
</html>
`;

  return sendEmail({
    to,
    subject: "Confirma tu correo — VentasChat",
    html,
  });
}
