# Cursor Community Kazakhstan

Одностраничный сайт сообщества Cursor в Казахстане: события, ссылки на сообщества, информация о программе Ambassador. Три языка: русский, казахский, английский.

## Разработка

```bash
npm install
npm run dev
```

Сайт откроется на [http://localhost:4321](http://localhost:4321).

## Сборка

```bash
npm run build
```

Статические файлы попадают в папку `dist/`.

## Деплой на хостинг по FTP

Сайт — статический: после сборки нужно загрузить **содержимое** папки `dist/` на сервер по FTP (или через панель хостинга).

1. Выполните `npm run build`.
2. Подключитесь к хостингу по FTP (FileZilla, WinSCP или встроенный менеджер файлов).
3. Откройте корневую директорию сайта (например `public_html`, `www` или `httpdocs`).
4. Загрузите **все файлы и папки из `dist/`** в корень сайта, сохраняя структуру:
   - `index.html` — в корень
   - `kk/index.html`, `en/index.html` — в соответствующие папки
   - `favicon.png`, `robots.txt`, `llms.txt` — в корень
   - папка `brand/` — логотипы и изображения
   - папки `_astro/`, `sitemap-*.xml` и т.п. — как есть

После загрузки сайт должен открываться по домену. Обновление контента: правите исходники, снова `npm run build` и заливаете обновлённые файлы из `dist/`.

## Бренд-ассеты Cursor

Логотипы и иконки Cursor лежат в `public/brand/` (скопированы из официального набора Cursor Brand Assets):

- `cube.svg` — куб Cursor (используется в шапке)
- `wordmark.svg` — слово Cursor
- `lockup-horizontal-dark.png` — горизонтальный логотип (для соцсетей / OG)
- `favicon.png` в корне `public/` — иконка вкладки

Использование в соответствии с [Cursor Brand Guidelines](https://cursor.com/brand).

## Структура проекта

- `src/pages/` — страницы (/, /kk/, /en/)
- `src/components/` — секции (Header, Hero, Events, Community, About, Footer)
- `src/content/events/` — события в MDX
- `src/i18n/` — словари переводов (ru, kk, en)
- `public/` — статические файлы (favicon, brand, robots.txt, llms.txt)

## Документация

- [Дизайн-документ](docs/plans/2026-03-09-cursor-community-kz-design.md)
- [План реализации](docs/plans/2026-03-09-cursor-community-kz-implementation.md)
