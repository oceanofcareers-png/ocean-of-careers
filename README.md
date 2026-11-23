# Ocean of Careers

Career counselling website for Ocean of Careers — Next.js (App Router, TypeScript) in `frontend/`, hosted on Vercel.

## Local development

```bash
cd frontend
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD and ADMIN_SESSION_SECRET
npm run dev                  # site: http://localhost:3000  admin: http://localhost:3000/admin
```

Locally, admin edits are saved to `frontend/.data/` (gitignored), so no cloud services are needed.

## Admin panel (`/admin`)

- **Feature flags**: every section and widget is **Active** (shown), **Hidden** (removed from the page) or **Disabled** (shown greyed out and not clickable). Changes go live immediately.
- **Content**: every text, list, button text/link and image on the homepage can be edited, then **Save changes**.
- **Text tricks**: `*gold*` in titles, `**bold**` in the hero intro, `{{founder.name}}` / `{{stats.studentsGuided}}` etc. to reuse Site info values.
- **Book a Session** (Widgets): the hero and founder-section buttons open a 2-step form (details → date & time slot) and send the request on WhatsApp. Hidden = they become plain links again.
- **Links** accept `#section`, `/page`, `https://…`, `tel:`, `mailto:`, and `whatsapp:` (or `whatsapp:your message`).

## Production setup on Vercel (one-time)

1. **Storage → Create / Connect**: add an **Upstash Redis** database (content) and a **Blob** store (images) to this project. Vercel adds their environment variables automatically.
2. **Settings → Environment Variables**: add `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (32+ random characters).
3. Redeploy.

Without step 1, the admin opens but saving shows a "No storage configured" error.

## Where things live

| What | File |
| --- | --- |
| Default site info (used until first save in admin) | `frontend/src/config.ts` |
| Default section content | `frontend/src/content/defaults.ts` |
| Content shape | `frontend/src/content/types.ts` |
| Storage (Redis/Blob, local fallback) | `frontend/src/lib/store.ts` |
| Admin auth | `frontend/src/lib/auth.ts`, `frontend/src/proxy.ts` |
| Admin UI | `frontend/src/components/admin/` |
| Styles | `frontend/src/app/globals.css`, `frontend/src/app/admin/admin.css` |
| Lead form submission (currently opens WhatsApp) | `frontend/src/lib/leads.ts` |
