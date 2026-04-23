import Link from "next/link";
import Image from "next/image";
import PilotForm from "@/components/PilotForm";


// ─── NAV ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Origin3 Technologies" width={36} height={36} className="rounded-lg" priority />
          <div className="hidden sm:block">
            <span className="text-navy-700 font-extrabold text-base tracking-tight">Origin3</span>
            <span className="text-slate-400 text-xs block -mt-0.5">Technologies</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[["#products", "Products"], ["#about", "About"], ["#contact", "Contact"]].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm text-slate-500 hover:text-navy-700 transition-colors font-medium">
              {label}
            </Link>
          ))}
        </div>
        <Link href="#contact" className="bg-navy-700 text-white text-sm px-5 py-2.5 rounded-lg font-semibold hover:bg-navy-600 transition-colors btn-press">
          Request a Pilot
        </Link>
      </nav>
    </header>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 px-6 bg-navy-800 border-t border-navy-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Origin3" width={32} height={32} className="rounded-lg" loading="lazy" />
          <div>
            <span className="text-white font-semibold text-sm">Origin3 Technologies</span>
            <p className="text-navy-400 text-xs">Technology that serves the people</p>
          </div>
        </div>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          {[["#products", "Products"], ["#about", "About"], ["#contact", "Contact"]].map(([href, label]) => (
            <Link key={href} href={href} className="text-xs text-navy-300 hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-navy-500 text-xs">© {new Date().getFullYear()} Origin3 Solutions Inc.</p>
      </div>
    </footer>
  );
}

// ─── §1 HERO ────────────────────────────────────────────────────────────────

function Hero() {
  const stats = [
    { value: "143→5", label: "days → permit processing" },
    { value: "100K+", label: "citizens served via gov portal" },
    { value: "5+", label: "years inside LGUs" },
  ];

  const products = [
    { abbr: "GL", name: "GovLens", desc: "LGU data intelligence platform", bg: "#0F6E56", badgeBg: "bg-emerald-50 text-emerald-700", badge: "Pilot-Ready" },
    { abbr: "SL", name: "SchoolLens", desc: "School data intelligence platform", bg: "#1A56C4", badgeBg: "bg-blue-50 text-blue-700", badge: "Pilot-Ready" },
    { abbr: "ID", name: "o3-Identity", desc: "Identity governance platform for all LGU services", bg: "#7C3AED", badgeBg: "bg-purple-50 text-purple-700", badge: "Pilot-Ready" },
  ];

  return (
    <section className="hero-grid-bg py-24 px-6" aria-label="Hero">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Built from within the Philippine government
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1] text-navy-700 mb-6 animate-fade-in animate-delay-100">
            Built from within the Philippine government.{" "}
            <span className="text-primary-500">For yours.</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg animate-fade-in animate-delay-200">
            We didn&apos;t study this problem from the outside. We built systems inside Philippine LGUs as government workers — and saw firsthand what your staff deals with every day. Origin3 is what we built when we decided to do this properly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in animate-delay-300">
            <Link href="#contact" className="inline-flex items-center justify-center gap-2 bg-navy-700 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-navy-600 transition-colors btn-press text-sm">
              Request a Free Pilot
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="#products" className="inline-flex items-center justify-center border-2 border-slate-200 text-navy-700 px-7 py-3.5 rounded-lg font-semibold hover:bg-slate-50 transition-colors btn-press text-sm">
              See Our Products
            </Link>
          </div>
        </div>

        {/* Right — product suite card */}
        <div className="animate-fade-in animate-delay-400">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_rgba(11,60,120,0.08)] p-6">
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Origin3 Product Suite</p>

            <div className="space-y-2.5 mb-5">
              {products.map((p) => (
                <div key={p.abbr} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0" style={{ background: p.bg }}>
                    {p.abbr}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.desc}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${p.badgeBg}`}>{p.badge}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 text-center">
                  <p className="text-lg font-extrabold text-navy-700">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── §2 TRUST STRIP ─────────────────────────────────────────────────────────

function TrustStrip() {
  const badges = [
    { color: "#0F6E56", label: "Permit Digitization", sub: "Business permits · 143 → 5 days" },
    { color: "#1A56C4", label: "Citizen Services Portal", sub: "Public-facing system · 100K+ served" },
    { color: "#2F7DC1", label: "DILG-DPWH-DICT-DTI", sub: "JMC Compliant" },
    { color: "#7C3AED", label: "Data Privacy Act", sub: "RA 10173 Ready" },
  ];

  return (
    <section className="py-8 px-6 bg-white border-y border-slate-100" aria-label="Trust indicators">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Proven in Philippine Government</p>
        <p className="text-xs text-slate-400 mb-4">Results from systems built by the Origin3 team during government service — client names withheld by agreement</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-lg px-4 py-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
              <div>
                <p className="text-xs font-semibold text-navy-700 leading-tight">{b.label}</p>
                <p className="text-xs text-slate-400">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §3 PROBLEM ─────────────────────────────────────────────────────────────

function Problem() {
  const pains = [
    {
      icon: (
        <svg className="w-7 h-7 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" />
        </svg>
      ),
      title: "Data trapped in spreadsheets",
      body: "Every department has files — HR plantillas, budget registers, permit logs. They just live in separate folders and flash drives, impossible to see together.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Reports built manually, every time",
      body: "When the mayor or a regional office asks for numbers, staff spend days pulling data from multiple sources — for a report that&apos;s already outdated by the time it&apos;s printed.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      title: "No early warning on issues",
      body: "Vacancies, budget overruns, low utilization rates — by the time problems surface through routine reports, they&apos;ve already grown into bigger problems.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#F8FAFC]" aria-label="The problem we solve">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 animate-slide-up">
          <p className="text-primary-500 font-semibold text-xs uppercase tracking-widest mb-3">The Challenge We Solve</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-700 tracking-tight leading-tight mb-4">
            The data exists.<br />It&apos;s just not working for you.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Philippine LGUs collect enormous amounts of data — HR, budget, permits, health, agriculture. But it stays locked in spreadsheets and filing systems, unavailable when decisions actually need to be made.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 stagger-children">
          {pains.map((p) => (
            <div key={p.title} className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_8px_rgba(11,60,120,0.05)]">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">{p.icon}</div>
              <h3 className="font-bold text-navy-700 text-base mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §4 BELIEFS ─────────────────────────────────────────────────────────────

function Beliefs() {
  const beliefs = [
    { num: "01", text: "We learn your office before we build anything — your staff shapes what gets built." },
    { num: "02", text: "Start with one dataset. Grow only when you&apos;re ready. No large upfront commitment required." },
    { num: "03", text: "We work with fewer clients so we can serve each one well — not a vendor, a long-term partner." },
    { num: "04", text: "We measure success by what improves inside your office — not by features delivered or invoices sent." },
    { num: "05", text: "We price fairly so we can keep our word. Sustainable pricing means we&apos;ll still be here in five years." },
  ];

  return (
    <section className="py-20 px-6 bg-navy-700" aria-label="What we believe">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 animate-slide-up">
          <p className="text-blue-300 font-semibold text-xs uppercase tracking-widest mb-3">How We Work</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            We don&apos;t hand you software{" "}
            <span className="text-lime-400">and leave.</span><br />
            We stay{" "}
            <span className="text-teal-300">with you.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger-children">
          {beliefs.map((b) => (
            <div key={b.num} className="bg-white/[0.07] border border-white/10 rounded-xl p-5">
              <p className="text-2xl font-extrabold text-lime-400 mb-3">{b.num}</p>
              <p className="text-sm text-white/80 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §5 GOVLENS ─────────────────────────────────────────────────────────────

function GovLens() {
  const features = [
    "Dashboards built automatically from your existing Excel files",
    "AI that catches and fixes data quality issues",
    "Ask questions in Filipino or English — get instant answers",
    "Designed for LGU infrastructure — low-bandwidth friendly",
  ];

  return (
    <section id="products" className="overflow-hidden" aria-label="GovLens — LGU data intelligence">
      <div className="grid lg:grid-cols-2 min-h-[520px]">

        {/* Left — content */}
        <div className="bg-gradient-to-br from-[#0F6E56] to-[#1D9E75] px-10 py-16 flex flex-col justify-center">
          <p className="text-emerald-200 font-bold text-xs uppercase tracking-widest mb-4">GovLens</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            See your government data clearly.
          </h2>
          <p className="text-emerald-100 text-base leading-relaxed mb-6 max-w-sm">
            Connect your existing Excel files. Your team gets live HR, budget, and operations dashboards on Day 1 — no migration, no IT project, no technical background needed.
          </p>
          <ul className="space-y-2.5 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-white/90">
                <svg className="w-4 h-4 flex-shrink-0 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <Link href="#contact" className="inline-flex items-center gap-2 bg-white text-[#0F6E56] px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-colors btn-press w-fit">
            Request a 45-Day Free Pilot →
          </Link>
          <p className="text-emerald-300 text-xs mt-3">Deployed to your LGU · White-label ready · Pricing discussed during pilot</p>
        </div>

        {/* Right — mockup */}
        <div className="bg-white px-8 py-10 flex flex-col justify-center border-l border-slate-100">
          <p className="text-xs font-bold text-emerald-600 tracking-wide uppercase mb-4">GovLens — HR Dashboard</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[["247", "Filled Items"], ["11", "Vacant"], ["96%", "Fill Rate"]].map(([v, l]) => (
              <div key={l} className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center">
                <p className="text-xl font-extrabold text-[#0F6E56]">{v}</p>
                <p className="text-xs text-slate-500 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2.5 mb-4">
            {[["Engineering", 85], ["Health", 72], ["Finance", 91], ["Admin", 60]].map(([dept, pct]) => (
              <div key={dept} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-20 flex-shrink-0">{dept}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                  <div className="h-1.5 bg-[#0F6E56] rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-semibold text-[#0F6E56] w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-xs text-emerald-800">
            <span className="font-bold">AI:</span> &ldquo;Engineering has 3 unfilled SG19 positions. Recommend prioritizing recruitment.&rdquo;
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── §6 SCHOOLLENS ──────────────────────────────────────────────────────────

function SchoolLens() {
  const features = [
    "Enrollment and grade-level dashboards",
    "Teacher and staffing data visibility",
    "Automatic data cleaning and validation",
    "Ask questions in Filipino — get clear answers",
  ];

  return (
    <section className="overflow-hidden" aria-label="SchoolLens — school data intelligence">
      <div className="grid lg:grid-cols-2 min-h-[520px]">

        {/* Left — mockup (flipped layout) */}
        <div className="bg-white px-8 py-10 flex flex-col justify-center border-r border-slate-100 order-2 lg:order-1">
          <p className="text-xs font-bold text-blue-600 tracking-wide uppercase mb-4">SchoolLens — Enrollment Dashboard</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[["1,842", "Enrolled"], ["48", "Teachers"], ["91%", "Quality"]].map(([v, l]) => (
              <div key={l} className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
                <p className="text-xl font-extrabold text-[#1A56C4]">{v}</p>
                <p className="text-xs text-slate-500 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2.5 mb-4">
            {[["Grade 7", 78], ["Grade 8", 65], ["Grade 9", 70], ["Grade 10", 82]].map(([grade, pct]) => (
              <div key={grade} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-20 flex-shrink-0">{grade}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                  <div className="h-1.5 bg-[#1A56C4] rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-semibold text-[#1A56C4] w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-800">
            <span className="font-bold">AI:</span> &ldquo;Grade 7 enrollment dropped 12% vs last year. Check feeder elementary school data.&rdquo;
          </div>
        </div>

        {/* Right — content (flipped layout) */}
        <div className="bg-gradient-to-br from-[#1A56C4] to-[#2563EB] px-10 py-16 flex flex-col justify-center order-1 lg:order-2">
          <p className="text-blue-200 font-bold text-xs uppercase tracking-widest mb-4">SchoolLens</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            See your school data clearly.
          </h2>
          <p className="text-blue-100 text-base leading-relaxed mb-6 max-w-sm">
            Upload your enrollment records and school data files. Administrators get clear dashboards immediately — no technical setup required.
          </p>
          <ul className="space-y-2.5 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-white/90">
                <svg className="w-4 h-4 flex-shrink-0 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <Link href="#contact" className="inline-flex items-center gap-2 bg-white text-[#1A56C4] px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors btn-press w-fit">
            Request a 45-Day Free Pilot →
          </Link>
          <p className="text-blue-300 text-xs mt-3">Deployed to your school · White-label ready · Pricing discussed during pilot</p>
        </div>

      </div>
    </section>
  );
}

// ─── §7 O3-IDENTITY ─────────────────────────────────────────────────────────

function Identity() {
  const stages = [
    {
      num: "01",
      title: "Discovery",
      body: "Before anything is built, we map all your existing services — who accesses what, where the gaps are. Nothing is planned without this.",
    },
    {
      num: "02",
      title: "Planning",
      body: "Together we design the access hierarchy — which services need SSO, how departments and roles connect, what the unified login structure looks like.",
    },
    {
      num: "03",
      title: "Deployment",
      body: "o3-Identity is deployed across all your services — both existing systems and any Origin3 products — as a single secure authentication layer.",
    },
    {
      num: "04",
      title: "Monitoring",
      body: "Your IT team gets one dashboard: every login, every service, every access — in one place. No more checking each system separately.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#1E1B4B] to-[#312E81]" aria-label="o3-Identity authentication platform">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-slide-up">
          <p className="text-indigo-300 font-bold text-xs uppercase tracking-widest mb-4">o3-Identity</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            One secure front door<br />for every LGU service.
          </h2>
          <p className="text-indigo-200 text-base leading-relaxed">
            o3-Identity is an identity governance platform — not just a login tool. It unifies and secures all your LGU&apos;s services: existing systems, Origin3 products, citizen-facing and internal. Every access logged. One control point for your IT team.
          </p>
        </div>

        {/* 4-stage process */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 stagger-children">
          {stages.map((s) => (
            <div key={s.num} className="bg-white/[0.07] border border-white/10 rounded-xl p-6">
              <p className="text-2xl font-extrabold text-purple-400 mb-3">{s.num}</p>
              <p className="font-bold text-white text-sm mb-2">{s.title}</p>
              <p className="text-indigo-200 text-xs leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {["Single Sign-On", "Role-Based Access", "Department-Level Permissions", "Full Audit Logs", "COA-Ready Access Trail", "Anomaly Visibility"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-indigo-100 text-xs font-medium px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5 text-indigo-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §8 STAIRCASE ────────────────────────────────────────────────────────────

function Staircase() {
  const steps = [
    { label: "Entry", name: "o3 Chat", bg: "#94A3B8", height: 60 },
    { label: "Growth", name: "GovLens", bg: "#0F6E56", height: 100 },
    { label: "Growth", name: "SchoolLens", bg: "#1A56C4", height: 100 },
    { label: "Security", name: "o3-Identity", bg: "#7C3AED", height: 120 },
    { label: "Deepening", name: "Origin3 Node", bg: "#0B3C78", height: 160 },
    { label: "Maturity", name: "Origin3 AI", bg: "#6D28D9", height: 200 },
    { label: "Sustained", name: "Managed", bg: "#0F172A", height: 240 },
  ];

  return (
    <section className="py-20 px-6 bg-[#F8FAFC]" aria-label="The staircase model — customer journey">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-12 animate-slide-up">
          <p className="text-primary-500 font-semibold text-xs uppercase tracking-widest mb-3">The Staircase Model</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-700 tracking-tight leading-tight mb-3">
            Start with your data.<br />Scale to your own AI.
          </h2>
          <p className="text-slate-500 text-base">No lock-in. No large upfront commitment. Start anywhere, grow at your pace.</p>
        </div>

        <div className="flex items-end gap-2">
          {steps.map((s) => (
            <div key={s.name} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t-lg flex items-end justify-center pb-2"
                style={{ height: s.height, background: s.bg }}
              >
                <span className="text-white/70 text-[9px] font-bold uppercase tracking-wide">{s.label}</span>
              </div>
              <p className="text-xs font-bold text-navy-700 mt-2 text-center leading-tight">{s.name}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §9 METRICS ─────────────────────────────────────────────────────────────

function Metrics() {
  const metrics = [
    { value: "143→5", label: "Days to Process Permits", desc: "Permit digitization · deployed inside LGU", color: "text-lime-400" },
    { value: "100K+", label: "Citizens Served", desc: "Tourism & citizen services portal", color: "text-teal-300" },
    { value: "5+", label: "Years Inside LGUs", desc: "As government workers and consultants", color: "text-sky-300" },
    { value: "3–5", label: "Founding Partners", desc: "We are accepting now — limited slots", color: "text-emerald-300" },
  ];

  return (
    <section className="py-20 px-6 bg-navy-700" aria-label="Impact metrics">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <p className="text-blue-300 font-semibold text-xs uppercase tracking-widest mb-3">Proven in Government</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Real results. Real systems. Built inside government.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white/[0.07] border border-white/10 rounded-xl p-6 text-center">
              <p className={`text-4xl md:text-5xl font-extrabold animate-metric ${m.color}`}>{m.value}</p>
              <p className="text-white font-semibold text-sm mt-2">{m.label}</p>
              <p className="text-navy-300 text-xs mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §10 TEAM ────────────────────────────────────────────────────────────────

function Team() {
  const founders = [
    { initials: "AB", name: "Anthony Basang", role: "Co-Founder & CEO", focus: "Led business analysis and cloud architecture on permit digitization and citizen service projects inside Philippine LGUs." },
    { initials: "JB", name: "Joshua Bascos", role: "Co-Founder & CTO", focus: "Built the backend systems for government data platforms processing thousands of citizen transactions inside LGU operations." },
    { initials: "TR", name: "Thor Remiendo", role: "Co-Founder & COO", focus: "Delivered front-facing government systems used by LGU staff and citizens — from design to deployment inside government offices." },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-white" aria-label="The Origin3 team">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-slide-up">
          <p className="text-primary-500 font-semibold text-xs uppercase tracking-widest mb-3">The Origin3 Team</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-700 tracking-tight leading-tight mb-4">
            We built systems inside government<br />before we built Origin3.
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Before Origin3, our team built permit and citizen service systems inside Philippine LGUs as government workers and consultants. We know what your staff deals with daily — because we were there. We built Origin3 to do this properly, as a product your office can own.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 stagger-children">
          {founders.map((f) => (
            <div key={f.initials} className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-7 text-center">
              <div className="w-14 h-14 rounded-full bg-navy-700 flex items-center justify-center text-white font-extrabold text-lg mx-auto mb-4">
                {f.initials}
              </div>
              <p className="font-bold text-navy-700 text-base">{f.name}</p>
              <p className="text-primary-500 text-xs font-semibold mt-1">{f.role}</p>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed">{f.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §11 CTA ────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section id="contact" className="hero-grid-bg py-24 px-6" aria-label="Start your pilot">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 animate-slide-up">
          <p className="text-primary-500 font-semibold text-xs uppercase tracking-widest mb-3">Founding Partner Program</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-700 tracking-tight mb-4">
            Be one of our first 5 official LGU partners.
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            We&apos;re selecting 3–5 founding LGU and school partners. You get the full product, hands-on setup, and a direct line to our team — at no cost for 45 days.
          </p>
        </div>

        <blockquote className="border-l-4 border-primary-400 pl-5 mb-2 animate-slide-up">
          <p className="text-slate-600 text-sm leading-relaxed italic">
            &ldquo;We won&apos;t hand you a product and leave. We built systems inside government before we started Origin3 — we know what your office needs, and we&apos;ll be there every step of the way.&rdquo; — Anthony Basang, Co-Founder
          </p>
        </blockquote>

        <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 mb-6 flex items-start gap-3 animate-slide-up">
          <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-700">Your data stays in your infrastructure.</span>{" "}
            Origin3 does not store, retain, or share your LGU&apos;s files. All data is processed on your own systems. We are compliant with RA 10173 (Data Privacy Act).
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8 mt-2 animate-slide-up">
          {[
            { step: "1", text: "Submit this form" },
            { step: "2", text: "We call you within 24 hours" },
            { step: "3", text: "First dashboard live in one session" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-8 h-8 rounded-full bg-navy-700 text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">{s.step}</div>
              <p className="text-xs text-slate-500 leading-snug">{s.text}</p>
            </div>
          ))}
        </div>
        <PilotForm />

        <p className="text-center text-sm text-slate-400 mt-6">
          Or reach us directly at{" "}
          <a href="mailto:solutions@origin3.net" className="text-primary-500 font-semibold hover:underline">
            solutions@origin3.net
          </a>
        </p>
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <Hero />
        <TrustStrip />
        <Problem />
        <GovLens />
        <SchoolLens />
        <Beliefs />
        <Identity />
        <Staircase />
        <Metrics />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
