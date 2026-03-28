export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center pt-16 px-[5%] relative overflow-hidden"
      style={{ background: "var(--white)" }}
    >
      <div className="hero-bg absolute inset-0 z-0 overflow-hidden">
        <div className="hero-grid-line" />
      </div>

      <div
        className="relative z-10 max-w-[1100px] mx-auto w-full grid gap-16 items-center"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Left */}
        <div className="animate-fade-up">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6"
            style={{ color: "var(--gl)", background: "var(--glbg)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gl2)" }} />
            Built for Philippine LGUs
          </div>

          <h1
            className="font-extrabold leading-[1.1] tracking-[-1.5px] mb-5"
            style={{
              fontFamily: "var(--font-sora, Sora, sans-serif)",
              fontSize: "clamp(36px, 4.5vw, 54px)",
              color: "var(--dark)",
            }}
          >
            See your government data{" "}
            <em className="not-italic" style={{ color: "var(--gl)" }}>clearly.</em>
          </h1>

          <p className="text-lg leading-[1.75] mb-9 max-w-[480px]" style={{ color: "var(--muted)" }}>
            GovLens turns any government Excel file into live dashboards, AI-powered insights,
            and clean, reliable data — in minutes. No IT team required.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#pilot"
              className="btn-primary-hover inline-block text-[15px] font-semibold px-8 py-3.5 rounded-xl no-underline"
            >
              Apply for Access →
            </a>
            <a
              href="#how-it-works"
              className="btn-ghost-hover flex items-center gap-1.5 text-sm font-medium no-underline"
            >
              See how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2.5 text-xs" style={{ color: "var(--sub)" }}>
            <div className="flex">
              {["C", "A", "R"].map((l, i) => (
                <div
                  key={l}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white"
                  style={{ background: "var(--glbg)", color: "var(--gl)", marginLeft: i > 0 ? -8 : 0 }}
                >
                  {l}
                </div>
              ))}
            </div>
            Piloting with LGUs in Apayao and the Cordillera Administrative Region
          </div>
        </div>

        {/* Right — Mockup */}
        <div className="hidden md:block animate-fade-up-delay">
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              background: "var(--white)",
              border: "1px solid var(--border)",
              boxShadow: "0 32px 80px rgba(15,110,86,.12), 0 0 0 1px rgba(15,110,86,.05)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-3" style={{ background: "var(--gl)" }}>
              <div
                className="font-extrabold text-[15px]"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "#fff" }}
              >
                Gov<span style={{ color: "var(--glm)" }}>Lens</span>
              </div>
              <div
                className="text-[10px] px-3 py-1 rounded-full"
                style={{ color: "rgba(255,255,255,.6)", background: "rgba(255,255,255,.1)" }}
              >
                Apayao · Live
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                {[
                  { val: "1,284", label: "Total Employees", delta: "↑ 98% records complete" },
                  { val: "23", label: "Vacant Positions", delta: "↓ needs action" },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl p-3" style={{ background: "var(--surf)" }}>
                    <div
                      className="text-[22px] font-extrabold"
                      style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}
                    >
                      {k.val}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--sub)" }}>{k.label}</div>
                    <div className="text-[10px] font-semibold mt-1" style={{ color: "var(--gl)" }}>{k.delta}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-3" style={{ background: "var(--surf)" }}>
                <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold" style={{ color: "var(--gl)" }}>
                  <div className="chat-dot" />
                  GovLens AI
                </div>
                <div
                  className="text-[11px] px-3 py-1.5 rounded-[12px_3px_12px_12px] mb-1.5 ml-auto max-w-[85%]"
                  style={{ background: "var(--gl)", color: "#fff" }}
                >
                  Ilan ang bakanteng posisyon sa Apayao?
                </div>
                <div
                  className="text-[11px] px-3 py-1.5 rounded-[3px_12px_12px_12px] max-w-[90%] leading-[1.5]"
                  style={{ background: "#fff", border: "1px solid var(--border)" }}
                >
                  <strong style={{ color: "var(--gl)" }}>23 vacant positions</strong> sa Apayao — 14 sa engineering, 9 sa health sector ngayong quarter.
                </div>
              </div>

              <div
                className="mt-2.5 rounded-xl px-3.5 py-2.5 flex items-center justify-between"
                style={{ background: "var(--glbg)" }}
              >
                <div className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>Data quality score</div>
                <div className="flex-1 h-[5px] rounded-full mx-2.5 overflow-hidden" style={{ background: "var(--glbg2)" }}>
                  <div className="h-full rounded-full w-[87%]" style={{ background: "var(--gl)" }} />
                </div>
                <div
                  className="text-lg font-extrabold"
                  style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--gl)" }}
                >
                  87
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
