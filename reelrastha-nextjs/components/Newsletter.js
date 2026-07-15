"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website_url: hp }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
        track("newsletter_subscribe");
        setEmail("");
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network hiccup. Try again?");
    }
  }

  return (
    <div className="newsletter">
      <span className="kicker">What stayed after the credits</span>
      <h2>One note a month.</h2>
      <p>The films worth arguing about, and what we learn building ReelRastha in public.</p>

      {status === "done" ? (
        <p className="nl-success" role="status">
          You&apos;re in. Check your inbox for a hello.
        </p>
      ) : (
        <form onSubmit={submit} className="nl-form">
          <input
            type="email"
            required
            value={email}
            placeholder="you@example.com"
            aria-label="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={hp} onChange={(e) => setHp(e.target.value)}
            style={{ position: "absolute", left: "-9999px" }}
          />
          <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
            {status === "sending" ? "…" : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && <p className="nl-error" role="alert">{error}</p>}

      <p className="nl-consent">
        No spam. Unsubscribe anytime. We only use your email for this note.
      </p>

      <style jsx>{`
        .newsletter {
          max-width: 620px; margin: 0 auto; text-align: center;
          border: 1px solid rgba(242,184,75,0.25); border-radius: 10px;
          padding: 44px 32px;
          background: linear-gradient(160deg, rgba(92,45,145,0.4), transparent);
        }
        .newsletter h2 { font-size: clamp(1.6rem, 3vw, 2.1rem); margin-bottom: 12px; }
        .newsletter p { color: var(--muted); margin: 0 0 24px; }
        .nl-form { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .nl-form input[type="email"] {
          flex: 1 1 260px; background: rgba(0,0,0,0.28);
          border: 1px solid rgba(242,184,75,0.35); border-radius: 999px;
          padding: 14px 20px; color: var(--cream);
          font-family: var(--font-body); font-size: 0.95rem;
        }
        .nl-form input[type="email"]:focus { outline: none; border-color: var(--gold); }
        .nl-success { color: var(--gold-soft); font-size: 1.05rem; margin: 0 0 8px; }
        .nl-error { color: #ffb4a2; font-size: 0.88rem; margin: 12px 0 0; }
        .nl-consent {
          font-size: 0.78rem; color: var(--muted);
          opacity: 0.7; margin: 18px 0 0 !important;
        }
      `}</style>
    </div>
  );
}
