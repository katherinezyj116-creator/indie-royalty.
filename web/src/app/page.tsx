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

const fanPerks = [
  { title: "限量权益卡", detail: "粉丝可抢先兑换的 VIP pass" },
  { title: "Receipt NFT", detail: "链上凭证自动推送到粉丝钱包" },
  { title: "Fan equity", detail: "Superfan 拥有真实分账快照" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5fb] via-[#f5f7ff] to-[#eefbff] text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <section className="rounded-[40px] border border-white/40 bg-gradient-to-br from-[#fff5fb] via-[#ffeef7] to-[#e9f4ff] p-12 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Indie artist first</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900">
            Use one dashboard to draft splits, collect off-chain info, and publish receipts.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
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
              <h3 className="mt-2 text-2xl font-semibold">粉丝权益模块随时就绪</h3>
              <p className="text-sm text-slate-700">我们会把独立粉丝所需的亮色视觉和权益卡直接挂在这里——限量 Pass、Receipt NFT、Fan equity snapshot 都有明确入口。</p>
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
                查看粉丝视图
              </Link>
              <Link
                href="/"
                className="rounded-full border border-pink-200 px-5 py-2 text-sm font-semibold text-pink-600"
              >
                了解权益设置
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white p-8 text-sm text-slate-600">
          <p>
            所有数据都会写入 Supabase（projects / collaborators / alpha_intake / profiles）。即使将来链上或 Raidar 模块延后，上述数据层也能独立运行，确保最坏情况下仍可上线。
          </p>
        </section>
      </div>
    </div>
  );
}
