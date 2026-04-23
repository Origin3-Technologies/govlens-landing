"use client";

import { useState } from "react";

const PERKS = [
  "45-day free pilot — full access, all features",
  "Origin3 assists with your first upload and setup",
  "No obligation to continue after the pilot",
  "All your data and dashboards carry over if you subscribe",
  "Direct line to the Origin3 team throughout",
];

const SCHOOL_TYPES = [
  "Elementary School",
  "Secondary School (High School)",
  "Integrated School (Elem + HS)",
  "Senior High School",
  "Special Education (SPED)",
  "Alternative Learning System (ALS)",
  "Private School",
  "Other",
];

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

let lastSubmitTime = 0;
const RATE_LIMIT_MS = 30_000;

export default function SlPilotCTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) return;

    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      setStatus("success");
      return;
    }

    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New SchoolLens Pilot Application");
    data.append("from_name", "SchoolLens Landing");
    data.append("botcheck", "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      if (json.success) {
        lastSubmitTime = Date.now();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="pilot" className="py-20 px-[5%]" style={{ background: "var(--sl)" }}>
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
        {/* Left */}
        <div>
          <div
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4"
            style={{
              color: "var(--slm)",
              background: "rgba(147,197,253,.15)",
              border: "1px solid rgba(147,197,253,.3)",
            }}
          >
            ★ SchoolLens Pilot Partner Program
          </div>

          <h2
            className="font-extrabold leading-[1.15] tracking-[-1px] mb-4"
            style={{
              fontFamily: "var(--font-sora, Sora, sans-serif)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              color: "#fff",
            }}
          >
            Start using SchoolLens<br />
            <em className="not-italic" style={{ color: "var(--slm)" }}>for free.</em>
          </h2>

          <p className="text-base leading-[1.7] mb-6 max-w-[520px]" style={{ color: "rgba(255,255,255,.7)" }}>
            We&apos;re onboarding schools for our <strong style={{ color: "#fff" }}>Q2 2026 cohort.</strong> Pilot
            partners get full access, hands-on onboarding support, and direct input on features built
            for Philippine school data.
          </p>

          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,.55)" }}>
            Applications are reviewed on a rolling basis — early applicants get priority scheduling.
          </p>

          <div className="flex flex-col gap-2.5">
            {PERKS.map((p) => (
              <div key={p} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,.85)" }}>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(147,197,253,.2)", border: "1px solid var(--slm)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Form box */}
        <div
          className="rounded-2xl p-8 min-w-[320px]"
          style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)" }}
        >
          <h3
            className="font-bold text-lg mb-1.5"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "#fff" }}
          >
            Apply for Access
          </h3>
          <p className="text-[13px] mb-5" style={{ color: "rgba(255,255,255,.6)" }}>
            We&apos;ll reach out within 24 hours to schedule a 30-minute call.
          </p>

          {status === "success" ? (
            <div className="text-center py-5">
              <h4
                className="font-bold text-lg mb-2"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--slm)" }}
              >
                ✓ Application received!
              </h4>
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,.7)" }}>
                We&apos;ll reach out within 24 hours to schedule your demo. Salamat!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="website"
                defaultValue=""
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              {[
                { name: "name", placeholder: "Your full name", type: "text", required: true },
                { name: "school", placeholder: "School name", type: "text", required: true },
                { name: "position", placeholder: "Your position / title", type: "text", required: true },
                { name: "email", placeholder: "Email address", type: "email", required: true },
                { name: "phone", placeholder: "Mobile number (optional)", type: "tel", required: false },
              ].map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="w-full px-4 py-3 rounded-lg text-[13px] outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,.1)",
                    border: "1px solid rgba(255,255,255,.2)",
                    color: "#fff",
                    fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--slm)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,.2)")}
                />
              ))}

              <select
                name="school_type"
                className="w-full px-4 py-3 rounded-lg text-[13px] outline-none"
                style={{
                  background: "rgba(255,255,255,.1)",
                  border: "1px solid rgba(255,255,255,.2)",
                  color: "rgba(255,255,255,.7)",
                  fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                }}
              >
                <option value="" disabled>School type (optional)</option>
                {SCHOOL_TYPES.map((d) => (
                  <option key={d} value={d} style={{ color: "var(--sl-dark)", background: "#fff" }}>
                    {d}
                  </option>
                ))}
              </select>

              <input type="hidden" name="_subject" value="New SchoolLens Pilot Application" />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-lg text-sm font-bold transition-all mt-1 disabled:opacity-60"
                style={{
                  background: "#fff",
                  color: "var(--sl)",
                  fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                }}
                onMouseEnter={e => {
                  if (status !== "loading") {
                    (e.currentTarget as HTMLElement).style.background = "var(--slm)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#fff";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {status === "loading" ? "Sending…" : status === "error" ? "Try again →" : "Apply for Access →"}
              </button>

              <p className="text-[11px] text-center mt-1" style={{ color: "rgba(255,255,255,.4)" }}>
                No spam. We&apos;ll only contact you about your application.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
