import { NextResponse } from "next/server";
import OpenAI from "openai";

import { auth } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // OCR cuesta más en API → rate limit más estricto
  const rl = checkRateLimit({ key: `ocr:${session.user.id}`, windowMs: 60_000, max: 10 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiadas imágenes en poco tiempo. Espera un momento." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  if (!openai) {
    return NextResponse.json(
      { error: "OCR no disponible en este momento." },
      { status: 503 },
    );
  }

  const body = await request.json();
  const imageBase64 = String(body.imageBase64 || "");

  if (!imageBase64 || !imageBase64.startsWith("data:image/")) {
    return NextResponse.json({ error: "Formato de imagen invalido." }, { status: 400 });
  }

  if (imageBase64.length > 6_500_000) {
    return NextResponse.json(
      { error: "La imagen es demasiado grande. Sube una captura de hasta 4 MB." },
      { status: 400 },
    );
  }

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You extract WhatsApp conversation text from screenshots. " +
                "Return ONLY the conversation text in this exact format, one line per message:\n" +
                "Cliente: <mensaje>\nTu: <mensaje>\n" +
                "Use 'Tu' for the green/right-aligned bubbles (the user) and 'Cliente' for the gray/left-aligned bubbles. " +
                "Do not invent messages. Do not add commentary. Do not include timestamps. " +
                "If you cannot read it, return exactly: ERROR_NO_TEXT",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Extrae la conversacion de WhatsApp de esta captura.",
            },
            {
              type: "input_image",
              image_url: imageBase64,
              detail: "auto",
            },
          ],
        },
      ],
    });

    const text = response.output_text?.trim() ?? "";

    if (!text || text.includes("ERROR_NO_TEXT")) {
      return NextResponse.json(
        { error: "No pudimos leer texto en la imagen. Intenta con una captura mas clara." },
        { status: 422 },
      );
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "No pudimos procesar la imagen en este momento." },
      { status: 500 },
    );
  }
}
