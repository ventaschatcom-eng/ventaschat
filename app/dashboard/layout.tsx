import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <main className="dashboard-content">
        <div className="dashboard-topbar">
          <div>
            <strong>{session.user.email}</strong>
            <p className="dashboard-description">
              Plan: {session.user.plan} · Creditos: {session.user.credits}
            </p>
          </div>
          <div className="dashboard-actions">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
