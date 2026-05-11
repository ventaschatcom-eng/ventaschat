import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio — assets internos",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio-shell">
      <header className="studio-header">
        <Link href="/studio" className="studio-back">← Studio</Link>
        <div className="studio-instructions">
          <strong>💡 Cómo capturar:</strong>
          <span>
            Click derecho en cada slide → Inspeccionar → Click derecho en el nodo →
            &ldquo;Capture node screenshot&rdquo;. O usa Snipping Tool de Windows (Win+Shift+S) y
            captura cada cuadro de 1080×1080.
          </span>
        </div>
      </header>
      <main className="studio-main">{children}</main>
    </div>
  );
}
