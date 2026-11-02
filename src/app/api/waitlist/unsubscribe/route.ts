import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, removeWaitlistEmail } from "@/lib/db";
import { waitlistSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (!dbConfigured()) {
    console.error("Waitlist: DATABASE_URL is not set, cannot unsubscribe");
    return NextResponse.json(
      { error: "Unsubscribing is temporarily unavailable. Please email info@modono.in." },
      { status: 503 },
    );
  }

  try {
    const removed = await removeWaitlistEmail(parsed.data.email);
    if (!removed) {
      return NextResponse.json(
        { error: "This email isn't on the waitlist." },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Waitlist: could not unsubscribe", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email info@modono.in." },
      { status: 500 },
    );
  }
}
