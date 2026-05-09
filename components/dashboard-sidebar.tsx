"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/dashboard/analyze", label: "Analizar chat" },
  { href: "/dashboard/history", label: "Historial" },
  { href: "/dashboard/billing", label: "Facturación" },
  { href: "/dashboard/settings", label: "Configuración" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <Logo compact />
      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "sidebar-link",
              pathname === link.href && "sidebar-link-active",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
