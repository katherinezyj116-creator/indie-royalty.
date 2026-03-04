import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">404</p>
      <h1 className="mt-4 text-3xl font-semibold">This route is not wired yet</h1>
      <p className="mt-2 max-w-md text-slate-400">
        我们正在整理链接结构，请从主导航选择已激活的页面。
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950"
      >
        Back to home
      </Link>
    </div>
  );
}
