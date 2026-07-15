import { site } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "ReelRastha began with a simple frustration: too much film conversation sounds like a verdict. Reel path. Cinema soul.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <section className="section wrap">
      <div className="about-grid">
        <div className="about-body">
          <span className="kicker">The Rastha — Why ReelRastha exists</span>
          <h1>Reel path. Cinema soul.</h1>
          <p>
            ReelRastha began with a simple frustration: too much film conversation sounds like a
            verdict. This is a place for something more personal, the detail that stayed after the
            credits, the scene that changed meaning on the drive home, and the unpopular opinion
            worth defending.
          </p>
          <p>
            The name brings the idea together: reel for the medium, rastha for the road.
            A cinematic journey, one opinion at a time.
          </p>
          <div className="founder-note">
            I am building ReelRastha in public, one film, one experiment, and one audience
            conversation at a time. The long-term goal is to help films not only get reviewed,
            but get understood, remembered, and shared.
          </div>
        </div>

        <div className="founder-card">
          <div className="founder-portrait">
            Add a founder portrait or short intro video here
          </div>
          <ul className="timeline">
            <li>
              <span className="t-mark">Week 1</span>
              <span className="t-text">ReelRastha launched, visual identity built</span>
            </li>
            <li>
              <span className="t-mark">First</span>
              <span className="t-text">First published opinion</span>
            </li>
            <li>
              <span className="t-mark">Next</span>
              <span className="t-text">First self-initiated campaign experiment</span>
            </li>
            <li>
              <span className="t-mark">Goal</span>
              <span className="t-text">First client pilot project</span>
            </li>
          </ul>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
            style={{ width: "100%", textAlign: "center", marginTop: "22px" }}
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
