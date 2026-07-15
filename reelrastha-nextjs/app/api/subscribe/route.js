import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email, website_url } = await request.json();

    // Honeypot
    if (website_url) return Response.json({ ok: true });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return Response.json(
        { ok: false, error: "The newsletter isn't connected yet." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM || "ReelRastha <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL || site.contactEmail;

    // Add to a Resend audience if one is configured
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
          unsubscribed: false,
        });
      } catch (e) {
        console.error("Audience add failed (continuing):", e?.message);
      }
    }

    // Notify the studio
    await resend.emails.send({
      from,
      to,
      subject: `New subscriber: ${email}`,
      html: `<p>New newsletter subscriber: <strong>${email}</strong></p>`,
    });

    // Welcome email
    await resend.emails.send({
      from,
      to: email,
      subject: "What stayed after the credits — you're in",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;">
          <h2 style="color:#241B4B;">You're on the list.</h2>
          <p style="color:#1D1A23;">Once a month, one note: what stayed after the credits.
          The films worth arguing about, and what we learned building ReelRastha in public.</p>
          <p style="color:#1D1A23;">No spam. No star ratings.</p>
          <p style="color:#8a7fa0;font-size:13px;margin-top:28px;">ReelRastha — Opinions, not reviews.</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return Response.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
