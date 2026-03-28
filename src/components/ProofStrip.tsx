const LOGOS = [
  "Agriculture Registry",
  "HR & Employees",
  "Budget & Finance",
  "Health Records",
  "DSWD & Social",
  "Infrastructure",
];

export default function ProofStrip() {
  return (
    <div
      className="py-6 px-[5%] text-center"
      style={{
        background: "var(--surf)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--sub)" }}
      >
        Designed for Philippine government systems
      </div>
      <div className="flex items-center justify-center gap-10 flex-wrap">
        {LOGOS.map((l) => (
          <span
            key={l}
            className="text-[13px] font-bold opacity-60"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--sub)" }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
