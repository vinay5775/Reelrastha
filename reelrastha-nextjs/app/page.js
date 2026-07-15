import Link from "next/link";
import Lensy from "@/components/Lensy";
import OpinionCard from "@/components/OpinionCard";
import HeroCtas from "@/components/HeroCtas";
import Newsletter from "@/components/Newsletter";
import { site } from "@/lib/site";
import { getAllOpinions } from "@/lib/opinions";

export default function Home() {
  const opinions = getAllOpinions().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="hero wrap">
        <Lensy />
        <span className="eyebrow">A ReelRastha Production</span>
        <h1>{site.positioning}</h1>
        <p className="subhead">{site.subhead}</p>
        <p className="personality">{site.personality}</p>
        <HeroCtas />
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-inner wrap">
          <span>Original opinions</span>
          <span className="dot">★</span>
          <span>Indian and world cinema</span>
          <span className="dot">★</span>
          <span>Social-first film storytelling</span>
        </div>
      </div>

      {/* NOW SHOWING */}
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

        <p className="center-note">
          <Link href="/opinions">Read all opinions →</Link>
        </p>
      </section>

      {/* STUDIO TRANSITION */}
      <section className="section wrap">
        <div className="studio-transition">
          <span className="kicker">ReelRastha Studio</span>
          <h2>The same instinct, applied to a film campaign.</h2>
          <p>
            ReelRastha studies what makes people stop, feel, argue, and share. The Studio turns
            that instinct into launch copy, social content, and campaign systems for films and creators.
          </p>
          <Link href="/studio" className="btn btn-ghost" style={{ marginTop: "10px" }}>
            See how the Studio works
          </Link>
        </div>
      </section>
      {/* NEWSLETTER */}
      <section className="section wrap">
        <Newsletter />
      </section>
    </>
  );
}
