export default function SlHero() {
  return (
    <section
      className="min-h-screen flex items-center pt-16 px-[5%] relative overflow-hidden"
      style={{ background: "var(--white)" }}
    >
      <div className="sl-hero-bg absolute inset-0 z-0 overflow-hidden">
        <div className="sl-hero-grid" />
      </div>

      <div
        className="relative z-10 max-w-[1100px] mx-auto w-full grid gap-16 items-center"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Left */}
        <div className="animate-fade-up">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6"
            style={{ color: "var(--sl)", background: "var(--slbg)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--sl2)" }} />
            Built for Philippine Schools
          </div>

          <h1
            className="font-extrabold leading-[1.1] tracking-[-1.5px] mb-5"
            style={{
              fontFamily: "var(--font-sora, Sora, sans-serif)",
              fontSize: "clamp(36px, 4.5vw, 54px)",
              color: "var(--sl-dark)",
            }}
          >
            See your school data{" "}
            <em className="not-italic" style={{ color: "var(--sl)" }}>clearly.</em>
          </h1>

          <p className="text-lg leading-[1.75] mb-9 max-w-[480px]" style={{ color: "var(--sl-muted)" }}>
            SchoolLens turns any school Excel file into live dashboards, AI-powered insights,
            and clean, reliable data — in minutes. No IT team required.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#pilot"
              className="sl-btn-primary inline-block text-[15px] font-semibold px-8 py-3.5 rounded-xl no-underline"
            >
              Apply for Access →
            </a>
            <a
              href="#how-it-works"
              className="sl-btn-ghost flex items-center gap-1.5 text-sm font-medium no-underline"
            >
              See how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2.5 text-xs" style={{ color: "var(--sl-sub)" }}>
            <div className="flex">
              {["S", "D", "E"].map((l, i) => (
                <div
                  key={l}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white"
                  style={{ background: "var(--slbg)", color: "var(--sl)", marginLeft: i > 0 ? -8 : 0 }}
                >
                  {l}
                </div>
              ))}
            </div>
            Piloting with schools in the Cordillera Administrative Region
          </div>
        </div>

        {/* Right — Mockup */}
        <div className="hidden md:block animate-fade-up-delay">
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              background: "var(--white)",
              border: "1px solid var(--sl-border)",
              boxShadow: "0 32px 80px rgba(26,86,196,.12), 0 0 0 1px rgba(26,86,196,.05)",
            }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3" style={{ background: "var(--sl)" }}>
              <div
                className="font-extrabold text-[15px]"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "#fff" }}
              >
                School<span style={{ color: "var(--slm)" }}>Lens</span>
              </div>
              <div
                className="text-[10px] px-3 py-1 rounded-full"
                style={{ color: "rgba(255,255,255,.6)", background: "rgba(255,255,255,.1)" }}
              >
                SY 2025–2026 · Live
              </div>
            </div>

            <div className="p-4">
              {/* KPI cards */}
              <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                {[
                  { val: "1,842", label: "Total Enrollment", delta: "↑ 96% records complete" },
                  { val: "11", label: "Vacant Teacher Items", delta: "↓ needs action" },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl p-3" style={{ background: "var(--sl-surf)" }}>
                    <div
                      className="text-[22px] font-extrabold"
                      style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--sl-dark)" }}
                    >
                      {k.val}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--sl-sub)" }}>{k.label}</div>
                    <div className="text-[10px] font-semibold mt-1" style={{ color: "var(--sl)" }}>{k.delta}</div>
                  </div>
                ))}
              </div>

              {/* AI chat bubble */}
              <div className="rounded-xl p-3" style={{ background: "var(--sl-surf)" }}>
                <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold" style={{ color: "var(--sl)" }}>
                  <div className="sl-chat-dot" />
                  SchoolLens AI
                </div>
                <div
                  className="text-[11px] px-3 py-1.5 rounded-[12px_3px_12px_12px] mb-1.5 ml-auto max-w-[85%]"
                  style={{ background: "var(--sl)", color: "#fff" }}
                >
                  Ilan ang Grade 7 students ngayong SY?
                </div>
                <div
                  className="text-[11px] px-3 py-1.5 rounded-[3px_12px_12px_12px] max-w-[90%] leading-[1.5]"
                  style={{ background: "#fff", border: "1px solid var(--sl-border)" }}
                >
                  <strong style={{ color: "var(--sl)" }}>312 Grade 7 students</strong> — 158 female, 154 male. Enrollment is up 8% from last SY.
                </div>
              </div>

              {/* Quality score */}
              <div
                className="mt-2.5 rounded-xl px-3.5 py-2.5 flex items-center justify-between"
                style={{ background: "var(--slbg)" }}
              >
                <div className="text-[10px] font-semibold" style={{ color: "var(--sl-muted)" }}>Data quality score</div>
                <div className="flex-1 h-[5px] rounded-full mx-2.5 overflow-hidden" style={{ background: "var(--slbg2)" }}>
                  <div className="h-full rounded-full w-[91%]" style={{ background: "var(--sl)" }} />
                </div>
                <div
                  className="text-lg font-extrabold"
                  style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--sl)" }}
                >
                  91
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
