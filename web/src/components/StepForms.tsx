"use client";

import { FormEvent, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

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

const t = (lang: "en" | "zh", en: string, zh: string) => (lang === "en" ? en : zh);

export function WalletSplitForm({ lang = "en", onSuccess }: { lang?: "en" | "zh"; onSuccess?: () => void }) {
  const { isConnected, address } = useAccount();
  const { connect, connectors, status: connectStatus, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const primaryConnector = connectors[0];
  const secondaryConnector = connectors[1];
  const shortAddress = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";
  const [projectName, setProjectName] = useState("");
  const [overview, setOverview] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>([createCollaborator()]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const totalPercent = collaborators.reduce((sum, collab) => sum + Number(collab.percent || 0), 0);

  const updateCollaborator = (id: string, field: keyof Collaborator, value: string) => {
    setCollaborators((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "percent" ? Number(value) : value,
            }
          : item,
      ),
    );
  };

  const addCollaborator = () => setCollaborators((prev) => [...prev, createCollaborator()]);
  const removeCollaborator = (id: string) =>
    setCollaborators((prev) => (prev.length === 1 ? prev : prev.filter((c) => c.id !== id)));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConnected || !address) {
      setStatus("error");
      setStatusMessage(t(lang, "Please connect a wallet first.", "请先连接钱包再提交。"));
      return;
    }

    setStatus("loading");
    setStatusMessage(t(lang, "Writing to Polygon…", "正在写入 Polygon…"));

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          overview,
          collaborators,
          requester: address,
          language: lang,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setStatus("error");
          setStatusMessage(
            t(lang, "Please log in before posting a split.", "提交分账前请先登录账户。"),
          );
          return;
        }
        const text = await response.text();
        throw new Error(text || "Failed to create split");
      }

      setStatus("success");
      setStatusMessage(
        t(
          lang,
          "Project saved. On-chain publishing will use this data.",
          "分账草稿已保存，链上发布时会直接使用这些数据。",
        ),
      );
      setProjectName("");
      setOverview("");
      setCollaborators([createCollaborator()]);
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : t(lang, "Unexpected error", "出现未知错误"),
      );
    }
  };

  return (
    <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/80">
        <p className="text-white/60">连接钱包后即可保存分账草稿。</p>
        <div className="text-right">
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
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isConnected
              ? `${shortAddress} · ${t(lang, "Disconnect", "断开")}`
              : connectStatus === "pending"
              ? t(lang, "Connecting…", "正在连接…")
              : t(lang, "Connect wallet", "连接钱包")}
          </button>
          {secondaryConnector && !isConnected && (
            <button
              type="button"
              onClick={() => connect({ connector: secondaryConnector })}
              className="mt-2 block text-xs font-semibold text-white/60 underline"
            >
              {t(lang, "Use WalletConnect instead", "改用 WalletConnect")}
            </button>
          )}
          {connectError && (
            <p className="mt-2 text-xs text-rose-400">{connectError.message}</p>
          )}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Project", "作品名称")}
          </label>
          <input
            required
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder={t(lang, "Midnight Bloom", "午夜绽放")}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Overview", "概述")}
          </label>
          <textarea
            value={overview}
            onChange={(event) => setOverview(event.target.value)}
            rows={3}
            placeholder={t(lang, "Streaming + merch pool", "流媒体 + 周边分润池")}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{t(lang, "Collaborators", "协作者")}</span>
            <span>
              {t(lang, "Total", "份额合计")} {totalPercent}%
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {collaborators.map((collab, index) => (
              <div key={collab.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>
                    {t(lang, "Collaborator", "成员")} #{index + 1}
                  </span>
                  {collaborators.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCollaborator(collab.id)}
                      className="text-white/60 hover:text-white"
                    >
                      {t(lang, "Remove", "移除")}
                    </button>
                  )}
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <input
                    required
                    value={collab.name}
                    onChange={(event) => updateCollaborator(collab.id, "name", event.target.value)}
                    placeholder={t(lang, "Aura", "凌曦")}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                  />
                  <input
                    value={collab.role}
                    onChange={(event) => updateCollaborator(collab.id, "role", event.target.value)}
                    placeholder={t(lang, "Producer", "制作人")}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                  />
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <input
                    type="email"
                    value={collab.email}
                    onChange={(event) => updateCollaborator(collab.id, "email", event.target.value)}
                    placeholder="team@label.com"
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                  />
                  <input
                    value={collab.payout}
                    onChange={(event) => updateCollaborator(collab.id, "payout", event.target.value)}
                    placeholder={t(lang, "Wallet or PayPal", "钱包或 PayPal")}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={collab.percent}
                    onChange={(event) => updateCollaborator(collab.id, "percent", event.target.value)}
                    placeholder="20"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addCollaborator}
            className="mt-4 w-full rounded-xl border border-dashed border-white/30 px-3 py-2 text-sm font-semibold text-white/80"
          >
            {t(lang, "Add collaborator", "新增协作者")}
          </button>
        </div>

        <button
          type="submit"
          disabled={!isConnected || status === "loading"}
          className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? t(lang, "Writing to Polygon…", "正在写入 Polygon…")
            : t(lang, "Create on-chain split", "创建链上分账")}
        </button>
      </form>

      {status !== "idle" && (
        <div
          className={`mt-4 rounded-2xl border p-4 text-sm ${
            status === "success"
              ? "border-emerald-200/40 bg-emerald-400/10 text-emerald-100"
              : status === "error"
              ? "border-rose-200/40 bg-rose-400/10 text-rose-100"
              : "border-white/20 bg-white/5 text-white"
          }`}
        >
          <p className="font-semibold">
            {status === "success"
              ? t(lang, "Success", "成功")
              : status === "error"
              ? t(lang, "Error", "错误")
              : t(lang, "In progress", "进行中")}
          </p>
          {statusMessage && <p className="mt-1">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
}

export function AlphaAssistForm({ lang = "en", onSuccess }: { lang?: "en" | "zh"; onSuccess?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "artist",
    revenue_range: "<10k",
    current_process: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage(t(lang, "Submitting…", "提交中…"));

    try {
      const response = await fetch("/api/alpha-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: lang }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setStatus("error");
          setStatusMessage(t(lang, "Please log in before submitting.", "提交前请先登录账户。"));
          return;
        }
        const text = await response.text();
        throw new Error(text || "Failed to submit form");
      }

      setStatus("success");
      setStatusMessage(
        t(lang, "We saved your info. Check your inbox soon.", "已收到信息，稍后会邮件联系你。"),
      );
      setForm({ name: "", email: "", role: "artist", revenue_range: "<10k", current_process: "" });
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : t(lang, "Unexpected error", "出现未知错误"),
      );
    }
  };

  return (
    <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 text-white">
      <p className="text-xs uppercase tracking-[0.35em] text-sky-200">
        {t(lang, "Step 2", "第二步")}
      </p>
      <h3 className="mt-1 text-2xl font-semibold">
        {t(lang, "Alpha assist", "后台代签")}
      </h3>
      <p className="text-sm text-slate-200">
        {t(lang, "For collaborators without wallets.", "给没有钱包的成员填写信息。")}
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Name", "姓名")}
          </label>
          <input
            required
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder={t(lang, "Aura Li", "李清扬")}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Email", "邮箱")}
          </label>
          <input
            required
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="team@label.com"
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Role", "身份")}
          </label>
          <select
            name="role"
            required
            value={form.role}
            onChange={(event) => handleChange("role", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
          >
            <option value="artist">{t(lang, "Artist / Band", "音乐人 / 乐队")}</option>
            <option value="producer">{t(lang, "Producer / Writer", "制作人 / 词曲")}</option>
            <option value="manager">{t(lang, "Manager / Label", "经纪 / 厂牌")}</option>
            <option value="ops">{t(lang, "Ops / Finance", "运营 / 财务")}</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Annual indie revenue", "独立业务年收入")}
          </label>
          <select
            name="revenue_range"
            required
            value={form.revenue_range}
            onChange={(event) => handleChange("revenue_range", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
          >
            <option value="<10k">{t(lang, "Under $10k", "低于 $10k")}</option>
            <option value="10-50k">{t(lang, "$10k - $50k", "$10k - $50k")}</option>
            <option value=">50k">{t(lang, "Above $50k", "超过 $50k")}</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Current process", "当前流程")}
          </label>
          <textarea
            name="current_process"
            value={form.current_process}
            onChange={(event) => handleChange("current_process", event.target.value)}
            rows={3}
            placeholder={t(lang, "Sheets, manual payouts…", "表格管理，手动分账…")}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? t(lang, "Submitting…", "提交中…")
            : t(lang, "Save info", "保存信息")}
        </button>
      </form>
      {status !== "idle" && (
        <div
          className={`mt-4 rounded-2xl border p-4 text-sm ${
            status === "success"
              ? "border-emerald-200/40 bg-emerald-400/10 text-emerald-100"
              : status === "error"
              ? "border-rose-200/40 bg-rose-400/10 text-rose-100"
              : "border-white/20 bg-white/5 text-white"
          }`}
        >
          <p className="font-semibold">
            {status === "success"
              ? t(lang, "Success", "成功")
              : status === "error"
              ? t(lang, "Error", "错误")
              : t(lang, "In progress", "进行中")}
          </p>
          {statusMessage && <p className="mt-1">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
}
