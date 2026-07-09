# CLAUDE.md

Instructions for Claude Code when working in this repository.

## Project overview

Simple Shopping List is an **offline-first Progressive Web App** — a client-only
React app with no backend and no auth. All data lives in the browser's
IndexedDB. Users are expected to install it to their home screen ("Add to Home
Screen") and use it primarily on **mobile devices**; desktop/browser use is
secondary. Every feature must be designed and tested with that in mind.

Stack: Vite + React 19 + TypeScript (strict), `react-router`, TanStack Query,
IndexedDB via `idb`, shadcn/ui + Tailwind CSS v4, `vite-plugin-pwa` /
Workbox. Package manager is **pnpm**. Deployed to Cloudflare Pages via
semantic-release on push to `main`.

## Project structure

```
src/
├── components/        # Shared/app-level components, flat, PascalCase files
├── routes/<name>/route.tsx   # One screen per route folder, exported as `<Name>Route`
├── shadcn-ui/          # Vendored shadcn/ui primitives (components/ui/, lib/utils.ts)
├── hooks/<entity>/     # TanStack Query hooks, one per file, grouped by entity
├── database/<entity>/  # IndexedDB access layer, grouped by entity
│   └── queries/        # One function per DB operation
├── api/                # Cross-entity orchestration (e.g. cascading deletes)
├── providers/          # React context providers (theme, PWA install)
└── constants/queryKeys.ts   # Centralized TanStack Query keys
```

There is no `types/` folder — types/interfaces are colocated with the module
that owns them (e.g. `CreateItemOptions` exported from `createItem.ts`).
Component prop types are named `<Component>Props`.

## Database layer (IndexedDB)

There is no server — `src/database/index.ts` opens a single IndexedDB
database (`idb`'s `openDB`) with an object store per entity, memoized behind
`getDB()`.

Per-entity pattern, mirrored for every entity (`list`, `item`, ...):

- `database/<entity>/queries/<verb><Entity>.ts` — one function per operation
  (`createItem.ts`, `listItemsByListId.ts`, `updateItem.ts`, `deleteItem.ts`),
  each taking the opened `IDBPDatabase` plus an options object.
- `database/<entity>/index.ts` — wraps every query function with `getDB()`
  and exposes a single `<entity>Database` object (e.g. `itemDatabase`).

**Rules:**

- Never call `getDB()` or touch the IndexedDB transaction directly from a
  hook or component — always go through `<entity>Database.<method>`.
- New DB operation → add a query file under `queries/`, then wire it into
  the entity's `index.ts` object.
- Operations spanning more than one entity (e.g. deleting a list's items
  when the list is deleted) belong in `src/api/`, not inside a single
  entity's query file.
- Adding a new entity/store or changing the schema means bumping
  `DB_VERSION` in `src/database/index.ts` and handling the migration in the
  `upgrade()` callback — IndexedDB schema changes are not backwards
  compatible, and existing users' installed data must not be corrupted or
  silently dropped on upgrade.

## State management (TanStack Query)

- All persisted (IndexedDB) data is surfaced through TanStack Query hooks in
  `src/hooks/<entity>/use<Verb><Entity>.ts`, calling straight into
  `<entity>Database.<method>` as the `queryFn`/`mutationFn`.
- Query keys are centralized in `src/constants/queryKeys.ts`. Always add new
  keys there — never inline a raw string/array key in a hook.
- Mutations invalidate the relevant query key(s) in `onSuccess` via
  `queryClient.invalidateQueries`. There are currently no optimistic
  updates — stay consistent with that unless there's a real latency reason,
  and if you do add one, handle rollback on error deliberately.
- Local/ephemeral UI state (theme, install/update prompts, dialog open state)
  uses `useState` or a React context provider under `src/providers/` — not a
  global state library.

## Component structure

- `src/components/` — shared, flat, one file per component, PascalCase
  filename matching the exported component name, **named exports only**
  (no default exports).
- `src/routes/<name>/route.tsx` — one screen per route folder, exported as
  `<Name>Route`.
- `src/shadcn-ui/components/ui/` — vendored shadcn/ui primitives. Prefer
  composing these in `src/components/` rather than editing vendored files;
  only touch them for genuine upstream-style updates.
- Use the `cn()` helper (`src/shadcn-ui/lib/utils.ts`) for conditional/merged
  class names, `class-variance-authority` for variants, `lucide-react` for
  icons.
- Colocate prop types with the component (`<Component>Props`); there is no
  shared `types/` directory to keep in sync.

## PWA, browser & mobile requirements (read before building any UI)

This app is a PWA aimed primarily at phones. Treat mobile Safari (iOS) and
mobile Chrome (Android) as the primary targets, and desktop Chrome/Firefox as
secondary. Concretely:

- **Design mobile-first.** Default to single-column, `flex flex-col`
  layouts; add larger-viewport treatment with `sm:`/`md:` breakpoints as an
  enhancement, not the baseline.
- **Touch, not hover.** Don't gate any functionality behind `:hover`-only
  affordances. Keep interactive targets comfortably tappable (~44px).
- **iOS Safari has no `beforeinstallprompt`.** Install-prompt logic lives in
  `src/providers/PWAInstall.tsx`, which detects iOS
  (`isIOSDevice()`) and standalone mode (`isStandaloneDisplayMode()`)
  separately from the Chromium `beforeinstallprompt` event, and shows manual
  "Add to Home Screen" instructions on iOS instead. Any change to install UX
  must be checked against both paths, not just Chromium.
- **No safe-area-inset handling exists yet.** There's no `env(safe-area-inset-*)`
  padding anywhere today. When adding anything fixed/sticky to a screen edge
  (bottom sheets, floating action buttons, dialogs), add safe-area padding so
  it doesn't collide with notches/home indicators — don't assume this is
  already handled elsewhere.
- **Service worker updates** are handled by `src/hooks/usePWAUpdate.ts`
  (hourly check + check on visibility change) and surfaced via
  `PWAUpdatePrompt.tsx`. If a change affects cached/static assets or SW
  registration, verify the update-available flow still fires correctly.
- **Theme/meta consistency.** `index.html` carries `theme-color` (light/dark
  variants), `apple-mobile-web-app-*` tags, and the manifest link — keep
  these in sync with any theming or PWA-installability change.
- **IndexedDB is the only persistence layer.** There is no server fallback —
  verify offline behavior (reload with the network throttled/offline in
  devtools) for any feature that touches data, and be mindful that some
  mobile browsers can evict IndexedDB storage under pressure.

## Implementing a feature — checklist

1. **Data layer**: does the entity/operation exist? If not, add a query
   function under `database/<entity>/queries/`, wire it into that entity's
   `index.ts`. New entity/schema change → bump `DB_VERSION` + write the
   `upgrade()` migration.
2. **Hooks**: add/extend a TanStack Query hook under `hooks/<entity>/`,
   register any new query key in `constants/queryKeys.ts`, invalidate the
   right keys `onSuccess` for mutations.
3. **Components/routes**: build the UI mobile-first in `components/` or the
   relevant `routes/<name>/route.tsx`, composing `shadcn-ui` primitives.
4. **PWA/mobile pass**: run through the "PWA, browser & mobile requirements"
   section above for anything UI- or caching-related.
5. **Verify** (see below) before considering the feature done.

## Verification — how to know it actually works

There is **no automated test suite** in this repo, and CI
(`.github/workflows/pr-validation.yaml`) only runs `pnpm run build` (which
includes `tsc -b` type-checking) on PRs — it does not lint or test. That
means manual verification is the real correctness bar:

1. `pnpm lint` and `pnpm build` must both pass with zero errors/warnings.
2. Run `pnpm dev` and manually exercise the feature end-to-end, at minimum:
   - A mobile viewport (devtools device emulation, or a real phone).
   - At least one desktop browser.
   - Both light and dark theme.
   - Offline/throttled network (data must persist and the UI must not break
     with IndexedDB as the only data source).
3. For anything touching install/update flows, verify manually on both an
   iOS-like path (no `beforeinstallprompt`) and a Chromium path.
4. When fixing a bug, reproduce it first, then re-run the exact same repro
   steps after the fix to confirm it's actually gone — don't rely on reading
   the diff alone.
