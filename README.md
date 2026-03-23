# Cursor Community Kazakhstan

Лендинг сообщества Cursor в Казахстане: [cursor-community.kz](https://cursor-community.kz). Статический сайт на **Astro** (MDX, sitemap), языки: русский (по умолчанию), казахский, английский.

## Требования

- **Node.js** 22.12+ (см. `.nvmrc`)
- **pnpm** — версия из поля `packageManager` в `package.json`

## Команды

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # артефакты в dist/
pnpm preview      # локальный просмотр сборки
pnpm run a11y     # проверка доступности (скрипт)
```

## Деплой

Сайт статический: в прод заливается **содержимое** `dist/` (корень виртуального хоста), структура папок как после сборки.

**Вручную:** `pnpm build` → FTP или файловый менеджер хостинга → всё из `dist/` в корень сайта.

**GitHub Actions:** при пуше в `main` или запуске workflow [ftp-deploy.yml](.github/workflows/ftp-deploy.yml) — сборка и выгрузка на FTP.

Секреты (Settings → Secrets and variables → Actions):

| Секрет | Назначение |
|--------|------------|
| `FTP_SERVER` | Хост без протокола, например `ftp.example.com` |
| `FTP_USERNAME` | Логин |
| `FTP_PASSWORD` | Пароль |

## #builtwithcursor

Новые карточки: issue по [шаблону](https://github.com/drugoi/cursor-community.kz/issues/new?template=builtwithcursor-project.yml), затем запись в `src/data/builtwithcursor.json` и деплой.

## Структура репозитория

| Путь | Содержимое |
|------|------------|
| `src/pages/` | Маршруты `/`, `/kk/`, `/en/` |
| `src/components/` | Секции страницы, блок showcase |
| `src/content/events/` | События (MDX) |
| `src/data/` | `builtwithcursor.json`, теги, логика showcase |
| `src/i18n/` | Словари ru / kk / en |
| `src/styles/` | Глобальные стили и стили showcase |
| `public/` | Статика: favicon, `brand/`, `robots.txt`, `llms.txt` |
| `.github/` | Workflow деплоя, Dependabot, шаблон issue для проектов |

## Бренд Cursor

Ассеты в `public/brand/` — по [Cursor Brand Guidelines](https://cursor.com/brand).

## Дополнительно

- [Дизайн-документ](docs/plans/2026-03-09-cursor-community-kz-design.md)
- [План реализации](docs/plans/2026-03-09-cursor-community-kz-implementation.md)

После деплоя: sitemap — `https://cursor-community.kz/sitemap-index.xml`; для индексации — Google Search Console и sitemap из `robots.txt`.
