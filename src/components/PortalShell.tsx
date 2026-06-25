"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, BookOpen, Award, MessageSquare, FileText,
  ShieldCheck, UserCircle, LogOut, Menu, X,
} from "lucide-react";

const navItems = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/my-courses", label: "My Courses", icon: BookOpen },
  { href: "/portal/certificates", label: "Certificates", icon: Award },
  { href: "/portal/consultations", label: "Consultations", icon: MessageSquare },
  { href: "/portal/resources", label: "Resources", icon: FileText },
  { href: "/portal/safety-plan", label: "Safety Plan", icon: ShieldCheck },
  { href: "/portal/profile", label: "Profile", icon: UserCircle },
];

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/portal/login");
  }, [status, router]);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-bone"><p className="eyebrow opacity-50">Loading...</p></div>;
  }
  if (!session) return null;

  return (
    <div className="min-h-screen bg-bone">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-ink text-cream px-4 py-3 flex items-center justify-between">
        <Link href="/portal" className="flex items-center gap-2">
          <Image src="/images/safeherlogo.png" alt="SafeHer" width={24} height={24} className="w-6 h-6 object-contain" />
          <span className="display text-base">Academy</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-ink/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 w-64 bg-ink text-cream flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-cream/10 hidden lg:block">
          <Link href="/portal" className="flex items-center gap-2">
            <Image src="/images/safeherlogo.png" alt="SafeHer" width={28} height={28} className="w-7 h-7 object-contain" />
            <span className="display text-lg">Academy</span>
          </Link>
        </div>
        <div className="lg:hidden h-14" />
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${active ? "bg-cream/10 text-gold border-r-2 border-gold" : "text-cream/60 hover:text-cream hover:bg-cream/5"}`}>
                <Icon size={18} strokeWidth={1.5} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-cream/10">
          <p className="text-xs opacity-40 mb-1">{session.user?.name}</p>
          <p className="text-xs opacity-30 mb-3 truncate">{session.user?.email}</p>
          <button onClick={() => signOut({ callbackUrl: "/portal/login" })} className="flex items-center gap-2 text-xs opacity-50 hover:opacity-100"><LogOut size={14} /> Sign out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen lg:ml-64 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-12">{children}</div>
      </main>
    </div>
  );
}
