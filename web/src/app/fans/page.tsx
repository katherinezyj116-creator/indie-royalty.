"use client";

import Link from "next/link";
import { PageShell } from "../../components/PageShell";

const fanHighlights = [
  {
    title: "Drop-ready layouts",
    body: "Bright cards and countdowns you can reuse for limited perks or beta receipts.",
  },
  {
    title: "Receipt snapshots",
    body: "Every split can be surfaced to superfans with a single share link.",
  },
  {
    title: "Wallet sync",
    body: "When you are ready, push Receipt NFTs straight to collector wallets.",
  },
];

const fanPasses = [
  {
    title: "Pink Residency Pass",
    detail: "50 claims · unlocks studio livestreams and merch drops.",
    status: "Open",
  },
  {
    title: "Receipt NFT",
    detail: "Mint once, updates every time the split tree shifts.",
    status: "Preview",
  },
  {
    title: "Equity Snapshot",
    detail: "Superfans can mirror your collaborator tree at 5% scale.",
    status: "Coming soon",
  },
];

const receiptPreview = {
  project: "Midnight Bloom",
  splits: [
    { name: "Aura Li", role: "Artist", percent: 55 },
    { name: "Neon South", role: "Producer", percent: 25 },
    { name: "Velvet Ops", role: "Management", percent: 20 },
  ],
};

const fanChecklist = [
  { label: "Wallet connect", detail: "Fans can log in with any EVM wallet", status: "Ready" },
  { label: "Email backup", detail: "No wallet? Alpha assist captures their info", status: "Ready" },
  { label: "Payout proof", detail: "Step 3 review doubles as a public receipt", status: "Ready" },
];

export default function FansPage() {
  return (
    <PageShell
      title="Fan-facing toolkit"
      subtitle="Curate passes, receipt NFTs, and equity snapshots in the same workspace."
    >
      <div className="grid gap-6 rounded-[32px] border border-slate-200 bg-white p-6 md:grid-cols-3">
        {fanHighlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 rounded-[32px] border border-white/60 bg-gradient-to-br from-[#fff1f9] via-[#fff8ef] to-[#eef6ff] p-6 md:grid-cols-3">
        {fanPasses.map((pass) => (
          <div key={pass.title} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-500">{pass.status}</p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900">{pass.title}</h4>
            <p className="text-sm text-slate-600">{pass.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-pink-500">Receipt preview</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{receiptPreview.project}</h3>
            <p className="text-sm text-slate-500">Pulled directly from Step 3 · Review & Publish</p>
          </div>
          <Link
            href="/dashboard#step-3"
            className="rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-5 py-2 text-sm font-semibold text-white"
          >
            Edit split
          </Link>
        </div>
        <table className="mt-4 w-full text-left text-sm text-slate-700">
          <thead>
            <tr className="text-xs uppercase tracking-[0.3em] text-slate-400">
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2 text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {receiptPreview.splits.map((row) => (
              <tr key={row.name} className="border-t border-slate-100">
                <td className="py-2">{row.name}</td>
                <td className="py-2 text-slate-500">{row.role}</td>
                <td className="py-2 text-right">{row.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-[32px] border border-white/60 bg-gradient-to-br from-[#ffd6f0] via-[#ffedd6] to-[#e4f7ff] p-8 text-slate-900">
        <h3 className="text-2xl font-semibold">Ready for drops</h3>
        <p className="mt-2 text-sm text-slate-700">
          Fan cards live here by default. Swap copy, upload art, and link them to your Step 3 review so collaborators and superfans always see the same truth.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard#step-3"
            className="rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-5 py-2 text-sm font-semibold text-white shadow"
          >
            Jump to Step 3
          </Link>
          <Link
            href="/"
            className="rounded-full border border-pink-200 px-5 py-2 text-sm font-semibold text-pink-600"
          >
            Back to landing
          </Link>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Fan checklist</p>
        <div className="mt-4 space-y-3">
          {fanChecklist.map((item) => (
            <div key={item.label} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.detail}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-500">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
