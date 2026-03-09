# cursor-community.kz — Design Document

**Date:** 2026-03-09
**Author:** Cursor Ambassador (drugoi)
**Status:** Approved

## Overview

One-page landing site for the Cursor developer community in Kazakhstan. Built on Astro with static content in Markdown/MDX. Hosted on Vercel. Modern dark UI with subtle terminal/hacker accents. Trilingual: Russian (default), Kazakh, English.

## Goals

1. Inform visitors about upcoming Cursor events in Kazakhstan
2. Provide links to community channels (Telegram, Luma, Forum, Discord)
3. Describe the community, Cursor Ambassador program, and local context
4. Rank well in traditional search engines (SEO) and AI-powered search (GEO)

## Architecture

### Stack

- **Framework:** Astro (static output, zero JS by default)
- **Content:** Astro Content Collections with MDX
- **Styling:** CSS with custom properties (no Tailwind, no UI framework)
- **Animations:** CSS + vanilla JS (typewriter effect only, ~1KB inline)
- **i18n:** File-based routing + JSON dictionaries
- **Hosting:** Vercel (auto-deploy from GitHub)

### Why pure Astro (no React/Svelte)

For a single-page static landing, adding a UI framework introduces unnecessary bundle weight and complexity. Terminal-style animations (typewriter, blinking cursor) are trivially implemented in CSS/vanilla JS. YAGNI.

## Visual Design

### Aesthetic Direction

Modern dark UI with **terminal accents** — not a full terminal theme. Clean typography, spacious layout, subtle glow effects. Terminal elements are used sparingly as design punctuation.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0A0A0A` | Page background |
| `--bg-card` | `#111111` | Card backgrounds |
| `--bg-card-hover` | `#1A1A1A` | Card hover state |
| `--text-primary` | `#E5E5E5` | Body text |
| `--text-secondary` | `#888888` | Secondary text |
| `--accent-green` | `#00FF41` | Terminal accents, prompt symbol |
| `--accent-green-dim` | `#00CC33` | Green hover/secondary |
| `--accent-cursor` | extracted from brand assets | CTA buttons, interactive elements |
| `--border` | `#222222` | Card borders |
| `--border-glow` | `rgba(0, 255, 65, 0.15)` | Hover glow on cards |

### Typography

- **Headings:** `Space Grotesk` or `Outfit` — modern geometric sans-serif
- **Body:** `Inter` alternative — `DM Sans` or `Geist Sans` (clean, readable)
- **Mono (accents):** `JetBrains Mono` or `Fira Code` — for event details, prompt symbols, footer
- **Cursor Gothic** — for Cursor wordmark/logo only (from brand assets if available)

### Terminal Accents (used sparingly)

1. `>` symbol before section headings (monospace, green)
2. Blinking block cursor `_` in Hero and Footer
3. Typewriter effect on one line in Hero
4. Monospace font for event metadata (date, location)
5. Green color as accent on dark background

Everything else — clean, modern dark design with good spacing, gradient borders, subtle shadows.

## Page Structure

### Header (fixed)

- Logo: `> cursor_kz` (monospace, green `>`)
- Navigation: anchor links — События, Сообщество, О нас
- Language switcher: `RU | KK | EN`
- Semi-transparent background with `backdrop-filter: blur`

### Hero Section (fullscreen)

- Large heading: **Cursor Community Kazakhstan** (proportional font)
- Subtitle: community description
- Typewriter line: `> building the future with AI_` (blinking cursor)
- Two CTA buttons: "Присоединиться" (→ Telegram), "Ближайшие события" (↓ anchor)
- Background: subtle animated gradient mesh (no matrix rain)

### Events Section

- Heading: `> Ближайшие события`
- Modern dark cards with gradient border, hover glow
- Card content: title, city, date, format, registration link
- Past events: muted style with "Завершено" badge
- Data from Content Collections (MDX with typed frontmatter)

### Community Section

- Heading: `> Сообщество`
- Grid of clickable link cards (icon + name + description)
- Telegram (t.me/cursor_kz) — primary
- Luma (lu.ma/cursorcommunity) — events calendar
- Cursor Forum (forum.cursor.com)
- Discord

### About Section

- Heading: `> О нас`
- Text about Cursor Ambassador program and KZ community
- Mention of Nurdaulet Bazylbekov as organizer
- Key Cursor stats ($29.3B valuation, millions of developers)
- FAQ block (question-answer format for GEO optimization)

### Footer

- Copyright
- Social icons
- `> cursor_kz_` with blinking cursor as signature

## i18n

### Routing

| Language | Path | `<html lang>` |
|---|---|---|
| Russian (default) | `/` | `ru` |
| Kazakh | `/kk/` | `kk` |
| English | `/en/` | `en` |

### Implementation

- UI strings: JSON dictionaries in `src/i18n/{ru,kk,en}.json`
- Helper function `t(key, lang)` for templates
- Content Collections: language field in frontmatter, filtered at build time
- Language switcher in header redirects to corresponding URL path

## SEO

- Unique `<title>` and `<meta description>` per language
- Open Graph tags (og:title, og:description, og:image, og:locale)
- Twitter Card tags
- Hreflang alternate links for all three languages + x-default
- Canonical URLs on every page
- `sitemap.xml` via `@astrojs/sitemap` with hreflang
- `robots.txt` auto-generated
- Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- Structured Data JSON-LD:
  - `Organization` — Cursor Community Kazakhstan
  - `Event` — for each event (name, startDate, location, offers, organizer)
  - `FAQPage` — for About section FAQ
  - `WebSite` — site-level metadata
- Geo meta tags: `geo.region=KZ`, `geo.placename=Almaty`
- Schema.org `Place` with `addressCountry: "KZ"` nested in events

### Target Keywords

- RU: "Cursor сообщество Казахстан", "AI разработка Алматы", "Cursor митапы", "Cafe Cursor"
- KK: "Cursor қауымдастығы Қазақстан", "AI дамыту Алматы"
- EN: "Cursor community Kazakhstan", "AI development Almaty", "Cursor meetups Central Asia"

## GEO (Generative Engine Optimization)

Optimization for AI-powered search engines (ChatGPT Search, Perplexity, Google AI Overviews):

### Structured, Citable Content

- Each section provides self-contained answers to likely queries
- Concrete facts with verifiable data: dates, addresses, numbers
- FAQ block in About section — ideal for AI extraction

### Extended Schema.org Markup

- `FAQPage` for FAQ block
- `Event` with full detail (organizer, offers, eventStatus, eventAttendanceMode)
- `Organization` with description, foundingDate, areaServed

### Authority Signals (E-E-A-T)

- Official Cursor Ambassador status mentioned
- Links to cursor.com/ambassadors, cursor.com/community
- Citations and links to sources (the-tech.kz, luma)

### Technical Requirements for AI Crawlers

- Do NOT block AI bots in `robots.txt` (GPTBot, PerplexityBot, Google-Extended)
- Clean, parseable HTML with minimal JS
- `llms.txt` in site root — plain text file describing the site for LLM crawlers

### Content Strategy

- Encyclopedia-style writing — neutral facts that AI can cite
- Include statistics: "Cursor — AI platform valued at $29.3B with millions of users"
- Multilingual content increases citation chances across language queries

## Content (Initial)

### Events

1. **Cafe Cursor Astana** — January 22, 2025, кофейня Cult, Astana. Workshops, demos, panel discussions. Status: past. Luma: https://luma.com/9dvvhglk
2. **Cafe Cursor Almaty** — TBD, Almaty. Co-working + coffee + Cursor credits. Status: upcoming. Luma: https://luma.com/hp7l44e7

### Community Links

- Telegram: https://t.me/cursor_kz
- Luma: https://lu.ma/cursorcommunity
- Forum: https://forum.cursor.com
- Discord: Cursor global Discord

## Performance Targets

- Lighthouse: 95+ on all metrics
- Zero JS by default (Astro static)
- Typewriter effect: single inline script ~1KB
- Fonts: `font-display: swap`, preload critical
- Images: optimized, lazy-loaded where applicable

## Project Structure

```
cursor-community.kz/
├── src/
│   ├── layouts/
│   │   └── Base.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Events.astro
│   │   ├── Community.astro
│   │   ├── About.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts
│   │   └── events/
│   │       ├── cafe-cursor-astana.mdx
│   │       └── cafe-cursor-almaty.mdx
│   ├── i18n/
│   │   ├── ru.json
│   │   ├── kk.json
│   │   ├── en.json
│   │   └── utils.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── kk/index.astro
│   │   └── en/index.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── fonts/
│   ├── llms.txt
│   └── robots.txt
├── astro.config.mjs
├── tsconfig.json
└── package.json
```
