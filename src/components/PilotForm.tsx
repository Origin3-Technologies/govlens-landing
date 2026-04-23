"use client";

import { useState } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";

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

export default function PilotForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10 animate-slide-up">
        <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-navy-700 mb-2">Application received!</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          We&apos;ll reach out within 24 hours to schedule your intro call. Salamat!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { name: "name", placeholder: "Your full name", type: "text", required: true },
          { name: "position", placeholder: "Your position / title", type: "text", required: true },
        ].map((f) => (
          <input
            key={f.name}
            type={f.type}
            name={f.name}
            placeholder={f.placeholder}
            required={f.required}
            className="w-full px-4 py-3 rounded-lg text-sm border border-slate-200 outline-none focus:border-primary-500 transition-colors bg-white text-slate-800 placeholder-slate-400"
          />
        ))}
      </div>
      <input
        type="text"
        name="lgu"
        placeholder="LGU / Office name (e.g. Municipality of Luna, Apayao)"
        required
        className="w-full px-4 py-3 rounded-lg text-sm border border-slate-200 outline-none focus:border-primary-500 transition-colors bg-white text-slate-800 placeholder-slate-400"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="w-full px-4 py-3 rounded-lg text-sm border border-slate-200 outline-none focus:border-primary-500 transition-colors bg-white text-slate-800 placeholder-slate-400"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Mobile number (optional)"
          className="w-full px-4 py-3 rounded-lg text-sm border border-slate-200 outline-none focus:border-primary-500 transition-colors bg-white text-slate-800 placeholder-slate-400"
        />
      </div>
      <select
        name="department"
        defaultValue=""
        className="w-full px-4 py-3 rounded-lg text-sm border border-slate-200 outline-none focus:border-primary-500 transition-colors bg-white text-slate-500"
      >
        <option value="" disabled>Which department? (optional)</option>
        {DEPARTMENTS.map((d) => (
          <option key={d} value={d} className="text-slate-800">{d}</option>
        ))}
      </select>
      <input type="hidden" name="_subject" value="New GovLens Pilot Application" />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-xl text-sm font-bold bg-navy-700 text-white hover:bg-primary-500 transition-colors disabled:opacity-60 mt-1"
      >
        {status === "loading" ? "Sending…" : status === "error" ? "Something went wrong — try again →" : "Apply for Access →"}
      </button>
      <p className="text-xs text-center text-slate-400 mt-1">
        No spam. We&apos;ll only contact you about your application.
      </p>
    </form>
  );
}
