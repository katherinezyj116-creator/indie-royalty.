const features = [
  {
    title: "Transparent on-chain splits",
    description:
      "Design royalty trees once, then let the contract auto-distribute every stream, sync, or sale in real time.",
  },
  {
    title: "Fan-backed releases",
    description:
      "Offer limited song shares or NFT memberships so superfans can invest, unlock perks, and join the journey.",
  },
  {
    title: "Compliance-ready vault",
    description:
      "Store lyric sheets, stems, and ownership attestations with version control so legal reviews take minutes, not weeks.",
  },
];

const steps = [
  {
    label: "01",
    title: "Connect",
    body: "Artists onboard with their wallet, upload assets, and invite collaborators with granular roles.",
  },
  {
    label: "02",
    title: "Configure",
    body: "Draft split rules, add fan token or NFT tiers, and preview payouts before anything goes live.",
  },
  {
    label: "03",
    title: "Launch",
    body: "Publish to the Indie Royalty marketplace, let fans fund releases, and watch real-time dashboards update automatically.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Indie Royalty</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
            A Web3-native toolkit for indie artists to own their splits, unlock fan capital, and scale releases globally.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            We build the boring but critical infrastructure—smart contracts, payout orchestration, compliance workflows—so you can
            focus on making timeless records. Plug in once, pay collaborators instantly, and invite fans to invest with
            confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:team@indie-royalty.com"
              className="rounded-full bg-teal-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Book a walkthrough
            </a>
            <a
              href="https://github.com/katherinezyj116-creator/indie-royalty."
              className="rounded-full border border-slate-600 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
            >
              View roadmap
            </a>
          </div>
        </div>
      </header>

      <section className="px-6 py-14 sm:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Workflow</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">From split draft to on-chain launch in days, not months.</h2>
            </div>
            <div className="text-4xl font-semibold text-teal-200">
              2,400+
              <span className="ml-3 text-base font-normal text-slate-400">payouts automated in beta</span>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{step.label}</span>
                <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 pb-16 sm:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-teal-400/30 bg-teal-400/10 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-200">Coming soon</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Fan shares + NFT member drops</h3>
          <p className="mt-3 text-base text-slate-200">
            We are piloting the first cohort of fan-owned releases. Join the waitlist to reserve your slot and co-design how fans
            earn alongside you.
          </p>
          <a
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900"
            href="https://forms.gle/fan-waitlist"
            target="_blank"
            rel="noreferrer"
          >
            Join the waitlist
          </a>
        </div>
      </footer>
    </div>
  );
}
