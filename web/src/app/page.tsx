"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const navLinks = [
  { label: { en: "Product", zh: "产品" }, href: "#product" },
  { label: { en: "Workflow", zh: "流程" }, href: "#workflow" },
  { label: { en: "Preview", zh: "互动预览" }, href: "#alpha" },
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

const splitDemoStages = [
  {
    title: { en: "Draft the split", zh: "起草分账" },
    body: {
      en: "Invite vocalists, producers, writers, or labels. Everyone signs the same tree you designed—no PDF ping-pong.",
      zh: "邀请主唱、制作人、词作者或厂牌，共享同一份份额树，再也不用邮件丢 PDF。",
    },
    checklist: {
      en: ["Set primary roles", "Lock percentages", "Collect wallet or banking prefs"],
      zh: ["定义参与角色", "锁定份额比例", "收集钱包或银行卡偏好"],
    },
  },
  {
    title: { en: "Simulate revenue", zh: "模拟收入" },
    body: {
      en: "Toggle on streaming, sync, merch, or fan equity. See how a $20K release travels before launch.",
      zh: "切换流媒体、授权、周边或粉丝股权，提前看到 2 万美金如何被分发。",
    },
    checklist: {
      en: ["Upload revenue assumptions", "Stress-test payouts", "Share preview with partners"],
      zh: ["录入收入假设", "预览付款压力", "与合作伙伴共享预览"],
    },
  },
  {
    title: { en: "Publish receipts", zh: "发布凭证" },
    body: {
      en: "Each collaborator receives an on-chain receipt + fan-facing card so everyone trusts the flow.",
      zh: "每位成员都会拿到链上凭证与粉丝可见卡片，透明度即刻上线。",
    },
    checklist: {
      en: ["Mint receipt NFTs", "Confirm payout rail", "Drop link to fans"],
      zh: ["铸造凭证 NFT", "确认支付通道", "向粉丝发布链接"],
    },
  },
];

const demoCollaborators = [
  {
    name: "Aura",
    role: { en: "Lead artist", zh: "主唱" },
    percent: 40,
    color: "bg-slate-900",
  },
  {
    name: "Nova Ties",
    role: { en: "Producer duo", zh: "制作人组合" },
    percent: 25,
    color: "bg-indigo-500",
  },
  {
    name: "Gavin Luo",
    role: { en: "Writer", zh: "词作者" },
    percent: 15,
    color: "bg-amber-500",
  },
  {
    name: "Fan Pool",
    role: { en: "Superfan equity", zh: "粉丝权益" },
    percent: 12,
    color: "bg-emerald-500",
  },
  {
    name: "Ops Fund",
    role: { en: "Team services", zh: "团队服务" },
    percent: 8,
    color: "bg-rose-400",
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



type Collaborator = {
  id: string;
  name: string;
  role: string;
  email: string;
  payout: string;
  percent: number;
};

const createCollaborator = (): Collaborator => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  name: "",
  role: "",
  email: "",
  payout: "",
  percent: 0,
});

function WalletSplitCard({ lang }: { lang: "en" | "zh" }) {
  const t = (en: string, zh: string) => (lang === "en" ? en : zh);
  const { isConnected, address } = useAccount();
  const { connect, connectors, status: connectStatus, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const primaryConnector = connectors[0];
  const secondaryConnector = connectors[1];
  const shortAddress = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : "";
  const [projectName, setProjectName] = useState("");
  const [overview, setOverview] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    createCollaborator(),
  ]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [txLink, setTxLink] = useState<string | null>(null);
  const [receiptLink, setReceiptLink] = useState<string | null>(null);

  const totalPercent = collaborators.reduce(
    (sum, collab) => sum + Number(collab.percent || 0),
    0
  );

  const updateCollaborator = (
    id: string,
    field: keyof Collaborator,
    value: string
  ) => {
    setCollaborators((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "percent" ? Number(value) : value,
            }
          : item
      )
    );
  };

  const addCollaborator = () => {
    setCollaborators((prev) => [...prev, createCollaborator()]);
  };

  const removeCollaborator = (id: string) => {
    setCollaborators((prev) => (prev.length === 1 ? prev : prev.filter((c) => c.id !== id)));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConnected || !address) {
      setStatus("error");
      setStatusMessage(
        t("Please connect a wallet first.", "请先连接钱包再提交。")
      );
      return;
    }

    setStatus("loading");
    setStatusMessage(t("Writing to Polygon…", "正在写入 Polygon…"));
    setTxLink(null);
    setReceiptLink(null);

    try {
      const response = await fetch("/api/splits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          overview,
          collaborators,
          requester: address,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to create split");
      }

      const payload = await response.json();
      setTxLink(payload.txHash ?? null);
      setReceiptLink(payload.receiptUrl ?? null);
      setStatus("success");
      setStatusMessage(t("Split recorded on Polygon.", "分账已写入 Polygon。"));
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : t("Unexpected error", "出现未知错误")
      );
    }
  };

  return (
    <div className="rounded-[32px] border border-white/70 bg-white/95 p-6 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            {t("Wallet path", "钱包流程")}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {t("Connect + post on-chain", "连接钱包并写入链上")}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-2 text-right text-xs text-slate-500">
          <button
            type="button"
            onClick={() =>
              isConnected
                ? disconnect()
                : primaryConnector
                ? connect({ connector: primaryConnector })
                : undefined
            }
            disabled={!primaryConnector || connectStatus === "pending"}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isConnected
              ? `${shortAddress} · ${t("Disconnect", "断开")}`
              : connectStatus === "pending"
              ? t("Connecting…", "正在连接…")
              : t("Connect wallet", "连接钱包")}
          </button>
          {secondaryConnector && !isConnected && (
            <button
              type="button"
              onClick={() => connect({ connector: secondaryConnector })}
              className="text-xs font-semibold text-slate-500 underline-offset-2 hover:underline"
            >
              {t("Use WalletConnect instead", "改用 WalletConnect")}
            </button>
          )}
          {connectError && (
            <p className="text-xs text-rose-500">{connectError.message}</p>
          )}
        </div>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {t("Project", "作品名称")}
          </label>
          <input
            required
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder={t("Midnight Bloom", "午夜绽放")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {t("Overview", "概述")}
          </label>
          <textarea
            value={overview}
            onChange={(event) => setOverview(event.target.value)}
            rows={3}
            placeholder={t("Streaming + merch pool", "流媒体 + 周边分润池")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {t("Collaborators", "协作者")}
            </p>
            <span className="text-xs text-slate-500">
              {t("Total", "份额合计")} {totalPercent}%
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {collaborators.map((collab, index) => (
              <div
                key={collab.id}
                className="rounded-xl border border-slate-100 bg-white p-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{t("Collaborator", "成员")} #{index + 1}</span>
                  {collaborators.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCollaborator(collab.id)}
                      className="text-slate-500 transition hover:text-slate-900"
                    >
                      {t("Remove", "移除")}
                    </button>
                  )}
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <input
                    required
                    value={collab.name}
                    onChange={(event) =>
                      updateCollaborator(collab.id, "name", event.target.value)
                    }
                    placeholder={t("Aura", "凌曦")}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                  <input
                    value={collab.role}
                    onChange={(event) =>
                      updateCollaborator(collab.id, "role", event.target.value)
                    }
                    placeholder={t("Producer", "制作人")}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <input
                    type="email"
                    value={collab.email}
                    onChange={(event) =>
                      updateCollaborator(collab.id, "email", event.target.value)
                    }
                    placeholder="team@label.com"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                  <input
                    value={collab.payout}
                    onChange={(event) =>
                      updateCollaborator(collab.id, "payout", event.target.value)
                    }
                    placeholder={t("Wallet or PayPal", "钱包或 PayPal")}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={collab.percent}
                    onChange={(event) =>
                      updateCollaborator(collab.id, "percent", event.target.value)
                    }
                    placeholder="20"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addCollaborator}
            className="mt-4 w-full rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-500"
          >
            {t("Add collaborator", "新增协作者")}
          </button>
        </div>

        <button
          type="submit"
          disabled={!isConnected || status === "loading"}
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? t("Writing to Polygon…", "正在写入 Polygon…")
            : t("Create on-chain split", "创建链上分账")}
        </button>
      </form>

      {status !== "idle" && (
        <div
          className={`mt-4 rounded-2xl border p-4 text-sm ${
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : status === "error"
              ? "border-rose-200 bg-rose-50 text-rose-800"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <p className="font-semibold">
            {status === "success"
              ? t("Success", "成功")
              : status === "error"
              ? t("Error", "错误")
              : t("In progress", "进行中")}
          </p>
          {statusMessage && <p className="mt-1">{statusMessage}</p>}
          <div className="mt-3 space-y-2">
            {txLink && (
              <a
                href={`https://amoy.polygonscan.com/tx/${txLink}`}
                target="_blank"
                rel="noreferrer"
                className="block text-xs font-semibold text-slate-900 underline"
              >
                {t("View transaction", "查看交易")}
              </a>
            )}
            {receiptLink && (
              <a
                href={receiptLink}
                target="_blank"
                rel="noreferrer"
                className="block text-xs font-semibold text-slate-900 underline"
              >
                {t("View receipt", "查看凭证")}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LegacyAlphaForm({ lang }: { lang: "en" | "zh" }) {
  const t = (en: string, zh: string) => (lang === "en" ? en : zh);
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/95 p-6 shadow-lg">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
        {t("Backend assist", "后台代签")}
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-900">
        {t("Submit form — we sign for you", "填写表单，由我们代签")}
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        {t(
          "Best for collaborators without wallets. We store payout methods privately and write on-chain for you.",
          "适合没有钱包的成员。我们私下保存收款方式并代你写入链上。"
        )}
      </p>
      <form
        className="mt-6 space-y-4"
        method="POST"
        action="https://formspree.io/f/mnqkagbl"
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {t("Name", "姓名")}
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder={t("Aura Li", "李清扬")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {t("Email", "邮箱")}
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="team@label.com"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {t("Role", "身份")}
          </label>
          <select
            name="role"
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          >
            <option value="artist">{t("Artist / Band", "音乐人 / 乐队")}</option>
            <option value="producer">{t("Producer / Writer", "制作人 / 词曲")}</option>
            <option value="manager">{t("Manager / Label", "经纪 / 厂牌")}</option>
            <option value="ops">{t("Ops / Finance", "运营 / 财务")}</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {t("Annual indie revenue", "独立业务年收入")}
          </label>
          <select
            name="revenue_range"
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          >
            <option value="<10k">&lt;$10K</option>
            <option value="10-50k">$10K–$50K</option>
            <option value="50-200k">$50K–$200K</option>
            <option value=">200k">$200K+</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {t("How do you pay now?", "现在如何结算？")}
          </label>
          <textarea
            name="current_process"
            rows={3}
            placeholder={t("Google Sheets + wire transfers", "表格 + 转账")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </div>
        <input type="hidden" name="language" value={lang} />
        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          {t("Submit + reserve", "提交并保留席位")}
        </button>
        <p className="text-center text-xs text-slate-500">
          {t(
            "Prefer email? Write us at team@indie-royalty.com",
            "如果想通过邮件沟通，请写信至 team@indie-royalty.com"
          )}
        </p>
      </form>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [activeStage, setActiveStage] = useState(0);
  const t = (en: string, zh: string) => (lang === "en" ? en : zh);
  const activeDemo = splitDemoStages[activeStage];

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
          <Link
            href="/signup"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-105"
          >
            {t("Signup", "注册预览")}
          </Link>
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
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t("Alpha preview", "内测预览")}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {t("Step through the interactive split workflow and save your spot.", "几分钟体验互动分账流程，并锁定席位。")}
                  </p>
                  <a
                    href="#alpha"
                    className="mt-3 inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                  >
                    {t("Explore preview", "前往体验")}
                  </a>
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

          <section id="alpha" className="rounded-[40px] border border-white/70 bg-gradient-to-br from-[#fdf7ff] via-[#f1fbff] to-[#fffcef] p-10 shadow-xl">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t("Interactive preview", "互动预览")}</p>
              <h2 className="text-3xl font-semibold text-slate-900">
                {t("Test the split flow, then claim your alpha seat.", "先体验分账流程，再锁定内测席位。")}
              </h2>
              <p className="text-base text-slate-600">
                {t(
                  "Walk through the exact dashboard artists will use, then tell us how you run payouts today.",
                  "逐步体验未来的分账面板，并告诉我们你现在如何付款。"
                )}
              </p>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="grid gap-3">
                  {splitDemoStages.map((stage, index) => (
                    <button
                      key={stage.title.en}
                      onClick={() => setActiveStage(index)}
                      className={`rounded-3xl border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 ${
                        activeStage === index
                          ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                          : "border-white/60 bg-white/80 text-slate-700 shadow"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.4em]">
                        {t(`Step ${index + 1}`, `步骤 ${index + 1}`)}
                      </p>
                      <p className="mt-2 text-xl font-semibold">
                        {t(stage.title.en, stage.title.zh)}
                      </p>
                      <p className="mt-1 text-sm">
                        {t(stage.body.en, stage.body.zh)}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-lg">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {t("Checklist", "操作清单")}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {activeDemo.checklist[lang].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 space-y-3">
                    {demoCollaborators.map((collab) => (
                      <div key={collab.name}>
                        <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                          <span>{collab.name}</span>
                          <span>{collab.percent}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-100">
                          <span
                            className={`block h-full rounded-full ${collab.color}`}
                            style={{ width: `${collab.percent}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{t(collab.role.en, collab.role.zh)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <WalletSplitCard lang={lang} />
                <LegacyAlphaForm lang={lang} />
              </div>
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
          <span>© {new Date().getFullYear()} Indie Royalty</span>
          <span>{t("Web3 revenue OS for indie music", "独立音乐的 Web3 收入操作系统")}</span>
        </footer>
      </div>
    </div>
  );
}
