"use client";

import Link from "next/link";
import { PageShell } from "../../components/PageShell";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/stores/auth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = await response.json();
    setAuth(payload);
    router.push("/dashboard");
  };

  return (
    <PageShell title="Log back in" subtitle="访问你的 splits、粉丝权益与钱包工具。">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Enter password"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
          />
          {formState.errors.password && (
            <p className="text-xs text-rose-300">{formState.errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-90"
        >
          {formState.isSubmitting ? "Processing..." : "Mock Login"}
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
