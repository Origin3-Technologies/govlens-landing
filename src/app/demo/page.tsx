"use client";
import { useState, useEffect, useRef } from "react";

/* ── DESIGN TOKENS (mirrors GovLens CSS vars) ── */
const T = {
  gl:      "#0F6E56",
  glm:     "#1D9E75",
  glbg:    "#E8F5F0",
  glbg2:   "#D0EDE4",
  glborder:"#A3D5C3",
  surface: "#F7FAF8",
  border:  "#E0ECE8",
  text:    "#1A2E26",
  muted:   "#5A7A6E",
  subtle:  "#7A9E93",
  dark:    "#0F1923",
  panel:   "#fff",
};

/* ── TYPES ── */
type Section = "home" | "datasets" | "dashboard" | "chat" | "table" | "graph" | "connections" | "nodes";

/* ── SAMPLE DATA ── */
const DEPARTMENTS = [
  { name: "Engineering (MEO)", count: 127 },
  { name: "Health (MHO)",      count: 89  },
  { name: "Agriculture",       count: 78  },
  { name: "Social Welfare",    count: 65  },
  { name: "Mayor's Office",    count: 58  },
  { name: "HRMO",              count: 45  },
  { name: "Budget Office",     count: 38  },
  { name: "Civil Registry",    count: 29  },
];

const EMPLOYMENT = [
  { label: "Permanent",   value: 634, pct: 71.2, color: T.gl  },
  { label: "Job Order",   value: 170, pct: 19.1, color: "#93C5FD" },
  { label: "Co-terminus", value: 87,  pct: 9.7,  color: "#C9A84C" },
];

const SALARY_GRADES = [
  { grade: "SG 1–6",   count: 78  },
  { grade: "SG 7–12",  count: 234 },
  { grade: "SG 13–18", count: 312 },
  { grade: "SG 19–24", count: 189 },
  { grade: "SG 25–30", count: 65  },
  { grade: "SG 31–33", count: 13  },
];

const TABLE_ROWS = [
  { name: "DELA CRUZ, JUAN A.",   position: "Municipal Engineer I",     dept: "Engineering",   sg: 15, status: "Permanent",   sex: "Male"   },
  { name: "SANTOS, MARIA B.",     position: "Nurse II",                 dept: "Health",        sg: 12, status: "Permanent",   sex: "Female" },
  { name: "BAUTISTA, PEDRO C.",   position: "Agricultural Technologist",dept: "Agriculture",   sg: 11, status: "Permanent",   sex: "Male"   },
  { name: "REYES, ANA D.",        position: "Social Welfare Officer I", dept: "MSWDO",         sg: 11, status: "Permanent",   sex: "Female" },
  { name: "GARCIA, JOSE E.",      position: "Administrative Aide VI",   dept: "Mayor's Office",sg: 6,  status: "Permanent",   sex: "Male"   },
  { name: "MENDOZA, ROSA F.",     position: "HRMO I",                   dept: "HRMO",          sg: 15, status: "Permanent",   sex: "Female" },
  { name: "LOPEZ, CARLOS G.",     position: "Accountant II",            dept: "Budget",        sg: 16, status: "Permanent",   sex: "Male"   },
  { name: "HERNANDEZ, LUNA H.",   position: "Administrative Officer V", dept: "Mayor's Office",sg: 18, status: "Co-terminus", sex: "Female" },
  { name: "GONZALES, MARK I.",    position: "Driver II",                dept: "Engineering",   sg: 4,  status: "Job Order",   sex: "Male"   },
  { name: "TORRES, LISA J.",      position: "Barangay Health Worker",   dept: "Health",        sg: 1,  status: "Job Order",   sex: "Female" },
  { name: "FLORES, RODEL K.",     position: "MENRO Officer",            dept: "MENRO",         sg: 14, status: "Permanent",   sex: "Male"   },
  { name: "CASTRO, GRACE L.",     position: "Civil Registrar I",        dept: "Civil Registry",sg: 15, status: "Permanent",   sex: "Female" },
  { name: "RAMOS, ANTONIO M.",    position: "Engineer II",              dept: "Engineering",   sg: 17, status: "Permanent",   sex: "Male"   },
  { name: "VILLANUEVA, CORA N.", position: "Midwife II",               dept: "Health",        sg: 10, status: "Permanent",   sex: "Female" },
  { name: "MORALES, EDGAR O.",    position: "Agriculturist II",         dept: "Agriculture",   sg: 15, status: "Permanent",   sex: "Male"   },
];

const DATASETS = [
  { id: "1", name: "Municipal HR Plantilla 2025",         rows: 891,  cols: 27, quality: 94, type: "Human Resource", updated: "Apr 23, 2026" },
  { id: "2", name: "Student Assistance Program 2024–2025",rows: 350,  cols: 12, quality: 88, type: "General",        updated: "Apr 20, 2026" },
  { id: "3", name: "Household Profiling Survey",           rows: 4521, cols: 38, quality: 91, type: "Household",      updated: "Apr 18, 2026" },
];

/* ── GRAPH DATA ── */
interface GraphNode { id: string; label: string; rows: number; type: string; color: string; cx: number; cy: number; }
interface GraphEdge { from: string; to: string; label: string; strength: "exact" | "fuzzy"; }

const GRAPH_NODES: GraphNode[] = [
  { id: "hr",     label: "HR Plantilla 2025",    rows: 891,  type: "Human Resource", color: T.gl,       cx: 200, cy: 160 },
  { id: "asap",   label: "ASAP 2024–2025",       rows: 350,  type: "General",        color: "#7C3AED",  cx: 420, cy: 80  },
  { id: "hh",     label: "Household Profiling",  rows: 4521, type: "Household",      color: "#059669",  cx: 440, cy: 260 },
  { id: "budget", label: "Budget Summary 2025",  rows: 144,  type: "Finance",        color: "#C9A84C",  cx: 80,  cy: 270 },
  { id: "agri",   label: "Farmers Registry",     rows: 200,  type: "Agriculture",    color: "#EA580C",  cx: 70,  cy: 100 },
];

const GRAPH_EDGES: GraphEdge[] = [
  { from: "hr",   to: "asap",   label: "DEPARTMENT",  strength: "exact" },
  { from: "hr",   to: "hh",     label: "BARANGAY",    strength: "fuzzy" },
  { from: "hr",   to: "budget", label: "OFFICE",      strength: "fuzzy" },
  { from: "hr",   to: "agri",   label: "MUNICIPALITY",strength: "fuzzy" },
  { from: "hh",   to: "asap",   label: "HOUSEHOLD_ID",strength: "exact" },
];

/* ── CONNECTIONS DATA ── */
interface Connection { id: string; name: string; type: "postgres" | "sheets"; office: string; tables: number; lastSync: string; status: "ok" | "warning" | "error"; rows: number; }

const CONNECTIONS: Connection[] = [
  { id: "c1", name: "LGU-HRIS",          type: "postgres", office: "HRMO",           tables: 3, lastSync: "2 hours ago", status: "ok",      rows: 891 },
  { id: "c2", name: "LGU-Assistance",    type: "postgres", office: "Mayor's Office", tables: 2, lastSync: "4 hours ago", status: "ok",      rows: 598 },
  { id: "c3", name: "Barangay Budget 2024",type: "sheets", office: "Budget Office",  tables: 1, lastSync: "1 day ago",   status: "warning", rows: 144 },
];

/* ── NODES DATA ── */
interface BoxNode { id: string; name: string; location: string; status: "online" | "warning" | "offline"; lastSeen: string; uptime: string; cpu: number; ram: number; datasets: number; queries: number; version: string; }

const BOX_NODES: BoxNode[] = [
  { id: "n1", name: "Box-001", location: "Provincial Capitol — Main Office",        status: "online",  lastSeen: "Just now",    uptime: "12d 4h",  cpu: 18, ram: 42, datasets: 5, queries: 247,  version: "v10.0" },
  { id: "n2", name: "Box-002", location: "Northern District Municipal Hall",        status: "online",  lastSeen: "1 min ago",   uptime: "8d 11h",  cpu: 31, ram: 58, datasets: 3, queries: 89,   version: "v10.0" },
  { id: "n3", name: "Box-003", location: "Eastern District Town Hall",              status: "warning", lastSeen: "2 hours ago", uptime: "2d 0h",   cpu: 0,  ram: 0,  datasets: 2, queries: 14,   version: "v9.5"  },
  { id: "n4", name: "Box-004", location: "Central Municipal LGU Office",            status: "online",  lastSeen: "5 min ago",   uptime: "5d 6h",   cpu: 9,  ram: 35, datasets: 4, queries: 312,  version: "v10.0" },
  { id: "n5", name: "Box-005", location: "Southern District Municipal Hall",        status: "online",  lastSeen: "Just now",    uptime: "20d 2h",  cpu: 44, ram: 67, datasets: 6, queries: 518,  version: "v10.0" },
  { id: "n6", name: "Box-006", location: "Western District LGU Office",             status: "offline", lastSeen: "3 days ago",  uptime: "—",       cpu: 0,  ram: 0,  datasets: 0, queries: 0,    version: "v9.0"  },
];

/* ── SAI RESPONSES ── */
function getSAIResponse(q: string): string {
  const lq = q.toLowerCase();
  if (lq.match(/babae|female|women|woman/))
    return "May **470 female employees** sa Municipal HR Plantilla 2025 — 52.7% ng kabuuang workforce. Engineering ang may pinaka-maraming female staff (68 sa 127 total).";
  if (lq.match(/\blalaki\b|(?<!fe)male(?!.*female)/))
    return "May **421 male employees** — 47.3% ng workforce. Pinaka-marami sa Engineering office (59 males).";
  if (lq.match(/sahod|salary|sueldo|average.*pay|pay.*average/))
    return "Average monthly salary: **₱18,432**. SG 13–18 is the most common range with 312 employees (35% of total). Highest earners are in SG 31–33 — 13 executive-level staff.";
  if (lq.match(/engineering|meo/))
    return "Engineering (MEO) is the **largest department with 127 employees** (14.3% of total). Includes licensed civil engineers, engineering aides, and technical staff.";
  if (lq.match(/job order|\bjo\b/))
    return "There are **170 Job Order employees** (19.1% of workforce). Distributed across all departments. JO staff are on renewable contracts and are not GSIS-eligible.";
  if (lq.match(/permanent/))
    return "**634 employees are on permanent plantilla status** — 71.2% of total. These are DBM-approved positions. Remaining: 170 Job Order and 87 Co-terminus.";
  if (lq.match(/vacanc|unfilled|vacant/))
    return "There are **23 unfilled positions** across 6 departments. Highest vacancy: Health (MHO) with 8 unfilled nursing posts. Engineering has 5 vacant positions.";
  if (lq.match(/4ps|pantawid|household/))
    return "4Ps data is in the **Household Profiling** dataset (4,521 households). Switch to that dataset to query 4Ps beneficiary numbers by municipality.";
  if (lq.match(/department|opisina|office/))
    return "Top departments by headcount:\n1. Engineering (MEO): 127\n2. Health (MHO): 89\n3. Agriculture: 78\n4. Social Welfare: 65\n5. Mayor's Office: 58";
  if (lq.match(/health|mho|nurse|doctor/))
    return "Health (MHO) has **89 employees**: nurses, midwives, and rural health staff. 8 nursing positions are currently vacant. Average Salary Grade in Health: 10.3.";
  if (lq.match(/salary grade|sg\s?\d|\bgrade\b/))
    return "Salary Grade breakdown:\n• SG 1–6: 78 staff\n• SG 7–12: 234 staff\n• SG 13–18: 312 staff (largest)\n• SG 19–24: 189 staff\n• SG 25+: 78 staff\n\nAverage SG: 14.2.";
  if (lq.match(/total|lahat|how many|ilan/))
    return "**891 total employees** in Municipal HR Plantilla 2025. 470 female, 421 male. 634 permanent, 170 job order, 87 co-terminus. Data quality score: 94/100.";
  if (lq.match(/hello|hi|kamusta|good/))
    return "Kamusta! Ako si SAI — ang GovLens AI data analyst. Tanungin mo ako tungkol sa HR data ng inyong LGU. Halimbawa: 'Ilan ang babae?' o 'What is the average salary grade?'";
  return "Nakahanap ako ng kaugnayan sa iyong tanong. Maaari kang magtanong ng mas tiyak — halimbawa: 'How many permanent employees?', 'Which department is largest?', o 'Ilan ang female?'";
}

/* ── SVG ICONS ── */
const Icon = {
  home:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  datasets: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/></svg>,
  dashboard:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  chat:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  table:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>,
  graph:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  connect:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  nodes:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>,
  upload:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  send:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  check:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>,
  refresh:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  plus:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  alert:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  search:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  star:     <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  postgres: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>,
  sheets:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
  monitor:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>,
  arrowUpRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
};

/* ── KPI CARD ── */
function KPI({ label, value, sub, color = T.gl }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
      <div className="text-[11px] font-semibold uppercase tracking-[1.5px] mb-2" style={{ color: T.subtle }}>{label}</div>
      <div className="font-extrabold leading-none mb-1" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", fontSize: "clamp(22px, 2.5vw, 30px)", color }}>
        {value}
      </div>
      {sub && <div className="text-[12px]" style={{ color: T.muted }}>{sub}</div>}
    </div>
  );
}

/* ── BAR CHART ── */
function BarChart({ data }: { data: { name: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="flex flex-col gap-3">
      {data.map((d) => (
        <div key={d.name}>
          <div className="flex justify-between text-[12px] mb-1">
            <span style={{ color: T.muted }}>{d.name}</span>
            <span className="font-semibold" style={{ color: T.text }}>{d.count}</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: T.glbg }}>
            <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${(d.count / max) * 100}%`, background: T.gl }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── DONUT CHART ── */
function Donut({ data, center }: { data: { label: string; value: number; pct: number; color: string }[]; center: string }) {
  let cursor = 0;
  const segments = data.map((d) => {
    const start = cursor;
    cursor += d.pct / 100;
    return { ...d, start, end: cursor };
  });
  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-shrink-0" style={{ width: 120, height: 120 }}>
        <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${segments.map((s) => `${s.color} ${s.start * 360}deg ${s.end * 360}deg`).join(", ")})` }} />
        <div className="absolute flex flex-col items-center justify-center" style={{ inset: 22, borderRadius: "50%", background: "#fff" }}>
          <div className="font-extrabold text-[14px]" style={{ color: T.text, fontFamily: "var(--font-sora, Sora, sans-serif)" }}>{center}</div>
          <div className="text-[9px]" style={{ color: T.subtle }}>Total</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
            <span className="text-[12px]" style={{ color: T.muted }}>{d.label}</span>
            <span className="text-[12px] font-semibold ml-auto pl-4" style={{ color: T.text }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MINI METER ── */
function Meter({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: T.border }}>
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[11px] w-7 text-right font-medium" style={{ color: T.muted }}>{value}%</span>
    </div>
  );
}

/* ── UPLOAD MODAL ── */
function UploadModal({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<"pick" | "uploading" | "analyzing" | "cleaning" | "done">("pick");
  const [progress, setProgress] = useState(0);

  const start = () => {
    setPhase("uploading");
    let p = 0;
    const t1 = setInterval(() => {
      p += 8;
      setProgress(Math.min(p, 100));
      if (p >= 100) { clearInterval(t1); setPhase("analyzing"); setTimeout(() => { setPhase("cleaning"); setTimeout(() => setPhase("done"), 1800); }, 1600); }
    }, 80);
  };

  const phases = { pick: null, uploading: "Uploading file...", analyzing: "AI is analyzing columns and detecting dataset type...", cleaning: "Running 7-type cleaning engine — found 3 suggestions...", done: null };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(12,25,41,0.7)" }}>
      <div className="rounded-2xl p-8 w-full max-w-md mx-4" style={{ background: "#fff", border: `1px solid ${T.border}` }}>
        {phase === "pick" && (
          <>
            <div className="font-bold text-lg mb-1" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Import Dataset</div>
            <p className="text-sm mb-5" style={{ color: T.muted }}>Upload any Excel or CSV. GovLens handles Philippine government formats automatically.</p>
            <div className="rounded-xl border-2 border-dashed p-8 text-center mb-5 cursor-pointer" style={{ borderColor: T.glborder, background: T.glbg }} onClick={start}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: T.glbg2, color: T.gl }}>{Icon.upload}</div>
              <div className="font-semibold text-sm mb-1" style={{ color: T.text }}>IGHRS_Plantilla_2024.xlsx</div>
              <div className="text-[12px]" style={{ color: T.muted }}>891 rows · Click to upload</div>
            </div>
            <button onClick={start} className="w-full py-3 rounded-xl font-semibold text-sm text-white" style={{ background: T.gl }}>Start Upload</button>
            <button onClick={onClose} className="w-full py-2 mt-2 rounded-xl text-sm" style={{ color: T.subtle }}>Cancel</button>
          </>
        )}
        {(phase === "uploading" || phase === "analyzing" || phase === "cleaning") && (
          <>
            <div className="font-bold text-lg mb-5" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>
              {phase === "uploading" ? "Uploading..." : phase === "analyzing" ? "Analyzing..." : "AI Cleaning..."}
            </div>
            <div className="h-2 rounded-full mb-3" style={{ background: T.glbg }}>
              <div className="h-2 rounded-full transition-all duration-200" style={{ width: phase === "uploading" ? `${progress}%` : "100%", background: T.gl }} />
            </div>
            <p className="text-sm" style={{ color: T.muted }}>{phases[phase]}</p>
            {phase === "cleaning" && (
              <div className="mt-4 rounded-xl p-4 text-[12px] flex flex-col gap-2" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                {["Normalize SEX column (F/M → Female/Male)", "Rename Unnamed_16 → FIRST NAME", "Exclude EMPLOYEE ID (high-cardinality)"].map((s) => (
                  <div key={s} className="flex items-center gap-2" style={{ color: T.muted }}>
                    <span style={{ color: T.gl }}>{Icon.check}</span>{s}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {phase === "done" && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="font-bold text-lg" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Dataset is ready.</div>
            </div>
            <div className="rounded-xl p-4 mb-5" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              {[["File", "IGHRS_Plantilla_2024.xlsx"], ["Rows", "891"], ["Quality Score", "94 / 100"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm mb-2 last:mb-0">
                  <span style={{ color: T.muted }}>{k}</span>
                  <span className="font-medium" style={{ color: T.text }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={onDone} className="w-full py-3 rounded-xl font-semibold text-sm text-white" style={{ background: T.gl }}>Open Dataset</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ── HOME SECTION ── */
function HomeSection({ setSection }: { setSection: (s: Section) => void }) {
  const cards = [
    { icon: Icon.datasets,  label: "Import Data",    sub: "Upload Excel or CSV",  section: "datasets"     as Section, grad: "linear-gradient(135deg, #34D399, #0F6E56)" },
    { icon: Icon.dashboard, label: "Dashboard",      sub: "View AI dashboards",   section: "dashboard"    as Section, grad: "linear-gradient(135deg, #A78BFA, #7C3AED)" },
    { icon: Icon.chat,      label: "Ask SAI",        sub: "AI data analyst",      section: "chat"         as Section, grad: "linear-gradient(135deg, #6EE7B7, #1D9E75)" },
    { icon: Icon.table,     label: "Data Table",     sub: "Browse all records",   section: "table"        as Section, grad: "linear-gradient(135deg, #FB923C, #EA580C)" },
    { icon: Icon.graph,     label: "Data Graph",     sub: "Explore relationships",section: "graph"        as Section, grad: "linear-gradient(135deg, #F472B6, #DB2777)" },
    { icon: Icon.connect,   label: "Connections",    sub: "Live DB sync",         section: "connections"  as Section, grad: "linear-gradient(135deg, #4ADE80, #16A34A)" },
    { icon: Icon.nodes,     label: "Node Monitor",   sub: "Fleet health status",  section: "nodes"        as Section, grad: "linear-gradient(135deg, #67E8F9, #0891B2)" },
  ];
  return (
    <div className="p-8 max-w-[960px] mx-auto w-full">
      <div className="mb-8">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-1" style={{ color: T.gl }}>Welcome back</div>
        <div className="font-bold text-2xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Municipality</div>
        <div className="text-sm mt-1" style={{ color: T.muted }}>3 datasets ready · Last sync: Apr 23, 2026</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPI label="Total Datasets" value="3"     sub="All clean and ready" />
        <KPI label="Total Records"  value="5,762" sub="Across all datasets" />
        <KPI label="Avg Quality"    value="91"    sub="Out of 100" color="#059669" />
        <KPI label="Offices Covered"value="8"     sub="Departments onboarded" />
      </div>

      <div className="font-bold text-[15px] mb-4" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Quick Access</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <button key={c.label} onClick={() => setSection(c.section)}
            className="rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-1"
            style={{ background: T.panel, border: `1px solid ${T.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white" style={{ background: c.grad }}>{c.icon}</div>
            <div className="font-semibold text-[14px]" style={{ color: T.text }}>{c.label}</div>
            <div className="text-[12px]" style={{ color: T.subtle }}>{c.sub}</div>
          </button>
        ))}
      </div>

      <div className="font-bold text-[15px] mb-4" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Recent Datasets</div>
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
        {DATASETS.map((d, i) => (
          <button key={d.id} onClick={() => setSection("dashboard")}
            className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
            style={{ background: i % 2 === 0 ? "#fff" : T.surface, borderBottom: i < DATASETS.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: T.glbg, color: T.gl }}>{Icon.datasets}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate" style={{ color: T.text }}>{d.name}</div>
              <div className="text-[11px]" style={{ color: T.subtle }}>{d.rows.toLocaleString()} rows · {d.cols} columns · {d.updated}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#DCFCE7", color: "#16A34A" }}>Clean</span>
              <span className="font-bold text-[13px]" style={{ color: T.gl }}>{d.quality}</span>
              <span className="text-[10px]" style={{ color: T.subtle }}>/100</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── DATASETS SECTION ── */
function DatasetsSection({ setSection }: { setSection: (s: Section) => void }) {
  const [showUpload, setShowUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="p-8 max-w-[960px] mx-auto w-full">
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onDone={() => { setShowUpload(false); setUploaded(true); setSection("dashboard"); }} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-bold text-xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Datasets</div>
          <div className="text-sm mt-0.5" style={{ color: T.muted }}>{DATASETS.length + (uploaded ? 1 : 0)} datasets · All clean</div>
        </div>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: T.gl }}>
          {Icon.upload} Import Data
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {DATASETS.map((d) => (
          <button key={d.id} onClick={() => setSection("dashboard")}
            className="rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 w-full"
            style={{ background: T.panel, border: `1px solid ${T.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: T.glbg, color: T.gl }}>{Icon.datasets}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-[15px]" style={{ color: T.text }}>{d.name}</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: T.glbg, color: T.gl }}>{d.type}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#DCFCE7", color: "#16A34A" }}>Clean</span>
                </div>
                <div className="text-[12px]" style={{ color: T.subtle }}>{d.rows.toLocaleString()} rows · {d.cols} columns · Updated {d.updated}</div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <div className="font-extrabold text-xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.gl }}>{d.quality}</div>
                <div className="text-[10px]" style={{ color: T.subtle }}>Quality Score</div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <span onClick={(e) => { e.stopPropagation(); setSection("dashboard"); }} className="text-[12px] font-semibold cursor-pointer" style={{ color: T.gl }}>View Dashboard</span>
              <span style={{ color: T.border }}>·</span>
              <span onClick={(e) => { e.stopPropagation(); setSection("chat"); }} className="text-[12px] font-semibold cursor-pointer" style={{ color: T.gl }}>Ask SAI</span>
              <span style={{ color: T.border }}>·</span>
              <span onClick={(e) => { e.stopPropagation(); setSection("table"); }} className="text-[12px] font-semibold cursor-pointer" style={{ color: T.gl }}>Browse Table</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── DASHBOARD SECTION ── */
function DashboardSection({ setSection }: { setSection: (s: Section) => void }) {
  return (
    <div className="p-8 max-w-[1040px] mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[11px] font-bold tracking-[2px] uppercase mb-1" style={{ color: T.gl }}>Auto-Generated Dashboard</div>
          <div className="font-bold text-xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Municipal HR Plantilla 2025</div>
          <div className="text-sm mt-0.5" style={{ color: T.muted }}>891 rows · Human Resource · Quality 94/100</div>
        </div>
        <button onClick={() => setSection("chat")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: T.gl }}>
          {Icon.chat} Ask SAI
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Total Employees" value="891"    sub="As of Apr 23, 2026" />
        <KPI label="Female"          value="470"    sub="52.7% of workforce" color="#7C3AED" />
        <KPI label="Male"            value="421"    sub="47.3% of workforce" color="#0369A1" />
        <KPI label="Avg Salary Grade"value="SG 14.2"sub="₱18,432 avg monthly" color="#C9A84C" />
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="rounded-2xl p-6" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
          <div className="font-semibold text-[14px] mb-4" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Employees by Department</div>
          <BarChart data={DEPARTMENTS} />
        </div>
        <div className="rounded-2xl p-6" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
          <div className="font-semibold text-[14px] mb-4" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Employment Type</div>
          <Donut data={EMPLOYMENT} center="891" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl p-6" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
          <div className="font-semibold text-[14px] mb-4" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Salary Grade Distribution</div>
          <BarChart data={SALARY_GRADES.map(s => ({ name: s.grade, count: s.count }))} />
        </div>
        <div className="rounded-2xl p-6" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
          <div className="font-semibold text-[14px] mb-4" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Sex Distribution</div>
          <Donut data={[{ label: "Female", value: 470, pct: 52.7, color: "#7C3AED" }, { label: "Male", value: 421, pct: 47.3, color: "#2563EB" }]} center="891" />
          <div className="mt-4 p-3 rounded-xl text-[12px]" style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.muted }}>
            Gender balance is above DILG recommendation of 50% female participation.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SAI CHAT SECTION ── */
type Message = { role: "user" | "sai"; text: string };
const SUGGESTIONS = ["Ilan ang babae?", "What is the average salary?", "Which department is largest?", "How many Job Order employees?", "Are there vacant positions?"];

function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "sai", text: "Kamusta! Ako si SAI — ang GovLens AI data analyst. Maaari akong sagutin ang iyong mga tanong tungkol sa **Municipal HR Plantilla 2025** (891 employees). Tanungin mo ako — Filipino o English, pareho okay." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = (q?: string) => {
    const text = q ?? input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "sai", text: getSAIResponse(text) }]);
    }, 900 + Math.random() * 400);
  };

  const renderText = (t: string) =>
    t.split(/(\*\*[^*]+\*\*|\n)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part === "\n") return <br key={i} />;
      return part;
    });

  return (
    <div className="flex flex-col h-full max-w-[760px] mx-auto w-full">
      <div className="px-8 pt-8 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: T.glbg, color: T.gl }}>{Icon.chat}</div>
          <div>
            <div className="font-bold text-lg" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Ask SAI</div>
            <div className="text-[12px] flex items-center gap-1.5" style={{ color: T.muted }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4ADE80" }} />
              Analyzing: Municipal HR Plantilla 2025
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-4 min-h-0">
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "sai" && (
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-1 text-white text-[10px] font-bold" style={{ background: T.gl }}>SAI</div>
              )}
              <div className="rounded-2xl px-4 py-3 text-[13px] leading-[1.65] max-w-[85%]"
                style={m.role === "user"
                  ? { background: T.gl, color: "#fff", borderRadius: "18px 18px 4px 18px" }
                  : { background: "#fff", color: T.text, border: `1px solid ${T.border}`, borderRadius: "4px 18px 18px 18px" }}>
                {renderText(m.text)}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-2 text-white text-[10px] font-bold flex-shrink-0" style={{ background: T.gl }}>SAI</div>
              <div className="rounded-2xl px-4 py-3 flex items-center gap-1" style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: "4px 18px 18px 18px" }}>
                {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: T.glm, animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="px-8 pb-6 flex-shrink-0">
        <div className="flex gap-2 mb-3 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors"
              style={{ background: T.glbg, color: T.gl, border: `1px solid ${T.glborder}` }}>{s}</button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your data..."
            className="flex-1 rounded-xl px-4 py-3 text-sm"
            style={{ background: "#fff", border: `1px solid ${T.border}`, color: T.text, outline: "none" }} />
          <button type="submit" className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: T.gl }}>{Icon.send}</button>
        </form>
      </div>
    </div>
  );
}

/* ── TABLE SECTION ── */
function TableSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = TABLE_ROWS.filter((r) => {
    const matchSearch = search === "" || r.name.toLowerCase().includes(search.toLowerCase()) || r.position.toLowerCase().includes(search.toLowerCase()) || r.dept.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-8 max-w-[1040px] mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-bold text-xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Data Table</div>
          <div className="text-sm mt-0.5" style={{ color: T.muted }}>Municipal HR Plantilla 2025 · Showing {filtered.length} of 891 records</div>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, position, department..."
          className="flex-1 rounded-xl px-4 py-2.5 text-sm" style={{ background: "#fff", border: `1px solid ${T.border}`, color: T.text, outline: "none" }} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl px-4 py-2.5 text-sm"
          style={{ background: "#fff", border: `1px solid ${T.border}`, color: T.text }}>
          {["All", "Permanent", "Job Order", "Co-terminus"].map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.border}`, background: "#fff" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ background: T.surface, borderBottom: `1px solid ${T.border}` }}>
                {["Name", "Position", "Department", "SG", "Status", "Sex"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-bold text-[11px] uppercase tracking-wide" style={{ color: T.subtle }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.name} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : "none" }} className="transition-colors hover:bg-emerald-50">
                  <td className="px-4 py-3 font-medium" style={{ color: T.text }}>{r.name}</td>
                  <td className="px-4 py-3" style={{ color: T.muted }}>{r.position}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: T.glbg, color: T.gl }}>{r.dept}</span></td>
                  <td className="px-4 py-3 font-semibold" style={{ color: T.text }}>{r.sg}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: r.status === "Permanent" ? "#DCFCE7" : r.status === "Job Order" ? "#FEF9C3" : "#E0E7FF", color: r.status === "Permanent" ? "#16A34A" : r.status === "Job Order" ? "#854D0E" : "#4338CA" }}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: T.muted }}>{r.sex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${T.border}`, background: T.surface }}>
          <span className="text-[12px]" style={{ color: T.subtle }}>Showing {filtered.length} of 891 records (demo)</span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 60].map((p) => (
              <button key={p} className="w-7 h-7 rounded-lg text-[11px] font-medium"
                style={{ background: p === 1 ? T.gl : "#fff", color: p === 1 ? "#fff" : T.subtle, border: `1px solid ${T.border}` }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── GRAPH SECTION ── */
function GraphSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);

  const activeEdges = hovered ? GRAPH_EDGES.filter(e => e.from === hovered || e.to === hovered) : [];
  const activeNodeIds = new Set(activeEdges.flatMap(e => [e.from, e.to]));
  if (hovered) activeNodeIds.add(hovered);

  function nodeOpacity(id: string) { return !hovered ? 1 : activeNodeIds.has(id) ? 1 : 0.2; }
  function edgeOpacity(e: GraphEdge) { return !hovered ? 0.35 : (e.from === hovered || e.to === hovered) ? 1 : 0.05; }
  const getNode = (id: string) => GRAPH_NODES.find(n => n.id === id)!;

  return (
    <div className="p-8 max-w-[1040px] mx-auto w-full">
      <div className="mb-6">
        <div className="font-bold text-xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Dataset Graph</div>
        <div className="text-sm mt-0.5" style={{ color: T.muted }}>Relationships detected across {GRAPH_NODES.length} datasets · {GRAPH_EDGES.length} join candidates · Hover to explore</div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 rounded-2xl overflow-hidden" style={{ background: "#0C1929", border: "1px solid rgba(255,255,255,0.06)", minHeight: 360 }}>
          <svg viewBox="0 0 540 360" className="w-full" style={{ display: "block" }}>
            {[60,120,180,240,300].map(y => <line key={y} x1="0" y1={y} x2="540" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>)}
            {[90,180,270,360,450].map(x => <line key={x} x1={x} y1="0" x2={x} y2="360" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>)}
            {GRAPH_EDGES.map((e, i) => {
              const a = getNode(e.from), b = getNode(e.to);
              const isActive = hovered === e.from || hovered === e.to;
              const mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2;
              return (
                <g key={i} style={{ opacity: edgeOpacity(e) }}>
                  <line x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke={isActive ? "#6EE7B7" : "#334155"} strokeWidth={isActive ? 1.5 : 1} strokeDasharray={e.strength === "fuzzy" ? "4 3" : "none"} />
                  {isActive && <text x={mx} y={my - 4} textAnchor="middle" fill="#6EE7B7" fontSize="9" fontFamily="monospace">{e.label}</text>}
                </g>
              );
            })}
            {GRAPH_NODES.map((n) => {
              const r = Math.max(22, Math.min(34, 22 + Math.log10(n.rows + 1) * 6));
              const isActive = hovered === n.id;
              return (
                <g key={n.id} style={{ cursor: "pointer", opacity: nodeOpacity(n.id) }}
                  onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(selected?.id === n.id ? null : n)}>
                  <circle cx={n.cx} cy={n.cy} r={r + 4} fill={n.color} opacity={0.15} />
                  <circle cx={n.cx} cy={n.cy} r={r} fill={n.color} opacity={isActive ? 0.9 : 0.7} stroke={isActive ? "#fff" : "transparent"} strokeWidth="1.5" />
                  <text x={n.cx} y={n.cy + 1} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="monospace" dominantBaseline="middle">{n.rows.toLocaleString()}</text>
                  <text x={n.cx} y={n.cy + r + 10} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="system-ui">{n.label.split(" ").slice(0, 2).join(" ")}</text>
                </g>
              );
            })}
          </svg>
          <div className="px-4 pb-3 flex items-center gap-5">
            {[["Exact join", "solid"], ["Fuzzy join", "dashed"]].map(([label, dash]) => (
              <div key={label} className="flex items-center gap-2">
                <svg width="20" height="6" viewBox="0 0 20 6"><line x1="0" y1="3" x2="20" y2="3" stroke="#475569" strokeWidth="1.5" strokeDasharray={dash === "dashed" ? "4 3" : "none"} /></svg>
                <span style={{ fontSize: 10, color: "#64748B" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {selected ? (
            <div className="rounded-2xl p-5" style={{ background: T.panel, border: `2px solid ${selected.color}` }}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: selected.color }} />
                <div>
                  <div className="font-semibold text-[14px]" style={{ color: T.text }}>{selected.label}</div>
                  <div className="text-[11px]" style={{ color: T.subtle }}>{selected.type}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[12px]">
                <div className="flex justify-between"><span style={{ color: T.muted }}>Rows</span><span className="font-semibold" style={{ color: T.text }}>{selected.rows.toLocaleString()}</span></div>
                <div className="flex justify-between"><span style={{ color: T.muted }}>Joins available</span><span className="font-semibold" style={{ color: T.text }}>{GRAPH_EDGES.filter(e => e.from === selected.id || e.to === selected.id).length}</span></div>
                <div className="flex justify-between"><span style={{ color: T.muted }}>Join keys</span>
                  <div className="flex flex-col items-end gap-1">
                    {GRAPH_EDGES.filter(e => e.from === selected.id || e.to === selected.id).map(e => (
                      <span key={e.label} className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: T.glbg, color: T.gl }}>{e.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-5 text-center" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <div className="flex justify-center mb-2 opacity-40" style={{ color: T.gl }}>{Icon.arrowUpRight}</div>
              <div className="text-[13px] font-medium" style={{ color: T.muted }}>Hover a node to see connections</div>
              <div className="text-[11px] mt-1" style={{ color: T.subtle }}>Click to pin dataset details</div>
            </div>
          )}

          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.border}`, background: T.panel }}>
            <div className="px-4 py-3 font-semibold text-[12px] uppercase tracking-wide" style={{ background: T.surface, color: T.subtle, borderBottom: `1px solid ${T.border}` }}>Detected Relationships</div>
            {GRAPH_EDGES.map((e, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < GRAPH_EDGES.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: e.strength === "exact" ? "#16A34A" : "#C9A84C" }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-mono font-medium truncate" style={{ color: T.text }}>{e.label}</div>
                  <div className="text-[10px]" style={{ color: T.subtle }}>{getNode(e.from).label.split(" ")[0]} ↔ {getNode(e.to).label.split(" ")[0]}</div>
                </div>
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: e.strength === "exact" ? "#DCFCE7" : "#FEF9C3", color: e.strength === "exact" ? "#16A34A" : "#854D0E" }}>
                  {e.strength}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CONNECTIONS SECTION ── */
function ConnectionsSection() {
  const [conns, setConns] = useState(CONNECTIONS);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const triggerSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => {
      setSyncing(null);
      setConns(c => c.map(x => x.id === id ? { ...x, lastSync: "Just now", status: "ok" } : x));
      setToast("Sync complete — dataset updated");
      setTimeout(() => setToast(null), 3000);
    }, 2000);
  };

  const connTypeOpts = [
    { label: "PostgreSQL",    sub: "Direct database connection via read-only user", icon: Icon.postgres },
    { label: "Google Sheets", sub: "Public CSV published sheet, auto-refresh",      icon: Icon.sheets   },
  ];

  return (
    <div className="p-8 max-w-[960px] mx-auto w-full">
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg" style={{ background: "#16A34A" }}>{toast}</div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(12,25,41,0.7)" }}>
          <div className="rounded-2xl p-8 w-full max-w-md mx-4" style={{ background: "#fff", border: `1px solid ${T.border}` }}>
            <div className="font-bold text-lg mb-1" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Add Connection</div>
            <p className="text-sm mb-6" style={{ color: T.muted }}>Connect a PostgreSQL database or Google Sheets to sync data automatically.</p>
            <div className="flex flex-col gap-3 mb-6">
              {connTypeOpts.map(opt => (
                <div key={opt.label} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer" style={{ border: `1.5px solid ${T.border}`, background: T.surface }}>
                  <div style={{ color: T.gl }}>{opt.icon}</div>
                  <div>
                    <div className="font-semibold text-[14px]" style={{ color: T.text }}>{opt.label}</div>
                    <div className="text-[12px]" style={{ color: T.subtle }}>{opt.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAdd(false)} className="w-full py-3 rounded-xl text-sm" style={{ color: T.subtle, background: T.surface, border: `1px solid ${T.border}` }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-bold text-xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Connections</div>
          <div className="text-sm mt-0.5" style={{ color: T.muted }}>{conns.filter(c => c.status === "ok").length} active · {conns.filter(c => c.status === "warning").length} needs attention</div>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: T.gl }}>
          {Icon.plus} Add Connection
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <KPI label="Total Connections" value={String(conns.length)} sub="Active data sources" />
        <KPI label="Total Rows Synced" value="1,633" sub="Across all connections" color="#059669" />
        <KPI label="Last Sync"         value="2h ago" sub="LGU-HRIS" color="#C9A84C" />
      </div>

      <div className="flex flex-col gap-4">
        {conns.map((c) => (
          <div key={c.id} className="rounded-2xl p-5" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: T.glbg, color: T.gl }}>
                {c.type === "postgres" ? Icon.postgres : Icon.sheets}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-semibold text-[15px]" style={{ color: T.text }}>{c.name}</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: T.glbg, color: T.gl }}>
                    {c.type === "postgres" ? "PostgreSQL" : "Google Sheets"}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: T.surface, color: T.muted }}>{c.office}</span>
                </div>
                <div className="flex items-center gap-3 text-[12px]" style={{ color: T.subtle }}>
                  <span>{c.tables} {c.tables === 1 ? "table" : "tables"} · {c.rows.toLocaleString()} rows</span>
                  <span>·</span>
                  <span>Last synced {c.lastSync}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: c.status === "ok" ? "#16A34A" : c.status === "warning" ? "#C9A84C" : "#DC2626" }} />
                  <span className="text-[12px] font-medium" style={{ color: c.status === "ok" ? "#16A34A" : c.status === "warning" ? "#C9A84C" : "#DC2626" }}>
                    {c.status === "ok" ? "Connected" : c.status === "warning" ? "Stale" : "Error"}
                  </span>
                </div>
                <button onClick={() => triggerSync(c.id)} disabled={syncing === c.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                  style={{ background: T.glbg, color: T.gl, border: `1px solid ${T.glborder}`, opacity: syncing === c.id ? 0.5 : 1 }}>
                  <span className={syncing === c.id ? "animate-spin" : ""}>{Icon.refresh}</span>
                  {syncing === c.id ? "Syncing…" : "Sync Now"}
                </button>
              </div>
            </div>
            {c.status === "warning" && (
              <div className="mt-4 flex items-center gap-2 p-3 rounded-xl text-[12px]" style={{ background: "#FFFBEB", border: "1px solid #FEF08A", color: "#854D0E" }}>
                <span>{Icon.alert}</span>
                Last sync was over 24 hours ago. Data may be outdated. Click Sync Now to refresh.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── NODE MONITORING SECTION ── */
function NodeMonitoringSection() {
  const [selected, setSelected] = useState<BoxNode | null>(null);
  const online  = BOX_NODES.filter(n => n.status === "online").length;
  const warning = BOX_NODES.filter(n => n.status === "warning").length;
  const offline = BOX_NODES.filter(n => n.status === "offline").length;

  const statusColor = (s: BoxNode["status"]) => s === "online" ? "#16A34A" : s === "warning" ? "#C9A84C" : "#DC2626";
  const statusBg    = (s: BoxNode["status"]) => s === "online" ? "#DCFCE7" : s === "warning" ? "#FFFBEB" : "#FEE2E2";
  const statusLabel = (s: BoxNode["status"]) => s === "online" ? "Online" : s === "warning" ? "Warning" : "Offline";

  return (
    <div className="p-8 max-w-[1040px] mx-auto w-full">
      <div className="mb-6">
        <div className="font-bold text-xl" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>Node Monitor</div>
        <div className="text-sm mt-0.5" style={{ color: T.muted }}>GovLens Box fleet · {BOX_NODES.length} nodes registered · {online} online</div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        <div className="rounded-xl p-4 text-center" style={{ background: "#DCFCE7", border: "1px solid #86EFAC" }}>
          <div className="font-extrabold text-2xl" style={{ color: "#16A34A", fontFamily: "var(--font-sora, Sora, sans-serif)" }}>{online}</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: "#16A34A" }}>Online</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}>
          <div className="font-extrabold text-2xl" style={{ color: "#C9A84C", fontFamily: "var(--font-sora, Sora, sans-serif)" }}>{warning}</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: "#C9A84C" }}>Warning</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: "#FEE2E2", border: "1px solid #FCA5A5" }}>
          <div className="font-extrabold text-2xl" style={{ color: "#DC2626", fontFamily: "var(--font-sora, Sora, sans-serif)" }}>{offline}</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: "#DC2626" }}>Offline</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: T.glbg, border: `1px solid ${T.glborder}` }}>
          <div className="font-extrabold text-2xl" style={{ color: T.gl, fontFamily: "var(--font-sora, Sora, sans-serif)" }}>{BOX_NODES.reduce((a, n) => a + n.datasets, 0)}</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: T.gl }}>Datasets</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: "#F5F3FF", border: "1px solid #C4B5FD" }}>
          <div className="font-extrabold text-2xl" style={{ color: "#7C3AED", fontFamily: "var(--font-sora, Sora, sans-serif)" }}>{BOX_NODES.reduce((a, n) => a + n.queries, 0).toLocaleString()}</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: "#7C3AED" }}>Queries</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <div className="font-extrabold text-2xl" style={{ color: T.muted, fontFamily: "var(--font-sora, Sora, sans-serif)" }}>v10</div>
          <div className="text-[11px] font-semibold mt-0.5" style={{ color: T.subtle }}>Latest</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          {BOX_NODES.map((n) => (
            <button key={n.id} onClick={() => setSelected(selected?.id === n.id ? null : n)}
              className="rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: T.panel, border: `1.5px solid ${selected?.id === n.id ? statusColor(n.status) : T.border}`, boxShadow: selected?.id === n.id ? `0 0 0 3px ${statusBg(n.status)}` : "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: statusColor(n.status) }} />
                  <span className="font-bold text-[14px]" style={{ color: T.text, fontFamily: "var(--font-sora, Sora, sans-serif)" }}>{n.name}</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: statusBg(n.status), color: statusColor(n.status) }}>{statusLabel(n.status)}</span>
              </div>
              <div className="text-[11px] mb-3 truncate" style={{ color: T.muted }}>{n.location}</div>
              {n.status !== "offline" && (
                <div className="flex flex-col gap-1.5 mb-3">
                  <div className="flex items-center gap-2 text-[11px]" style={{ color: T.subtle }}>
                    <span className="w-8">CPU</span>
                    <Meter value={n.cpu} color={n.cpu > 70 ? "#DC2626" : n.cpu > 50 ? "#C9A84C" : T.gl} />
                  </div>
                  <div className="flex items-center gap-2 text-[11px]" style={{ color: T.subtle }}>
                    <span className="w-8">RAM</span>
                    <Meter value={n.ram} color={n.ram > 80 ? "#DC2626" : n.ram > 60 ? "#C9A84C" : "#7C3AED"} />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: T.subtle }}>↺ {n.lastSeen}</span>
                <span style={{ color: T.subtle }}>Up {n.uptime}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {selected ? (
            <>
              <div className="rounded-2xl p-5" style={{ background: T.panel, border: `2px solid ${statusColor(selected.status)}` }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: statusColor(selected.status) }} />
                  <div className="font-bold text-[16px]" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: T.text }}>{selected.name}</div>
                </div>
                <div className="text-[12px] mb-4" style={{ color: T.muted }}>{selected.location}</div>
                {[
                  ["Status", statusLabel(selected.status)],
                  ["Version", selected.version],
                  ["Uptime", selected.uptime],
                  ["Last Seen", selected.lastSeen],
                  ["Datasets", String(selected.datasets)],
                  ["Queries run", selected.queries.toLocaleString()],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[12px] py-1.5" style={{ borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ color: T.muted }}>{k}</span>
                    <span className="font-semibold" style={{ color: T.text }}>{v}</span>
                  </div>
                ))}
              </div>
              {selected.status === "offline" && (
                <div className="rounded-xl p-4 text-[12px]" style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#DC2626" }}>
                  <div className="font-semibold mb-1">Node unreachable</div>
                  <div style={{ color: "#B91C1C" }}>Last seen {selected.lastSeen}. Check network connectivity and power supply. Contact the LGU IT officer.</div>
                </div>
              )}
              {selected.status === "warning" && (
                <div className="rounded-xl p-4 text-[12px]" style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#854D0E" }}>
                  <div className="font-semibold mb-1">Degraded connectivity</div>
                  <div>Node is reachable but heartbeat is irregular. Older firmware version ({selected.version}). Recommend scheduling update.</div>
                </div>
              )}
              {selected.status === "online" && selected.version !== "v10.0" && (
                <div className="rounded-xl p-4 text-[12px]" style={{ background: T.glbg, border: `1px solid ${T.glborder}`, color: T.gl }}>
                  <div className="font-semibold mb-1">Update available</div>
                  <div>Running {selected.version}. v10.0 is available with AI cleaning improvements.</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="rounded-2xl p-5 text-center" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                <div className="flex justify-center mb-2 opacity-40" style={{ color: T.gl }}>{Icon.monitor}</div>
                <div className="text-[13px] font-medium" style={{ color: T.muted }}>Click a node to inspect</div>
                <div className="text-[11px] mt-1" style={{ color: T.subtle }}>View CPU, RAM, datasets, and query history</div>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.border}`, background: T.panel }}>
                <div className="px-4 py-3 font-semibold text-[12px] uppercase tracking-wide" style={{ background: T.surface, color: T.subtle, borderBottom: `1px solid ${T.border}` }}>Recent Activity</div>
                {[
                  { node: "Box-005", event: "Dataset query run",       time: "1 min ago"  },
                  { node: "Box-001", event: "AI cleaning completed",   time: "6 min ago"  },
                  { node: "Box-004", event: "New dataset uploaded",    time: "22 min ago" },
                  { node: "Box-002", event: "Connection synced",       time: "1h ago"     },
                  { node: "Box-003", event: "Heartbeat missed",        time: "2h ago"     },
                ].map((e, i, arr) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: e.node === "Box-003" ? "#C9A84C" : T.gl }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium" style={{ color: T.text }}>{e.node}</div>
                      <div className="text-[11px]" style={{ color: T.subtle }}>{e.event}</div>
                    </div>
                    <span className="text-[10px]" style={{ color: T.subtle }}>{e.time}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── DEMO SHELL ── */
const NAV = [
  { id: "home"        as Section, label: "Home",    icon: Icon.home     },
  { id: "datasets"    as Section, label: "Datasets", icon: Icon.datasets },
  { id: "dashboard"   as Section, label: "Dashboards",icon: Icon.dashboard},
  { id: "chat"        as Section, label: "SAI",     icon: Icon.chat     },
  { id: "table"       as Section, label: "Table",   icon: Icon.table    },
  { id: "graph"       as Section, label: "Graph",   icon: Icon.graph    },
  { id: "connections" as Section, label: "Connect", icon: Icon.connect  },
  { id: "nodes"       as Section, label: "Nodes",   icon: Icon.nodes    },
];

export default function DemoPage() {
  const [section, setSection] = useState<Section>("home");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.surface }}>
      {/* Demo banner */}
      <div className="flex-shrink-0 flex items-center justify-center gap-3 py-2 px-4 text-[12px] font-semibold" style={{ background: "#C9A84C", color: "#fff" }}>
        <span>{Icon.star}</span>
        Interactive Demo — Simulated data. No real information is stored or transmitted.
        <a href="/" className="ml-4 underline font-normal opacity-80">Back to govlens.ph</a>
      </div>

      {/* GovLens topbar */}
      <header className="flex items-center gap-3 px-4 flex-shrink-0" style={{ height: 44, background: T.dark, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {/* Logo */}
        <div className="font-extrabold text-[16px] flex-shrink-0 select-none" style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "rgba(255,255,255,0.92)", letterSpacing: "-0.3px" }}>
          Gov<span style={{ color: T.glm }}>Lens</span>
        </div>

        {/* Search pill */}
        <div className="flex-1 max-w-[420px] mx-auto h-[30px] flex items-center gap-2 px-3 rounded-lg" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}>
          <span style={{ flexShrink: 0 }}>{Icon.search}</span>
          <span className="text-[12px] flex-1 text-left">Search datasets, dashboards…</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}>⌘K</span>
        </div>

        {/* Right: tenant + avatar */}
        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
          <span className="text-[12px] hidden sm:block" style={{ color: "rgba(255,255,255,0.4)" }}>Your LGU</span>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0" style={{ background: T.gl, border: "1.5px solid rgba(255,255,255,0.15)" }}>A</div>
        </div>
      </header>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto pb-24" style={{ background: T.surface }}>
        {section === "home"        && <HomeSection        setSection={setSection} />}
        {section === "datasets"    && <DatasetsSection    setSection={setSection} />}
        {section === "dashboard"   && <DashboardSection   setSection={setSection} />}
        {section === "chat"        && <ChatSection />}
        {section === "table"       && <TableSection />}
        {section === "graph"       && <GraphSection />}
        {section === "connections" && <ConnectionsSection />}
        {section === "nodes"       && <NodeMonitoringSection />}
      </div>

      {/* Bottom floating dock — matches GovLens */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-0.5 px-2.5 py-2 z-50 rounded-[22px]"
        style={{ background: "rgba(10,18,28,0.88)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)" }}>
        {NAV.map((n) => {
          const active = section === n.id;
          return (
            <button key={n.id} onClick={() => setSection(n.id)} title={n.label}
              className="relative flex flex-col items-center gap-1 rounded-[14px] transition-all duration-150"
              style={{ padding: "7px 12px 6px", minWidth: 52, color: active ? "#4ade80" : "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer" }}>
              {n.icon}
              <span style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: 0.15, lineHeight: 1 }}>{n.label}</span>
              {active && (
                <span className="absolute" style={{ bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#4ade80" }} />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
