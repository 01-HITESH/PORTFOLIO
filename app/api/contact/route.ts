import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function validatePayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    typeof b.email === "string" &&
    typeof b.message === "string" &&
    b.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    b.message.trim().length >= 20
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // ── Option A: Supabase ──────────────────────────────────────────────────
    // Uncomment to persist messages in Supabase.
    // Create a table: contact_messages(id, name, email, subject, message, created_at)
    //
    // const { createClient } = await import("@supabase/supabase-js");
    // const supabase = createClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // );
    // const { error: dbError } = await supabase
    //   .from("contact_messages")
    //   .insert([{ name, email, subject: subject ?? "", message }]);
    // if (dbError) throw dbError;

    // ── Option B: Resend ────────────────────────────────────────────────────
    // npm install resend, then uncomment:
    //
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY!);
    // await resend.emails.send({
    //   from: "Portfolio <onboarding@resend.dev>",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `New message: ${subject ?? "(no subject)"}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // });

    console.log("[Contact Form]", { name, email, subject, message, ts: new Date().toISOString() });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
