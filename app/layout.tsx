import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SessionProvider } from "next-auth/react";

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
  title: "VentasChat",
  description: "Convierte conversaciones de WhatsApp en ventas.",
};

const themeScript = `
(() => {
  try {
    const saved = localStorage.getItem("ventaschat-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved === "dark" || saved === "light" ? saved : (prefersDark ? "dark" : "light");
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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
