"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Mail, Users, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Contact Submissions", icon: Mail },
  { href: "/admin/subscribers", label: "Newsletter", icon: Users },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [status, router, isLoginPage]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bone">
        <div className="eyebrow animate-pulse">Authenticating...</div>
      </div>
    );
  }

  // Login page renders without the shell
  if (isLoginPage) return <>{children}</>;

  if (!session) return null;

  return (
    <div className="min-h-screen flex bg-bone">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-ink text-cream flex flex-col">
        <div className="p-8 border-b border-cream/10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="display text-xl">SafeHers</span>
            <span className="text-rose pulse-soft">✦</span>
          </Link>
          <p className="eyebrow text-xs text-cream/40 mt-2">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-cream/10 text-cream"
                    : "text-cream/50 hover:text-cream hover:bg-cream/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cream/10">
          <p className="text-xs text-cream/40 mb-2 truncate">{session.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 text-xs text-cream/50 hover:text-cream transition-colors"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-10">{children}</div>
      </main>
    </div>
  );
}
