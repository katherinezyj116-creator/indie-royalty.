"use client";

import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Signup", href: "/signup" },
  { label: "Login", href: "/login" },
  { label: "Dashboard", href: "/dashboard" },
];

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 shadow-2xl backdrop-blur">
          <Link href="/" className="text-base font-semibold tracking-[0.35em] text-slate-100">
            INDIE ROYALTY
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Workflow</p>
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
            {subtitle ? <p className="text-slate-300">{subtitle}</p> : null}
          </div>
          <div className="mt-10 space-y-6">{children}</div>
        </section>
      </div>
    </div>
  );
}
