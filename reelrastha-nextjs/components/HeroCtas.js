"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

export default function HeroCtas() {
  return (
    <div className="hero-ctas">
      <Link
        href="/opinions"
        className="btn btn-solid"
        onClick={() => track("hero_explore_opinions_click")}
      >
        Explore the opinions
      </Link>
      <Link
        href="/studio"
        className="btn btn-ghost"
        onClick={() => track("hero_work_with_us_click", { location: "hero" })}
      >
        Work with ReelRastha
      </Link>

      <style jsx>{`
        .hero-ctas {
          margin-top: 36px; display: flex; gap: 16px;
          justify-content: center; flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
