import Link from "next/link";
import { PageShell } from "../../components/PageShell";

export default function LoginPage() {
  return (
    <PageShell title="Log back in" subtitle="访问你的 splits、粉丝权益与钱包工具。">
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Email</label>
          <input
            type="email"
            placeholder="team@label.com"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-90"
        >
          Mock Login
        </button>
      </form>
      <p className="text-sm text-slate-300">
        Need an account?{" "}
        <Link href="/signup" className="text-emerald-300 underline-offset-4 hover:underline">
          Create one
        </Link>
      </p>
    </PageShell>
  );
}
