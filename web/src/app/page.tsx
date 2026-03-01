"use client";

import { useState } from "react";

const navLinks = [
  { label: { en: "Product", zh: "产品" }, href: "#product" },
  { label: { en: "Workflow", zh: "流程" }, href: "#workflow" },
  { label: { en: "Artists", zh: "合作案例" }, href: "#artists" },
  { label: { en: "Resources", zh: "资源", }, href: "#resources" },
];

const stats = [
  { label: { en: "Artists onboard", zh: "已接入艺人" }, value: "340+" },
  { label: { en: "Avg. payout speed", zh: "平均分账用时" }, value: "< 12 hrs" },
  { label: { en: "Fan wallets connected", zh: "连接粉丝钱包" }, value: "18k" },
];

const benefits = [
  {
    eyebrow: { en: "Royalty brain", zh: "分账大脑" },
    title: { en: "Program splits once", zh: "分账一次设定即可" },
    body: {
      en: "Composer, label, collaborator, DAO treasury—drag & drop nodes, lock percentages, publish with one signature.",
      zh: "词曲、厂牌、制作人、DAO 金库——节点拖拽、锁定比例，一次签名即可上链。",
    },
  },
  {
    eyebrow: { en: "Fan capital", zh: "粉丝资本" },
    title: { en: "Launch member tokens", zh: "发行会员/歌曲代币" },
    body: {
      en: "Offer tiered NFT passes or song shares with auto-vested benefits. Fans know exactly how they earn.",
      zh: "分层 NFT 或歌曲份额自动解锁权益，粉丝清楚知道自己的收益逻辑。",
    },
  },
  {
    eyebrow: { en: "Compliance", zh: "合规" },
    title: { en: "Audit-ready vault", zh: "随时审计的资料库" },
    body: {
      en: "Contracts, stems, licenses, KYC artifacts live in an encrypted ledger so deals survive any audit.",
      zh: "合同、音频源文件、授权、KYC 文件统一加密存储，随时经得起审计。",
    },
  },
];

const workflow = [
  {
    step: "01",
    title: { en: "Ingest & verify", zh: "素材入库与校验" },
    body: {
      en: "Upload masters, attribute collaborators, attach contracts. Our AI assistant flags gaps instantly.",
      zh: "上传母带、标注合作者、附上合同，AI 助理即时提示缺失项。",
    },
  },
  {
    step: "02",
    title: { en: "Model revenue lanes", zh: "模拟收入通道" },
    body: {
      en: "Link DSP feeds, merch, sync, touring. Simulate scenarios before you ever hit deploy.",
      zh: "连接流媒体、周边、同步授权、巡演等收入，部署前即可模拟不同场景。",
    },
  },
  {
    step: "03",
    title: { en: "Go live", zh: "一键上线" },
    body: {
      en: "One click publishes the contract + fan campaign. Dashboard shows cash flow, holders, and alerts in real time.",
      zh: "一键发布合约与粉丝活动，仪表板实时呈现金流、持有人与提醒。",
    },
  },
];

const testimonials = [
  {
    quote: {
      en: "Indie Royalty shaved weeks off our release schedule. Splits, merch drops, and fan shares are finally in one timeline.",
      zh: "Indie Royalty 让我们的发行计划提前数周完成，分账、周边和粉丝份额终于整合在一个时间轴。",
    },
    name: "Lina Park",
    role: { en: "Founder, Beacon Label", zh: "Beacon Label 创始人" },
  },
  {
    quote: {
      en: "We moved our entire Web3 membership here—transparency for fans, instant payouts for collaborators.",
      zh: "我们把所有 Web3 会员都迁到这里，粉丝透明、合作者即时分账。",
    },
    name: "Marcus Reed",
    role: { en: "Artist & Creative Director", zh: "艺术家 & 创意总监" },
  },
];

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const t = (en: string, zh: string) => (lang === "en" ? en : zh);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03050a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-48 h-96 bg-gradient-to-br from-teal-500/40 via-purple-500/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-400/40 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:px-10">
        <header className="flex flex-wrap items-center gap-4 border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md sm:rounded-full">
          <span className="text-base font-semibold tracking-[0.25em] text-teal-300">INDIE ROYALTY</span>
          <nav className="flex flex-1 flex-wrap items-center justify-end gap-4 text-sm text-slate-200">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {t(link.label.en, link.label.zh)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:border-white"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <a
              href="mailto:team@indie-royalty.com"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-90"
            >
              {t("Talk to us", "联系我们")}
            </a>
          </div>
        </header>

        <main className="mt-16 space-y-24">
          <section id="hero" className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-teal-300">
                {t("Web3 splits • fan equity • compliance", "Web3 分账 • 粉丝权益 • 合规")}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                {t(
                  "A creative operating system for indie labels, collectives, and self-managed artists.",
                  "服务独立厂牌、社群与自我管理艺人的创意操作系统。"
                )}
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                {t(
                  "Wire revenue to the right wallets, model fan campaigns, sync contracts, and give your supporters the data room they deserve. All without spreadsheets.",
                  "将收入精准分配到每个钱包，构建粉丝众筹、同步合同，给支持者一个透明的数据室——彻底告别表格。"
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://forms.gle/fan-waitlist"
                  className="rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-teal-300"
                >
                  {t("Launch a cohort", "发起发行")}
                </a>
                <a
                  href="https://github.com/katherinezyj116-creator/indie-royalty."
                  className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white"
                >
                  {t("Browse playbook", "查看指南")}
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="space-y-6">
                {stats.map((stat) => (
                  <div key={stat.label.en} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm uppercase tracking-[0.3em] text-slate-400">
                      {t(stat.label.en, stat.label.zh)}
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="product" className="space-y-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.4em] text-teal-300">{t("Product lens", "产品亮点")}</p>
              <h2 className="text-3xl font-semibold text-white">
                {t(
                  "Orchestrate royalties, launches, and fans in one canvas.",
                  "在同一画布协调分账、发行与粉丝。"
                )}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {benefits.map((item) => (
                <article key={item.title.en} className="rounded-3xl border border白/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-teal-200">
                    {t(item.eyebrow.en, item.eyebrow.zh)}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{t(item.title.en, item.title.zh)}</h3>
                  <p className="mt-2 text-sm text-slate-300">{t(item.body.en, item.body.zh)}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="workflow" className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="mx-auto mb-6 h-52 w-52 rounded-full bg-gradient-to-br from-teal-400/40 to-purple-500/20"></div>
              <p className="text-sm uppercase tracking-[0.4em] text-teal-300">{t("Live dashboard", "实时看板")}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {t(
                  "Every stream, merch drop, and fan token visible in real time.",
                  "每一笔流媒体、周边、粉丝代币都实时可见。"
                )}
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                {t(
                  "Drill into wallet activity, contract status, and supporter cohorts without leaving this board.",
                  "无需切换页面，就能深入查看钱包动态、合约状态与粉丝群体。"
                )}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-teal-300">{t("Workflow", "工作流程")}</p>
              <div className="mt-6 space-y-6">
                {workflow.map((stage) => (
                  <div key={stage.step} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <span className="text-xs uppercase tracking-[0.4em] text-slate-400">{stage.step}</span>
                    <h4 className="mt-2 text-lg font-semibold text-white">{t(stage.title.en, stage.title.zh)}</h4>
                    <p className="mt-1 text-sm text-slate-300">{t(stage.body.en, stage.body.zh)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="artists" className="space-y-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.4em] text-teal-300">{t("Loved by collectives", "深受社群喜爱")}</p>
              <h2 className="text-3xl font-semibold text-white">
                {t(
                  "Artists and labels run their entire release calendar here.",
                  "艺人和厂牌把整年的发行都搬到这里。"
                )}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((item) => (
                <figure key={item.name} className="rounded-3xl border border-white/10 bg白/5 p-6 text-sm text-slate-300">
                  <p className="text-base text-white">“{t(item.quote.en, item.quote.zh)}”</p>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.4em] text-teal-200">
                    {item.name} — {t(item.role.en, item.role.zh)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="resources" className="rounded-3xl border border-white/10 bg-gradient-to-r from-teal-500/10 to-purple-500/10 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-teal-200">{t("Start building", "立即开启")}</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              {t("Ready to let fans co-own your next release?", "准备好让粉丝共创下一次发行了吗？")}
            </h3>
            <p className="mt-3 text-base text-slate-200">
              {t(
                "Join the waitlist for campaign support, legal templates, and launch capital from our curator network.",
                "加入候补名单，获取活动支持、法律模板与策展人网络带来的启动资金。"
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://forms.gle/fan-waitlist"
                className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:brightness-90"
              >
                {t("Join waitlist", "加入候补")}
              </a>
              <a
                href="mailto:team@indie-royalty.com"
                className="rounded-full border border-white/40 px-6 py-3 font-semibold textwhite transition hover:border-white"
              >
                {t("Book studio demo", "预约演示")}
              </a>
            </div>
          </section>
        </main>

        <footer className="mt-16 flex flex-col items-center gap-2 border-t border-white/10 py-6 text-xs uppercase tracking-[0.3em] text-slate-500">
          <span>© {new Date().getFullYear()} Indie Royalty</span>
          <span>{t("Web3 revenue OS for indie music", "独立音乐的 Web3 收入操作系统")}</span>
        </footer>
      </div>
    </div>
  );
}
