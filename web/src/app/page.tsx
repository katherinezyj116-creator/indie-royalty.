"use client";

import Link from "next/link";

const steps = [
  {
    id: "01",
    title: "Step 1 · Wallet split",
    body: "登录后即可连接钱包、创建协作者树、锁定百分比。",
    cta: "开始分账",
    href: "/dashboard#step-1",
  },
  {
    id: "02",
    title: "Step 2 · Alpha assist",
    body: "为没有钱包的成员收集资料，我们后台代签并写入 Supabase。",
    cta: "填写代签表单",
    href: "/dashboard#step-2",
  },
  {
    id: "03",
    title: "Step 3 · Review & Publish",
    body: "在 Review 页面审阅份额树，准备上链或 Raidar 同步。",
    cta: "打开 Review",
    href: "/dashboard#step-3",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <section className="rounded-[40px] border border-white/10 bg-white/5 p-12 shadow-2xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Indie artist first</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">
            Use one dashboard to draft splits, collect off-chain info, and publish receipts.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            登录后即可进入 Step 1–3 向导；主页只留给核心叙事。Raidar 同步与链上发布会在你完成数据层之后解锁。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg transition hover:opacity-90"
            >
              登录并开始工作
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white/80 transition hover:border-white"
            >
              创建账户
            </Link>
          </div>
        </section>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">{step.id}</p>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-200">{step.body}</p>
              <Link
                href={step.href}
                className="mt-auto text-sm font-semibold text-emerald-200 underline-offset-4 hover:underline"
              >
                {step.cta}
              </Link>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-sm text-slate-200">
          <p>
            所有数据都会写入 Supabase（projects / collaborators / alpha_intake / profiles）。即使将来链上或 Raidar 模块延后，上述数据层也能独立运行，确保最坏情况下仍可上线。
          </p>
        </section>
      </div>
    </div>
  );
}
