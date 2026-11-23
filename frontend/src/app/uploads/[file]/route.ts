import { readFile } from "node:fs/promises";
import path from "node:path";
import { get } from "@vercel/blob";
import { IMAGE_TYPES, LOCAL_UPLOAD_DIR } from "@/lib/store";

const CACHE_HEADER = "public, max-age=31536000, immutable";

/** Serves uploaded images: from a private Vercel Blob store, or from `.data/uploads` in local development. */
export async function GET(_request: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const name = path.basename(file);
  const type = Object.entries(IMAGE_TYPES).find(([, ext]) => name.endsWith(`.${ext}`))?.[0];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const result = await get(`uploads/${name}`, { access: "private" });
      if (!result || result.statusCode !== 200) return new Response("Not found", { status: 404 });
      return new Response(result.stream, { headers: { "Content-Type": type, "Cache-Control": CACHE_HEADER } });
    }
    const data = await readFile(path.join(LOCAL_UPLOAD_DIR, name));
    return new Response(data, { headers: { "Content-Type": type, "Cache-Control": CACHE_HEADER } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
