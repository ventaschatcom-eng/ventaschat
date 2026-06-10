import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

type MarketingHeaderProps = {
  variant?: "default" | "love";
};

export function MarketingHeader({ variant = "default" }: MarketingHeaderProps) {
  const isLove = variant === "love";

  return (
    <header className="marketing-header">
      <Logo variant={variant} />
      <nav>
        <ThemeToggle />
        <Link href={isLove ? "/lovechat/blog" : "/blog"}>Blog</Link>
        <Link href="/pricing">Precios</Link>
        <Link href="/login">Iniciar sesion</Link>
        {isLove ? (
          <Link href="/">VentasChat</Link>
        ) : (
          <Link href="/lovechat" className="nav-lovechat">LoveChat</Link>
        )}
        <Link href="/signup" className="button button-primary">
          Empieza gratis
        </Link>
      </nav>
    </header>
  );
}
