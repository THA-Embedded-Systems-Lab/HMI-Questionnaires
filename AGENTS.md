# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page React app that lists, filters, and compares human-machine interaction (HMI) questionnaires/scales. Deployed as a static site to GitHub Pages. There is no backend and no database — all questionnaire data is a single TypeScript array (`src/questionnaires.ts`). Most contributions are data edits to that file, not application logic.

## Commands

Package manager is **Bun** (`bun.lock`). Use Bun for all scripts:

- `bun install` — install deps (also runs `prepare` → activates Husky hooks)
- `bun run dev` — Vite dev server, served under `/HMI-Questionnaires/` (e.g. `http://localhost:5173/HMI-Questionnaires/`)
- `bun run lint` — ESLint over the repo (blocks commits via pre-commit hook)
- `bun run build` — TypeScript-checked Vite production build to `dist/`
- `bun run preview` — serve the built `dist/`
- `bun run deploy` — build + publish `dist/` to the `gh-pages` branch (manual release step)

There is **no test suite**. "Validation" means `bun run lint` and `bun run build` both passing.

### Version injection gotcha

`dev` and `build` shell out to `git describe --tags --abbrev=0` to set `VITE_APP_VERSION` / `VITE_APP_DATE`. If the repo has **no git tags**, these commands fail and the script errors. The displayed app version/date come from the latest git tag, not `package.json`.

### Releasing

`bun pm version patch|minor|major` bumps `package.json` and creates a matching commit + tag, then `git push --follow-tags`, then `bun run deploy`.

## Architecture

- **Vite + React 19 + TypeScript**, Bootstrap 5 for layout/styling, custom SCSS in `src/sass/custom.scss`. Routing via `react-router-dom` v7 (`BrowserRouter`, `basename="/HMI-Questionnaires"`).
- **Entry:** `src/main.tsx` → `src/App.tsx`. `App.tsx` wraps everything in `ThemeProvider` (dark mode) and defines three routes: `/` (`QuestionnairesPage`), `/alternatives`, `/about`.
- **State lives in `pages/QuestionnairesPage.tsx`.** It holds search + filter state and computes `filteredQuestionnaires` inline, then passes data + callbacks down to presentational components:
  - `FilterSidebar` — search box, scale/time/language filters
  - `QuestionnaireTable` — the filtered list
  - `QuestionnaireModal` — per-questionnaire detail popup
  This is prop-drilling by design; there is no global store beyond theme context.
- **Theme:** `contexts/ThemeContext.ts` (context object) + `contexts/ThemeProvider.tsx` (provider) + `hooks/useTheme.ts` (consumer hook). Keep the context/provider split when editing.
- **Utils:** `utils/languageUtils.ts` maps ISO 639-1 codes → display names; `utils/iconUtils.ts` picks link icons.

## Data model (`src/questionnaires.ts`)

The dataset is typed by `src/types/`. When adding/editing questionnaires, conform to these types and reuse the existing **enums** rather than inventing string values:

- `Questionnaire` (`types/Questionnaire.tsx`): `name`, `short`, `data[]`, optional `license`, `metadata`, `links`, `domain`, `notes`. Each `data` entry is per-language and holds `scales[]` (name + optional `cronbachsAlpha` / `omega`) and optional `participantDetails`.
- `Metadata`: `time` (array of `Time`), `languages` (string codes), optional `responseFormat`, `year`, `items`.
- `Time` enum (`types/Time.tsx`): `PreStudy`, `PostStudy`, `Standalone`.
- `ResponseFormat` enum (`types/ResponseFormat.tsx`): `Likert5`, `Likert7`, `SemDiff5`, `SemDiff7`.

**When the schema itself changes** (new/renamed fields), update `docs/ContributionGuide.md` and `.github/ISSUE_TEMPLATE/*.yml` in the same change so contributor instructions stay in sync.

## Conventions

- Conventional Commits are **enforced** by commitlint on commit (`feat`, `fix`, `docs`, `style`, `refactor`, `chore`, …). Pre-commit also runs ESLint on `.ts`/`.tsx`.
- Do not add license headers or inline comments unless asked. Avoid one-letter variable names. Match surrounding style.
- Keep changes minimal and task-focused; do not refactor unrelated code or alter existing UX/styling conventions.
- Markdown is linted in CI (`markdownlint-cli`) — keep `.md` files clean.
