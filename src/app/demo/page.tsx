"use client";
import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section = "home" | "datasets" | "dashboard" | "sai" | "table" | "graph" | "connections" | "nodes";

// ─── SAI Responses ────────────────────────────────────────────────────────────

function getSAIResponse(q: string): string {
  const t = q.toLowerCase();
  if (/active|aktibo/.test(t)) return "There are **312 active employees** across all departments. HRMO has the highest headcount at 48.";
  if (/female|babae|women/.test(t)) return "**189 female employees** — 45.2% of the total workforce. Finance and Admin have the highest female representation.";
  if (/male|lalaki/.test(t)) return "**229 male employees** — 54.8% of the total workforce.";
  if (/plantilla|position|vacant/.test(t)) return "**38 vacant positions** identified in the current plantilla. 12 are in technical roles across engineering and health.";
  if (/salary|sahod|grade/.test(t)) return "Average salary grade is **SG-14**. Range: SG-1 (₱13,000) to SG-33 (₱229,000). Most staff are between SG-10 and SG-18.";
  if (/department|opisina|office/.test(t)) return "Top departments by headcount:\n1. HRMO — 48\n2. Engineering — 41\n3. Health — 39\n4. Budget — 35\n5. Social Welfare — 32";
  if (/budget|appropriation|pondo/.test(t)) return "Total appropriation: **₱186.4M**. Obligations: ₱142.1M (76.2% utilization). Remaining balance: ₱44.3M.";
  if (/4ps|pantawid|beneficiar/.test(t)) return "**2,841 registered 4Ps beneficiary households** across all barangays. Coverage rate: 68% of qualified households.";
  if (/health|kalusugan|bhw/.test(t)) return "**1,204 health records** on file. 89% completeness rate. 34 BHW currently active across 18 barangays.";
  if (/farmer|magsasaka|agri/.test(t)) return "**847 registered farmers** in the registry. Top crops: rice (312), corn (198), vegetables (201). Total farm area: 1,243 ha.";
  if (/chart|graph|visualize|dashboard/.test(t)) return "I can build that for you. Here's a bar chart of employees by department:\n\n**HRMO** ████████████ 48\n**Engineering** ██████████ 41\n**Health** █████████ 39\n**Budget** ████████ 35\n**Social Welfare** ████████ 32";
  if (/ilan|how many|count/.test(t)) return "Please be more specific — which records do you want to count? For example: 'How many active employees?' or 'How many 4Ps beneficiaries?'";
  return "I found relevant data in your dataset. Could you rephrase the question to be more specific? Example: 'How many active employees?' or 'Show departments by budget utilization.'";
}

// ─── Sidebar Nav ─────────────────────────────────────────────────────────────

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { id: "datasets", label: "Datasets", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg> },
  { id: "dashboard", label: "Dashboard", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { id: "sai", label: "Ask SAI", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> },
  { id: "table", label: "Data Table", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" /></svg> },
  { id: "graph", label: "Graph", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="12" r="2"/><path strokeLinecap="round" d="M7 12h3M14 12h3M18 7l-4 3M18 17l-4-3"/></svg> },
  { id: "connections", label: "Connections", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
  { id: "nodes", label: "Node Monitor", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg> },
];

// ─── Section: Home ────────────────────────────────────────────────────────────

function HomeSection() {
  const kpis = [
    { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, value: "418", label: "Total Employees", sub: "Plantilla 2025 · HRMO", color: "text-amber-400", bg: "bg-amber-400/10" },
    { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>, value: "₱186.4M", label: "Total Appropriation", sub: "FY 2025 Budget", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, value: "847", label: "Registered Farmers", sub: "Agri Registry · 1,243 ha", color: "text-lime-400", bg: "bg-lime-400/10" },
    { icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, value: "1,204", label: "Health Records", sub: "BHW Program · 89% complete", color: "text-sky-400", bg: "bg-sky-400/10" },
  ];

  const recent = [
    { name: "HR Plantilla 2025.xlsx", rows: "418 rows", badge: "HR", verdict: "Clean", ago: "2h ago" },
    { name: "FY2025 Budget Summary.csv", rows: "186 rows", badge: "Finance", verdict: "Clean", ago: "Yesterday" },
    { name: "Farmers Registry Q1.xlsx", rows: "847 rows", badge: "Agriculture", verdict: "Clean", ago: "3 days ago" },
    { name: "BHW Health Records.xlsx", rows: "1,204 rows", badge: "Health", verdict: "Reviewed", ago: "5 days ago" },
    { name: "Permit Applications 2025.csv", rows: "2,318 rows", badge: "Permits", verdict: "Clean", ago: "1 week ago" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Good morning, Mayor&apos;s Office</h2>
        <p className="text-sm text-slate-400">5 datasets · 3 dashboards · Last activity 2 hours ago</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#1a2535] border border-white/10 rounded-xl p-4">
            <div className={`w-10 h-10 rounded-lg ${k.bg} flex items-center justify-center mb-3 ${k.color}`}>{k.icon}</div>
            <p className={`text-2xl font-extrabold ${k.color}`}>{k.value}</p>
            <p className="text-white text-sm font-semibold mt-0.5">{k.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Recent Datasets</h3>
        <div className="space-y-2">
          {recent.map((r) => (
            <div key={r.name} className="bg-[#1a2535] border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{r.name}</p>
                <p className="text-xs text-slate-400">{r.rows} · {r.ago}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 flex-shrink-0">{r.badge}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${r.verdict === "Clean" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>{r.verdict}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Datasets ────────────────────────────────────────────────────────

function DatasetsSection() {
  const [uploading, setUploading] = useState(false);
  const [uploadPhase, setUploadPhase] = useState(0);
  const [done, setDone] = useState(false);

  const phases = ["Uploading file…", "Analysing columns…", "Running AI cleaning…", "Dataset is ready."];

  function simulate() {
    setUploading(true); setUploadPhase(0); setDone(false);
    [600, 1400, 2400, 3400].forEach((ms, i) => {
      setTimeout(() => {
        setUploadPhase(i);
        if (i === 3) setTimeout(() => { setUploading(false); setDone(true); }, 800);
      }, ms);
    });
  }

  const datasets = [
    { name: "HR Plantilla 2025", rows: 418, score: 97, type: "HR", badge: "bg-blue-500/20 text-blue-400" },
    { name: "FY2025 Budget Summary", rows: 186, score: 94, type: "Finance", badge: "bg-emerald-500/20 text-emerald-400" },
    { name: "Farmers Registry Q1", rows: 847, score: 88, type: "Agriculture", badge: "bg-lime-500/20 text-lime-400" },
    { name: "BHW Health Records", rows: 1204, score: 91, type: "Health", badge: "bg-sky-500/20 text-sky-400" },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Datasets</h2>
        <button onClick={simulate} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors">+ Upload Dataset</button>
      </div>

      {uploading && (
        <div className="bg-[#1a2535] border border-blue-500/30 rounded-xl p-4">
          <p className="text-sm text-blue-300 font-medium mb-2">{phases[uploadPhase]}</p>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${(uploadPhase + 1) * 25}%` }} />
          </div>
        </div>
      )}

      {done && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-sm text-emerald-400 font-medium">
          ✓ Dataset uploaded and ready for analysis.
        </div>
      )}

      <div className="space-y-3">
        {datasets.map((d) => (
          <div key={d.name} className="bg-[#1a2535] border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-white">{d.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${d.badge}`}>{d.type}</span>
              </div>
              <p className="text-xs text-slate-400">{d.rows.toLocaleString()} rows</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-emerald-400">{d.score}%</p>
              <p className="text-xs text-slate-400">Quality Score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Dashboard ───────────────────────────────────────────────────────

function DashboardSection() {
  const bars = [
    { label: "HRMO", value: 48, pct: 100 },
    { label: "Engineering", value: 41, pct: 85 },
    { label: "Health", value: 39, pct: 81 },
    { label: "Budget", value: 35, pct: 73 },
    { label: "Social Welfare", value: 32, pct: 67 },
    { label: "Agri", value: 28, pct: 58 },
  ];

  const donut = [
    { label: "Permanent", pct: 58, color: "#3b82f6" },
    { label: "Co-terminus", pct: 24, color: "#10b981" },
    { label: "Casual", pct: 11, color: "#f59e0b" },
    { label: "Job Order", pct: 7, color: "#6366f1" },
  ];

  const grades = [
    { label: "SG 1–6", value: 12 },
    { label: "SG 7–12", value: 89 },
    { label: "SG 13–18", value: 201 },
    { label: "SG 19–24", value: 87 },
    { label: "SG 25–33", value: 29 },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">HR Plantilla 2025</h2>
          <p className="text-xs text-slate-400">418 employees · Auto-generated dashboard</p>
        </div>
        <button className="text-xs border border-white/20 text-slate-300 px-3 py-1.5 rounded-lg">Export PDF</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[["418", "Total Employees"], ["312", "Permanent + Cos"], ["38", "Vacant Positions"]].map(([v, l]) => (
          <div key={l} className="bg-[#1a2535] border border-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-extrabold text-blue-400">{v}</p>
            <p className="text-xs text-slate-300 mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1a2535] border border-white/10 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-300 mb-3">Employees by Department</p>
          <div className="space-y-2">
            {bars.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <p className="text-xs text-slate-400 w-20 flex-shrink-0">{b.label}</p>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${b.pct}%` }} />
                </div>
                <p className="text-xs text-slate-300 w-6 text-right">{b.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a2535] border border-white/10 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-300 mb-3">Appointment Type</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                {donut.reduce<{ offset: number; els: React.ReactNode[] }>((acc, d) => {
                  const el = <circle key={d.label} cx="18" cy="18" r="12" fill="none" stroke={d.color} strokeWidth="6" strokeDasharray={`${d.pct * 0.75} ${75 - d.pct * 0.75}`} strokeDashoffset={-acc.offset * 0.75} />;
                  return { offset: acc.offset + d.pct, els: [...acc.els, el] };
                }, { offset: 0, els: [] }).els}
              </svg>
            </div>
            <div className="space-y-1.5">
              {donut.map((d) => (
                <div key={d.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <p className="text-xs text-slate-300">{d.label} <span className="text-slate-500">{d.pct}%</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a2535] border border-white/10 rounded-xl p-4">
        <p className="text-xs font-semibold text-slate-300 mb-3">Salary Grade Distribution</p>
        <div className="flex items-end gap-2 h-24">
          {grades.map((g) => (
            <div key={g.label} className="flex-1 flex flex-col items-center gap-1">
              <p className="text-xs text-slate-400">{g.value}</p>
              <div className="w-full bg-blue-500/70 rounded-sm" style={{ height: `${(g.value / 201) * 70}px` }} />
              <p className="text-xs text-slate-500 whitespace-nowrap" style={{ fontSize: "0.6rem" }}>{g.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: SAI Chat ────────────────────────────────────────────────────────

function SAISection() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm SAI, your data assistant. Ask me anything about your datasets — in English or Filipino." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const chips = ["Ilan ang active employees?", "Show departments by headcount", "What is the average salary grade?", "How many vacant positions?"];

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, text };
    const aiMsg = { role: "ai" as const, text: getSAIResponse(text) };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  }

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-bold text-white">Ask SAI</h2>
        <p className="text-xs text-slate-400">AI-powered data analyst · Answers in Filipino or English</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start gap-2"}`}>
            {m.role === "ai" && <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">S</div>}
            <div className={`max-w-[78%] text-sm rounded-xl px-3 py-2 whitespace-pre-line ${m.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-[#1a2535] border border-white/10 text-slate-200 rounded-bl-sm"}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <button key={c} onClick={() => send(c)} className="text-xs px-2.5 py-1 rounded-full border border-blue-500/40 text-blue-300 hover:bg-blue-500/20 transition-colors">{c}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-[#1a2535] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500/50"
            placeholder="Ask about your data…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <button onClick={() => send(input)} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Data Table ──────────────────────────────────────────────────────

function TableSection() {
  const rows = [
    ["Reyes, Maria", "HRMO", "Human Resource Officer III", "SG-18", "Permanent", "Active"],
    ["Santos, Juan", "Engineering", "Engineer II", "SG-16", "Permanent", "Active"],
    ["Cruz, Ana", "Health", "Public Health Nurse", "SG-15", "Permanent", "Active"],
    ["Dela Cruz, Jose", "Budget", "Budget Officer II", "SG-16", "Permanent", "Active"],
    ["Gomez, Liza", "Social Welfare", "MSWDO", "SG-22", "Permanent", "Active"],
    ["Lopez, Pedro", "Agriculture", "Agriculturist I", "SG-11", "Permanent", "Active"],
    ["Torres, Grace", "HRMO", "Administrative Aide VI", "SG-6", "Casual", "Active"],
    ["Villanueva, Ben", "Engineering", "Technical Support", "SG-8", "Job Order", "Active"],
    ["Aquino, Rosa", "Health", "Midwife II", "SG-11", "Permanent", "Active"],
    ["Bautista, Carlo", "Budget", "Budget Analyst", "SG-13", "Co-terminus", "Active"],
    ["Mendoza, Celia", "Social Welfare", "Social Welfare Officer", "SG-15", "Permanent", "Active"],
    ["Fernando, Roy", "HRMO", "Records Officer", "SG-10", "Casual", "Active"],
    ["Ramos, Tess", "Engineering", "CAD Operator", "SG-9", "Job Order", "On Leave"],
    ["Navarro, Dan", "Agriculture", "Agri Extension Worker", "SG-9", "Co-terminus", "Active"],
    ["Castillo, Nina", "Health", "Sanitary Inspector", "SG-10", "Permanent", "Active"],
  ];

  const [search, setSearch] = useState("");
  const filtered = rows.filter((r) => r.some((c) => c.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">HR Plantilla 2025</h2>
        <span className="text-xs text-slate-400">418 total · showing 15</span>
      </div>
      <input
        className="w-full bg-[#1a2535] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500/50"
        placeholder="Search employees…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {["Name", "Office", "Position", "SG", "Appointment", "Status"].map((h) => (
                <th key={h} className="text-left px-3 py-2.5 text-slate-400 font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {r.map((c, j) => (
                  <td key={j} className={`px-3 py-2.5 whitespace-nowrap ${j === 5 ? (c === "Active" ? "text-emerald-400" : "text-amber-400") : "text-slate-300"}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section: Graph ───────────────────────────────────────────────────────────

function GraphSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  const nodes = [
    { id: "hr", label: "HR Plantilla", x: 180, y: 80, color: "#3b82f6", rows: "418 rows" },
    { id: "budget", label: "FY2025 Budget", x: 380, y: 80, color: "#10b981", rows: "186 rows" },
    { id: "farmers", label: "Farmers Registry", x: 80, y: 240, color: "#84cc16", rows: "847 rows" },
    { id: "health", label: "Health Records", x: 480, y: 240, color: "#0ea5e9", rows: "1,204 rows" },
    { id: "permits", label: "Permit Apps", x: 280, y: 310, color: "#f59e0b", rows: "2,318 rows" },
  ];

  const edges = [
    { from: "hr", to: "budget", key: "DEPARTMENT" },
    { from: "hr", to: "permits", key: "EMPLOYEE_ID" },
    { from: "farmers", to: "health", key: "BARANGAY_CODE" },
    { from: "budget", to: "permits", key: "OFFICE_CODE" },
    { from: "health", to: "permits", key: "BENEFICIARY_ID" },
  ];

  const pos = Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Dataset Relationships</h2>
        <p className="text-xs text-slate-400">Hover nodes to highlight connections · join keys detected automatically</p>
      </div>
      <div className="bg-[#1a2535] border border-white/10 rounded-xl overflow-hidden">
        <svg viewBox="0 0 560 380" className="w-full h-64">
          {edges.map((e) => {
            const a = pos[e.from], b = pos[e.to];
            const active = hovered === e.from || hovered === e.to;
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={active ? "#60a5fa" : "#334155"} strokeWidth={active ? 2 : 1} />
                {active && (
                  <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 5} fill="#93c5fd" fontSize="9" textAnchor="middle">{e.key}</text>
                )}
              </g>
            );
          })}
          {nodes.map((n) => {
            const dim =hovered !== null && hovered !== n.id && !edges.some((e) => (e.from === n.id && hovered === e.to) || (e.to === n.id && hovered === e.from));
            return (
              <g key={n.id} onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }} opacity={dim ? 0.3 : 1}>
                <circle cx={n.x} cy={n.y} r={28} fill={n.color} fillOpacity={0.15} stroke={n.color} strokeWidth={1.5} />
                <text x={n.x} y={n.y - 2} fill="white" fontSize="9" textAnchor="middle" fontWeight="600">{n.label.split(" ")[0]}</text>
                <text x={n.x} y={n.y + 9} fill={n.color} fontSize="8" textAnchor="middle">{n.rows}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {edges.map((e) => (
          <div key={`${e.from}-${e.to}`} className="bg-[#1a2535] border border-white/10 rounded-lg px-3 py-2 text-xs">
            <span className="text-slate-300">{e.from} ↔ {e.to}</span>
            <span className="ml-2 text-blue-400 font-mono">{e.key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Connections ─────────────────────────────────────────────────────

function ConnectionsSection() {
  const [syncing, setSyncing] = useState<string | null>(null);
  const [synced, setSynced] = useState<string | null>(null);

  function doSync(id: string) {
    setSyncing(id); setSynced(null);
    setTimeout(() => { setSyncing(null); setSynced(id); }, 2000);
  }

  const conns = [
    { id: "hris", name: "Municipal HRIS", type: "PostgreSQL", table: "employees", rows: "418 rows", status: "green", ago: "2h ago" },
    { id: "finance", name: "eFinance System", type: "PostgreSQL", table: "budget_allocations", rows: "186 rows", status: "green", ago: "Yesterday" },
    { id: "gdrive", name: "Farmers Registry (Sheets)", type: "Google Sheets", table: "farmers_q1", rows: "847 rows", status: "amber", ago: "5 days ago" },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Connections</h2>
        <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors">+ Add Connection</button>
      </div>

      {synced && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-sm text-emerald-400 font-medium">
          ✓ Sync complete — dataset updated.
        </div>
      )}

      <div className="space-y-3">
        {conns.map((c) => (
          <div key={c.id} className="bg-[#1a2535] border border-white/10 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${c.status === "green" ? "bg-emerald-400" : "bg-amber-400"}`} />
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.type} · {c.table} · {c.rows}</p>
                  {c.status === "amber" && <p className="text-xs text-amber-400 mt-0.5">Last synced {c.ago} — consider refreshing</p>}
                </div>
              </div>
              <button
                onClick={() => doSync(c.id)}
                disabled={syncing === c.id}
                className="text-xs border border-white/20 text-slate-300 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50"
              >
                {syncing === c.id ? "Syncing…" : "Sync Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Node Monitor ────────────────────────────────────────────────────

function NodesSection() {
  const nodes = [
    { id: "node-1", name: "Node · Magsaysay Hall", cpu: 22, ram: 41, uptime: "99.8%", status: "online", datasets: 12, last: "2m ago" },
    { id: "node-2", name: "Node · Health Office", cpu: 8, ram: 34, uptime: "100%", status: "online", datasets: 8, last: "1m ago" },
    { id: "node-3", name: "Node · Engineering", cpu: 67, ram: 72, uptime: "97.2%", status: "warning", datasets: 5, last: "5m ago" },
    { id: "node-4", name: "Node · Budget Office", cpu: 3, ram: 28, uptime: "99.9%", status: "online", datasets: 6, last: "3m ago" },
    { id: "node-5", name: "Node · Agri Office", cpu: 0, ram: 0, uptime: "—", status: "offline", datasets: 3, last: "2d ago" },
    { id: "node-6", name: "Node · Social Welfare", cpu: 15, ram: 45, uptime: "98.4%", status: "online", datasets: 7, last: "4m ago" },
  ];

  function Meter({ value, color }: { value: number; color: string }) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
        </div>
        <span className="text-xs text-slate-400 w-7 text-right">{value}%</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white">GovLens Box Fleet</h2>
        <p className="text-xs text-slate-400">6 nodes · 5 online · 1 offline · All data stays on-premise</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {nodes.map((n) => (
          <div key={n.id} className={`bg-[#1a2535] border rounded-xl p-4 ${n.status === "warning" ? "border-amber-500/40" : n.status === "offline" ? "border-red-500/30" : "border-white/10"}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${n.status === "online" ? "bg-emerald-400" : n.status === "warning" ? "bg-amber-400" : "bg-red-400"}`} />
              <p className="text-xs font-semibold text-white truncate">{n.name}</p>
            </div>
            {n.status !== "offline" ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 w-8">CPU</span>
                  <Meter value={n.cpu} color={n.cpu > 60 ? "bg-amber-400" : "bg-blue-500"} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 w-8">RAM</span>
                  <Meter value={n.ram} color={n.ram > 80 ? "bg-red-400" : "bg-emerald-500"} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-400">{n.datasets} datasets</span>
                  <span className="text-xs text-slate-400">↻ {n.last}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-red-400 mt-1">Offline · last seen {n.last}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Demo Page ───────────────────────────────────────────────────────────

export default function DemoPage() {
  const [section, setSection] = useState<Section>("home");

  const sectionMap: Record<Section, React.ReactNode> = {
    home: <HomeSection />,
    datasets: <DatasetsSection />,
    dashboard: <DashboardSection />,
    sai: <SAISection />,
    table: <TableSection />,
    graph: <GraphSection />,
    connections: <ConnectionsSection />,
    nodes: <NodesSection />,
  };

  return (
    <div className="min-h-screen bg-[#0C1929] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Interactive Demo</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">GovLens — Data Intelligence for Philippine LGUs</h1>
          <p className="text-sm text-slate-400 mt-1">Click through the sections to explore the platform.</p>
        </div>

        <div className="bg-[#111c2d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: 520 }}>
          {/* Topbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0e1824]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-slate-500">govlens.app / demo</div>
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">M</div>
          </div>

          <div className="flex" style={{ minHeight: 472 }}>
            {/* Sidebar */}
            <div className="w-14 md:w-44 border-r border-white/10 bg-[#0e1824] flex flex-col py-3 gap-0.5 flex-shrink-0">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 mx-1.5 rounded-lg text-left transition-colors ${section === item.id ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="hidden md:block text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {sectionMap[section]}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          All data shown is illustrative. No real government records are used in this demo.
        </p>
      </div>
    </div>
  );
}
