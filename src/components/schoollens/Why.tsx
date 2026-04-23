const STATS = [
  { stat: "5 min", label: "To onboard your first dataset", sub: "Upload once. Query forever." },
  { stat: "₱0", label: "Hardware or IT setup needed", sub: "Just a browser. Any device." },
  { stat: "100%", label: "Your data, your control", sub: "Each school's data is fully isolated." },
  { stat: "45 days", label: "Free pilot — no commitment", sub: "See the value before you pay anything." },
];

export default function SlWhy() {
  return (
    <section className="py-24 px-[5%]" style={{ background: "var(--sl-surf)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--sl)" }}>
          Why SchoolLens
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-12 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--sl-dark)",
          }}
        >
          Numbers that matter<br />to your{" "}
          <em className="not-italic" style={{ color: "var(--sl)" }}>school.</em>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.stat}
              className="reveal rounded-2xl p-6 text-center"
              style={{ background: "var(--white)", border: "1px solid var(--sl-border)" }}
            >
              <div
                className="font-extrabold mb-1"
                style={{
                  fontFamily: "var(--font-sora, Sora, sans-serif)",
                  fontSize: 32,
                  color: "var(--sl)",
                }}
              >
                {s.stat}
              </div>
              <div className="text-[13px] font-semibold mb-1" style={{ color: "var(--sl-dark)" }}>
                {s.label}
              </div>
              <div className="text-xs" style={{ color: "var(--sl-muted)" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
