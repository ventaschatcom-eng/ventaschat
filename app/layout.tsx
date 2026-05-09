import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { Analytics } from "@/components/analytics";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ventaschat.com"),
  title: {
    default: "VentasChat — IA para cerrar más ventas en WhatsApp",
    template: "%s | VentasChat",
  },
  description:
    "Analiza tus chats de WhatsApp con IA. Te dice qué responder cuando un cliente dice 'está caro', te da puntaje de cierre 0-100% y vocabulario sugerido. 10 análisis gratis al registrarte.",
  keywords: [
    "como vender por whatsapp",
    "cerrar ventas whatsapp",
    "respuestas para whatsapp ventas",
    "analizador de chats",
    "ia para ventas",
    "manejo de objeciones",
    "frases para vender por whatsapp",
    "asistente de ventas",
    "que responder está caro",
    "guion de ventas whatsapp",
  ],
  authors: [{ name: "VentasChat" }],
  creator: "VentasChat",
  publisher: "VentasChat",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://ventaschat.com",
    siteName: "VentasChat",
    title: "VentasChat — IA para cerrar más ventas en WhatsApp",
    description:
      "Sabe qué responder cuando el cliente dice 'está caro'. Puntaje de cierre, vocabulario y respuestas listas. 10 análisis gratis.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VentasChat — IA para WhatsApp ventas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VentasChat — IA para cerrar más ventas en WhatsApp",
    description:
      "Pega tu chat de WhatsApp, recibe puntaje de cierre y respuestas listas. 10 análisis gratis.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const themeScript = `
(() => {
  try {
    const saved =
      localStorage.getItem("ventaschat-theme") ??
      localStorage.getItem("ventaflow-theme");
    const theme = saved === "dark" || saved === "light" ? saved : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Analytics />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
