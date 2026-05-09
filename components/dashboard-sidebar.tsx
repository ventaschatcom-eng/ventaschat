"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const ADMIN_EMAIL = "ventaschat.com@gmail.com";

const links = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/dashboard/analyze", label: "Analizar chat" },
  { href: "/dashboard/history", label: "Historial" },
  { href: "/dashboard/coaching", label: "Coaching" },
  { href: "/dashboard/billing", label: "Facturación" },
  { href: "/dashboard/settings", label: "Configuración" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === ADMIN_EMAIL;

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
        {isAdmin && (
          <Link
            href="/dashboard/admin"
            className={cn(
              "sidebar-link",
              pathname === "/dashboard/admin" && "sidebar-link-active",
            )}
          >
            Admin
          </Link>
        )}
      </nav>
    </aside>
  );
}
