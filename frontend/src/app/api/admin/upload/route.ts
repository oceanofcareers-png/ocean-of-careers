import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { IMAGE_TYPES, saveImage } from "@/lib/store";

const MAX_BYTES = 4 * 1024 * 1024; // Vercel functions accept ~4.5MB request bodies

export async function POST(request: NextRequest) {
  if (!(await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  if (!IMAGE_TYPES[file.type]) {
    return NextResponse.json({ error: "Use a JPG, PNG, WebP, GIF or AVIF image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image must be under 4 MB" }, { status: 400 });

  try {
    return NextResponse.json({ url: await saveImage(file) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 500 });
  }
}
