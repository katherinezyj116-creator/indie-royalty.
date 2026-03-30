"use client";

import Link from "next/link";

const steps = [
  {
    id: "01",
    title: "Step 1 · Wallet split",
    body: "Connect your wallet, draft the split tree, and lock percentages.",
    cta: "Start split",
    href: "/dashboard#step-1",
  },
  {
    id: "02",
    title: "Step 2 · Alpha assist",
    body: "Collect info for collaborators without wallets — we sign and save it for you.",
    cta: "Fill assist form",
    href: "/dashboard#step-2",
  },
  {
    id: "03",
    title: "Step 3 · Review & Publish",
    body: "Review the tree, prepare for on-chain minting or Raidar sync.",
    cta: "Open review",
    href: "/dashboard#step-3",
  },
];

const highlights = [
  {
    title: "Data layer first",
    body: "Every collaborator form lands in Supabase. Even if crypto is delayed, Version 1 ships with real data.",
    tag: "Data layer",
  },
  {
    title: "Chain & Raidar ready",
    body: "On-chain mint and Raidar sync buttons are already staged in Step 3 — unlock them when you are ready.",
    tag: "Expansion",
  },
];

const stats = [
  { label: "Projects", value: "3", detail: "Sample drafts" },
  { label: "Alpha assist", value: "2", detail: "Delegation entries" },
  { label: "Supabase", value: "1", detail: "Unified backend" },
];

const fanPerks = [
  { title: "Limited passes", detail: "VIP drops fans can claim first" },
  { title: "Receipt NFT", detail: "On-chain proof auto-sent to wallets" },
  { title: "Fan equity", detail: "Superfans hold transparent split snapshots" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5fb] via-[#f5f7ff] to-[#eefbff] text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <section className="rounded-[40px] border border-white/40 bg-gradient-to-br from-[#fff5fb] via-[#ffeef7] to-[#e9f4ff] p-12 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Indie artist first</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900">
            One bright workspace for splits, collaborator forms, and fan receipts.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Run the Step 1–3 flow to save on-chain splits, capture off-chain intel, and line up Raidar or NFT drops without leaving this page.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg transition hover:opacity-90"
            >
              Log in and keep building
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white/80 transition hover:border-white"
            >
              Create workspace
            </Link>
          </div>
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/60 bg-white p-8 shadow-2xl md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{step.id}</p>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.body}</p>
              <Link
                href={step.href}
                className="mt-auto text-sm font-semibold text-pink-500 underline-offset-4 hover:underline"
              >
                {step.cta}
              </Link>
            </div>
          ))}
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/60 bg-white p-8 shadow-2xl lg:grid-cols-2">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-3xl border border-pink-100 bg-gradient-to-br from-[#fff1f9] via-[#fff8ef] to-[#eef6ff] p-6">
              <span className="inline-flex w-fit rounded-full border border-pink-200 px-3 py-1 text-xs uppercase tracking-[0.3em] text-pink-500">
                {item.tag}
              </span>
              <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white p-8">
          <div className="grid gap-6 text-center text-white/80 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
                <p className="mt-2 text-4xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-gradient-to-br from-[#ffd6f0] via-[#ffedd6] to-[#e4f7ff] p-8 text-slate-900">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-pink-500">Fan perks</p>
              <h3 className="mt-2 text-2xl font-semibold">Fan perks are staged</h3>
              <p className="text-sm text-slate-700">Keep the fan view live even before mint day. Passes, receipts, and equity snapshots sit here waiting for a single publish toggle.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {fanPerks.map((perk) => (
                <div key={perk.title} className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow">
                  <h4 className="text-lg font-semibold text-slate-900">{perk.title}</h4>
                  <p className="text-sm text-slate-600">{perk.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard#step-3"
                className="rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-5 py-2 text-sm font-semibold text-white shadow"
              >
                View Step 3 review
              </Link>
              <Link
                href="/fans"
                className="rounded-full border border-pink-200 px-5 py-2 text-sm font-semibold text-pink-600"
              >
                Explore fan toolkit
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white p-8 text-sm text-slate-600">
          <p>All splits, collaborators, and assist forms are stored in Supabase. Even if on-chain or Raidar work slips, this data layer can go live by itself.</p>
        </section>
      </div>
    </div>
  );
}
