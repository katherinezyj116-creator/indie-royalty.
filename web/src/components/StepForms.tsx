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

const t = (_lang: "en" | "zh", en: string) => en;

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
      setStatusMessage(t(lang, "Please connect a wallet first."));
      return;
    }

    setStatus("loading");
    setStatusMessage(t(lang, "Writing to Polygon…"));

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
            t(lang, "Please log in before posting a split."),
          );
          return;
        }
        const text = await response.text();
        throw new Error(text || "Failed to create split");
      }

      setStatus("success");
      setStatusMessage(t(lang, "Project saved. On-chain publishing will use this data."));
      setProjectName("");
      setOverview("");
      setCollaborators([createCollaborator()]);
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : t(lang, "Unexpected error"),
      );
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p className="text-slate-500">Connect a wallet before saving split drafts.</p>
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
            className="rounded-full border border-pink-200 px-4 py-2 text-xs font-semibold text-pink-600 transition hover:border-pink-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isConnected
              ? `${shortAddress} · ${t(lang, "Disconnect")}`
              : connectStatus === "pending"
              ? t(lang, "Connecting…")
              : t(lang, "Connect wallet")}
          </button>
          {secondaryConnector && !isConnected && (
            <button
              type="button"
              onClick={() => connect({ connector: secondaryConnector })}
              className="mt-2 block text-xs font-semibold text-slate-500 underline"
            >
              {t(lang, "Use WalletConnect instead")}
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
            {t(lang, "Project")}
          </label>
          <input
            required
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder={t(lang, "Midnight Bloom")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Overview")}
          </label>
          <textarea
            value={overview}
            onChange={(event) => setOverview(event.target.value)}
            rows={3}
            placeholder={t(lang, "Streaming + merch pool")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t(lang, "Collaborators")}</span>
            <span>
              {t(lang, "Total")} {totalPercent}%
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {collaborators.map((collab, index) => (
              <div key={collab.id} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {t(lang, "Collaborator")} #{index + 1}
                  </span>
                  {collaborators.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCollaborator(collab.id)}
                      className="text-pink-500 hover:text-pink-600"
                    >
                      {t(lang, "Remove")}
                    </button>
                  )}
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <input
                    required
                    value={collab.name}
                    onChange={(event) => updateCollaborator(collab.id, "name", event.target.value)}
                    placeholder={t(lang, "Aura")}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
                  />
                  <input
                    value={collab.role}
                    onChange={(event) => updateCollaborator(collab.id, "role", event.target.value)}
                    placeholder={t(lang, "Producer")}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
                  />
                </div>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <input
                    type="email"
                    value={collab.email}
                    onChange={(event) => updateCollaborator(collab.id, "email", event.target.value)}
                    placeholder="team@label.com"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
                  />
                  <input
                    value={collab.payout}
                    onChange={(event) => updateCollaborator(collab.id, "payout", event.target.value)}
                    placeholder={t(lang, "Wallet or PayPal")}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addCollaborator}
            className="mt-4 w-full rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600"
          >
            {t(lang, "Add collaborator")}
          </button>
        </div>

        <button
          type="submit"
          disabled={!isConnected || status === "loading"}
          className="w-full rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? t(lang, "Writing to Polygon…")
            : t(lang, "Create on-chain split")}
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
              ? t(lang, "Success")
              : status === "error"
              ? t(lang, "Error")
              : t(lang, "In progress")}
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
    setStatusMessage(t(lang, "Submitting…"));

    try {
      const response = await fetch("/api/alpha-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: lang }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setStatus("error");
          setStatusMessage(t(lang, "Please log in before submitting."));
          return;
        }
        const text = await response.text();
        throw new Error(text || "Failed to submit form");
      }

      setStatus("success");
      setStatusMessage(
        t(lang, "We saved your info. Check your inbox soon."),
      );
      setForm({ name: "", email: "", role: "artist", revenue_range: "<10k", current_process: "" });
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : t(lang, "Unexpected error"),
      );
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 text-slate-900">
      <p className="text-xs uppercase tracking-[0.35em] text-sky-200">
        {t(lang, "Step 2")}
      </p>
      <h3 className="mt-1 text-2xl font-semibold">
        {t(lang, "Alpha assist")}
      </h3>
      <p className="text-sm text-slate-200">
        {t(lang, "For collaborators without wallets.")}
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Name")}
          </label>
          <input
            required
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder={t(lang, "Aura Li")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Email")}
          </label>
          <input
            required
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="team@label.com"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Role")}
          </label>
          <select
            name="role"
            required
            value={form.role}
            onChange={(event) => handleChange("role", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-pink-400 focus:outline-none"
          >
            <option value="artist">{t(lang, "Artist / Band")}</option>
            <option value="producer">{t(lang, "Producer / Writer")}</option>
            <option value="manager">{t(lang, "Manager / Label")}</option>
            <option value="ops">{t(lang, "Ops / Finance")}</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Annual indie revenue")}
          </label>
          <select
            name="revenue_range"
            required
            value={form.revenue_range}
            onChange={(event) => handleChange("revenue_range", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-pink-400 focus:outline-none"
          >
            <option value="<10k">{t(lang, "Under $10k")}</option>
            <option value="10-50k">{t(lang, "$10k - $50k")}</option>
            <option value=">50k">{t(lang, "Above $50k")}</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {t(lang, "Current process")}
          </label>
          <textarea
            name="current_process"
            value={form.current_process}
            onChange={(event) => handleChange("current_process", event.target.value)}
            rows={3}
            placeholder={t(lang, "Sheets, manual payouts…")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading"
            ? t(lang, "Submitting…")
            : t(lang, "Save info")}
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
              ? t(lang, "Success")
              : status === "error"
              ? t(lang, "Error")
              : t(lang, "In progress")}
          </p>
          {statusMessage && <p className="mt-1">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
}
