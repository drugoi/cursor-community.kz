# Участие в проекте

Спасибо за интерес к репозиторию. Проект — статический сайт на Astro; перед правками убедитесь, что у вас [Node 22.12+](.nvmrc) и **pnpm** (версия из `packageManager` в `package.json`).

```bash
pnpm install
pnpm dev
```

Перед отправкой PR желательно выполнить `pnpm build` (и при изменениях UI — `pnpm run a11y`).

## Коммиты

Используйте [conventional commits](https://www.conventionalcommits.org/): короткий заголовок вроде `fix: …`, `feat: …`, `docs: …`; при необходимости — тело коммита с контекстом.

## Локализация

Интерфейс на трёх языках: русский (по умолчанию), казахский, английский. Новые или изменённые строки добавляйте во все соответствующие файлы в [`src/i18n/`](src/i18n/).

## События (MDX)

События лежат в [`src/content/events/`](src/content/events/) как файлы `.mdx` с frontmatter по схеме в [`src/content.config.ts`](src/content.config.ts):

| Поле | Описание |
|------|----------|
| `title`, `date`, `location`, `format`, `description` | Текстовые поля |
| `city` | `almaty` или `astana` |
| `status` | `upcoming` или `past` |
| `registrationUrl`, `lumaUrl` | Опционально, валидные URL |
| `lang` | `ru`, `kk` или `en` (по умолчанию `ru`) |

Тело файла — разметка/текст события под frontmatter.

## #builtwithcursor (витрина проектов)

1. Создайте [issue по шаблону](https://github.com/drugoi/cursor-community.kz/issues/new?template=builtwithcursor-project.yml).
2. После решения мейнтейнера проект добавляется в [`src/data/builtwithcursor.json`](src/data/builtwithcursor.json).

Поля записи в JSON:

| Поле | Обязательно | Примечание |
|------|-------------|------------|
| `id` | да | Уникальный идентификатор (латиница, дефисы) |
| `title`, `description`, `url`, `author`, `startingDate` | да | `startingDate` в формате `YYYY-MM-DD` |
| `tags` | нет | Только значения из [`src/data/project-tags.ts`](src/data/project-tags.ts): `tooling`, `dx`, `saas`, `open-source`, `ai`, `productivity`, `prototype`, `hackathon` |
| `builtWithTools` | нет | Массив строк, например `["cursor"]` |
| `image` | нет | Прямая ссылка на файл изображения (`.png`, `.jpg`, `.webp` и т.д.) |

Недопустимые теги в JSON тихо отбрасываются при сборке.

## Стили и бренд

Глобальные токены и тема — [`src/styles/global.css`](src/styles/global.css). Логотипы Cursor в `public/brand/` используйте по [официальным правилам бренда](https://cursor.com/brand).

## Чего не коммитить

- Файлы `.env` и любые пароли, ключи API, токены.
- Секреты хостинга / FTP — только в настройках GitHub Actions репозитория, не в коде.

Вопросы по объёму правки можно задать в issue до начала большого PR.
