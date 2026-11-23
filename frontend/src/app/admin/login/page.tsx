"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <main className="adm-login">
      <form action={action} className="adm-login-card">
        <div className="adm-login-logo" aria-hidden>🌊</div>
        <h1>Site Admin</h1>
        <p>Sign in to manage content and feature flags.</p>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
        {error && <div className="adm-error" role="alert">{error}</div>}
        <button className="adm-btn adm-btn-primary" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
