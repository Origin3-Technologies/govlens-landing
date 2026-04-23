const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Smart File Upload",
    desc: "Accepts any Excel or CSV format, including multi-row headers common in Philippine government forms. Converts to fast, queryable format instantly.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "AI Data Quality Scoring",
    desc: "Every dataset gets a quality score from 0 to 100. GovLens understands Philippine-specific patterns like Salary Grades, Civil Service eligibility, and position titles.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "7-Type Cleaning Engine",
    desc: "Detects and suggests fixes for typos, inconsistent values, sentinel placeholders, and outliers. You approve every fix — nothing changes without your confirmation.",
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
    title: "Auto-Generated Dashboards",
    desc: "The moment your data is clean, GovLens builds a relevant dashboard automatically. HR gets headcount charts. Agriculture gets crop and farmer breakdowns.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Ask AI in Filipino or English",
    desc: 'Type any question about your data. "Ano ang average na sahod ng SG-15?" or "How many vacancies in Engineering?" — answered instantly.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Role-Based Access",
    desc: "Governor sees everything. Department heads see their own data. Field staff upload only. Access control means your data reaches the right people.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="5" rx="1" />
        <rect x="13" y="3" width="8" height="5" rx="1" />
        <rect x="3" y="11" width="8" height="10" rx="1" />
        <rect x="13" y="11" width="8" height="5" rx="1" />
      </svg>
    ),
    title: "Drag-and-Drop Dashboard Builder",
    desc: "Build the exact view your office needs — drag KPI cards, bar charts, donuts, and timelines onto a live canvas. Save, share, and print to PDF in one click.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    title: "Live Database Connections",
    desc: "Connect directly to your existing PostgreSQL database or Google Sheets. Data refreshes automatically — no manual exports, no stale reports.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    title: "Cross-Dataset AI Chat",
    desc: "Ask questions that span multiple datasets at once. \"Which barangay has the most 4Ps families and how many are employed?\" — SAI joins your data and answers in seconds.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--gl)" }}>
          Features
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--dark)",
          }}
        >
          Everything your office needs.<br />
          <em className="not-italic" style={{ color: "var(--gl)" }}>Nothing it doesn&apos;t.</em>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[560px] reveal" style={{ color: "var(--muted)" }}>
          Built specifically for Philippine government data — not adapted from generic software.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="reveal feat-card-hover rounded-2xl p-7 cursor-default"
              style={{ background: "var(--surf)", border: "1px solid var(--border)", transition: "all 0.2s" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--glbg)", color: "var(--gl)" }}
              >
                {f.icon}
              </div>
              <div
                className="font-bold text-[15px] mb-1.5"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}
              >
                {f.title}
              </div>
              <div className="text-[13px] leading-[1.6]" style={{ color: "var(--muted)" }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
