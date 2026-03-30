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

const highlights = [
  {
    title: "Data layer first",
    body: "所有协作、分账、代签表单都落在 Supabase。即便链上延后，也能发布数据驱动的 Version 1。",
    tag: "数据基座",
  },
  {
    title: "Chain & Raidar ready",
    body: "Step 3 预览里已经预留链上铸造与 Raidar 同步按钮，等你确认数据后即可解锁。",
    tag: "扩展能力",
  },
];

const stats = [
  { label: "Projects", value: "3", detail: "示例草稿" },
  { label: "Alpha assist", value: "2", detail: "代签条目" },
  { label: "Supabase", value: "1", detail: "统一数据源" },
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

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur lg:grid-cols-2">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-950/40 p-6">
              <span className="inline-flex w-fit rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                {item.tag}
              </span>
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-slate-200">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <div className="grid gap-6 text-center text-white/80 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">{stat.label}</p>
                <p className="mt-2 text-4xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.detail}</p>
              </div>
            ))}
          </div>
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
