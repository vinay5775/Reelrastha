"use client";

import { useState, useEffect } from "react";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

const EMPTY = {
  name: "", email: "", role: "", project_title: "", project_type: "",
  stage: "", target_date: "", goal: "", budget: "", link: "", message: "",
  consent: false, website_url: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [meta, setMeta] = useState({ source_page: "", utm: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => params.get(k))
      .filter(Boolean)
      .join(" / ");
    setMeta({ source_page: window.location.pathname, utm });
  }, []);

  function update(field, value) {
    if (!started) {
      setStarted(true);
      track("contact_start");
    }
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...meta }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("sent");
        track("contact_submit", { project_type: form.project_type || "unspecified" });
        setForm(EMPTY); // only clear on success
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        // form state intentionally preserved
      }
    } catch {
      setStatus("error");
      setError("Network hiccup. Your message is still here, try sending again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-box success" role="status">
        <h3>The reel is rolling.</h3>
        <p>Your message is in. Expect a reply within two business days.</p>
        <button className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Send another
        </button>
        <style jsx>{`
          .success { text-align: center; padding: 60px 44px; }
          .success h3 {
            font-family: var(--font-display); font-size: 2rem;
            color: var(--gold-soft); margin-bottom: 12px;
          }
          .success p { color: var(--cream); margin-bottom: 26px; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-box">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <Field label="Name" required>
            <input type="text" value={form.name} required
              onChange={(e) => update("name", e.target.value)} />
          </Field>

          <Field label="Email" required>
            <input type="email" value={form.email} required
              onChange={(e) => update("email", e.target.value)} />
          </Field>

          <Field label="Role / Company">
            <input type="text" value={form.role}
              onChange={(e) => update("role", e.target.value)} />
          </Field>

          <Field label="Project or Film Title">
            <input type="text" value={form.project_title}
              onChange={(e) => update("project_title", e.target.value)} />
          </Field>

          <Field label="Project Type">
            <select value={form.project_type} onChange={(e) => update("project_type", e.target.value)}>
              <option value="">Select…</option>
              <option>Film</option>
              <option>Creator brand</option>
              <option>Production house</option>
              <option>Film page</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Current Stage">
            <select value={form.stage} onChange={(e) => update("stage", e.target.value)}>
              <option value="">Select…</option>
              <option>Development</option>
              <option>First look</option>
              <option>Trailer</option>
              <option>Release window</option>
              <option>Post-release</option>
            </select>
          </Field>

          <Field label="Release / Target Date">
            <input type="text" placeholder="e.g. March 2026" value={form.target_date}
              onChange={(e) => update("target_date", e.target.value)} />
          </Field>

          <Field label="Budget Range (optional)">
            <input type="text" value={form.budget}
              onChange={(e) => update("budget", e.target.value)} />
          </Field>

          <Field label="Primary Goal" full>
            <input type="text" placeholder="What does a win look like?" value={form.goal}
              onChange={(e) => update("goal", e.target.value)} />
          </Field>

          <Field label="Website, Trailer, or Social Link" full>
            <input type="url" placeholder="https://" value={form.link}
              onChange={(e) => update("link", e.target.value)} />
          </Field>

          <Field label="Message" required full>
            <textarea rows={5} value={form.message} required
              onChange={(e) => update("message", e.target.value)} />
          </Field>

          {/* Honeypot — hidden from humans, catches bots */}
          <input
            type="text" tabIndex={-1} autoComplete="off"
            value={form.website_url}
            onChange={(e) => update("website_url", e.target.value)}
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          />

          <div className="form-row full">
            <label className="consent">
              <input type="checkbox" required checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)} />
              <span>
                I agree to be contacted about this inquiry. We only use your details to reply.
              </span>
            </label>
          </div>

          {status === "error" && (
            <div className="form-row full">
              <p className="error-msg" role="alert">{error}</p>
            </div>
          )}

          <div className="form-row full">
            <button type="submit" className="btn btn-solid" disabled={status === "sending"}
              style={{ width: "100%" }}>
              {status === "sending" ? "Sending…" : "Send it"}
            </button>
          </div>
        </div>
      </form>

      <p className="contact-alt">
        Or just DM{" "}
        <a href={site.instagram} target="_blank" rel="noopener"
          onClick={() => track("instagram_follow_click", { location: "contact" })}>
          {site.instagramHandle}
        </a>{" "}
        on Instagram.
      </p>
    </div>
  );
}

function Field({ label, children, required, full }) {
  return (
    <div className={`form-row ${full ? "full" : ""}`}>
      <label>
        {label} {required && <span className="req">*</span>}
      </label>
      {children}
    </div>
  );
}
