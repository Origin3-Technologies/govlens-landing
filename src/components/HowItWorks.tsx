const STEPS = [
  {
    num: 1,
    title: "Upload your file",
    desc: "Drop any Excel or CSV file into GovLens. Multi-row headers, merged cells, inconsistent formats — all handled automatically.",
    tag: "Works with your existing files",
  },
  {
    num: 2,
    title: "AI cleans and scores it",
    desc: "GovLens scores your data quality from 0–100, flags issues, and suggests fixes. You approve every change before it's applied. Your data, your control.",
    tag: "LensReady — clean before query",
  },
  {
    num: 3,
    title: "Explore and ask questions",
    desc: 'Live dashboards appear instantly. Ask questions in Filipino or English. "Ilang bakante sa HR ngayon?" — get the answer in seconds, not days.',
    tag: "Filipino & English AI",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-[5%]"
      style={{ background: "var(--surf)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--gl)" }}>
          How it works
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--dark)",
          }}
        >
          From Excel to insights<br />
          <em className="not-italic" style={{ color: "var(--gl)" }}>in three steps.</em>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[560px] reveal" style={{ color: "var(--muted)" }}>
          No IT setup. No reformatting. Just upload the file your office already has.
        </p>

        {/* Steps */}
        <div className="hiw-connector relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {STEPS.map((s) => (
            <div key={s.num} className="reveal text-center px-6 relative z-10">
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-5 font-extrabold text-[22px] text-white"
                style={{
                  fontFamily: "var(--font-sora, Sora, sans-serif)",
                  background: "var(--gl)",
                  boxShadow: "0 8px 24px rgba(15,110,86,.25)",
                }}
              >
                {s.num}
              </div>
              <div
                className="font-bold text-[17px] mb-2"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}
              >
                {s.title}
              </div>
              <div className="text-sm leading-[1.65] mb-2.5" style={{ color: "var(--muted)" }}>
                {s.desc}
              </div>
              <span
                className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ color: "var(--gl)", background: "var(--glbg)" }}
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
