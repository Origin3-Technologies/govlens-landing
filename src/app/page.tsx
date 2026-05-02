"use client";
import { useEffect, useState } from "react";

/* ── SCROLL REVEAL ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-delay");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-[5%] h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "var(--gl)", fontFamily: "var(--font-sora, Sora, sans-serif)" }}
          >
            GL
          </div>
          <span className="font-bold text-[15px]" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}>
            GovLens
          </span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          <a href="#in-a-box" className="nav-link text-sm font-medium no-underline">In a Box</a>
          <a href="#product" className="nav-link text-sm font-medium no-underline">How It Works</a>
        </div>
        <a
          href="#pilot-form"
          className="btn-primary text-sm font-semibold px-5 py-2 rounded-lg no-underline"
        >
          Request a Pilot
        </a>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const [tab, setTab] = useState(0);
  const tabs = ["Collect", "Connect", "Understand"];
  const tabContent = [
    {
      label: "Collect",
      headline: "Any source. Any format.",
      body: "Bring data into GovLens by uploading any Excel or CSV, or by connecting live systems: PostgreSQL databases, Google Sheets, or your existing HRIS. GovLens reads multi-row Philippine government headers automatically.",
      mock: (
        <div className="rounded-xl p-4" style={{ background: "var(--glbg2)", border: "1px solid var(--glm)" }}>
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: "var(--gl)" }}>File Upload</div>
          <div className="flex flex-col gap-2">
            {["HR_Plantilla_2024.xlsx", "HouseholdProfile_Q1.xlsx", "AgriRegistry_2024.csv"].map((f, i) => (
              <div key={f} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-[12px] flex-1" style={{ color: "var(--dark)" }}>{f}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: i === 0 ? "#dcfce7" : i === 1 ? "#fef9c3" : "var(--glbg2)", color: i === 0 ? "#15803d" : i === 1 ? "#854d0e" : "var(--gl)" }}>
                  {i === 0 ? "Ready" : i === 1 ? "Cleaning" : "Uploading"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Connect",
      headline: "Cross-dataset analysis. No SQL required.",
      body: "Link datasets from HR, agriculture, health, and social welfare. GovLens detects relationships between your data automatically: ask questions that span multiple offices and sources without writing a single formula.",
      mock: (
        <div className="rounded-xl p-4" style={{ background: "var(--glbg2)", border: "1px solid var(--glm)" }}>
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: "var(--gl)" }}>Live Connections</div>
          <div className="flex flex-col gap-2">
            {[
              { name: "Municipal HRIS", type: "PostgreSQL", dot: "#22c55e" },
              { name: "ASAP Registry", type: "Google Sheets", dot: "#22c55e" },
              { name: "Budget 2025", type: "CSV Upload", dot: "#94a3b8" },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.dot }} />
                <span className="text-[12px] flex-1 font-medium" style={{ color: "var(--dark)" }}>{c.name}</span>
                <span className="text-[11px]" style={{ color: "var(--sub)" }}>{c.type}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Understand",
      headline: "Ask in Filipino. Get answers fast.",
      body: "SAI, the GovLens AI data analyst, answers questions about your data in Filipino or English. No formulas, no SQL, no training required. Type your question and get the number, chart, or insight you need.",
      mock: (
        <div className="rounded-xl p-4" style={{ background: "var(--glbg2)", border: "1px solid var(--glm)" }}>
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase mb-3 flex items-center gap-2" style={{ color: "var(--gl)" }}>
            <span className="chat-dot" /> SAI
          </div>
          <div className="flex flex-col gap-2">
            <div className="rounded-lg px-3 py-2 text-[12px] self-end max-w-[85%]" style={{ background: "var(--gl)", color: "#fff" }}>
              Ilan ang 4Ps beneficiaries sa ating LGU?
            </div>
            <div className="rounded-lg px-3 py-2 text-[12px] self-start max-w-[90%]" style={{ background: "#fff", border: "1px solid var(--border)", color: "var(--dark)" }}>
              <strong>1,247 households</strong> ang nakalista bilang 4Ps beneficiaries. Pinaka-marami sa Barangay Magsaysay (312).
            </div>
            <div className="rounded-lg px-3 py-2 text-[12px] self-end max-w-[85%]" style={{ background: "var(--gl)", color: "#fff" }}>
              How many are IP-affiliated?
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <section
      className="hero-bg relative pt-32 pb-24 px-[5%] overflow-hidden"
      style={{ background: "var(--white)" }}
    >
      <div className="hero-grid" />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="max-w-[680px]">
          <div
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase mb-6 px-3 py-1.5 rounded-full animate-fade-up"
            style={{ background: "var(--glbg)", color: "var(--gl)", border: "1px solid var(--glbg2)" }}
          >
            <span className="chat-dot" />
            Piloting in the Cordillera Administrative Region
          </div>
          <h1
            className="font-extrabold leading-[1.1] tracking-[-2px] mb-6 animate-fade-up-delay"
            style={{
              fontFamily: "var(--font-sora, Sora, sans-serif)",
              fontSize: "clamp(36px, 5.5vw, 64px)",
              color: "var(--dark)",
            }}
          >
            The data operating system
            <br />
            <span style={{ color: "var(--gl)" }}>for Philippine LGUs.</span>
          </h1>
          <p className="text-base leading-[1.75] mb-8 max-w-[520px] animate-fade-up-2" style={{ color: "var(--muted)", fontSize: "clamp(15px, 1.4vw, 17px)" }}>
            Upload any Excel or CSV, get instant AI-powered dashboards, and ask questions about your data in Filipino or English. No IT team required.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-up-2">
            <a
              href="#pilot-form"
              className="btn-primary text-sm font-semibold px-7 py-3.5 rounded-xl no-underline inline-flex items-center gap-2"
            >
              Apply for the 6-Month Pilot
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#in-a-box"
              className="btn-ghost text-sm font-semibold px-7 py-3.5 rounded-xl no-underline border"
              style={{ borderColor: "var(--border)" }}
            >
              GovLens In a Box →
            </a>
          </div>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex gap-1 mb-5 p-1 rounded-xl inline-flex" style={{ background: "var(--glbg2)" }}>
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: tab === i ? "#fff" : "transparent",
                    color: tab === i ? "var(--gl)" : "var(--muted)",
                    boxShadow: tab === i ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    fontFamily: "var(--font-sora, Sora, sans-serif)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <h3
              className="font-bold text-xl mb-3"
              style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}
            >
              {tabContent[tab].headline}
            </h3>
            <p className="text-sm leading-[1.7]" style={{ color: "var(--muted)" }}>
              {tabContent[tab].body}
            </p>
          </div>
          <div>{tabContent[tab].mock}</div>
        </div>
      </div>
    </section>
  );
}

/* ── IN A BOX ── */
function InABox() {
  return (
    <section id="in-a-box" className="py-24 px-[5%] relative overflow-hidden" style={{ background: "var(--navy)" }}>
      <div className="navy-grid" />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase mb-4 px-3 py-1.5 rounded-full reveal"
          style={{ background: "rgba(29,158,117,0.15)", color: "var(--glm)", border: "1px solid rgba(29,158,117,0.25)" }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          GovLens In a Box: Key Differentiator
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              className="font-extrabold leading-[1.15] tracking-[-1px] mb-5 reveal"
              style={{
                fontFamily: "var(--font-sora, Sora, sans-serif)",
                fontSize: "clamp(26px, 3.2vw, 38px)",
                color: "#fff",
              }}
            >
              Full GovLens capability.<br />
              <span style={{ color: "var(--glm)" }}>No internet required.</span>
            </h2>
            <p className="text-base leading-[1.7] mb-8 reveal" style={{ color: "rgba(255,255,255,0.55)" }}>
              GovLens In a Box is a small hardware unit that runs the entire GovLens platform locally: AI cleaning, dashboards, and SAI chat: with no cloud dependency. It creates its own Wi-Fi network and syncs to the Provincial Hub when connectivity is available.
            </p>
            <div className="flex flex-col gap-5">
              {[
                {
                  label: "Works offline, anywhere",
                  desc: "Staff in barangays without internet keep working. Data queues and syncs automatically when connectivity returns.",
                },
                {
                  label: "Data stays in the municipality",
                  desc: "All records stored on-site. RA 10173 compliant by design. No data ever leaves without your approval.",
                },
                {
                  label: "Syncs to the Provincial Hub",
                  desc: "When internet is available, the Box pushes summaries up to the Provincial GovLens tenant for province-wide visibility.",
                },
                {
                  label: "No monthly server bills",
                  desc: "One hardware cost. No cloud fees. No vendor lock-in. Runs on standard power.",
                },
              ].map((f) => (
                <div key={f.label} className="flex items-start gap-3 reveal">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(29,158,117,0.2)", border: "1px solid rgba(29,158,117,0.35)" }}>
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--glm)" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold mb-0.5" style={{ color: "#fff" }}>{f.label}</div>
                    <div className="text-[13px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-[11px] font-bold tracking-[1.5px] uppercase mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                What&apos;s Inside the Box
              </div>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                    ),
                    title: "AI + Compute",
                    desc: "Local AI for cleaning, dashboards, and SAI chat. No cloud required.",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    ),
                    title: "Containerized Apps",
                    desc: "GovLens, storage, and database run inside Docker. Zero server configuration.",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1.42 9a16 16 0 0 1 21.16 0M5 12.55a11 11 0 0 1 14.08 0M10.83 16.11a6 6 0 0 1 2.33 0" />
                        <line x1="12" y1="20" x2="12.01" y2="20" />
                      </svg>
                    ),
                    title: "Local Wi-Fi Hotspot",
                    desc: "The Box creates its own Wi-Fi. Staff connect on phones and tablets: no internet needed.",
                  },
                ].map((n) => (
                  <div
                    key={n.title}
                    className="box-node rounded-xl p-4 flex items-start gap-4"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(29,158,117,0.15)", color: "var(--glm)" }}
                    >
                      {n.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-[14px] mb-1" style={{ color: "#fff" }}>{n.title}</div>
                      <div className="text-[12px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.45)" }}>{n.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-[1.5px] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Sync Status</span>
                  <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#4ade80" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {["Luna Box", "Kabugao Box", "Province Hub"].map((n, i) => (
                    <div key={n} className="flex items-center justify-between text-[12px]">
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{n}</span>
                      <span style={{ color: i < 2 ? "var(--glm)" : "#4ade80" }}>{i < 2 ? "Synced 4m ago" : "Live"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PRODUCT (COLLECT / CONNECT / UNDERSTAND) ── */
function Product() {
  const caps = [
    {
      num: "01",
      color: "var(--gl)",
      title: "Collect",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      body: "Bring data into GovLens by uploading any Excel or CSV file, or by connecting live systems: PostgreSQL databases, Google Sheets, or your existing HRIS. All sources feed into one platform.",
    },
    {
      num: "02",
      color: "var(--gl2)",
      title: "Connect",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
      body: "Link datasets from different offices and sources. GovLens detects relationships between your data automatically: analyze HR against budget, or household profiling against 4Ps enrollment, without any SQL.",
    },
    {
      num: "03",
      color: "var(--glm)",
      title: "Understand",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      body: "Auto-generated dashboards appear the moment data is clean. SAI answers questions in Filipino or English. Role-based access means each office sees exactly what it should.",
    },
  ];
  return (
    <section id="product" className="py-24 px-[5%]" style={{ background: "var(--surf)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--gl)" }}>
          How GovLens Works
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--dark)",
          }}
        >
          Collect. Connect. Understand.
        </h2>
        <p className="text-base leading-[1.7] mb-16 max-w-[540px] reveal" style={{ color: "var(--muted)" }}>
          Three capabilities that take your LGU from scattered spreadsheets to a shared data operating system.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {caps.map((c) => (
            <div
              key={c.num}
              className="cap-card reveal rounded-2xl p-8"
              style={{ background: "#fff", border: "1px solid var(--border)" }}
            >
              <div className="cap-num">{c.num}</div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "var(--glbg)", color: c.color }}
              >
                {c.icon}
              </div>
              <div
                className="font-bold text-xl mb-3"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: c.color }}
              >
                {c.title}
              </div>
              <p className="text-sm leading-[1.7]" style={{ color: "var(--muted)" }}>{c.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 reveal">
          <div className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6" style={{ background: "var(--glbg)", border: "1px solid var(--glbg2)" }}>
            <div className="flex-1">
              <div className="text-sm font-bold mb-1" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--gl)" }}>
                GovLens is compliant by design
              </div>
              <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>
                Built with RA 10173 compliance in mind, aligned with RA 12254 (E-Governance Act), and designed with COA-ready audit logs for every action.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              {["RA 10173", "RA 12254", "COA-Ready"].map((t) => (
                <span key={t} className="mono text-[11px] font-bold px-3 py-1.5 rounded-lg" style={{ background: "#fff", color: "var(--gl)", border: "1px solid var(--glbg2)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── USE CASE ── */
function UseCase() {
  const steps = [
    { n: "01", title: "Upload files from any office", desc: "HR, agriculture, health, social welfare — each office uploads their Excel or CSV files directly. Different formats, different headers, no problem." },
    { n: "02", title: "GovLens merges and normalizes", desc: "GovLens automatically detects headers, combines related files, and prepares a unified dataset. No manual work from LGU staff." },
    { n: "03", title: "AI cleans the data", desc: "GovLens scans for quality issues, suggests fixes with evidence, and scores each dataset 0–100. Staff approve every change." },
    { n: "04", title: "Dashboards appear instantly", desc: "Charts, KPIs, and breakdowns are generated automatically the moment data is clean. No configuration, no setup." },
    { n: "05", title: "Ask in Filipino or English", desc: "Ask SAI any question about your data. Instant answers from the full combined dataset across all offices." },
  ];
  return (
    <section id="use-case" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--gl)" }}>
          Real Use Case
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(26px, 3.2vw, 38px)",
            color: "var(--dark)",
          }}
        >
          From scattered spreadsheets to<br />
          <span style={{ color: "var(--gl)" }}>one live dashboard.</span>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[540px] reveal" style={{ color: "var(--muted)" }}>
          How an LGU goes from dozens of Excel files across multiple offices to a single, queryable data platform.
        </p>
        <div className="steps-connector grid md:grid-cols-5 gap-6 relative">
          {steps.map((s) => (
            <div key={s.n} className="reveal flex flex-col items-start relative z-10">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-sm"
                style={{
                  background: "var(--glbg)",
                  color: "var(--gl)",
                  border: "2px solid var(--glbg2)",
                  fontFamily: "var(--font-sora, Sora, sans-serif)",
                }}
              >
                {s.n}
              </div>
              <div className="font-bold text-[13px] mb-2" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}>
                {s.title}
              </div>
              <p className="text-[12px] leading-[1.65]" style={{ color: "var(--muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PILOT FORM ── */
function PilotForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", org: "", email: "", role: "", phone: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What does the pilot cost?",
      a: "The 6-month pilot is free for Founding Partners. Full access, all features, hands-on onboarding support. At the end of 6 months, you decide whether to continue.",
    },
    {
      q: "Does GovLens work without an internet connection?",
      a: "Yes: GovLens In a Box runs the full platform offline. It creates its own Wi-Fi, stores data on-site, and syncs to the Provincial Hub when connectivity returns.",
    },
    {
      q: "How long does onboarding take?",
      a: "Under 30 minutes for a standard dataset. For complex multi-file data like household profiling, our team handles the consolidation so your staff only sees the clean, ready-to-use version.",
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const data = new FormData();
      data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
      data.append("subject", "New GovLens Pilot Application");
      data.append("from_name", form.org || "GovLens Landing");
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      setStatus(json.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="pilot-form" className="py-24 px-[5%] relative overflow-hidden" style={{ background: "var(--navy)" }}>
      <div className="navy-grid" />
      <div className="max-w-[680px] mx-auto relative z-10">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal text-center" style={{ color: "var(--glm)" }}>
          Founding Partner Program
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal text-center"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(26px, 3.5vw, 40px)",
            color: "#fff",
          }}
        >
          Join the 6-Month Pilot.
        </h2>
        <p className="text-base leading-[1.7] mb-8 reveal text-center" style={{ color: "rgba(255,255,255,0.55)" }}>
          We are selecting 3 to 5 Founding Partner LGUs. Partners receive priority support, co-development input, and preferred pilot pricing. Slots are limited.
        </p>

        {/* Inline FAQ */}
        <div className="flex flex-col gap-2 mb-10 reveal">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className="rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{f.q}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                  style={{ color: "var(--glm)", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-[13px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {status === "success" ? (
          <div className="rounded-2xl p-10 text-center reveal" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}>
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#4ade80" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="font-bold text-lg mb-2" style={{ color: "#fff" }}>Application received.</div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Our team will reach out within 2 business days to schedule a discovery call.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl p-8 reveal flex flex-col gap-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="Juan dela Cruz"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Organization</label>
                <input
                  name="org"
                  value={form.org}
                  onChange={onChange}
                  required
                  placeholder="e.g. Municipality of La Trinidad"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="juan@luna.gov.ph"
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Your Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  required
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: form.role ? "#fff" : "rgba(255,255,255,0.35)" }}
                >
                  <option value="" style={{ background: "#0C1929" }}>Select role</option>
                  {["Mayor / Vice Mayor", "Governor / Vice Governor", "City / Municipal Administrator", "Department Head (HRMO, MBO, etc.)", "IT Officer", "Other"].map((r) => (
                    <option key={r} value={r} style={{ background: "#0C1929" }}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+63 9XX XXX XXXX"
                className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>What data challenge are you trying to solve?</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={3}
                placeholder="Tell us about the data your office manages and the decision you need it to support..."
                className="rounded-xl px-4 py-3 text-sm resize-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              />
            </div>
            {status === "error" && (
              <p className="text-[13px]" style={{ color: "#f87171" }}>
                Something went wrong. Please email us directly at solutions@origin3.ph
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl px-6 py-3.5 font-semibold text-sm transition-all duration-200"
              style={{
                background: status === "sending" ? "rgba(37,99,235,0.5)" : "var(--gl)",
                color: "#fff",
                cursor: status === "sending" ? "not-allowed" : "pointer",
              }}
            >
              {status === "sending" ? "Sending..." : "Apply for the Pilot"}
            </button>
            <p className="text-[11px] text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              No spam. We respond within 2 business days. Your data is handled in accordance with RA 10173.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="px-[5%] py-16 relative overflow-hidden" style={{ background: "var(--navy)" }}>
      <div className="navy-grid" />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "var(--gl)", fontFamily: "var(--font-sora, Sora, sans-serif)" }}
              >
                GL
              </div>
              <span className="font-bold text-[15px]" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "#fff" }}>
                GovLens
              </span>
            </div>
            <p className="text-[13px] leading-[1.75] mb-5 max-w-[300px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              The data operating system for Philippine Local Government Units. Collect. Connect. Understand.
            </p>
            <div className="mono text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
              Piloting in the Cordillera Administrative Region
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-[2px] uppercase mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Product
            </div>
            <div className="flex flex-col gap-3">
              {[
                { href: "#in-a-box", label: "In a Box" },
                { href: "#product", label: "How It Works" },
                { href: "#use-case", label: "Real Use Case" },
                { href: "#pilot-form", label: "Apply for Pilot" },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="footer-link text-[13px] no-underline">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-[2px] uppercase mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Contact
            </div>
            <div className="flex flex-col gap-3">
              <a href="mailto:solutions@origin3.ph" className="footer-link text-[13px] no-underline">solutions@origin3.ph</a>
              <a href="#pilot-form" className="footer-link text-[13px] no-underline">Request a Pilot</a>
            </div>
          </div>
        </div>
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="text-[12px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2026 GovLens. All rights reserved.
          </div>
          <div className="text-[12px] text-center" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sora, Sora, sans-serif)" }}>
            Technology that serves the people.
          </div>
          <div className="flex gap-5">
            {["RA 10173", "RA 12254", "COA-Ready"].map((t) => (
              <span key={t} className="mono text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function Page() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <InABox />
        <Product />
        <UseCase />
        <PilotForm />
      </main>
      <Footer />
    </>
  );
}
