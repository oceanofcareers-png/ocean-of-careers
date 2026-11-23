import type { SiteContent, SiteInfo, Status } from "./types";

export const STATUSES: Status[] = ["active", "hidden", "disabled"];

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Overlay stored content on the defaults. Objects merge key by key so fields
 * added to the defaults later still appear; arrays and scalars are replaced.
 * Stored values whose type doesn't match the default are ignored.
 */
export function mergeWithDefaults<T>(defaults: T, stored: unknown): T {
  if (stored === undefined) return defaults;
  if (isPlainObject(defaults)) {
    if (!isPlainObject(stored)) return defaults;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(defaults)) {
      out[key] = mergeWithDefaults((defaults as Record<string, unknown>)[key], stored[key]);
    }
    return out as T;
  }
  if (Array.isArray(defaults)) {
    if (!Array.isArray(stored)) return defaults;
    const template = defaults[0];
    return (template === undefined ? stored : stored.map((item) => mergeWithDefaults(template, item))) as T;
  }
  if (defaults === null || stored === null) {
    // nullable fields (images) accept a string or null
    return (stored === null || typeof stored === "string" ? stored : defaults) as T;
  }
  return (typeof stored === typeof defaults ? stored : defaults) as T;
}

function lookup(site: SiteInfo, path: string): string | undefined {
  let cur: unknown = site;
  for (const part of path.split(".")) {
    if (!isPlainObject(cur)) return undefined;
    cur = cur[part];
  }
  if (typeof cur === "number") return Number.isInteger(cur) ? String(cur) : cur.toFixed(1);
  return typeof cur === "string" ? cur : undefined;
}

export function interpolate(text: string, site: SiteInfo): string {
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path: string) => lookup(site, path) ?? match);
}

function interpolateDeep(value: Json, site: SiteInfo): Json {
  if (typeof value === "string") return interpolate(value, site);
  if (Array.isArray(value)) return value.map((v) => interpolateDeep(v, site));
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, interpolateDeep(v as Json, site)]));
  }
  return value;
}

/** Resolve `{{tokens}}` everywhere. Site info itself is resolved first so it can reference other site fields. */
export function resolveContent(content: SiteContent): SiteContent {
  const site = interpolateDeep(content.site as unknown as Json, content.site) as unknown as SiteInfo;
  return interpolateDeep({ ...content, site } as unknown as Json, site) as unknown as SiteContent;
}

export function whatsappUrl(number: string, message: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/**
 * Turn an editable link into a safe href. Supports `#anchor`, `/path`, http(s),
 * mailto:, tel:, and `whatsapp:` / `whatsapp:<message>` shortcuts.
 * Anything else (e.g. `javascript:`) becomes "#".
 */
export function resolveHref(href: string, site: SiteInfo): string {
  const h = href.trim();
  if (!h) return "#";
  if (h.startsWith("whatsapp:")) {
    const msg = h.slice("whatsapp:".length).trim() || site.contact.whatsappDefaultMessage;
    return whatsappUrl(site.contact.whatsappRaw, msg);
  }
  if (h.startsWith("#") || (h.startsWith("/") && !h.startsWith("//"))) return h;
  if (/^(https?:|mailto:|tel:)/i.test(h)) return h;
  return "#";
}

export function isExternal(href: string) {
  return /^https?:/i.test(href);
}

/** Basic structural check for content submitted from the admin. */
export function validateContent(value: unknown): string | null {
  if (!isPlainObject(value)) return "Content must be an object";
  for (const key of ["site", "sections", "widgets", "leadForm"]) {
    if (!isPlainObject(value[key])) return `Missing "${key}"`;
  }
  const groups = [value.sections, value.widgets] as Record<string, unknown>[];
  for (const group of groups) {
    for (const [name, entry] of Object.entries(group)) {
      if (isPlainObject(entry) && "status" in entry && !STATUSES.includes(entry.status as Status)) {
        return `Invalid status for "${name}"`;
      }
    }
  }
  if (JSON.stringify(value).length > 900_000) return "Content is too large";
  return null;
}
