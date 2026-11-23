import { cacheLife, cacheTag } from "next/cache";
import { defaultContent } from "@/content/defaults";
import { mergeWithDefaults, resolveContent } from "@/content/resolve";
import type { SiteContent } from "@/content/types";
import { readStoredContent } from "./store";

export const CONTENT_TAG = "site-content";

/** Raw editable content (tokens unresolved) — what the admin edits. Always fresh. */
export async function getEditableContent(): Promise<SiteContent> {
  return mergeWithDefaults(defaultContent, await readStoredContent());
}

/** Content for the public site, tokens resolved. Cached until the admin saves. */
export async function getPublishedContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("max");
  return resolveContent(await getEditableContent());
}
