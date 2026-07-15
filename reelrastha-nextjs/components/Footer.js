"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <Link href="/" className="brand-mark">
          <svg width="26" height="26" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 40 L20 12 L28 12 L40 40" />
            <circle cx="24" cy="13" r="6.5" />
          </svg>
          <span>ReelRastha</span>
        </Link>

        <div className="footer-links">
          <Link href="/opinions">Opinions</Link>
          <Link href="/about">About</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/work">Work</Link>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener"
            onClick={() => track("instagram_follow_click", { location: "footer" })}
          >
            Instagram
          </a>
        </div>

        <span className="footer-fine">© {new Date().getFullYear()} ReelRastha. Opinions, not reviews.</span>
      </div>

      <style jsx>{`
        footer { border-top: 1px solid rgba(242,184,75,0.2); padding: 40px 0; margin-top: 20px; }
        .footer-inner {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
        }
        .brand-mark {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; color: var(--gold);
        }
        .brand-mark span { font-family: var(--font-display); font-size: 1rem; color: var(--cream); }
        .footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
        .footer-links :global(a), .footer-links a {
          font-family: var(--font-label); font-size: 0.78rem; letter-spacing: 0.1em;
          text-transform: uppercase; text-decoration: none; color: var(--muted);
        }
        .footer-links :global(a:hover), .footer-links a:hover { color: var(--gold-soft); }
        .footer-fine { font-size: 0.78rem; color: var(--muted); opacity: 0.7; }
      `}</style>
    </footer>
  );
}
