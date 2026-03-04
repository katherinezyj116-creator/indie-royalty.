import Link from "next/link";
import { PageShell } from "../../components/PageShell";

const fields = [
  { label: "Full name", type: "text", placeholder: "Aura Li" },
  { label: "Email", type: "email", placeholder: "team@label.com" },
  { label: "Password", type: "password", placeholder: "Create a strong password" },
];

export default function SignupPage() {
  return (
    <PageShell
      title="Create your Indie Royalty workspace"
      subtitle="统一的注册入口，确保所有合作者都走同一套流程。"
    >
      <form className="space-y-6">
        {fields.map((field) => (
          <div key={field.label} className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-300">
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
            />
          </div>
        ))}
        <button
          type="button"
          className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110"
        >
          Mock Signup
        </button>
      </form>
      <p className="text-sm text-slate-300">
        Already have an account?{" "}
        <Link href="/login" className="text-emerald-300 underline-offset-4 hover:underline">
          Go to login
        </Link>
      </p>
    </PageShell>
  );
}
