# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/), версии — [SemVer](https://semver.org/lang/ru/).

## [0.2.0] — 2026-07-13

Первый опубликованный релиз сайта [cursor-community.kz](https://cursor-community.kz).

### Добавлено

- Локализованные страницы Code of Conduct (`/conduct`, `/kk/conduct`, `/en/conduct`)
- Секция витрины **#builtwithcursor** с модальными карточками проектов
- Событие Cursor Robotics Hackathon Almaty (ru / kk / en)
- Команды секций в стиле ОС и локализованные заголовки showcase
- Случайный текст в hero-блоке и пасхалка в консоли
- JSON-LD разметка событий для поисковиков
- `llms.txt` и `robots.txt` для GEO
- Страницы локалей `/kk/` и `/en/`
- Руководство [CONTRIBUTING.md](CONTRIBUTING.md)

### Исправлено

- Прошедшие события автоматически помечаются как `past` по дате
- Выравнивание UI по [бренд-гайдам Cursor](https://cursor.com/brand)
- Отступы хедера и зоны нажатия на мобильных

### Изменено

- Обновлён стек Astro 6 и workflow FTP-деплоя
- Обновлены GitHub Actions (checkout, setup-node, pnpm, FTP-Deploy-Action)

[0.2.0]: https://github.com/drugoi/cursor-community.kz/releases/tag/v0.2.0
