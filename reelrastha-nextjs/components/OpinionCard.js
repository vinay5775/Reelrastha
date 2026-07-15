import Link from "next/link";

export default function OpinionCard({ opinion }) {
  return (
    <Link href={`/opinions/${opinion.slug}`} className="opinion-card">
      <div>
        <span className="oc-eyebrow">{opinion.series}</span>
        <h3 className="oc-title">{opinion.title}</h3>
      </div>
      <p className="oc-body">{opinion.excerpt}</p>
      <div>
        <div className="oc-meta">
          {opinion.language && <span>{opinion.language}</span>}
          {opinion.year && <span>{opinion.year}</span>}
          <span>{opinion.readingTime} min read</span>
          {opinion.spoilers && <span className="spoiler">{opinion.spoilers}</span>}
        </div>
        <div className="oc-divider" />
        <span className="oc-footer">A ReelRastha Opinion</span>
      </div>
    </Link>
  );
}
