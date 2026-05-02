# SafeHers — Pan-African Safety Education Movement

Production-ready Next.js 14 + TypeScript + MongoDB website for SafeHers, a
partnership between Zarinah Traci (*30 Ways Pretty Girls Can Save Themselves*)
and David Gyedu (DK Cyber, Ghana).

## ✦ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.local.example .env.local
# Fill in MONGODB_URI, NEXTAUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## ✦ Environment Variables

See `.env.local.example` for all required variables. The app runs without
`RESEND_API_KEY` (forms save to DB but don't send emails).

| Variable | Required |
|---|---|
| `MONGODB_URI` | Yes |
| `NEXTAUTH_SECRET` | Yes |
| `NEXTAUTH_URL` | Yes |
| `ADMIN_EMAIL` | Yes |
| `ADMIN_PASSWORD` | Yes |
| `RESEND_API_KEY` | No |
| `NOTIFICATION_EMAIL` | No |

## ✦ Tech Stack

- **Next.js 14** — App Router, server components, static generation
- **TypeScript 5** — strict mode
- **MongoDB + Mongoose 8** — Contact, Newsletter, ResourceDownload models
- **NextAuth v4** — Credentials provider for admin
- **Framer Motion 11** — Animations throughout
- **Resend** — Transactional email
- **Vercel Analytics** — Privacy-first page analytics
- **Tailwind CSS 3** — Utility-first styling with custom CSS properties

## ✦ Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/about` | About SafeHers |
| `/contact` | Contact form (honeypot + rate-limited) |
| `/blog` | Editorial blog (file-based MD) |
| `/blog/[slug]` | Individual post with sharing + related posts |
| `/resources` | Email-gated resource downloads |
| `/case-studies` | Programme case studies |
| `/case-studies/[slug]` | Individual case study |
| `/testimonials` | Testimonials with audience filter |
| `/pricing` | Programme tiers + comparison table |
| `/faq` | Accordion FAQ by category |
| `/privacy` | Privacy policy (Ghana DPA + GDPR) |
| `/terms` | Terms of service |
| `/ghana` | Ghana-specific landing page |
| `/admin` | Protected dashboard (contacts + subscribers) |

## ✦ Content Editing

Blog posts and case studies are Markdown files in `content/`.
No code changes needed — see `docs/CONTENT_GUIDE.md` for full instructions.

## ✦ Admin Dashboard

Visit `/admin` — credentials come from `ADMIN_EMAIL` + `ADMIN_PASSWORD` env vars.
Features: contact submissions table, newsletter subscribers table, CSV export.

## ✦ Deployment

```bash
npm run build   # Verify build locally first
```

Deploy to Vercel by connecting the GitHub repository. Add all environment
variables in the Vercel dashboard.

## ✦ Documentation

- `docs/ARCHITECTURE.md` — Technical architecture reference
- `docs/CONTENT_GUIDE.md` — How to add blog posts, case studies, resources
- `docs/PAYMENTS.md` — Paystack + Flutterwave integration plan

## ✦ License

© Zarinah Traci and SafeHers. All rights reserved.
