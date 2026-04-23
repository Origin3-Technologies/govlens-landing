const PROBLEMS = [
  {
    num: "01",
    title: "Data trapped in spreadsheets",
    desc: "Enrollment, teacher plantilla, grades, and attendance live in separate Excel files across different offices — no single view, no way to cross-reference or spot patterns quickly.",
  },
  {
    num: "02",
    title: "Answering DepEd queries takes days",
    desc: 'A simple question like "how many Grade 7 students are enrolled this SY?" requires manual tallying across BEIS exports, SIMS files, and office records — every time it\'s asked.',
  },
  {
    num: "03",
    title: "Reports are error-prone and slow",
    desc: "End-of-quarter submissions and BEIS reports are copy-pasted from inconsistent files. Principals and department heads make decisions on outdated numbers. SchoolLens gives live dashboards that update automatically.",
  },
];

export default function SlProblem() {
  return (
    <section id="problem" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--sl)" }}>
          The problem
        </div>
        <h2
          className="reveal font-extrabold leading-[1.15] tracking-[-1px] mb-4"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--sl-dark)",
          }}
        >
          Every school is sitting on<br />
          <em className="not-italic" style={{ color: "var(--sl)" }}>data it cannot use.</em>
        </h2>
        <p className="reveal text-base leading-[1.7] mb-14 max-w-[560px]" style={{ color: "var(--sl-muted)" }}>
          Dozens of Excel files. No way to ask questions. Reports that take days. SchoolLens changes all three.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((p) => (
            <div
              key={p.num}
              className="reveal sl-problem-card sl-card-hover relative rounded-2xl px-7 py-7 overflow-hidden"
              style={{ border: "1px solid var(--sl-border)" }}
            >
              <div
                className="font-extrabold leading-none mb-4"
                style={{
                  fontFamily: "var(--font-sora, Sora, sans-serif)",
                  fontSize: 48,
                  color: "var(--slbg2)",
                }}
              >
                {p.num}
              </div>
              <div
                className="font-bold mb-2 text-[17px]"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--sl-dark)" }}
              >
                {p.title}
              </div>
              <div className="text-sm leading-[1.65]" style={{ color: "var(--sl-muted)" }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
