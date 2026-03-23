# Cursor Community Kazakhstan

Одностраничный сайт сообщества Cursor в Казахстане: события, ссылки на сообщества, информация о программе Ambassador. Три языка: русский, казахский, английский.

## Разработка

```bash
pnpm install
pnpm dev
```

Сайт откроется на [http://localhost:4321](http://localhost:4321).

## Сборка

```bash
pnpm build
```

Статические файлы попадают в папку `dist/`.

## Деплой на хостинг по FTP

Сайт — статический: после сборки нужно загрузить **содержимое** папки `dist/` на сервер по FTP (или через панель хостинга).

1. Выполните `pnpm build`.
2. Подключитесь к хостингу по FTP (FileZilla, WinSCP или встроенный менеджер файлов).
3. Откройте корневую директорию сайта (например `public_html`, `www` или `httpdocs`).
4. Загрузите **все файлы и папки из `dist/`** в корень сайта, сохраняя структуру:
   - `index.html` — в корень
   - `kk/index.html`, `en/index.html` — в соответствующие папки
   - `favicon.png`, `robots.txt`, `llms.txt` — в корень
   - папка `brand/` — логотипы и изображения
   - папки `_astro/`, `sitemap-*.xml` и т.п. — как есть

После загрузки сайт должен открываться по домену. Обновление контента: правите исходники, снова `pnpm build` и заливаете обновлённые файлы из `dist/`.

## Деплой через GitHub Actions (FTP)

При пуше в `main` (или по кнопке Run workflow) запускается workflow, который собирает проект и заливает содержимое `dist/` на FTP через [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action).

**Секреты репозитория (Settings → Secrets and variables → Actions):**

| Секрет | Описание |
|--------|----------|
| `FTP_SERVER` | Адрес FTP-сервера (например `ftp.example.com` без протокола) |
| `FTP_USERNAME` | Логин FTP |
| `FTP_PASSWORD` | Пароль FTP |

Содержимое `dist/` заливается в корень сервера (`server-dir: /`). После загрузки выполняется скрипт прав: каталоги 755, файлы (html, css, js, png, jpg, svg, ico, txt, xml) 644.

Файл workflow: [.github/workflows/ftp-deploy.yml](.github/workflows/ftp-deploy.yml).

Если репозиторий станет публичным: после переключения в public включите в Settings → Code security пункт **Secret scanning** (при появлении — и **Push protection**). Ветка `main` на GitHub защищена от force-push и удаления. Зависимости: [.github/dependabot.yml](.github/dependabot.yml).

## Бренд-ассеты Cursor

Логотипы и иконки Cursor лежат в `public/brand/` (скопированы из официального набора Cursor Brand Assets):

- `cube.svg` — куб Cursor (используется в шапке)
- `wordmark.svg` — слово Cursor
- `lockup-horizontal-dark.png` — горизонтальный логотип (для соцсетей / OG)
- `favicon.png` в корне `public/` — иконка вкладки

Использование в соответствии с [Cursor Brand Guidelines](https://cursor.com/brand).

Светлая/тёмная тема и палитра: `src/styles/global.css`.

## Структура проекта

- `src/pages/` — страницы (/, /kk/, /en/)
- `src/components/` — секции (Header, Hero, Events, Community, About, Footer)
- `src/content/events/` — события в MDX
- `src/data/builtwithcursor.json` — проекты #builtwithcursor
- `src/data/project-tags.ts` — предопределённые теги
- `src/data/showcase-projects.ts` — загрузка и нормализация проектов
- `src/scripts/project-modal.ts` — клиентская логика модального окна
- `src/styles/builtwithcursor.css` — стили секции и модалки
- `src/components/BuiltWithCursor.astro`, `BuiltWithCursorSummary.astro`, `ProjectCard.astro`, `ProjectModal.astro` — showcase
- `src/i18n/` — словари переводов (ru, kk, en)
- `public/` — статические файлы (favicon, brand, robots.txt, llms.txt)
- `.github/ISSUE_TEMPLATE/builtwithcursor-project.yml` — шаблон для подачи проектов

## #builtwithcursor

Секция для демонстрации проектов, созданных с Cursor. Чтобы добавить проект:

1. Пользователь создаёт issue по [шаблону](https://github.com/drugoi/cursor-community.kz/issues/new?template=builtwithcursor-project.yml) (title, description, url, image, tags).
2. Мейнтейнер добавляет проект в `src/data/builtwithcursor.json`.
3. После деплоя проект появляется на сайте.

## Документация

- [Дизайн-документ](docs/plans/2026-03-09-cursor-community-kz-design.md)
- [План реализации](docs/plans/2026-03-09-cursor-community-kz-implementation.md)

## SEO (после деплоя)

После выкладки сайта проверьте:

1. **Sitemap:** откройте https://cursor-community.kz/sitemap-index.xml — в индексе должны быть ссылки на `/`, `/kk/`, `/en/`.
2. **Google Search Console:** добавьте ресурс cursor-community.kz и отправьте sitemap (URL уже указан в `robots.txt`).
3. **Индексация:** в поиске выполните `site:cursor-community.kz` — все три языковые версии в индексе, без дублей.
4. При необходимости проверьте отчёт «Покрытие» и Core Web Vitals в GSC.
