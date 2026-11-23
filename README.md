# Ocean of Careers

Career counselling website for Ocean of Careers.

- `frontend/` — Next.js (App Router, TypeScript) static site
- `backend/` — Express API (planned: lead capture, feature-flag admin)

## Frontend

```bash
cd frontend
npm install
npm run dev     # http://localhost:3000
npm run build
```

### Where to edit things

| What | File |
| --- | --- |
| Personal / business info, contact, stats, feature flags | `frontend/src/config.ts` |
| Page copy (services, FAQs, testimonials, blog cards…) | `frontend/src/content/home.ts` |
| Styles / brand tokens | `frontend/src/app/globals.css` |
| Lead form submission (currently opens WhatsApp) | `frontend/src/lib/leads.ts` |

Logo and founder photo: drop files into `frontend/public/` and set `brand.logo` / `founder.photo` in `config.ts`.
