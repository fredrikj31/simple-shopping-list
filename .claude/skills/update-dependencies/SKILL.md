---
name: update-dependencies
description: Update npm dependencies in this project to their latest semver-compatible versions and verify lint/build still pass. Use when the user asks to update, upgrade, or bump dependencies/packages.
---

# Update dependencies

Routine dependency maintenance for this project using pnpm.

## Steps

1. Run `pnpm outdated` to see which packages are behind and note the current vs. latest versions.
2. Run `pnpm update` to update all packages to the latest version within their existing `^`/`~` semver ranges in `package.json`.
3. Run `pnpm outdated` again to confirm the list is now empty (or only shows packages intentionally pinned/skipped).
4. Run `pnpm run lint` — must pass with no errors.
5. Run `pnpm run build` — must pass with no errors (runs `tsc -b && vite build`, so this also validates TypeScript compiles).
6. Run `git diff package.json` to confirm only version numbers changed, no unexpected edits.

## Notes

- All updates via `pnpm update` stay within existing semver ranges (minor/patch only) — no manual code changes should be needed.
- If `pnpm outdated` shows a package whose latest version is a major bump (breaking the `^`/`~` range), do not update it automatically — flag it to the user separately, since it may require code changes or a changelog review.
- If lint or build fails after updating, identify which package(s) caused it before reverting, rather than reverting everything.
