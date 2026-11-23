/**
 * Single-admin auth: password from ADMIN_PASSWORD, session in an HMAC-signed
 * cookie keyed by ADMIN_SESSION_SECRET. Uses Web Crypto so it also runs in proxy.ts.
 */

export const SESSION_COOKIE = "ooc_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (at least 32 characters)");
  return s;
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Buffer.from(sig).toString("base64url");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  return `${expires}.${await hmac(`admin.${expires}`)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) * 1000 < Date.now()) return false;
  try {
    return timingSafeEqual(sig, await hmac(`admin.${expires}`));
  } catch {
    return false;
  }
}

export async function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not set");
  // Compare HMACs so the comparison is constant-length regardless of input.
  return timingSafeEqual(await hmac(`pw.${input}`), await hmac(`pw.${expected}`));
}
