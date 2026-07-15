import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Studio",
  description:
    "ReelRastha Studio creates social-first campaign ideas, copy, and content systems for films and creators. Currently accepting a small number of pilot projects.",
  alternates: { canonical: `${site.url}/studio` },
};

const services = [
  {
    name: "Film Positioning Sprint",
    deliverables: "Core audience, campaign angle, voice guide, 10 hooks, launch message.",
    bestFor: "Indie films before poster/trailer rollout",
  },
  {
    name: "Release-Week Content Pack",
    deliverables: "Caption set, 2 carousels, 3 short-reel scripts, story prompts, CTA bank.",
    bestFor: "Films with a confirmed release window",
  },
  {
    name: "Social Content System",
    deliverables: "30-day calendar, recurring series, templates, platform-specific copy.",
    bestFor: "Creators, film pages, and production houses",
  },
  {
    name: "Trailer and Poster Rollout Copy",
    deliverables: "Teaser lines, countdown copy, reveal captions, comment prompts.",
    bestFor: "Campaigns with existing visual assets",
  },
  {
    name: "Audience Conversation Plan",
    deliverables: "Community hooks, collaboration list, response playbook, weekly learning loop.",
    bestFor: "Teams that want organic discussion, not only impressions",
  },
];

export default function StudioPage() {
  return (
    <section className="section wrap">
      <div className="section-head">
        <span className="kicker">ReelRastha Studio</span>
        <h1>Film marketing with a cinephile&apos;s instinct.</h1>
        <p>
          ReelRastha Studio creates social-first campaign ideas, copy, and content systems for
          films and creators.
        </p>
      </div>

      <p className="pilot-banner">
        We are currently accepting a small number of pilot projects while building the first
        public case studies.
      </p>

      <div className="studio-grid">
        {services.map((s) => (
          <div className="service-card" key={s.name}>
            <h3>{s.name}</h3>
            <p className="deliver">{s.deliverables}</p>
            <span className="bestfor">Best for: {s.bestFor}</span>
          </div>
        ))}
      </div>

      <div className="studio-cta">
        <h2>Start a project</h2>
        <p>
          Tell us what you are releasing, who you want to reach, and where the campaign stands.
        </p>
        <Link href="/contact" className="btn btn-solid">Book a screening</Link>
      </div>
    </section>
  );
}
