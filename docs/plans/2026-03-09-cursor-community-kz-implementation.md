# cursor-community.kz Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a one-page Astro landing site for Cursor Community Kazakhstan with modern dark UI, terminal accents, trilingual i18n, SEO + GEO optimization.

**Architecture:** Pure Astro (static output, zero JS by default) with Content Collections for events, file-based i18n routing (/, /kk/, /en/), JSON dictionaries for UI strings, CSS custom properties for theming, and a single inline vanilla JS script for typewriter animation.

**Tech Stack:** Astro 5, TypeScript, CSS custom properties, @astrojs/sitemap, Google Fonts (Space Grotesk, DM Sans, JetBrains Mono)

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro` (placeholder)

**Step 1: Initialize Astro project**

Run:
```bash
cd /Users/drugoi/projects/cursor-community.kz
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If interactive prompt blocks, create files manually:

```json
// package.json
{
  "name": "cursor-community-kz",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

**Step 2: Install dependencies**

Run:
```bash
npm install astro@latest @astrojs/sitemap
```

**Step 3: Configure Astro**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cursor-community.kz',
  output: 'static',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'kk', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**Step 4: Create placeholder index page**

```astro
---
// src/pages/index.astro
---
<html lang="ru">
  <head><title>Cursor Community Kazakhstan</title></head>
  <body><h1>cursor-community.kz</h1></body>
</html>
```

**Step 5: Verify build works**

Run: `npm run build`
Expected: Build succeeds, outputs to `dist/`

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with sitemap and i18n config"
```

---

### Task 2: Global Styles and Theme

**Files:**
- Create: `src/styles/global.css`

**Step 1: Create CSS custom properties and global styles**

```css
/* src/styles/global.css */

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  /* Colors */
  --bg-primary: #0A0A0A;
  --bg-card: #111111;
  --bg-card-hover: #1A1A1A;
  --bg-header: rgba(10, 10, 10, 0.85);
  --text-primary: #E5E5E5;
  --text-secondary: #888888;
  --text-muted: #555555;
  --accent-green: #00FF41;
  --accent-green-dim: #00CC33;
  --accent-green-glow: rgba(0, 255, 65, 0.15);
  --border: #222222;
  --border-hover: #333333;

  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --section-padding: clamp(4rem, 10vh, 8rem);
  --container-max: 1100px;
  --container-padding: clamp(1rem, 5vw, 2rem);
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.2;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Utility: container */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Utility: section */
.section {
  padding: var(--section-padding) 0;
}

/* Terminal accent: prompt symbol */
.prompt {
  font-family: var(--font-mono);
  color: var(--accent-green);
  margin-right: 0.5rem;
}

/* Terminal accent: blinking cursor */
.cursor-blink {
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  background-color: var(--accent-green);
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Subtle noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

**Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with dark theme and terminal accent utilities"
```

---

### Task 3: i18n System

**Files:**
- Create: `src/i18n/ru.json`
- Create: `src/i18n/kk.json`
- Create: `src/i18n/en.json`
- Create: `src/i18n/utils.ts`

**Step 1: Create Russian dictionary (primary)**

```json
// src/i18n/ru.json
{
  "meta": {
    "title": "Cursor Community Kazakhstan — сообщество разработчиков",
    "description": "Сообщество разработчиков Казахстана, использующих Cursor — самый быстрорастущий AI-инструмент для программирования. Митапы, воркшопы, события в Алматы и Астане."
  },
  "nav": {
    "events": "События",
    "community": "Сообщество",
    "about": "О нас"
  },
  "hero": {
    "title": "Cursor Community Kazakhstan",
    "subtitle": "Объединяем разработчиков Казахстана, использующих Cursor — самый быстрорастущий AI-инструмент для программирования.",
    "typewriter": "building the future with AI",
    "cta_join": "Присоединиться",
    "cta_events": "Ближайшие события"
  },
  "events": {
    "heading": "Ближайшие события",
    "register": "Регистрация",
    "past": "Завершено",
    "upcoming": "Скоро",
    "no_upcoming": "Новые события скоро — следите в Telegram"
  },
  "community": {
    "heading": "Сообщество",
    "telegram_desc": "Основной чат сообщества",
    "luma_desc": "Календарь событий",
    "forum_desc": "Глобальный форум Cursor",
    "discord_desc": "Глобальный Discord Cursor"
  },
  "about": {
    "heading": "О нас",
    "description": "Cursor Community Kazakhstan — локальное сообщество разработчиков, объединённых вокруг Cursor, AI-платформы для создания программного обеспечения с оценкой $29.3 млрд и миллионами пользователей по всему миру.",
    "ambassador": "Сообщество организовано при поддержке программы Cursor Ambassador — глобальной сети амбассадоров, которые проводят митапы, хакатоны и воркшопы в своих городах.",
    "faq_title": "Часто задаваемые вопросы",
    "faq": [
      {
        "q": "Что такое Cursor?",
        "a": "Cursor — AI-платформа для разработки программного обеспечения из Сан-Франциско. В 2025 году компания привлекла $2.3 млрд при оценке $29.3 млрд. Решениями Cursor пользуются миллионы разработчиков по всему миру."
      },
      {
        "q": "Как присоединиться к сообществу?",
        "a": "Присоединяйтесь к нашему Telegram-каналу t.me/cursor_kz — там мы публикуем анонсы событий, делимся полезными материалами и общаемся."
      },
      {
        "q": "Где проходят события?",
        "a": "Мы проводим Cafe Cursor и воркшопы в Алматы и Астане. Следите за анонсами в Telegram и на Luma."
      }
    ]
  },
  "footer": {
    "copyright": "© 2025 Cursor Community Kazakhstan"
  }
}
```

**Step 2: Create Kazakh dictionary**

```json
// src/i18n/kk.json
{
  "meta": {
    "title": "Cursor Community Kazakhstan — әзірлеушілер қауымдастығы",
    "description": "Cursor қолданатын Қазақстан әзірлеушілерінің қауымдастығы — бағдарламалауға арналған ең жылдам дамып келе жатқан AI құралы. Алматы мен Астанадағы кездесулер, семинарлар, оқиғалар."
  },
  "nav": {
    "events": "Оқиғалар",
    "community": "Қауымдастық",
    "about": "Біз туралы"
  },
  "hero": {
    "title": "Cursor Community Kazakhstan",
    "subtitle": "Cursor қолданатын Қазақстан әзірлеушілерін біріктіреміз — бағдарламалауға арналған ең жылдам дамып келе жатқан AI құралы.",
    "typewriter": "building the future with AI",
    "cta_join": "Қосылу",
    "cta_events": "Жақын оқиғалар"
  },
  "events": {
    "heading": "Жақын оқиғалар",
    "register": "Тіркелу",
    "past": "Аяқталды",
    "upcoming": "Жақында",
    "no_upcoming": "Жаңа оқиғалар жақында — Telegram-да қадағалаңыз"
  },
  "community": {
    "heading": "Қауымдастық",
    "telegram_desc": "Негізгі қауымдастық чаты",
    "luma_desc": "Оқиғалар күнтізбесі",
    "forum_desc": "Cursor глобалды форумы",
    "discord_desc": "Cursor глобалды Discord"
  },
  "about": {
    "heading": "Біз туралы",
    "description": "Cursor Community Kazakhstan — Cursor айналасында біріккен жергілікті әзірлеушілер қауымдастығы. Cursor — бағдарламалық қамтамасыз ету жасауға арналған AI платформасы, бағалауы $29.3 млрд, бүкіл әлемде миллиондаған пайдаланушылары бар.",
    "ambassador": "Қауымдастық Cursor Ambassador бағдарламасының қолдауымен ұйымдастырылған — бұл өз қалаларында кездесулер, хакатондар және семинарлар өткізетін амбассадорлардың жаһандық желісі.",
    "faq_title": "Жиі қойылатын сұрақтар",
    "faq": [
      {
        "q": "Cursor дегеніміз не?",
        "a": "Cursor — Сан-Францискодағы бағдарламалық қамтамасыз етуді әзірлеуге арналған AI платформасы. 2025 жылы компания $29.3 млрд бағалаумен $2.3 млрд тартты. Cursor шешімдерін бүкіл әлемде миллиондаған әзірлеушілер пайдаланады."
      },
      {
        "q": "Қауымдастыққа қалай қосылуға болады?",
        "a": "t.me/cursor_kz Telegram арнамызға қосылыңыз — онда біз оқиғалар туралы хабарламалар жариялаймыз, пайдалы материалдармен бөлісеміз және сөйлесеміз."
      },
      {
        "q": "Оқиғалар қайда өтеді?",
        "a": "Біз Алматы мен Астанада Cafe Cursor және семинарлар өткіземіз. Telegram және Luma-дағы хабарламаларды қадағалаңыз."
      }
    ]
  },
  "footer": {
    "copyright": "© 2025 Cursor Community Kazakhstan"
  }
}
```

**Step 3: Create English dictionary**

```json
// src/i18n/en.json
{
  "meta": {
    "title": "Cursor Community Kazakhstan — Developer Community",
    "description": "Kazakhstan developer community using Cursor — the fastest-growing AI tool for software development. Meetups, workshops, and events in Almaty and Astana."
  },
  "nav": {
    "events": "Events",
    "community": "Community",
    "about": "About"
  },
  "hero": {
    "title": "Cursor Community Kazakhstan",
    "subtitle": "Uniting developers in Kazakhstan who use Cursor — the fastest-growing AI tool for software development.",
    "typewriter": "building the future with AI",
    "cta_join": "Join Us",
    "cta_events": "Upcoming Events"
  },
  "events": {
    "heading": "Upcoming Events",
    "register": "Register",
    "past": "Completed",
    "upcoming": "Coming Soon",
    "no_upcoming": "New events coming soon — follow us on Telegram"
  },
  "community": {
    "heading": "Community",
    "telegram_desc": "Main community chat",
    "luma_desc": "Events calendar",
    "forum_desc": "Cursor global forum",
    "discord_desc": "Cursor global Discord"
  },
  "about": {
    "heading": "About Us",
    "description": "Cursor Community Kazakhstan is a local developer community built around Cursor, an AI-powered software development platform valued at $29.3B with millions of users worldwide.",
    "ambassador": "The community is organized with support from the Cursor Ambassador program — a global network of ambassadors who host meetups, hackathons, and workshops in their cities.",
    "faq_title": "Frequently Asked Questions",
    "faq": [
      {
        "q": "What is Cursor?",
        "a": "Cursor is an AI-powered software development platform based in San Francisco. In 2025, the company raised $2.3B at a $29.3B valuation. Millions of developers worldwide use Cursor."
      },
      {
        "q": "How do I join the community?",
        "a": "Join our Telegram channel at t.me/cursor_kz — we post event announcements, share useful resources, and chat there."
      },
      {
        "q": "Where do events take place?",
        "a": "We host Cafe Cursor meetups and workshops in Almaty and Astana. Follow announcements on Telegram and Luma."
      }
    ]
  },
  "footer": {
    "copyright": "© 2025 Cursor Community Kazakhstan"
  }
}
```

**Step 4: Create i18n utility**

```typescript
// src/i18n/utils.ts
import ru from './ru.json';
import kk from './kk.json';
import en from './en.json';

const dictionaries = { ru, kk, en } as const;

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = 'ru';
export const locales: Locale[] = ['ru', 'kk', 'en'];

export function getDict(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split('/')[1];
  if (segment && locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}
```

**Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n dictionaries (ru, kk, en) and utility helpers"
```

---

### Task 4: Content Collections — Events Schema

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/events/cafe-cursor-astana.mdx`
- Create: `src/content/events/cafe-cursor-almaty.mdx`

**Step 1: Define events collection schema**

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    city: z.enum(['almaty', 'astana']),
    format: z.string(),
    status: z.enum(['upcoming', 'past']),
    registrationUrl: z.string().url().optional(),
    lumaUrl: z.string().url().optional(),
    description: z.string(),
    lang: z.enum(['ru', 'kk', 'en']).default('ru'),
  }),
});

export const collections = { events };
```

**Step 2: Create event content — Cafe Cursor Astana**

```mdx
---
title: "Café Cursor Astana"
date: "2025-01-22"
location: "Кофейня Cult, Астана"
city: astana
format: "Воркшопы, демо-сессии, панельные дискуссии"
status: past
registrationUrl: "https://luma.com/9dvvhglk"
lumaUrl: "https://luma.com/9dvvhglk"
description: "Первый Café Cursor в Центральной Азии. Бесплатный кофе, AI-кредиты, совместный кодинг, воркшопы и панельные дискуссии о создании продуктов с AI."
lang: ru
---

Первый Café Cursor в Центральной Азии прошёл 22 января 2025 года в кофейне Cult в центре Астаны. Более 500 регистраций, спикеры из Лондона и Сан-Франциско, воркшопы по AI-разработке.
```

**Step 3: Create event content — Cafe Cursor Almaty**

```mdx
---
title: "Café Cursor Almaty"
date: "TBD"
location: "Алматы"
city: almaty
format: "Коворкинг + кофе + Cursor credits"
status: upcoming
registrationUrl: "https://luma.com/hp7l44e7"
lumaUrl: "https://luma.com/hp7l44e7"
description: "Cursor users собираются в кафе на целый день — коворкинг, кофе и Cursor credits. Drop-in формат с 9:00 до 17:00."
lang: ru
---

Мы занимаем кафе на целый день и приглашаем пользователей Cursor прийти поработать вместе. Бесплатный кофе и Cursor credits ждут вас.
```

**Step 4: Commit**

```bash
git add src/content.config.ts src/content/
git commit -m "feat: add events content collection with Astana and Almaty events"
```

---

### Task 5: Base Layout

**Files:**
- Create: `src/layouts/Base.astro`

**Step 1: Create Base layout with SEO, GEO, structured data**

The Base layout should include:
- `<html lang>` set dynamically per locale
- Preload fonts
- Import global.css
- Unique `<title>` and `<meta description>` per locale
- Open Graph + Twitter Card tags
- Hreflang alternate links for all three locales + x-default
- Canonical URL
- Geo meta tags (geo.region=KZ, geo.placename)
- JSON-LD structured data for Organization and WebSite
- Slot for page content

Key details:
- OG image: use a static image in `/public/og-image.png` (placeholder, can be replaced later)
- Organization JSON-LD: name "Cursor Community Kazakhstan", url, sameAs [telegram, luma, forum]
- WebSite JSON-LD: name, url

**Step 2: Verify it renders**

Run: `npm run dev`
Check: page loads at localhost with correct `<head>` tags

**Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add Base layout with SEO meta, hreflang, and JSON-LD"
```

---

### Task 6: Header Component

**Files:**
- Create: `src/components/Header.astro`

**Step 1: Build Header**

- Fixed position, full-width
- `backdrop-filter: blur(12px)` on semi-transparent dark bg
- Left: logo `> cursor_kz` (mono font, green `>`)
- Center/Right: nav links (События, Сообщество, О нас) — anchor links to `#events`, `#community`, `#about`
- Far right: language switcher `RU | KK | EN` — links to `/`, `/kk/`, `/en/`
- Receive `locale` as prop to highlight active language and use correct nav labels
- Mobile: hamburger menu or simplified layout (CSS-only if possible)

**Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add Header with nav, language switcher, and backdrop blur"
```

---

### Task 7: Hero Component

**Files:**
- Create: `src/components/Hero.astro`

**Step 1: Build Hero**

- Full viewport height (`min-height: 100vh`)
- Background: subtle gradient mesh (CSS radial gradients, animated slowly)
- Large heading: localized title (proportional font, white)
- Subtitle: localized description
- Typewriter line: `> {typewriter text}_` with blinking cursor — inline `<script>` for typewriter effect
- Two CTA buttons: "Join" → Telegram link, "Events" → `#events` anchor
- Buttons styled as modern dark UI (not terminal)
- Typewriter script: ~20 lines of vanilla JS, types one character at a time with delay

**Step 2: Test typewriter animation in browser**

Run: `npm run dev`
Check: text types out character by character, cursor blinks

**Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero section with typewriter animation and CTAs"
```

---

### Task 8: Events Component

**Files:**
- Create: `src/components/Events.astro`

**Step 1: Build Events**

- Section with `id="events"`
- Heading: `<span class="prompt">></span> {events.heading}`
- Query Content Collection: filter events by locale, sort upcoming first
- Card for each event:
  - Dark bg (`--bg-card`), rounded corners, subtle border
  - Hover: border glow (green), bg lightens
  - Content: title, city icon, date (mono font), format, register button/link
  - Past events: muted opacity, "Завершено" badge
- If no upcoming events: show `no_upcoming` message

**Step 2: Test with sample data**

Run: `npm run dev`
Check: both events render, Astana shows as "past", Almaty as "upcoming"

**Step 3: Commit**

```bash
git add src/components/Events.astro
git commit -m "feat: add Events section with content collection cards"
```

---

### Task 9: Community Component

**Files:**
- Create: `src/components/Community.astro`

**Step 1: Build Community**

- Section with `id="community"`
- Heading with prompt accent
- 2x2 grid of link cards (responsive, 1 column on mobile)
- Each card: platform icon (SVG inline or emoji), name, description, external link
- Cards: dark bg, border, hover glow + border color change
- Links: Telegram, Luma, Forum, Discord
- `target="_blank"` and `rel="noopener noreferrer"` on all external links

**Step 2: Commit**

```bash
git add src/components/Community.astro
git commit -m "feat: add Community section with social link cards"
```

---

### Task 10: About Component with FAQ

**Files:**
- Create: `src/components/About.astro`

**Step 1: Build About**

- Section with `id="about"`
- Heading with prompt accent
- Description paragraph
- Ambassador paragraph
- FAQ block: iterate over `about.faq` array from dictionary
  - Each FAQ item: `<details>` / `<summary>` for accessible expand/collapse
  - Styled: summary bold, green accent on open, smooth transition
- FAQ wrapped in `FAQPage` JSON-LD script tag

**Step 2: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add About section with FAQ and FAQPage JSON-LD"
```

---

### Task 11: Footer Component

**Files:**
- Create: `src/components/Footer.astro`

**Step 1: Build Footer**

- Minimal: copyright text from dictionary
- Row of social icons (SVG: Telegram, Luma logo or link icon)
- `> cursor_kz` with blinking cursor as signature
- Subtle top border (`--border`)

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer with social links and blinking cursor"
```

---

### Task 12: Assemble Main Page

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Compose all components in index.astro**

```astro
---
import Base from '@/layouts/Base.astro';
import Header from '@/components/Header.astro';
import Hero from '@/components/Hero.astro';
import Events from '@/components/Events.astro';
import Community from '@/components/Community.astro';
import About from '@/components/About.astro';
import Footer from '@/components/Footer.astro';
import { getDict } from '@/i18n/utils';

const locale = 'ru';
const dict = getDict(locale);
---

<Base locale={locale} dict={dict}>
  <Header locale={locale} dict={dict} />
  <main>
    <Hero dict={dict} />
    <Events locale={locale} dict={dict} />
    <Community dict={dict} />
    <About dict={dict} />
  </main>
  <Footer dict={dict} />
</Base>
```

**Step 2: Full build and visual check**

Run: `npm run build && npm run preview`
Check: all sections visible, typewriter works, links work, no console errors

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble main page with all sections"
```

---

### Task 13: i18n Routing — KK and EN Pages

**Files:**
- Create: `src/pages/kk/index.astro`
- Create: `src/pages/en/index.astro`

**Step 1: Create /kk/ page**

Same structure as index.astro but with `locale = 'kk'`.

**Step 2: Create /en/ page**

Same structure as index.astro but with `locale = 'en'`.

**Step 3: Verify all three routes work**

Run: `npm run dev`
Check: `/` shows Russian, `/kk/` shows Kazakh, `/en/` shows English
Check: language switcher links work correctly between all three

**Step 4: Commit**

```bash
git add src/pages/kk/ src/pages/en/
git commit -m "feat: add /kk/ and /en/ locale pages"
```

---

### Task 14: GEO Optimization — llms.txt and robots.txt

**Files:**
- Create: `public/llms.txt`
- Create: `public/robots.txt`

**Step 1: Create llms.txt**

```text
# cursor-community.kz

## About
Cursor Community Kazakhstan is the local developer community for Cursor users in Kazakhstan. Cursor is an AI-powered software development platform valued at $29.3 billion with millions of users worldwide.

## Key Facts
- Location: Almaty and Astana, Kazakhstan
- Community: Telegram group at t.me/cursor_kz
- Events: Cafe Cursor meetups and workshops
- Organized by: Cursor Ambassador program
- Languages: Russian, Kazakh, English

## Events
- Cafe Cursor Astana (January 22, 2025) — first Cafe Cursor in Central Asia, hosted at Cult cafe
- Cafe Cursor Almaty — co-working + coffee + Cursor credits

## Links
- Website: https://cursor-community.kz
- Telegram: https://t.me/cursor_kz
- Events Calendar: https://lu.ma/cursorcommunity
- Cursor Official: https://cursor.com
- Ambassador Program: https://cursor.com/ambassadors
```

**Step 2: Create robots.txt**

```text
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://cursor-community.kz/sitemap-index.xml
```

**Step 3: Commit**

```bash
git add public/llms.txt public/robots.txt
git commit -m "feat: add llms.txt and robots.txt for GEO optimization"
```

---

### Task 15: Event JSON-LD Structured Data

**Files:**
- Modify: `src/components/Events.astro`

**Step 1: Add Event JSON-LD for each event**

In the Events component, after rendering cards, output a `<script type="application/ld+json">` tag for each event with:
- `@type: "Event"`
- `name`, `startDate`, `location` (with `@type: "Place"`, `address` with `addressCountry: "KZ"`)
- `organizer` (Cursor Community Kazakhstan)
- `eventStatus` (EventScheduled / EventCompleted)
- `eventAttendanceMode` (OfflineEventAttendanceMode)
- `offers.url` (registration link)

**Step 2: Validate JSON-LD**

Run build, inspect HTML output for valid JSON-LD.

**Step 3: Commit**

```bash
git add src/components/Events.astro
git commit -m "feat: add Event JSON-LD structured data for rich search results"
```

---

### Task 16: Final Build, Lighthouse, Polish

**Files:**
- Various minor adjustments

**Step 1: Run production build**

```bash
npm run build
```
Expected: builds without errors

**Step 2: Run preview and check all pages**

```bash
npm run preview
```
Check: `/`, `/kk/`, `/en/` — all render correctly

**Step 3: Lighthouse audit**

Run Lighthouse on the preview URL. Target: 95+ on Performance, Accessibility, Best Practices, SEO.

**Step 4: Fix any issues found**

Address any Lighthouse warnings (missing alt text, color contrast, etc.)

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: polish and optimize for production"
```
