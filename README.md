# site-starter — замороженный фундамент конвейера (v2)

Копируется в каждый новый сайт. Даёт «дорогой» полиш из коробки: контракт токенов, ритм-шкалу, motion-пресеты, примитивы, форму с отправкой в Telegram, SEO-каркас и деплой. Облик задаётся **значениями токенов** под стиль — включая v2-новинки: форму (`--radius-*`, `--radius-btn`), рецепт фото (`--img-filter`) и темп моушна.

**Изменения v2:** ИИ-орнаменты (`.text-gradient`, `.glass`, `.grid-dots`, `.animate-floaty`) перенесены в карантин (см. низ `index.css`) — использовать только по явному разрешению `ornament:` карточки стиля. Кнопка больше не пилюля со свечением: форма из `--radius-btn`. Демо-hero в `App.jsx` — нейтральный скелет, НЕ образец: парадигму бери из `_factory/layouts/hero-paradigms.md`.

## Стек
React 19 · Vite · Tailwind v4 (`@theme`) · framer-motion · lenis

## Быстрый старт
```bash
npm install
npm run dev       # http://localhost:5180
npm run build     # сборка в dist
npm run deploy    # публикация на GitHub Pages (gh-pages)
```

## Структура
```
src/
  index.css        КОНТРАКТ ТОКЕНОВ (+shape, +img-filter) + ритм + утилиты + КАРАНТИН + reduced-motion
  data.js          контент и контакты (весь текст здесь)
  lib/
    motion.js      motion-пресеты (ease, пружины, reveal, stagger)
    SmoothScroll   плавный скролл (lenis), уважает reduced-motion
    cn.js          хелпер классов для адаптации вендор-компонентов
  ui/              примитивы: Container, Section, Button, Reveal, Field
  blocks/
    LeadForm       заявка → Telegram (без бэкенда, работает на статике)
  App.jsx          демо-сборка (скелет-проверка, не финальный сайт)
```

## Как собрать новый сайт (кратко — полный процесс в навыке site-factory)
1. Скопировать `starter/` в папку проекта, `npm install`.
2. Выбрать архетип (`_factory/archetypes`), стиль (`_factory/styles`), hero-парадигму (`_factory/layouts`).
3. **Визуальный якорь**: прочитать эталон из `anchor:` стиля + превью Awwwards (`_factory/reference`).
4. Залить значения стиля в токены (`TOKENS.md`): палитра, шрифты (кириллица!), shape, img-filter.
5. Собрать секции: свои блоки (`_factory/blocks`) + адаптированные вендор-компоненты (`_factory/components`).
6. Тексты через `copywriting` + два прохода `copy-ru.md`.
7. Двойной гейт: `design-ru.md` скоринг ≥ 9/10 + арт-директор по скриншотам → деплой.

## Важное про безопасность
Токен Telegram-бота **никогда** не кладём во фронтенд. Форма открывает Telegram с готовым текстом. Нужна тихая отправка — только serverless-функция.
