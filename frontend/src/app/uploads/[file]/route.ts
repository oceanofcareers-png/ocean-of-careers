import { readFile } from "node:fs/promises";
import path from "node:path";
import { IMAGE_TYPES, LOCAL_UPLOAD_DIR } from "@/lib/store";

/** Serves images uploaded in local development (production uses Vercel Blob URLs). */
export async function GET(_request: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const name = path.basename(file);
  const type = Object.entries(IMAGE_TYPES).find(([, ext]) => name.endsWith(`.${ext}`))?.[0];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const data = await readFile(path.join(LOCAL_UPLOAD_DIR, name));
    return new Response(data, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
