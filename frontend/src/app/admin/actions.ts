"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { checkPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE, verifySessionToken } from "@/lib/auth";
import { CONTENT_TAG, getEditableContent } from "@/lib/content";
import { writeStoredContent } from "@/lib/store";
import { STATUSES, validateContent } from "@/content/resolve";
import type { SectionKey, SiteContent, Status, WidgetKey } from "@/content/types";

export type ActionResult = { ok: true; savedAt: string } | { ok: false; error: string };

async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) throw new Error("Your session has expired. Please log in again.");
}

function fail(e: unknown): ActionResult {
  return { ok: false, error: e instanceof Error ? e.message : "Something went wrong" };
}

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  try {
    if (!(await checkPassword(String(formData.get("password") ?? "")))) return "Incorrect password";
  } catch (e) {
    return e instanceof Error ? e.message : "Login failed";
  }
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function saveContent(content: SiteContent): Promise<ActionResult> {
  try {
    await requireAdmin();
    const error = validateContent(content);
    if (error) return { ok: false, error };
    await writeStoredContent(content);
    updateTag(CONTENT_TAG);
    return { ok: true, savedAt: new Date().toISOString() };
  } catch (e) {
    return fail(e);
  }
}

/** Flips one section/widget status immediately, leaving other (possibly unsaved) edits alone. */
export async function setStatus(group: "sections" | "widgets", key: string, status: Status): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status" };
    const content = await getEditableContent();
    const target =
      group === "sections"
        ? (content.sections[key as SectionKey] as { status?: Status } | undefined)
        : (content.widgets[key as WidgetKey] as { status?: Status } | undefined);
    if (!target || !("status" in target)) return { ok: false, error: `Unknown item "${key}"` };
    target.status = status;
    await writeStoredContent(content);
    updateTag(CONTENT_TAG);
    return { ok: true, savedAt: new Date().toISOString() };
  } catch (e) {
    return fail(e);
  }
}
