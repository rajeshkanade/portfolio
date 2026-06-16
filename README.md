# Rajesh Kanade — "Anti-Gravity Motion" Portfolio

An animated personal portfolio built as a **single Next.js 14 (App Router) app** in
TypeScript — a motion-heavy frontend (Framer Motion) plus serverless API routes for the
contact form. One project, one deploy: **hostable for free on Vercel.**

- **Framework:** Next.js 14 (App Router) · React 18 · TypeScript
- **Styling/Motion:** Tailwind CSS · Framer Motion · lucide-react
- **Backend:** Next.js Route Handlers (`/app/api/*`) · Mongoose (MongoDB, optional)
- **Fonts:** self-hosted via `next/font` (Inter + Space Grotesk)

---

## ✨ Highlights

- **Glowing custom cursor** (`components/CursorGlow.tsx`) — a three-layer violet→cyan
  glow that trails the pointer, swells over interactive targets, and reacts to clicks.
  Auto-disables on touch devices and under `prefers-reduced-motion` (the OS cursor stays).
- **Cut-out profile photo** — the original headshot's yellow studio background is removed
  (transparent `public/profile.png`) and seated on a dark→accent radial disc, so the photo
  background **is** the website background.
- **Anti-gravity motion** — rising particle field + aurora blobs, floating hero portrait
  with counter-rotating orbit rings, magnetic buttons, 3D-tilt project cards, scroll-reveal
  everywhere, and animated gradient headlines. `prefers-reduced-motion` fully respected.
- **Sections:** Hero · About (counting stats) · Experience (alternating timeline) ·
  Skills (10 categories incl. Fine-Tuning) · Projects (with GitHub links) ·
  **Research & Publications** · Education & Certifications · Contact (working form) · Footer.
- **Working contact form** → `POST /api/contact` validates and stores messages in MongoDB.
  With no DB configured it degrades gracefully (friendly 503 telling visitors to email).

All content lives in one typed file: [`data/portfolio.ts`](data/portfolio.ts) — edit there
to update the whole site.

---

## 📁 Structure

```
portfolio/
├─ app/
│  ├─ layout.tsx            # root layout, fonts, SEO metadata
│  ├─ page.tsx              # composes all sections
│  ├─ globals.css           # design system (glass, gradient text, cursor hide…)
│  └─ api/
│     ├─ contact/route.ts   # POST — validate + persist to MongoDB
│     ├─ portfolio/route.ts # GET  — serve portfolio JSON
│     └─ health/route.ts    # GET  — liveness probe
├─ components/              # Navbar, Hero, About, Experience, Skills, Projects,
│                           # Research, Education, Contact, Footer, ParticleField, CursorGlow
├─ hooks/                   # useTilt, useMagnetic, useCountUp
├─ lib/                     # motion presets, api client, mongodb connection cache
├─ models/Message.ts        # Mongoose schema
├─ data/portfolio.ts        # ← all résumé content (single source of truth)
├─ types/index.ts           # shared types
├─ public/                  # profile.png (cut-out), resume.pdf, favicon.svg
└─ next.config.mjs / tailwind.config.ts / tsconfig.json
```

---

## 🚀 Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build` · `npm run start` · `npm run typecheck`.

### Optional: enable the contact form storage

Create `.env.local`:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/portfolio?retryWrites=true&w=majority
```

Without it, the site still runs — the form just returns a friendly "email me directly"
message instead of saving.

---

## ▲ Deploy to Vercel (free)

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
   Framework preset auto-detects **Next.js**; no build settings needed.
3. (Optional) Project → **Settings → Environment Variables** → add `MONGODB_URI`
   (use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster) to enable the
   contact form. Allow access from anywhere (`0.0.0.0/0`) in Atlas Network Access.
4. **Deploy.** The frontend and the `/api/*` routes ship together as one serverless app.

> Note: the app is pinned to the latest stable **Next 14.2.x**. A couple of npm-audit
> advisories only affect Next features this site doesn't use (image optimizer,
> middleware/i18n, WebSocket upgrades); their only "fix" is a breaking jump to Next 16 +
> React 19, deferred to keep the deploy stable.

---

Built with Next.js, TypeScript, Tailwind CSS & Framer Motion.
