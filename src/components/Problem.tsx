const PROBLEMS = [
  {
    num: "01",
    title: "Data trapped in spreadsheets",
    desc: "Your Agriculture, HR, and Budget data lives in separate Excel files across different offices — with no single view and no easy way to compare or query.",
  },
  {
    num: "02",
    title: "No way to ask questions",
    desc: 'Getting a simple answer like "how many employees are on plantilla?" requires manual tallying, waiting for IT, or hours of VLOOKUP formulas.',
  },
  {
    num: "03",
    title: "Reports take days, not minutes",
    desc: "End-of-quarter reporting is a manual, error-prone process. Decision makers work with outdated numbers. GovLens gives live dashboards that update automatically.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--gl)" }}>
          The problem
        </div>
        <h2
          className="reveal font-extrabold leading-[1.15] tracking-[-1px] mb-4"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--dark)",
          }}
        >
          Every LGU is sitting on<br />
          <em className="not-italic" style={{ color: "var(--gl)" }}>data it cannot use.</em>
        </h2>
        <p className="reveal text-base leading-[1.7] mb-14 max-w-[560px]" style={{ color: "var(--muted)" }}>
          Hundreds of Excel files. No way to ask questions. Reports that take days. GovLens changes all three.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((p) => (
            <div
              key={p.num}
              className="reveal problem-card card-hover relative rounded-2xl px-7 py-7 overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="font-extrabold leading-none mb-4"
                style={{
                  fontFamily: "var(--font-sora, Sora, sans-serif)",
                  fontSize: 48,
                  color: "var(--glbg)",
                }}
              >
                {p.num}
              </div>
              <div
                className="font-bold mb-2 text-[17px]"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}
              >
                {p.title}
              </div>
              <div className="text-sm leading-[1.65]" style={{ color: "var(--muted)" }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
