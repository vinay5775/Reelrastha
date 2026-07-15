import OpinionCard from "@/components/OpinionCard";
import { getAllOpinions } from "@/lib/opinions";
import { site } from "@/lib/site";

export const metadata = {
  title: "Opinions",
  description:
    "Original opinions on Indian and world cinema. A review tries to settle the argument. A ReelRastha opinion starts one.",
  alternates: { canonical: `${site.url}/opinions` },
};

export default function OpinionsPage() {
  const opinions = getAllOpinions();

  return (
    <section className="section wrap">
      <div className="section-head">
        <span className="kicker">Now Showing</span>
        <h2>Opinions, not reviews.</h2>
        <p>
          A review tries to settle the argument. A ReelRastha opinion starts one.
          Read the latest take, disagree loudly, and bring another film into the conversation.
        </p>
      </div>

      {opinions.length > 0 ? (
        <div className="card-grid">
          {opinions.map((o) => (
            <OpinionCard key={o.slug} opinion={o} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "var(--muted)" }}>
          The first opinions are being written. Follow along on{" "}
          <a href={site.instagram} target="_blank" rel="noopener" style={{ color: "var(--gold-soft)" }}>
            Instagram
          </a>.
        </p>
      )}
    </section>
  );
}
