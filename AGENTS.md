# AGENTS.md

Guidance for AI coding agents working in this repository.

## Scope

- Keep changes minimal and task-focused.
- Do not refactor unrelated code.
- Preserve existing UX and styling conventions.

## Tech Stack

- Vite + React + TypeScript
- Source code in `src/`
- Questionnaire dataset in `src/questionnaires.ts`
- Documentation in `docs/`

## Data & Content Rules

- For questionnaire updates, follow the structure used in `src/questionnaires.ts`.
- Use existing enums/types from `src/types/` (do not invent new ad-hoc values when avoidable).
- Keep human-facing text concise and consistent with existing wording.
- If data types or questionnaire schema fields change, update `docs/ContributionGuide.md` and `.github/ISSUE_TEMPLATE/*.yml` in the same change so all contribution instructions stay in sync.

## Code Style

- Match surrounding code style and naming.
- Prefer explicit, readable code over clever shortcuts.
- Avoid one-letter variable names.
- Do not add license headers or inline comments unless requested.

## Validation

- Run targeted checks after edits when possible:
  - `npm run lint`
  - `npm run build`
- If a check fails due to unrelated pre-existing issues, report that clearly.

## Git & PR Hygiene

- Do not commit, create branches, or rewrite history unless explicitly asked.
- Summarize changed files and rationale clearly in handoff.
