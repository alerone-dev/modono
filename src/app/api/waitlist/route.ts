import { NextRequest, NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";
import { ADMIN_NOTIFICATION_EMAIL, CONFIRMATION_EMAIL } from "@/lib/emails";
import { CONTACT_EMAIL } from "@/lib/constants";
import { dbConfigured, saveWaitlistEmail } from "@/lib/db";
import { waitlistSchema } from "@/lib/validation";

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

function missingEnv() {
  return REQUIRED_ENV.filter((key) => !process.env[key]?.trim());
}

// Maps nodemailer errors to a log hint
function describeError(err: unknown) {
  const code = (err as { code?: string })?.code;
  switch (code) {
    case "EAUTH":
      return "SMTP login rejected. Check SMTP_USER and SMTP_PASS (use a Google app password).";
    case "ECONNECTION":
    case "ETIMEDOUT":
    case "ESOCKET":
    case "EDNS":
      return "Could not reach the SMTP server. Check SMTP_HOST and SMTP_PORT.";
    case "EENVELOPE":
      return "SMTP rejected the recipient address.";
    default:
      return "Unexpected mail error.";
  }
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

// Notify info@modono.in
function sendAdminNotification(transporter: Transporter, email: string) {
  return transporter.sendMail({
    from: `"Modono Waitlist" <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: ADMIN_NOTIFICATION_EMAIL.subject(email),
    html: ADMIN_NOTIFICATION_EMAIL.html(email),
  });
}

// Acknowledge the subscriber
function sendConfirmation(transporter: Transporter, email: string) {
  return transporter.sendMail({
    from: `"Modono" <${process.env.SMTP_USER}>`,
    to: email,
    subject: CONFIRMATION_EMAIL.subject,
    html: CONFIRMATION_EMAIL.html(),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const email = parsed.data.email;

  const useDb = dbConfigured();
  const missing = missingEnv();
  if (!useDb) console.error("Waitlist: DATABASE_URL is not set, signups are not being saved");
  if (missing.length > 0) {
    console.error(`Waitlist: missing environment variables: ${missing.join(", ")}`);
  }
  if (!useDb && missing.length > 0) {
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Please email info@modono.in." },
      { status: 503 },
    );
  }

  // The signup counts as received once it is saved or the team has been notified
  let received = false;
  let isNew = true;

  if (useDb) {
    try {
      isNew = await saveWaitlistEmail(email);
      received = true;
    } catch (err) {
      console.error("Waitlist: could not save to the database", err);
    }
  }

  // Already on the list: skip the emails so repeat signups don't send duplicates
  if (received && !isNew) {
    return NextResponse.json(
      { error: "This email is already subscribed.", code: "already_subscribed" },
      { status: 409 },
    );
  }

  if (missing.length === 0) {
    const transporter = createTransporter();
    try {
      await sendAdminNotification(transporter, email);
      received = true;
    } catch (err) {
      console.error(`Waitlist: admin notification failed. ${describeError(err)}`, err);
    }
    try {
      await sendConfirmation(transporter, email);
    } catch (err) {
      console.error(`Waitlist: confirmation email failed. ${describeError(err)}`, err);
    }
  }

  if (!received) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email info@modono.in." },
      { status: 500 },
    );
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
