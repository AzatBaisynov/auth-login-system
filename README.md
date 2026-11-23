# auth-demo

Учебный проект: регистрация и вход. Монорепозиторий: React + TypeScript (Vite) и NestJS.

## Запуск

```bash
npm install                                           # зависимости всех приложений
cp apps/backend/.env.example apps/backend/.env        # настройки бэка
cp apps/frontend/.env.example apps/frontend/.env      # настройки фронта
```

В двух терминалах:

```bash
npm run start:dev -w backend     # бэк на http://localhost:3000
npm run dev -w frontend          # фронт на http://localhost:5173
```

Проверка: http://localhost:3000/api/health → `{"status":"ok"}`, http://localhost:5173 → страница входа.

## Структура

```
apps/
  backend/src/
    modules/        модули: health, auth, users
  frontend/src/
    app/            запуск, роутер, стили
    pages/          страницы
    modules/        функционал: auth, user
    shared/         общее: api, ui, config
```

## Правила фронтенда

1. `pages` собирают страницу из `modules` и `shared`.
2. `modules` используют `shared`, но не импортируют друг друга.
3. `shared` ничего не знает о модулях.
4. Файлы модуля (`api.ts`, `types.ts`, компоненты) хранятся в его корне; вложенные папки добавляются только когда это упрощает навигацию.
5. Алиас `@/` = `src/`.

Например: `modules/users/UsersTable.tsx`, `modules/users/api.ts`, `modules/users/types.ts`.

## Git

- Ветка: `feature/INT-12-login`, коммит: `INT-12: форма входа`.
- В `main` только через MR.

## Скрипты (из корня)

| Команда                                    | Что делает              |
| ------------------------------------------ | ----------------------- |
| `npm run start:dev -w backend`             | Запуск бэка             |
| `npm run dev -w frontend`                  | Запуск фронта           |
| `npm run build -w backend` / `-w frontend` | Сборка                  |
| `npm run lint`                             | Проверка кода ESLint    |
| `npm run format`                           | Форматирование Prettier |
