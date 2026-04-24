"use client";

import { useState } from "react";

const DEPARTMENTS = [
  "Agriculture / BFAR",
  "HR / HRMO",
  "Budget / Finance",
  "Health / RHU",
  "Social Welfare / DSWD",
  "Engineering / Infrastructure",
  "Governor's / Mayor's Office",
  "Other",
];

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

// Simple rate limit: track last submission time in memory
let lastSubmitTime = 0;
const RATE_LIMIT_MS = 30_000; // 30 seconds between submissions

export default function PilotCTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Rate limit check
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      return;
    }

    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    // If honeypot field is filled, silently fake success (it's a bot)
    if (data.get("website")) {
      setStatus("success");
      return;
    }

    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New GovLens Pilot Application");
    data.append("from_name", "GovLens Landing");
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
    <section id="pilot" className="py-20 px-[5%]" style={{ background: "var(--gl)" }}>
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
        {/* Left */}
        <div>
          <div
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4"
            style={{
              color: "var(--glm)",
              background: "rgba(159,225,203,.15)",
              border: "1px solid rgba(159,225,203,.3)",
            }}
          >
            ★ GovLens Pilot Partner Program
          </div>

          <h2
            className="font-extrabold leading-[1.15] tracking-[-1px] mb-4"
            style={{
              fontFamily: "var(--font-sora, Sora, sans-serif)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              color: "#fff",
            }}
          >
            Apply for free access.
          </h2>

          <p className="text-base leading-[1.7] mb-8 max-w-[480px]" style={{ color: "rgba(255,255,255,.75)" }}>
            We&apos;re onboarding Q2 2026 pilot partners. Full access, hands-on setup — no commitment.
          </p>

          {/* Inline FAQs */}
          <div className="flex flex-col gap-0">
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,.15)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between py-4 text-sm font-semibold gap-3"
                  style={{ color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: "rgba(255,255,255,.5)", flexShrink: 0 }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="pb-4 text-sm leading-[1.65]" style={{ color: "rgba(255,255,255,.7)" }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,.15)" }} />
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
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)", color: "var(--glm)" }}
              >
                ✓ Application received!
              </h4>
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,.7)" }}>
                We&apos;ll reach out within 24 hours to schedule your demo. Salamat!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Honeypot — invisible to humans, bots fill this in */}
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
                { name: "lgu", placeholder: "LGU / Office name", type: "text", required: true },
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
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--glm)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,.2)")}
                />
              ))}

              <select
                name="department"
                className="w-full px-4 py-3 rounded-lg text-[13px] outline-none"
                style={{
                  background: "rgba(255,255,255,.1)",
                  border: "1px solid rgba(255,255,255,.2)",
                  color: "rgba(255,255,255,.7)",
                  fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                }}
              >
                <option value="" disabled>Which department? (optional)</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d} style={{ color: "var(--dark)", background: "#fff" }}>
                    {d}
                  </option>
                ))}
              </select>

              <input type="hidden" name="_subject" value="New GovLens Pilot Application" />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-lg text-sm font-bold transition-all mt-1 disabled:opacity-60"
                style={{
                  background: "#fff",
                  color: "var(--gl)",
                  fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                }}
                onMouseEnter={e => {
                  if (status !== "loading") {
                    (e.currentTarget as HTMLElement).style.background = "var(--glm)";
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
