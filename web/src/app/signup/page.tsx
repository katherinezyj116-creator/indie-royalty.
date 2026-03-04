"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "../../components/PageShell";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuthStore } from "../../lib/stores/auth";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [status, setStatus] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("Registering...");
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = await response.json();
    setAuth(payload);
    setStatus("Success! Redirecting...");
    router.push("/dashboard");
  };

  return (
    <PageShell
      title="Create your Indie Royalty workspace"
      subtitle="统一的注册入口，确保所有合作者都走同一套流程。"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Full name</label>
          <input
            {...register("name")}
            placeholder="Aura Li"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          {formState.errors.name && (
            <p className="text-xs text-rose-300">{formState.errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="team@label.com"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          {formState.errors.email && (
            <p className="text-xs text-rose-300">{formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-300">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Create a strong password"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          {formState.errors.password && (
            <p className="text-xs text-rose-300">{formState.errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110"
        >
          {formState.isSubmitting ? "Processing..." : "Mock Signup"}
        </button>
        {status && <p className="text-sm text-emerald-200">{status}</p>}
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
