import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Work",
  description:
    "Self-initiated concept campaigns for real films using only public assets. Proof, built in the open.",
  alternates: { canonical: `${site.url}/work` },
};

const studies = [
  {
    tag: "Concept Campaign",
    title: "Campaign Study One",
    body: "Problem, target audience, central idea, content examples, and how success would be measured. In progress as the first public breakdown.",
  },
  {
    tag: "Concept Campaign",
    title: "Campaign Study Two",
    body: "A second self-initiated breakdown for a real film, showing the full thinking from audience to hooks to rollout.",
  },
  {
    tag: "Internal Case Study",
    title: "Growing ReelRastha",
    body: "ReelRastha's own Instagram growth, shown transparently as a working case study, with real numbers as they come in.",
  },
];

export default function WorkPage() {
  return (
    <section className="section wrap">
      <div className="section-head">
        <span className="kicker">Work — Experiments in public</span>
        <h1>Proof, built in the open.</h1>
        <p>
          Self-initiated concept campaigns for real films, using only public assets. These are
          concept campaigns, not commissioned work, shown to demonstrate how ReelRastha thinks.
        </p>
      </div>

      <div className="work-grid">
        {studies.map((s) => (
          <div className="work-card" key={s.title}>
            <span className="tag">{s.tag}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <p className="work-note">
        These are labeled concept campaigns while the first client pilots are underway. Real
        outcomes and client quotes will replace them as they land.
      </p>

      <div className="studio-cta">
        <h2>Want the next one to be your film?</h2>
        <Link href="/contact" className="btn btn-solid">Start a project</Link>
      </div>
    </section>
  );
}
