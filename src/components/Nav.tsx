"use client";

import { useState, useEffect } from "react";

export default function Nav() {
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
        borderBottom: "1px solid var(--border)",
        boxShadow: scrolled ? "0 2px 16px rgba(15,110,86,.06)" : "none",
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
          color: "var(--dark)",
        }}
      >
        Gov<span style={{ color: "var(--gl)" }}>Lens</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {["#how-it-works", "#features", "#faq"].map((href) => (
          <a
            key={href}
            href={href}
            className="nav-link-hover text-sm font-medium no-underline"
          >
            {href === "#how-it-works" ? "How it works" : href.replace("#", "").charAt(0).toUpperCase() + href.slice(2)}
          </a>
        ))}
        <a
          href="#pilot"
          className="btn-primary-hover text-sm font-semibold no-underline rounded-lg px-5 py-2.5"
        >
          Apply for Access
        </a>
      </div>
    </nav>
  );
}
