# Taskly

A small task tracker built for the class challenge with **Vite + React + TypeScript + Tailwind CSS + shadcn/ui**.

## Features

- Add tasks with a title and priority (low / medium / high)
- Mark tasks done, delete them, and filter by All / Active / Done
- Tasks persist in `localStorage`
- Tab title shows how many tasks are still open
- Client-side routing with React Router (`/`, `/add`, and a 404 page)

## Where the required hooks are used

| Hook | Where | What for |
| --- | --- | --- |
| `useState` | `App.tsx`, `HomePage.tsx`, `AddTaskPage.tsx`, `NotFoundPage.tsx` | Task list, filter tab, form fields, validation error, countdown |
| `useEffect` | `App.tsx`, `NotFoundPage.tsx` | Save tasks to `localStorage`, update `document.title`, 404 redirect countdown (with cleanup) |
| `useNavigate` | `AddTaskPage.tsx`, `NotFoundPage.tsx` | Redirect to `/` after adding a task, Cancel button, 404 redirect |

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
```

## Stack notes

- Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` needed)
- shadcn/ui components live in `src/components/ui` (`button`, `card`, `input`, `label`, `badge`), configured by `components.json`. More can be added with `npx shadcn@latest add <component>`.
- `@/` is an alias for `src/` (set in `vite.config.ts` and `tsconfig.app.json`)
