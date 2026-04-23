const STEPS = [
  {
    num: 1,
    title: "Upload your file",
    desc: "Drop any Excel or CSV file into SchoolLens. BEIS exports, SIMS data, teacher plantilla forms — multi-row headers and merged cells all handled automatically.",
    tag: "Works with your existing files",
  },
  {
    num: 2,
    title: "AI cleans and scores it",
    desc: "SchoolLens scores your data quality from 0–100, flags issues, and suggests fixes. You approve every change before it's applied. Your data, your control.",
    tag: "LensReady — clean before query",
  },
  {
    num: 3,
    title: "Explore and ask questions",
    desc: 'Live dashboards appear instantly. Ask questions in Filipino or English. "Ilan ang Grade 7 students ngayong SY?" — get the answer in seconds, not days.',
    tag: "Filipino & English AI",
  },
];

export default function SlHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-[5%]"
      style={{ background: "var(--sl-surf)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--sl)" }}>
          How it works
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--sl-dark)",
          }}
        >
          From Excel to insights<br />
          <em className="not-italic" style={{ color: "var(--sl)" }}>in three steps.</em>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[560px] reveal" style={{ color: "var(--sl-muted)" }}>
          No IT setup. No reformatting. Just upload the file your office already has.
        </p>

        <div className="sl-hiw-connector relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {STEPS.map((s) => (
            <div key={s.num} className="reveal text-center px-6 relative z-10">
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-5 font-extrabold text-[22px] text-white"
                style={{
                  fontFamily: "var(--font-sora, Sora, sans-serif)",
                  background: "var(--sl)",
                  boxShadow: "0 8px 24px rgba(26,86,196,.25)",
                }}
              >
                {s.num}
              </div>
              <div
                className="font-bold text-[17px] mb-2"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--sl-dark)" }}
              >
                {s.title}
              </div>
              <div className="text-sm leading-[1.65] mb-2.5" style={{ color: "var(--sl-muted)" }}>
                {s.desc}
              </div>
              <span
                className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ color: "var(--sl)", background: "var(--slbg)" }}
              >
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
