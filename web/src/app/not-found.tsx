import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#fff5fb] via-[#f5f7ff] to-[#eefbff] px-6 text-center text-slate-900">
      <p className="text-xs uppercase tracking-[0.35em] text-pink-400">404</p>
      <h1 className="mt-4 text-3xl font-semibold">This route is not wired yet</h1>
      <p className="mt-2 max-w-md text-slate-500">
        We are still wiring this path. Use the main navigation to open pages that are already live.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-gradient-to-r from-[#ff63d3] to-[#ffa07a] px-6 py-3 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
