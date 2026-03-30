"use client";

import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Fans", href: "/fans" },
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
    <div className="min-h-screen bg-gradient-to-br from-[#fff5fb] via-[#f5f7ff] to-[#eefbff] text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/60 bg-white px-6 py-4 shadow-2xl">
          <Link href="/" className="text-base font-semibold tracking-[0.35em] text-slate-800">
            INDIE ROYALTY
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 transition hover:bg-pink-100 hover:text-pink-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="mt-12 rounded-[32px] border border-white/60 bg-white p-10 shadow-2xl">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-500">Workflow</p>
            <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
            {subtitle ? <p className="text-slate-600">{subtitle}</p> : null}
          </div>
          <div className="mt-10 space-y-6">{children}</div>
        </section>
      </div>
    </div>
  );
}
