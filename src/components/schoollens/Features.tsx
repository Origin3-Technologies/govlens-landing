const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Smart File Upload",
    desc: "Accepts any Excel or CSV format, including BEIS exports and multi-row header forms common in Philippine schools. Converts to fast, queryable format instantly.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "AI Data Quality Scoring",
    desc: "Every dataset gets a quality score from 0–100. SchoolLens understands Philippine school data patterns like LRN formats, school year conventions, and grade level labels.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "7-Type Cleaning Engine",
    desc: "Detects and suggests fixes for typos, inconsistent values, and outliers in enrollment and personnel data. You approve every fix — nothing changes without your confirmation.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Auto-Generated Dashboards",
    desc: "The moment your data is clean, SchoolLens builds a relevant dashboard automatically. Enrollment gets headcount per grade. HR gets teacher plantilla breakdowns.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Ask AI in Filipino or English",
    desc: '"Ilan ang Grade 7 students ngayong SY?" or "How many vacant teacher items in the secondary level?" — answered instantly from your own data.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Role-Based Access",
    desc: "Principal sees everything. Department heads see their own section. Registrar uploads enrollment only. Access control means your data reaches the right people.",
  },
];

export default function SlFeatures() {
  return (
    <section id="features" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--sl)" }}>
          Features
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--sl-dark)",
          }}
        >
          Everything your school needs.<br />
          <em className="not-italic" style={{ color: "var(--sl)" }}>Nothing it doesn&apos;t.</em>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[560px] reveal" style={{ color: "var(--sl-muted)" }}>
          Built specifically for Philippine school data — not adapted from generic software.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="reveal sl-feat-card-hover rounded-2xl p-7 cursor-default"
              style={{ background: "var(--sl-surf)", border: "1px solid var(--sl-border)", transition: "all 0.2s" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--slbg)", color: "var(--sl)" }}
              >
                {f.icon}
              </div>
              <div
                className="font-bold text-[15px] mb-1.5"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--sl-dark)" }}
              >
                {f.title}
              </div>
              <div className="text-[13px] leading-[1.6]" style={{ color: "var(--sl-muted)" }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
