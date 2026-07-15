"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

export default function ShareBar({ slug, title, instagram }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}/opinions/${slug}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("opinion_share", { slug, method: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        track("opinion_share", { slug, method: "native" });
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  }

  return (
    <div className="share-bar">
      <span className="share-label">Share this take</span>
      <div className="share-actions">
        <button onClick={nativeShare} className="share-btn">Share</button>
        <button onClick={copyLink} className="share-btn">
          {copied ? "Link copied" : "Copy link"}
        </button>
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener"
            className="share-btn"
            onClick={() => track("opinion_share", { slug, method: "instagram" })}
          >
            See the carousel
          </a>
        )}
      </div>

      <style jsx>{`
        .share-bar {
          margin: 48px 0 0; padding: 22px 24px;
          border: 1px solid rgba(242,184,75,0.3); border-radius: 8px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          background: rgba(92,45,145,0.25);
        }
        .share-label {
          font-family: var(--font-label); letter-spacing: 0.16em;
          text-transform: uppercase; font-size: 0.72rem; color: var(--gold);
        }
        .share-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .share-btn {
          font-family: var(--font-label); font-size: 0.72rem; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(242,184,75,0.5); background: transparent;
          color: var(--gold-soft); cursor: pointer; text-decoration: none;
          transition: all 0.2s ease;
        }
        .share-btn:hover { border-color: var(--gold); background: rgba(242,184,75,0.1); }
      `}</style>
    </div>
  );
}
