## Learned User Preferences

- Prefer conventional commits with a clear subject and short body when saving work.
- Do not record AI or tooling as the git commit author.
- When executing an attached plan, do not edit the plan file; use existing todos and advance them in order.
- For GitHub Actions with `pnpm/action-setup`, do not set `version` in the workflow when `package.json` already has a `packageManager` field for pnpm.

## Learned Workspace Facts

- The site is a static Astro project (MDX, sitemap); production output is `dist/`.
- Astro 6 expects Node 22.12 or newer; `.nvmrc` and CI use that line.
- Dependencies are managed with pnpm; `package.json` pins pnpm via `packageManager`, and CI uses `pnpm install --frozen-lockfile`.
- Deployment is FTP via `.github/workflows/ftp-deploy.yml`, uploading `dist/`.
- The UI is localized for Russian (default), Kazakh, and English under `src/i18n/`.
- Content collection schemas import `defineCollection` from `astro:content` and `z` from `astro/zod`.
- Showcase (#builtwithcursor) projects are JSON-driven; submissions use a GitHub issue template; allowed tags are listed in `src/data/project-tags.ts`.
