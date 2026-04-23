const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Upload anything. Get clean data.",
    desc: "Handles any format — multi-row headers, merged cells, inconsistent values. AI flags issues and suggests fixes. You approve every change.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Your data, live — right away.",
    desc: "Department-specific dashboards appear the moment your file is clean. Each role sees what they need — no setup, no configuration.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Ask questions the way you think.",
    desc: 'Type in Filipino or English. "Ilan ang bakante sa HR ngayon?" Get answers in seconds, not days.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-14 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--dark)",
          }}
        >
          Built for the way Philippine<br />
          <em className="not-italic" style={{ color: "var(--gl)" }}>government works.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="reveal feat-card-hover rounded-2xl p-7 cursor-default"
              style={{ background: "var(--surf)", border: "1px solid var(--border)", transition: "all 0.2s" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--glbg)", color: "var(--gl)" }}
              >
                {p.icon}
              </div>
              <div
                className="font-bold text-[15px] mb-1.5"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}
              >
                {p.title}
              </div>
              <div className="text-[13px] leading-[1.6]" style={{ color: "var(--muted)" }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
