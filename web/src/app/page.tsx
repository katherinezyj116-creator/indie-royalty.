"use client";

import { useState } from "react";

const navLinks = [
  { label: { en: "Product", zh: "产品" }, href: "#product" },
  { label: { en: "Workflow", zh: "流程" }, href: "#workflow" },
  { label: { en: "Artists", zh: "合作案例" }, href: "#artists" },
  { label: { en: "Resources", zh: "资源" }, href: "#resources" },
];

const benefits = [
  {
    eyebrow: { en: "Splits", zh: "分账" },
    title: { en: "Visual composer", zh: " визу化分账" },
    body: {
      en: "Map collaborators once. Drag, lock percentages, and ship a share graph your team actually loves.",
      zh: "拖拽节点即可一次性设置分账，清晰的份额图让团队一目了然。",
    },
  },
  {
    eyebrow: { en: "Campaigns", zh: "活动" },
    title: { en: "Fan equity", zh: "粉丝权益" },
    body: {
      en: "Launch limited member passes or song shares so superfans co-own the next era.",
      zh: "发行会员卡或歌曲份额，让粉丝共同持有下一次发行。",
    },
  },
  {
    eyebrow: { en: "Trust", zh: "信任" },
    title: { en: "Compliance-friendly", zh: "友好合规" },
    body: {
      en: "Contracts, stems, and reports store in a tamper-proof vault. Auditors love receipts.",
      zh: "合同、素材、报告统一存放在可审计的资料库，随时应对检查。",
    },
  },
];

const workflow = [
  {
    step: "01",
    title: { en: "Upload & align", zh: "素材与团队" },
    body: {
      en: "Drop in your masters and invite collaborators. Our assistant highlights missing info instantly.",
      zh: "上传母带、邀请合作者，AI 助理即时提示缺失信息。",
    },
  },
  {
    step: "02",
    title: { en: "Model revenue lanes", zh: "模拟收入" },
    body: {
      en: "Plan streaming, merch, sync, and fan drops. Stress-test before you ever go live.",
      zh: "在上链前即可模拟流媒体、周边、授权和粉丝发行。",
    },
  },
  {
    step: "03",
    title: { en: "Launch & share", zh: "上线与分发" },
    body: {
      en: "Ship smart contracts + campaign pages in one click. Monitor across wallets, fans, and payouts.",
      zh: "一键发布合约与活动页，实时查看钱包、粉丝与分账情况。",
    },
  },
];

const testimonials = [
  {
    quote: {
      en: "Indie Royalty reintroduced joy to our release calendar—no more spreadsheets, just flow.",
      zh: "Indie Royalty 让发行重新变得轻盈，我们彻底告别了表格。",
    },
    name: "Mia Arroyo",
    role: { en: "Founder, Solis Collective", zh: "Solis Collective 创始人" },
  },
  {
    quote: {
      en: "Before fans invest, they see the exact tree of collaborators. That transparency sold us.",
      zh: "粉丝投资前就能看清份额树，这份透明让我们毫不犹豫。",
    },
    name: "Gavin Luo",
    role: { en: "Producer & Label Partner", zh: "制作人/厂牌合伙人" },
  },
];

const accentText = {
  en: "Launching Summer 2026",
  zh: "2026 夏发布",
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const t = (en: string, zh: string) => (lang === "en" ? en : zh);

  return (
    <div className="bg-gradient-to-b from-[#fdfcfb] to-[#f7f8ff] text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10">
        <header className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/60 bg-white/80 px-6 py-4 shadow-lg backdrop-blur">
          <span className="text-base font-semibold tracking-[0.3em] text-slate-700">INDIE ROYALTY</span>
          <nav className="flex flex-1 flex-wrap items-center justify-end gap-4 text-sm text-slate-500">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-slate-900">
                {t(link.label.en, link.label.zh)}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <a
            href="mailto:team@indie-royalty.com"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            {t("Book Intro", "预约介绍")}
          </a>
        </header>

        <main className="mt-16 space-y-20">
          <section className="grid gap-12 rounded-[40px] bg-white/80 p-10 shadow-xl backdrop-blur lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t("Music OS", "音乐操作系统")}</p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                {t("Run every indie release, split, and fan drop from one calm space.", "在同一个宁静空间，完成独立发行、分账与粉丝活动。")}
              </h1>
              <p className="text-lg text-slate-500">
                {t(
                  "Plug your collaborators, partners, and superfans into a transparent experience—all without spreadsheets.",
                  "一键拉入合作者、伙伴和核心粉丝，用清爽、透明的体验代替繁琐表格。"
                )}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://forms.gle/fan-waitlist"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  {t("Join waitlist", "加入候补")}
                </a>
                <a
                  href="mailto:team@indie-royalty.com"
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  {t("Request a deck", "索取资料")}
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white p-6 shadow-inner">
              <div className="space-y-4 text-sm text-slate-500">
                <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t("Coming soon", "即将上线")}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{t(accentText.en, accentText.zh)}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-tr from-[#fcefe3] via-[#f7fbf0] to-[#eef4ff] p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t("Fan areas", "粉丝专区")}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {t("Members view splits, perks, and campaigns without spreadsheets.", "粉丝专区清晰呈现分账、权益和活动，再也不用表格。")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="product" className="space-y-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t("Why Indie Royalty", "为什么选择 IR")}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {t("Three calm pillars for indie revenue.", "三大轻盈支柱守护独立音乐收入。")}
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {benefits.map((item) => (
                <article key={item.title.en} className="rounded-[30px] border border-slate-100 bg-white p-6 shadow-md">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t(item.eyebrow.en, item.eyebrow.zh)}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{t(item.title.en, item.title.zh)}</h3>
                  <p className="mt-2 text-sm text-slate-500">{t(item.body.en, item.body.zh)}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="workflow" className="rounded-[40px] border border-white/70 bg-white/80 p-10 shadow-xl">
            <div className="flex flex-col gap-6 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t("Workflow", "流程")}</p>
              <h2 className="text-3xl font-semibold text-slate-900">
                {t("From drafts to fans in three clear steps.", "三步让创作走向粉丝。")}
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {workflow.map((stage) => (
                <div key={stage.step} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-6 shadow-sm">
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-400">{stage.step}</span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{t(stage.title.en, stage.title.zh)}</h3>
                  <p className="mt-1 text-sm text-slate-500">{t(stage.body.en, stage.body.zh)}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="artists" className="space-y-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t("Notes from the field", "现场反馈")}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {t("The brightest indie minds are already here.", "优秀独立音乐人已在此安家。")}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((item) => (
                <figure key={item.name} className="rounded-[30px] border border-slate-100 bg-white/90 p-6 shadow-md">
                  <p className="text-base text-slate-700">“{t(item.quote.en, item.quote.zh)}”</p>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.35em] text-slate-400">
                    {item.name} — {t(item.role.en, item.role.zh)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="resources" className="rounded-[40px] border border-white/70 bg-gradient-to-b from-[#fef7ef] via-[#f6fbff] to-[#fefefe] p-10 text-center shadow-xl">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t("Join the circle", "加入音乐圈")}</p>
            <h3 className="mt-3 text-3xl font-semibold text-slate-900">
              {t("Sign up for launch updates and early membership.", "订阅产品进度并抢先体验会员。")}
            </h3>
            <p className="mt-3 text-base text-slate-600">
              {t("We’ll send mini case studies, templates, and invites to our studio sessions.", "我们会分享案例、小模板，并邀请你参加 Studio Sessions。")}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://forms.gle/fan-waitlist"
                className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:brightness-95"
              >
                {t("Join newsletter", "订阅简报")}
              </a>
              <a
                href="mailto:team@indie-royalty.com"
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400"
              >
                {t("Book workshop", "预约工作坊")}
              </a>
            </div>
          </section>
        </main>

        <footer className="mt-16 flex flex-col items-center gap-2 border-t border-slate-100 py-6 text-xs uppercase tracking-[0.3em] text-slate-400">
          <span>© {new Date().getFullYear()} Indie Royauty</span>
          <span>{t("Web3 revenue OS for indie music", "独立音乐的 Web3 收入操作系统")}</span>
        </footer>
      </div>
    </div>
  );
}
