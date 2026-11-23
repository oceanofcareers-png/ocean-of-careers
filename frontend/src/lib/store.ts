import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";
import { put } from "@vercel/blob";

/**
 * Persistence for site content and uploaded images.
 *
 * Production (Vercel): Upstash Redis for the content JSON, Vercel Blob for images.
 * Local development: falls back to files under `.data/` when those env vars are missing.
 */

const CONTENT_KEY = "ooc:site-content";
const DATA_DIR = path.join(process.cwd(), ".data");
export const LOCAL_UPLOAD_DIR = path.join(DATA_DIR, "uploads");

function redisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

function assertWritableLocally() {
  if (process.env.VERCEL) {
    throw new Error(
      "No storage configured. Connect an Upstash Redis database and a Blob store to this project in Vercel, then redeploy.",
    );
  }
}

export async function readStoredContent(): Promise<unknown> {
  const redis = redisClient();
  if (redis) return (await redis.get(CONTENT_KEY)) ?? undefined;
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, "content.json"), "utf8"));
  } catch {
    return undefined;
  }
}

export async function writeStoredContent(content: unknown): Promise<void> {
  const redis = redisClient();
  if (redis) {
    await redis.set(CONTENT_KEY, content);
    return;
  }
  assertWritableLocally();
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(path.join(DATA_DIR, "content.json"), JSON.stringify(content, null, 2));
}

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

/**
 * Saves an image and returns the URL to use on the site.
 * Public Blob stores return their CDN URL directly; private stores (which reject public
 * uploads) are served through `/uploads/<name>`, which reads the blob server-side.
 */
export async function saveImage(file: File): Promise<string> {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Unsupported image type");
  const name = `${randomUUID()}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const options = { contentType: file.type, addRandomSuffix: false };
    try {
      const blob = await put(`uploads/${name}`, file, { ...options, access: "public" });
      return blob.url;
    } catch (error) {
      if (!(error instanceof Error && /private/i.test(error.message))) throw error;
      await put(`uploads/${name}`, file, { ...options, access: "private" });
      return `/uploads/${name}`;
    }
  }
  assertWritableLocally();
  await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}
