# Content Guide — SafeHers

This guide explains how to add and edit content on the SafeHers website without touching code.

---

## Blog Posts

Blog posts live in `content/blog/` as Markdown files (`.md`).

### Creating a new post

1. Create a new file: `content/blog/your-post-slug.md`
2. The filename becomes the URL slug: `/blog/your-post-slug`
3. Add the required frontmatter at the top of the file

### Required frontmatter

```markdown
---
title: "Your Post Title"
excerpt: "A one or two sentence summary shown in cards and meta descriptions."
date: "2024-06-15"
author: "Zarinah Traci"
category: "Online Safety"
coverImage: "/images/blog/your-image.jpg"
featured: false
---

Your post content starts here...
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown in h1 and browser tab |
| `excerpt` | Yes | Max 160 characters for SEO |
| `date` | Yes | ISO format: `YYYY-MM-DD` |
| `author` | Yes | Full name |
| `category` | Yes | See categories below |
| `coverImage` | No | Place images in `public/images/blog/` |
| `featured` | No | `true` to highlight in blog index |

### Valid categories

- `Online Safety`
- `Cybersecurity`
- `Personal Safety`
- `Home Safety`
- `Financial Safety`
- `Wellbeing`

### Writing in Markdown

```markdown
# Heading 1 (avoid — h1 is reserved for the post title)
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list

[Link text](https://example.com)

> Blockquote — use for important callouts

---  (horizontal rule)
```

---

## Case Studies

Case studies live in `content/case-studies/` and follow the same Markdown format.

### Required frontmatter

```markdown
---
title: "Organisation Name — Programme Type"
excerpt: "Short outcome summary."
date: "2024-03-01"
client: "Organisation Name"
sector: "University"
participants: 1200
duration: "6 months"
outcome: "40% increase in safety incident reporting"
country: "Ghana"
---
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown in heading |
| `excerpt` | Yes | Card summary |
| `date` | Yes | Programme end date |
| `client` | Yes | Organisation name |
| `sector` | Yes | e.g. University, Hospitality, Corporate |
| `participants` | Yes | Number |
| `duration` | Yes | e.g. "6 months" |
| `outcome` | Yes | One-line measurable result |
| `country` | Yes | e.g. Ghana |

---

## Resources

Resources are defined in code at `src/lib/resources.ts`. To add a new resource:

1. Open `src/lib/resources.ts`
2. Add a new object to the `RESOURCES` array:

```typescript
{
  id: "unique-id",
  title: "Resource Title",
  description: "One sentence description.",
  type: "PDF",        // PDF | Checklist | Toolkit | Protocol | Guide
  category: "Personal Safety",
  fileSize: "1.2 MB",
  pages: 8,
  downloadUrl: "/downloads/your-file.pdf",
},
```

3. Place the actual file at `public/downloads/your-file.pdf`

---

## Writing Style Guide

### Voice

- Direct, warm, knowledgeable
- Write as a trusted friend who happens to be an expert
- Avoid jargon unless it is explained on first use
- Use "women" not "females"; use "participants" not "victims"

### Formatting

- Use `✦` as the sole decorative symbol — no other emojis in body copy
- Short paragraphs (2–4 sentences maximum)
- Active voice wherever possible
- Numbers under ten: spell out ("three workshops")
- Numbers 10+: use numerals ("12 universities")

### Local context

- Reference Ghanaian / African institutions by their full name on first mention
- Use local currency examples (GHS) where relevant, with USD equivalent
- Acknowledge regional differences where the advice varies by country

---

## Images

- Blog cover images: 1200 × 630 px minimum, JPEG at 80% quality
- Place in `public/images/blog/`
- Use descriptive file names: `mobile-money-safety-ghana.jpg`
- Always provide `alt` text in the frontmatter (future enhancement)

---

## Adding Pages

For new static pages (e.g. a new city landing page):

1. Create `src/app/your-page/page.tsx`
2. Export a `metadata` object at the top (server component)
3. Add the route to `src/app/sitemap.ts`
4. Consider adding a link to `Footer.tsx` or `Nav.tsx`
