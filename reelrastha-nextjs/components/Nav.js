"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@vercel/analytics";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand-mark" onClick={() => setOpen(false)}>
          <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 40 L20 12 L28 12 L40 40" />
            <line x1="24" y1="19" x2="24" y2="34" strokeDasharray="4 4" />
            <circle cx="24" cy="13" r="6.5" />
            <circle cx="24" cy="13" r="2" fill="currentColor" stroke="none" />
          </svg>
          <span>ReelRastha</span>
        </Link>

        <nav className={`links ${open ? "open" : ""}`} aria-label="Main">
          <Link href="/opinions" onClick={() => setOpen(false)}>Opinions</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/studio" onClick={() => setOpen(false)}>Studio</Link>
          <Link href="/work" onClick={() => setOpen(false)}>Work</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>

        <Link
          href="/contact"
          className="nav-cta"
          onClick={() => track("hero_work_with_us_click", { location: "nav" })}
        >
          Work with us
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          ☰
        </button>
      </div>

      <style jsx>{`
        .nav {
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(10px);
          background: rgba(22, 16, 46, 0.78);
          border-bottom: 1px solid rgba(242, 184, 75, 0.18);
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; max-width: 1180px; margin: 0 auto; position: relative;
        }
        .brand-mark {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
          color: var(--gold);
        }
        .brand-mark span {
          font-family: var(--font-display); font-size: 1.25rem;
          font-weight: 700; color: var(--cream);
        }
        .links { display: flex; gap: 30px; }
        .links :global(a) {
          font-family: var(--font-label); font-size: 0.82rem; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none; color: var(--muted);
          transition: color 0.2s ease; white-space: nowrap;
        }
        .links :global(a:hover) { color: var(--gold-soft); }
        .nav-cta {
          font-family: var(--font-label); font-size: 0.78rem; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none; border: 1px solid var(--gold);
          color: var(--gold); padding: 9px 18px; border-radius: 999px;
          transition: all 0.2s ease; white-space: nowrap;
        }
        .nav-cta:hover { background: var(--gold); color: var(--ink); }
        .menu-toggle {
          display: none; background: none; border: 1px solid var(--gold);
          color: var(--gold); border-radius: 8px; width: 40px; height: 40px;
          font-size: 1.1rem; cursor: pointer;
        }
        @media (max-width: 720px) {
          .links, .nav-cta { display: none; }
          .menu-toggle { display: block; }
          .links.open {
            display: flex; flex-direction: column; position: absolute;
            top: 100%; left: 0; right: 0; background: var(--indigo-deep);
            padding: 20px 24px; gap: 18px;
            border-bottom: 1px solid rgba(242,184,75,0.2);
          }
        }
      `}</style>
    </header>
  );
}
