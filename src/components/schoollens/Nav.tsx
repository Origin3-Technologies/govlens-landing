"use client";

import { useState, useEffect } from "react";

export default function SlNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--sl-border)",
        boxShadow: scrolled ? "0 2px 16px rgba(26,86,196,.06)" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      <a
        href="#"
        className="no-underline"
        style={{
          fontFamily: "var(--font-sora, Sora, sans-serif)",
          fontSize: 20,
          fontWeight: 800,
          color: "var(--sl-dark)",
        }}
      >
        School<span style={{ color: "var(--sl)" }}>Lens</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {[
          { href: "#how-it-works", label: "How it works" },
          { href: "#features", label: "Features" },
          { href: "#faq", label: "FAQ" },
        ].map((l) => (
          <a key={l.href} href={l.href} className="sl-nav-link text-sm font-medium no-underline">
            {l.label}
          </a>
        ))}
        <a
          href="#pilot"
          className="sl-btn-primary text-sm font-semibold no-underline rounded-lg px-5 py-2.5"
        >
          Apply for Access
        </a>
      </div>
    </nav>
  );
}
