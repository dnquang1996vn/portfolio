import { NextResponse } from "next/server";
import { addView, getEngagement, setLike } from "@/lib/engagement";
import { articles } from "@/content/articles";

type Params = { params: Promise<{ slug: string }> };

function validSlug(slug: string) {
  return Object.hasOwn(articles, slug);
}

/** GET /api/articles/:slug → current counters. */
export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  if (!validSlug(slug)) return NextResponse.json({ error: "Unknown article" }, { status: 404 });
  return NextResponse.json(await getEngagement(slug), { headers: { "Cache-Control": "no-store" } });
}

/** POST /api/articles/:slug  body: { action: "view" | "like" | "unlike" } */
export async function POST(req: Request, { params }: Params) {
  const { slug } = await params;
  if (!validSlug(slug)) return NextResponse.json({ error: "Unknown article" }, { status: 404 });

  let action: unknown;
  try {
    ({ action } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  switch (action) {
    case "view":
      return NextResponse.json(await addView(slug));
    case "like":
      return NextResponse.json(await setLike(slug, true));
    case "unlike":
      return NextResponse.json(await setLike(slug, false));
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
