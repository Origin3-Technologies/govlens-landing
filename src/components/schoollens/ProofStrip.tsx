const ITEMS = [
  "Enrollment Records",
  "Teacher Plantilla",
  "Grades & Performance",
  "Attendance Tracking",
  "School Budget",
  "DepEd Forms",
];

export default function SlProofStrip() {
  return (
    <div
      className="py-6 px-[5%] text-center"
      style={{
        background: "var(--sl-surf)",
        borderTop: "1px solid var(--sl-border)",
        borderBottom: "1px solid var(--sl-border)",
      }}
    >
      <div
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--sl-sub)" }}
      >
        Designed for Philippine school data systems
      </div>
      <div className="flex items-center justify-center gap-10 flex-wrap">
        {ITEMS.map((l) => (
          <span
            key={l}
            className="text-[13px] font-bold opacity-60"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--sl-sub)" }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
