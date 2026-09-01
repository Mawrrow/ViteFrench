# ViteFrench

A fast, no-frills French reflex trainer. Not a course — a quick-fire practice
loop for active recall: answer, see the result immediately, move on.

## Stack

React + TypeScript + Vite + Tailwind CSS. No backend, no auth. Progress is
stored locally in the browser (IndexedDB) and can be exported/imported as
JSON for backup or moving between devices.

## Running it

```bash
npm install
npm run dev
```

## Structure

```
src/
  types/        Question, progress, and quiz-session types
  data/         Question bank (JSON) + tag display metadata
  services/     Question access, answer checking, IndexedDB persistence
  utils/        Answer normalization, stats/weakness calculations
  hooks/        useQuiz (session loop), useProgress (dashboard data)
  components/   Presentational building blocks (Button, Timer, question views…)
  pages/        Home, Quiz, Results, Progress
```

## Adding questions

Add an object to [`src/data/multiple-choice.json`](src/data/multiple-choice.json)
or [`src/data/translation.json`](src/data/translation.json) matching the
shapes in [`src/types/question.ts`](src/types/question.ts). Tags are free-form
strings discovered from the data itself — the only place that needs updating
for a *new* tag to get a dedicated dropdown entry on the home screen is
[`src/data/tagGroups.ts`](src/data/tagGroups.ts); filtering and stats work on
any tag automatically.
