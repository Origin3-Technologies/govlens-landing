export default function SlFooter() {
  return (
    <footer className="py-12 px-[5%]" style={{ background: "var(--sl-dark)" }}>
      <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-5">
        <div>
          <div
            className="font-extrabold text-lg"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "#fff" }}
          >
            School<span style={{ color: "var(--slm)" }}>Lens</span>
          </div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,.35)" }}>
            by Origin3 · Built in the Philippines for Philippine schools
          </div>
        </div>

        <div className="flex gap-6">
          {[
            { label: "solutions@origin3.net", href: "mailto:solutions@origin3.net" },
            { label: "origin3.net", href: "https://origin3.net" },
            { label: "Apply for Access", href: "#pilot" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="sl-footer-link text-[13px] no-underline">
              {l.label}
            </a>
          ))}
        </div>

        <div className="w-full text-[11px]" style={{ color: "rgba(255,255,255,.2)" }}>
          © 2025 Origin3. SchoolLens is a product of Origin3 · schoollens.ph
        </div>
      </div>
    </footer>
  );
}
