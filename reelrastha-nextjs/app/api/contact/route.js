import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot: bots fill hidden fields, humans don't.
    if (body.website_url) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const { name, email, message } = body;
    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return Response.json(
        { ok: false, error: "The form isn't connected yet. Please DM us on Instagram." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM || "ReelRastha <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL || site.contactEmail;

    const rows = [
      ["Name", body.name],
      ["Email", body.email],
      ["Role / Company", body.role],
      ["Project or Film", body.project_title],
      ["Project Type", body.project_type],
      ["Current Stage", body.stage],
      ["Release / Target Date", body.target_date],
      ["Primary Goal", body.goal],
      ["Budget Range", body.budget],
      ["Link", body.link],
      ["Source Page", body.source_page],
      ["Campaign", body.utm],
    ]
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;color:#8a7fa0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(
            k
          )}</td><td style="padding:6px 12px;color:#1D1A23;">${escapeHtml(v)}</td></tr>`
      )
      .join("");

    // 1) Notify the studio
    await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject: `New inquiry: ${body.project_title || body.name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:640px;">
          <h2 style="color:#241B4B;">New ReelRastha inquiry</h2>
          <table style="border-collapse:collapse;width:100%;background:#F8F3E8;border-radius:8px;">${rows}</table>
          <h3 style="color:#241B4B;margin-top:24px;">Message</h3>
          <p style="white-space:pre-wrap;color:#1D1A23;">${escapeHtml(body.message)}</p>
        </div>
      `,
    });

    // 2) Confirmation to the sender
    await resend.emails.send({
      from,
      to: body.email,
      subject: "The reel is rolling — we got your message",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;">
          <h2 style="color:#241B4B;">The reel is rolling.</h2>
          <p style="color:#1D1A23;">Hi ${escapeHtml(body.name)},</p>
          <p style="color:#1D1A23;">Your message is in. Expect a reply within two business days
          with the best next step: a quick conversation, a pilot scope, or an honest recommendation.</p>
          <p style="color:#8a7fa0;font-size:13px;margin-top:28px;">ReelRastha — Opinions, not reviews.</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { ok: false, error: "Something went wrong sending that. Please try again or DM us." },
      { status: 500 }
    );
  }
}
