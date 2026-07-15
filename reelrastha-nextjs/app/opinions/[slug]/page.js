import Link from "next/link";
import { notFound } from "next/navigation";
import { getOpinion, getOpinionSlugs, getAllOpinions } from "@/lib/opinions";
import { site } from "@/lib/site";
import ShareBar from "@/components/ShareBar";

export async function generateStaticParams() {
  return getOpinionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const opinion = await getOpinion(params.slug);
  if (!opinion) return {};

  const url = `${site.url}/opinions/${opinion.slug}`;
  return {
    title: opinion.title,
    description: opinion.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${opinion.title} | ReelRastha`,
      description: opinion.excerpt,
      url,
      type: "article",
      publishedTime: opinion.date || undefined,
      modifiedTime: opinion.updated || undefined,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: opinion.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${opinion.title} | ReelRastha`,
      description: opinion.excerpt,
      images: ["/og.png"],
    },
  };
}

export default async function OpinionPage({ params }) {
  const opinion = await getOpinion(params.slug);
  if (!opinion) notFound();

  const others = getAllOpinions().filter((o) => o.slug !== opinion.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opinion.title,
    description: opinion.excerpt,
    datePublished: opinion.date || undefined,
    dateModified: opinion.updated || opinion.date || undefined,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/opinions/${opinion.slug}`,
  };

  return (
    <article className="section wrap opinion-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="op-head">
        <span className="kicker">{opinion.series}</span>
        <h1>{opinion.title}</h1>
        {opinion.take && <p className="op-take">{opinion.take}</p>}

        <div className="op-meta">
          {opinion.language && <span>{opinion.language}</span>}
          {opinion.year && <span>{opinion.year}</span>}
          {opinion.genre && <span>{opinion.genre}</span>}
          <span>{opinion.readingTime} min read</span>
          {opinion.spoilers && <span className="spoiler">{opinion.spoilers}</span>}
        </div>

        {opinion.date && (
          <p className="op-date">
            Published {opinion.date}
            {opinion.updated && opinion.updated !== opinion.date && ` · Updated ${opinion.updated}`}
          </p>
        )}
      </div>

      <div className="op-body" dangerouslySetInnerHTML={{ __html: opinion.html }} />

      <ShareBar slug={opinion.slug} title={opinion.title} instagram={opinion.instagram} />

      {others.length > 0 && (
        <div className="op-more">
          <h2>Keep arguing</h2>
          <div className="card-grid">
            {others.map((o) => (
              <Link key={o.slug} href={`/opinions/${o.slug}`} className="opinion-card">
                <div>
                  <span className="oc-eyebrow">{o.series}</span>
                  <h3 className="oc-title">{o.title}</h3>
                </div>
                <p className="oc-body">{o.excerpt}</p>
                <div>
                  <div className="oc-divider" />
                  <span className="oc-footer">A ReelRastha Opinion</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
