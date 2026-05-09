"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export function PricingCTA({
  type,
  packId,
  className,
  children,
}: {
  type: "pack" | "pro";
  packId?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const finalClass = className ?? "button button-primary";

  // Si ya tiene sesión → /dashboard/billing
  // Si no → /signup con query para que entienda que viene a comprar
  const href =
    status === "authenticated"
      ? "/dashboard/billing"
      : `/signup?intent=${type}${packId ? `&pack=${packId}` : ""}`;

  return (
    <Link href={href} className={finalClass} style={{ width: "100%", textAlign: "center" }}>
      {children}
    </Link>
  );
}
