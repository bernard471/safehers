# SafeHers Architecture

This document describes the technical architecture of the SafeHers website.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Animation | Framer Motion 11 |
| Database | MongoDB (via Mongoose 8) |
| Auth | NextAuth v4 (Credentials provider) |
| Email | Resend |
| Analytics | Vercel Analytics |
| Deployment | Vercel (recommended) |

---

## Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout — wraps everything in RootLayoutInner
│   ├── page.tsx              # Homepage
│   ├── opengraph-image.tsx   # Auto-generated OG image (Edge runtime)
│   ├── sitemap.ts            # XML sitemap
│   ├── robots.ts             # robots.txt
│   ├── not-found.tsx         # 404 page
│   ├── error.tsx             # Global error boundary (client)
│   ├── about/
│   ├── contact/              # Contact form (client component with honeypot)
│   ├── faq/                  # Server wrapper + FAQContent client component
│   ├── privacy/
│   ├── terms/
│   ├── blog/                 # File-based blog (gray-matter + remark)
│   ├── resources/            # Email-gated resource downloads
│   ├── testimonials/
│   ├── pricing/
│   ├── case-studies/         # File-based case studies
│   ├── ghana/                # Ghana landing page
│   └── admin/                # Protected admin dashboard
│       ├── layout.tsx        # AdminProviders + AdminShell
│       ├── page.tsx          # Dashboard metrics
│       ├── contacts/         # Contact submissions table
│       ├── subscribers/      # Newsletter subscribers table
│       └── login/            # Login form
│
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── RootLayoutInner.tsx   # Client; pathname-based Nav/Footer/widgets
│   ├── PartnerLogos.tsx      # Marquee animation
│   ├── TestimonialCarousel.tsx
│   ├── WhatsAppButton.tsx    # Fixed floating button
│   ├── CookieBanner.tsx      # Consent banner
│   ├── NewsletterModal.tsx   # Scroll-triggered email capture
│   └── CountrySelector.tsx   # Top bar country picker
│
├── lib/
│   ├── mongodb.ts            # Mongoose connection singleton
│   ├── auth.ts               # NextAuthOptions
│   ├── blog.ts               # getAllPostMetas, getPostBySlug
│   ├── caseStudies.ts        # getAllCaseStudyMetas, getCaseStudyBySlug
│   ├── resources.ts          # RESOURCES array + getResourceById
│   ├── rateLimiter.ts        # In-memory IP rate limiter
│   └── email-templates.ts    # Resend HTML email templates
│
├── models/
│   ├── Contact.ts
│   ├── Newsletter.ts
│   └── ResourceDownload.ts
│
content/                      # Markdown content (blog + case studies)
├── blog/
│   ├── mobile-money-fraud-protection.md
│   ├── setting-up-two-factor-authentication.md
│   └── safety-on-african-campuses.md
└── case-studies/
    ├── ghana-university-pilot.md
    ├── hotel-chain-training.md
    └── corporate-wellness-rollout.md

docs/
├── ARCHITECTURE.md           # This file
├── CONTENT_GUIDE.md
└── PAYMENTS.md
```

---

## Data Flow

### Contact Form

```
Client form (contact/page.tsx)
  → POST /api/contact
    → Honeypot check (website field)
    → Rate limit check (IP, 5/hour)
    → Validate fields
    → MongoDB: Contact.create()
    → Resend: confirmation email to user
    → Resend: notification email to team
```

### Newsletter Signup

```
Any subscribe form / NewsletterModal
  → POST /api/newsletter
    → Honeypot check
    → Rate limit check
    → MongoDB: Newsletter.findOneAndUpdate (upsert)
    → Resend: welcome email (new subscribers only)
```

### Resource Download

```
ResourceCard click (resources/page.tsx)
  → DownloadModal opens
  → User enters email
  → POST /api/download { email, resourceId }
    → Validate email + resource exists
    → MongoDB: ResourceDownload.create()
    → Return { ok, downloadUrl, title }
  → Client opens downloadUrl
```

### Admin Auth

```
/admin/* routes
  → AdminShell (useSession)
    → if unauthenticated → redirect to /admin/login
    → if login page → render children (passthrough)
    → if authenticated → render sidebar + content
```

---

## Environment Variables

See `.env.local.example` for all required variables.

| Variable | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `NEXTAUTH_SECRET` | Yes | JWT signing secret |
| `NEXTAUTH_URL` | Yes | Base URL for redirects |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `RESEND_API_KEY` | No* | Email sending |
| `NOTIFICATION_EMAIL` | No* | Receives contact submissions |

*App works without email vars — forms save to DB silently.

---

## Design System

### Typography

| Class | Font | Use |
|---|---|---|
| `.display` | Fraunces (serif) | Headings |
| `.display-italic` | Fraunces Italic | Accent headings |
| `.eyebrow` | JetBrains Mono | Labels, caps |
| `.body-prose` | Inter | Body text |

### Colours (CSS variables)

| Variable | Value | Use |
|---|---|---|
| `--ink` | `#0E0E10` | Primary text, backgrounds |
| `--bone` | `#EDE8DF` | Warm neutral sections |
| `--cream` | `#FAF6EF` | Light backgrounds |
| `--rose` | `#E8B4B8` | Accent, error states |
| `--burgundy` | `#5C1F2E` | Primary brand accent |
| `--terracotta` | `#C1694F` | Secondary accent |
| `--moss` | `#3D5A4C` | Tertiary / nature |
| `--gold` | `#C9963A` | Highlight / premium |

---

## Performance Notes

- All blog and case study pages use `generateStaticParams` — pre-rendered at build time
- OG image uses Edge runtime (`opengraph-image.tsx`)
- Loading skeletons on `/blog`, `/resources`, `/case-studies`
- Framer Motion is tree-shaken — only imported components are bundled
- MongoDB connection uses a singleton pattern to prevent connection storms in serverless
