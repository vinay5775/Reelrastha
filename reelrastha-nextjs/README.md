# ReelRastha

Cinema opinion platform + content studio. Next.js on Vercel.

---

## Deploying (first time)

1. **Push this folder to GitHub** (Add file → Upload files, drag everything except `node_modules`).
2. In **Vercel → Add New → Project**, import the repo. Vercel auto-detects Next.js — no config needed.
3. Add the environment variables below, then Deploy.

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | What it does |
|---|---|---|
| `RESEND_API_KEY` | Yes, for forms | Get it free at [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Yes | Where inquiries land (your inbox) |
| `RESEND_FROM` | Yes | Sender address. Use `ReelRastha <onboarding@resend.dev>` until a domain is verified |
| `NEXT_PUBLIC_SITE_URL` | Yes | Live URL, e.g. `https://reelrastha.vercel.app` |
| `RESEND_AUDIENCE_ID` | Optional | Resend Audience for newsletter subscribers |

**Without `RESEND_API_KEY`, the site still works** — the contact form just returns a friendly error telling people to DM instead.

### Sending from your own domain

`onboarding@resend.dev` works for testing but looks unprofessional. Once you own `reelrastha.com`:
1. Resend → Domains → Add Domain → follow the DNS steps
2. Change `RESEND_FROM` to `ReelRastha <hello@reelrastha.com>`

---

## Publishing a new opinion

**No code required.** Add a `.md` file to `content/opinions/` on GitHub. The URL becomes the filename: `mollywood-times.md` → `/opinions/mollywood-times`.

```markdown
---
title: "Film Name"
film: "Film Name"
take: "The one-line quotable take."
series: "ReelRastha Opinion"   # or: You Watched This Wrong / Rank These Five / The Film Deserved Better
language: "Malayalam"
year: 2025
genre: "Drama"
spoilers: "No spoilers"        # or: Mild spoilers / Full spoilers
date: "2026-07-10"             # YYYY-MM-DD, controls sort order
excerpt: "Shown on cards and in Google results."
instagram: "https://www.instagram.com/reelrastha/p/xxxx"
---

Write the opinion here in normal markdown.

## Headings work
**Bold** works. > Blockquotes work.
```

Commit it. Vercel redeploys automatically. It appears on the homepage, the archive, the sitemap, and gets its own share preview.

### Editorial template (from the brief)

Hook → Premise → Observation → Personal response → Meaning → ReelRastha take → Conversation prompt.

---

## What's wired up

- **Opinion pages** — real URLs, per-page metadata, OG images, Article structured data
- **Contact form** — 12 fields, validation, honeypot, success state without reload, input preserved on error, auto-confirmation email
- **Newsletter** — signup + welcome email
- **Analytics** — Vercel Analytics with the brief's events: `hero_explore_opinions_click`, `hero_work_with_us_click`, `opinion_open`, `opinion_share`, `instagram_follow_click`, `contact_start`, `contact_submit`, `newsletter_subscribe`
- **SEO** — sitemap.xml, robots.txt, canonical URLs, favicon, OG share image
- **Accessibility** — skip link, focus states, semantic headings, reduced-motion support

## Still to do

- [ ] Add a founder portrait (replace the placeholder on `/about`)
- [ ] Write the two concept campaign studies (`/work` currently describes them as in-progress)
- [ ] Buy `reelrastha.com` and connect it in Vercel → Domains
- [ ] Verify the domain in Resend, then update `RESEND_FROM`

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```
