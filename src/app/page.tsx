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
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Product", href: "#product" },
    { label: "In a Box", href: "#in-a-box" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ];
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
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-sm font-medium no-underline">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pilot-form"
            className="btn-primary text-sm font-semibold px-5 py-2 rounded-lg no-underline"
          >
            Request a Pilot
          </a>
        </div>
        <button
          className="md:hidden p-2 rounded-md"
          style={{ color: "var(--dark)" }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-[5%] pb-4 pt-2" style={{ background: "rgba(255,255,255,0.97)" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-2.5 text-sm font-medium no-underline"
              style={{ color: "var(--muted)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pilot-form"
            className="btn-primary block text-center text-sm font-semibold px-5 py-2.5 rounded-lg mt-3 no-underline"
            onClick={() => setOpen(false)}
          >
            Request a Pilot
          </a>
        </div>
      )}
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
      headline: "Any format. Any office.",
      body: "Upload any Excel or CSV from HR, agriculture, health, or social welfare. GovLens reads multi-row Philippine government headers automatically and converts your file into a fast, queryable format in seconds.",
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
      headline: "Live data. No manual exports.",
      body: "Connect directly to your existing PostgreSQL database or Google Sheets. Data refreshes automatically so your dashboards always show the latest numbers without anyone touching a file.",
      mock: (
        <div className="rounded-xl p-4" style={{ background: "var(--glbg2)", border: "1px solid var(--glm)" }}>
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: "var(--gl)" }}>Live Connections</div>
          <div className="flex flex-col gap-2">
            {[
              { name: "Municipal HRIS", type: "PostgreSQL", status: "Connected", dot: "#22c55e" },
              { name: "ASAP Registry", type: "Google Sheets", status: "Synced 2 min ago", dot: "#22c55e" },
              { name: "Budget 2025", type: "CSV Upload", status: "Manual", dot: "#94a3b8" },
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
            GovLens helps local government units collect, connect, and understand their data. Upload any Excel or CSV, get instant AI-powered dashboards, and ask questions in Filipino or English.
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
              href="#product"
              className="btn-ghost text-sm font-semibold px-7 py-3.5 rounded-xl no-underline border"
              style={{ borderColor: "var(--border)" }}
            >
              See how it works
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

/* ── PROBLEM ── */
function Problem() {
  const stats = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M1 6s1-1 4-1 5 2 8 2 4-1 4-1V22s-1 1-4 1-5-2-8-2-4 1-4 1V6z" />
          <line x1="1" y1="2" x2="1" y2="22" />
        </svg>
      ),
      value: "57%",
      label: "of LGU barangays have no reliable internet connection",
      source: "PSA 2023",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      value: "10,000+",
      label: "household records consolidated from dozens of spreadsheets into one dashboard",
      source: "GovLens Research",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      value: "10+",
      label: "separate offices generating data with no shared system to connect them",
      source: "GovLens Research",
    },
  ];
  return (
    <section id="problem" className="py-24 px-[5%] relative overflow-hidden" style={{ background: "var(--navy)" }}>
      <div className="navy-grid" />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--glm)" }}>
          The Challenge
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(26px, 3.2vw, 40px)",
            color: "#fff",
          }}
        >
          Philippine LGUs run on spreadsheets.<br />
          <span style={{ color: "var(--glm)" }}>The data exists. The visibility does not.</span>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[560px] reveal" style={{ color: "rgba(255,255,255,0.55)" }}>
          Every office has data. None of it talks to each other. Decision-makers wait days for a report that should take seconds.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s.value}
              className="reveal problem-card relative rounded-2xl p-7 pl-10"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="mb-4" style={{ color: "var(--gold)" }}>{s.icon}</div>
              <div
                className="font-extrabold mb-2"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", fontSize: "clamp(28px, 3vw, 38px)", color: "#fff" }}
              >
                {s.value}
              </div>
              <div className="text-sm leading-[1.6] mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
              <div className="mono text-[10px] font-medium px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}>
                {s.source}
              </div>
            </div>
          ))}
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
      body: "Smart file upload handles any Excel or CSV, including multi-row Philippine government headers. A built-in form builder lets field staff collect data directly on mobile, even without internet.",
      bullets: ["Multi-row header detection", "Built-in mobile form builder", "Works offline, syncs when connected"],
    },
    {
      num: "02",
      color: "var(--gl2)",
      title: "Connect",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
        </svg>
      ),
      body: "Connect directly to existing PostgreSQL databases or Google Sheets with live refresh. Your data is always current without manual exports. AI data quality scoring and a 7-type cleaning engine ensure every dataset is analysis-ready.",
      bullets: ["Live PostgreSQL and Google Sheets connectors", "AI data quality scoring (0-100)", "7-type AI and rule-based cleaning engine"],
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
      body: "Auto-generated dashboards appear the moment data is clean. SAI, the GovLens AI analyst, answers questions in Filipino or English. Role-based access means the Governor sees everything while field staff see only their own data.",
      bullets: ["Auto-generated dashboards on clean data", "SAI answers questions in Filipino or English", "Role-based access control"],
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
              <p className="text-sm leading-[1.7] mb-5" style={{ color: "var(--muted)" }}>{c.body}</p>
              <ul className="flex flex-col gap-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13px]" style={{ color: "var(--dark)" }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--gl)" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
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
                Built to meet RA 10173 (Data Privacy Act), aligned with RA 12254 (E-Governance Act, April 2027 deadline), and COA-ready audit logging on every action.
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

/* ── IN A BOX ── */
function InABox() {
  const nodes = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "AI + Compute",
      desc: "Runs local AI models for cleaning, dashboards, and chat. No cloud required.",
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
      title: "Local WiFi Hotspot",
      desc: "Box creates its own WiFi network. Staff connect on phones and tablets, no internet needed.",
    },
  ];
  return (
    <section id="in-a-box" className="py-24 px-[5%] relative overflow-hidden" style={{ background: "var(--navy)" }}>
      <div className="navy-grid" />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--glm)" }}>
          GovLens In a Box
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
              style={{
                fontFamily: "var(--font-sora, Sora, sans-serif)",
                fontSize: "clamp(26px, 3.2vw, 38px)",
                color: "#fff",
              }}
            >
              Full capability. No internet.
              <br />
              <span style={{ color: "var(--glm)" }}>For barangays that need it most.</span>
            </h2>
            <p className="text-base leading-[1.7] mb-8 reveal" style={{ color: "rgba(255,255,255,0.55)" }}>
              GovLens In a Box is a small hardware unit that runs the entire GovLens platform locally. It creates its own WiFi network, stores data on-site, and syncs to the Provincial Hub when connectivity is available. No cloud dependency. No monthly server bills. No vendor lock-in.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Data sovereignty", desc: "All data stays in the municipality. RA 10173 compliant by design." },
                { label: "Syncs to Province Hub", desc: "When internet is available, the Box pushes summaries up to the Provincial GovLens tenant." },
                { label: "Survives connectivity loss", desc: "Staff keep working. Data queues and syncs automatically when the connection returns." },
              ].map((f) => (
                <div key={f.label} className="flex items-start gap-3 reveal">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(147,197,253,0.15)", border: "1px solid rgba(147,197,253,0.25)" }}>
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--glm)" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold mb-0.5" style={{ color: "#fff" }}>{f.label}</div>
                    <div className="text-[13px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-[11px] font-bold tracking-[1.5px] uppercase mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Inside the Box
              </div>
              <div className="flex flex-col gap-3 mb-6">
                {nodes.map((n) => (
                  <div
                    key={n.title}
                    className="box-node rounded-xl p-4 flex items-start gap-4"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(37,99,235,0.2)", color: "var(--glm)" }}
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

/* ── USE CASE ── */
function UseCase() {
  const steps = [
    { n: "01", title: "Province receives 79 household profiling files", desc: "PSWD barangay staff submit one Excel per barangay across 7 municipalities. 4,500 households. 13,000 family members. All in different formats." },
    { n: "02", title: "GovLens team consolidates and normalizes", desc: "During onboarding, our team runs a consolidation script that merges all files into two clean CSVs ready for upload. No manual work from LGU staff." },
    { n: "03", title: "Upload to GovLens, AI cleans", desc: "Staff upload the two CSVs. GovLens AI scans for data quality issues, suggests fixes with evidence, and scores each dataset 0 to 100. Staff approve every change." },
    { n: "04", title: "Dashboards appear automatically", desc: "Within minutes: 4Ps coverage by municipality, IP population by affiliation, PWD counts, vulnerability to disaster, educational attainment charts. No configuration needed." },
    { n: "05", title: "Provincial SWDO asks in Filipino", desc: "Ask SAI: Ilan ang 4Ps beneficiaries sa Luna? Or: Which municipality has the most IP households? Instant answers from the full consolidated dataset." },
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
          From 79 spreadsheets to one<br />
          <span style={{ color: "var(--gl)" }}>provincial dashboard.</span>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[540px] reveal" style={{ color: "var(--muted)" }}>
          How a provincial government used GovLens to consolidate household profiling data across all municipalities for the first time.
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

/* ── FEATURES ── */
const FEATURES = [
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    title: "Smart File Upload",
    desc: "Accepts any Excel or CSV, including multi-row headers common in Philippine government forms. Converts to fast, queryable format instantly.",
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
    title: "AI Data Quality Scoring",
    desc: "Every dataset gets a quality score from 0 to 100. GovLens understands Philippine-specific patterns like Salary Grades, Civil Service eligibility, and position titles.",
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    title: "7-Type Cleaning Engine",
    desc: "Detects and suggests fixes for typos, inconsistent values, sentinel placeholders, and outliers. You approve every fix.",
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
    title: "Auto-Generated Dashboards",
    desc: "The moment your data is clean, GovLens builds a relevant dashboard automatically. HR gets headcount charts. Agriculture gets crop and farmer breakdowns.",
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
    title: "Ask SAI in Filipino or English",
    desc: 'Type any question about your data. "Ano ang average na sahod ng SG-15?" or "How many vacancies in Engineering?" Answered instantly.',
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    title: "Role-Based Access",
    desc: "Governor sees everything. Department heads see their own data. Field staff upload only. Your data reaches the right people.",
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="8" height="5" rx="1" /><rect x="13" y="3" width="8" height="5" rx="1" /><rect x="3" y="11" width="8" height="10" rx="1" /><rect x="13" y="11" width="8" height="5" rx="1" /></svg>,
    title: "Drag-and-Drop Dashboard Builder",
    desc: "Build the exact view your office needs. Drag KPI cards, bar charts, donuts, and timelines onto a live canvas. Save, share, and print to PDF in one click.",
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" /></svg>,
    title: "Live Database Connections",
    desc: "Connect directly to your existing PostgreSQL database or Google Sheets. Data refreshes automatically.",
  },
  {
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1.42 9a16 16 0 0 1 21.16 0M5 12.55a11 11 0 0 1 14.08 0M10.83 16.11a6 6 0 0 1 2.33 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>,
    title: "Works Without Internet",
    desc: "GovLens In a Box runs the full platform locally. Staff in offline barangays keep working. Data syncs when connectivity returns.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-[5%]" style={{ background: "var(--surf)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--gl)" }}>
          Features
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-4 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--dark)",
          }}
        >
          Everything your office needs.
          <br />
          <em className="not-italic" style={{ color: "var(--gl)" }}>Nothing it does not.</em>
        </h2>
        <p className="text-base leading-[1.7] mb-14 max-w-[560px] reveal" style={{ color: "var(--muted)" }}>
          Built specifically for Philippine government data. Not adapted from generic software.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="reveal feat-card-hover rounded-2xl p-7 cursor-default"
              style={{ background: "var(--white)", border: "1px solid var(--border)", transition: "all 0.2s" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--glbg)", color: "var(--gl)" }}
              >
                {f.icon}
              </div>
              <div
                className="font-bold text-[15px] mb-1.5"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}
              >
                {f.title}
              </div>
              <div className="text-[13px] leading-[1.6]" style={{ color: "var(--muted)" }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WHY GOVLENS ── */
function WhyGovLens() {
  const metrics = [
    { value: "6 months", label: "Pilot engagement with full GovLens team support" },
    { value: "< 5 min", label: "From file upload to first dashboard" },
    { value: "Filipino + English", label: "AI understands both, answers in both" },
    { value: "0 IT staff", label: "Required to run GovLens" },
  ];
  const reasons = [
    {
      title: "Built from inside government",
      desc: "Our team has worked as JO and consultant staff inside Philippine LGUs. We have seen the spreadsheets, the slow reports, and the decisions that wait for data. GovLens is the tool we wished existed.",
    },
    {
      title: "Philippine government data, not generic",
      desc: "We know Salary Grades 1 to 33, GSIS eligibility codes, 4Ps beneficiary flags, DBM plantilla formats, and PSWD household profiling columns. The AI understands context that generic tools miss.",
    },
    {
      title: "One vendor, one contract",
      desc: "GovLens covers collection, connection, and understanding. No separate BI tool. No separate data warehouse. No separate forms app. One subscription covers the whole data operating system.",
    },
    {
      title: "Pilot-Ready, not vaporware",
      desc: "GovLens is running on real data today in the Cordillera Administrative Region. The platform is deployed, tested, and ready for your office.",
    },
  ];
  return (
    <section id="why" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--gl)" }}>
          Why GovLens
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-14 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--dark)",
          }}
        >
          Data clarity changes decisions.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((m) => (
            <div key={m.value} className="reveal card-hover rounded-2xl p-6" style={{ background: "var(--surf)", border: "1px solid var(--border)" }}>
              <div
                className="font-extrabold mb-2"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", fontSize: "clamp(18px, 2vw, 26px)", color: "var(--gl)" }}
              >
                {m.value}
              </div>
              <div className="text-[13px] leading-[1.5]" style={{ color: "var(--muted)" }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="reveal rounded-2xl p-7"
              style={{ background: "var(--surf)", border: "1px solid var(--border)" }}
            >
              <div className="font-bold text-[15px] mb-2" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--dark)" }}>
                {r.title}
              </div>
              <p className="text-sm leading-[1.7]" style={{ color: "var(--muted)" }}>{r.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 reveal">
          <div
            className="rounded-2xl px-8 py-5 flex flex-wrap gap-6 items-center"
            style={{ background: "var(--glbg)", border: "1px solid var(--glbg2)" }}
          >
            <div className="text-[13px] font-bold" style={{ color: "var(--dark)" }}>Currently piloting with:</div>
            {["Provincial LGUs", "Municipal LGUs"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-[13px]" style={{ color: "var(--muted)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "var(--gl)" }} />
                {t}
              </div>
            ))}
            <div className="text-[12px] ml-auto" style={{ color: "var(--sub)" }}>
              Client names shared under NDA during discovery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PILOT FORM ── */
function PilotForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", org: "", email: "", role: "", phone: "", message: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const data = new FormData();
      data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
      data.append("subject", "New GovLens Pilot Application");
      data.append("from_name", "GovLens Landing");
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
        <p className="text-base leading-[1.7] mb-10 reveal text-center" style={{ color: "rgba(255,255,255,0.55)" }}>
          We are selecting 3 to 5 Founding Partner LGUs. Partners receive priority support, co-development input, and preferred pilot pricing. Slots are limited.
        </p>
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
              No spam. We respond within 2 business days. Data handled under RA 10173.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const faqs = [
    {
      q: "Who is GovLens for?",
      a: "GovLens is built for Philippine Local Government Units: municipalities, cities, and provinces. It is especially designed for LGUs with limited IT staff who manage data in Excel and need faster insights for decision-making.",
    },
    {
      q: "Do we need an internet connection to use GovLens?",
      a: "The cloud version requires internet. GovLens In a Box runs the full platform locally and creates its own WiFi network, so staff in offline barangays can keep working. Data syncs automatically when connectivity returns.",
    },
    {
      q: "What file formats does GovLens accept?",
      a: "GovLens accepts any Excel (.xlsx, .xls) and CSV file, including files with multi-row headers common in Philippine government forms. It also connects directly to PostgreSQL databases and Google Sheets.",
    },
    {
      q: "How does the AI cleaning work?",
      a: "After you upload a file, GovLens AI scans the dataset using a 7-type cleaning engine. It detects typos, inconsistent values, placeholder data, and outliers, then suggests specific fixes with evidence. You approve every change. Nothing changes without your confirmation.",
    },
    {
      q: "Is GovLens compliant with Philippine data laws?",
      a: "Yes. GovLens is designed around RA 10173 (Data Privacy Act) and is aligned with RA 12254 (E-Governance Act). All actions are logged for COA-ready audit trails. Tenant data is isolated so one LGU cannot access another.",
    },
    {
      q: "How long does onboarding take?",
      a: "A standard dataset onboarding takes under 30 minutes: upload, AI cleaning review, and a dashboard is ready. For more complex data like multi-file household profiling, our team handles the consolidation during the onboarding period so your staff only sees the clean, ready-to-use version.",
    },
    {
      q: "What is the Founding Partner Program?",
      a: "The first 3 to 5 LGUs to join the pilot get priority support, input into the product roadmap, and preferred pilot pricing. We treat Founding Partners as co-developers, not just customers.",
    },
    {
      q: "What does the 6-month pilot include?",
      a: "Full access to GovLens for your LGU, onboarding support from our team, data consolidation for your first datasets, and dedicated check-ins throughout the pilot. At the end of 6 months, you decide whether to continue.",
    },
    {
      q: "How is GovLens different from Power BI or Google Looker?",
      a: "GovLens is built specifically for Philippine LGUs. It understands local data formats, Salary Grades, government position titles, and Filipino language queries out of the box. It also includes data collection (forms), AI cleaning, and an offline hardware option. Generic BI tools need months of configuration to get to the same point.",
    },
  ];
  return (
    <section id="faq" className="py-24 px-[5%]" style={{ background: "var(--surf)" }}>
      <div className="max-w-[760px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal text-center" style={{ color: "var(--gl)" }}>
          FAQ
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-12 reveal text-center"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(26px, 3.2vw, 38px)",
            color: "var(--dark)",
          }}
        >
          Common questions.
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="reveal rounded-2xl group"
              style={{ background: "var(--white)", border: "1px solid var(--border)" }}
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none list-none">
                <span className="font-semibold text-[15px]" style={{ color: "var(--dark)" }}>{f.q}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="faq-chevron w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "var(--sub)" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="px-6 pb-5 text-sm leading-[1.7]" style={{ color: "var(--muted)" }}>
                {f.a}
              </div>
            </details>
          ))}
        </div>
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
              {["#product", "#in-a-box", "#features", "#faq"].map((href) => {
                const labels: Record<string, string> = {
                  "#product": "How It Works",
                  "#in-a-box": "In a Box",
                  "#features": "Features",
                  "#faq": "FAQ",
                };
                return (
                  <a key={href} href={href} className="footer-link text-[13px] no-underline">
                    {labels[href]}
                  </a>
                );
              })}
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
            2025 GovLens. All rights reserved.
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
        <Problem />
        <Product />
        <InABox />
        <UseCase />
        <Features />
        <WhyGovLens />
        <PilotForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
