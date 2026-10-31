import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";

/**
 * POST /api/contact  body: { name, email, message, website? }
 *
 * Sends the message to CONTACT_TO through Resend. `website` is a honeypot: humans never see
 * the field, so a filled value is answered with a quiet 200 and nothing is sent.
 *
 * Env: RESEND_API_KEY (required), CONTACT_TO (required), CONTACT_FROM (optional; the default
 * sender works on Resend's free plan without a verified domain, but only to the account's own
 * address, which is exactly what a contact form needs).
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 254, message: 5000 } as const;
const DEFAULT_FROM = "Portfolio contact <onboarding@resend.dev>";

type Body = { name: string; email: string; message: string; website?: string };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function parse(json: unknown): { body?: Body; errors: Partial<Record<keyof Body, string>> } {
  const o = (json ?? {}) as Record<string, unknown>;
  const body: Body = {
    name: clean(o.name, LIMITS.name),
    email: clean(o.email, LIMITS.email),
    message: clean(o.message, LIMITS.message),
    website: typeof o.website === "string" ? o.website : "",
  };
  const errors: Partial<Record<keyof Body, string>> = {};
  if (!body.name) errors.name = "required";
  if (!body.email) errors.email = "required";
  else if (!EMAIL.test(body.email)) errors.email = "invalid";
  if (!body.message) errors.message = "required";
  return Object.keys(errors).length ? { errors } : { body, errors };
}

function callerKey(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip")) ?? "anon";
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { body, errors } = parse(json);
  if (!body) return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
  if (body.website) return NextResponse.json({ ok: true }); // honeypot tripped

  const limit = await rateLimit(`contact:${callerKey(req)}`, 5, 60 * 60);
  if (!limit.ok) return NextResponse.json({ error: "Too many messages, try again later" }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO is not set");
    return NextResponse.json({ error: "Mail is not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? DEFAULT_FROM,
    to,
    replyTo: body.email,
    subject: `Portfolio contact from ${body.name}`,
    text: `From: ${body.name} <${body.email}>\n\n${body.message}\n`,
  });
  if (error) {
    console.error("[contact] Resend error:", error.name, error.message);
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
