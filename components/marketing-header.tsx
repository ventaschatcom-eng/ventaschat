import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <Logo />
      <nav>
        <ThemeToggle />
        <Link href="/blog">Blog</Link>
        <Link href="/pricing">Precios</Link>
        <Link href="/login">Iniciar sesion</Link>
        <Link href="/signup" className="button button-primary">
          Empieza gratis
        </Link>
      </nav>
    </header>
  );
}
