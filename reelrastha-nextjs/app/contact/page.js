import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Tell us what you are releasing, who you want to reach, and where the campaign stands.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <section className="section wrap">
      <div className="section-head">
        <span className="kicker">Book a Screening</span>
        <h1>Let&apos;s start the reel.</h1>
        <p>
          Tell us what you are releasing, who you want to reach, and where the campaign stands.
          We will reply with the best next step: a quick conversation, a pilot scope, or an
          honest recommendation.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
