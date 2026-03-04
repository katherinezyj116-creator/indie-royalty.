import { PageShell } from "../../components/PageShell";

const cards = [
  {
    title: "Receipt NFTs",
    body: "所有凭证都在 Polygon Amoy，同步协作者和粉丝的透明记录。",
  },
  {
    title: "Fan perks",
    body: "针对超级粉丝推出限量权益，实时追踪兑换状态。",
  },
  {
    title: "Split tree",
    body: "直观查看每个作品的分账树，随时导出快照。",
  },
];

export default function DashboardPage() {
  return (
    <PageShell
      title="Control center"
      subtitle="一处浏览钱包、Splits、粉丝权益，下一步再接入真实数据。"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Module</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
