import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { ADMIN_NOTIFICATION_EMAIL, CONFIRMATION_EMAIL } from "@/lib/emails";
import { CONTACT_EMAIL } from "@/lib/constants";

const waitlistSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

function missingEnv() {
  return REQUIRED_ENV.filter((key) => !process.env[key]?.trim());
}

// Maps nodemailer errors to a log hint and a safe message for the visitor
function describeError(err: unknown) {
  const code = (err as { code?: string })?.code;
  switch (code) {
    case "EAUTH":
      return { hint: "SMTP login rejected. Check SMTP_USER and SMTP_PASS (use a Google app password).", status: 502 };
    case "ECONNECTION":
    case "ETIMEDOUT":
    case "ESOCKET":
    case "EDNS":
      return { hint: "Could not reach the SMTP server. Check SMTP_HOST and SMTP_PORT.", status: 502 };
    case "EENVELOPE":
      return { hint: "SMTP rejected the recipient address.", status: 400 };
    default:
      return { hint: "Unexpected mail error.", status: 500 };
  }
}

async function sendEmails(email: string) {
  const port = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });

  // Notify info@modono.in
  await transporter.sendMail({
    from: `"Modono Waitlist" <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: ADMIN_NOTIFICATION_EMAIL.subject(email),
    html: ADMIN_NOTIFICATION_EMAIL.html(email),
  });

  // Acknowledge the subscriber
  await transporter.sendMail({
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

  const missing = missingEnv();
  if (missing.length > 0) {
    console.error(`Waitlist: missing environment variables: ${missing.join(", ")}`);
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Please email info@modono.in." },
      { status: 503 },
    );
  }

  try {
    await sendEmails(parsed.data.email);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const { hint, status } = describeError(err);
    console.error(`Waitlist error: ${hint}`, err);
    return NextResponse.json(
      {
        error:
          status === 400
            ? "We couldn't send a confirmation to that email address."
            : "Something went wrong. Please try again or email info@modono.in.",
      },
      { status: status === 400 ? 400 : 500 },
    );
  }
}
