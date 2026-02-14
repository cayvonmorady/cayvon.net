# Cayvon.net Resume Site

Single-page resume website built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.

## What this project includes

- Personal hero section with name, role, company, and LinkedIn link
- Data-driven sections for profile, experience, skills, and education
- Mobile-friendly experience cards with progressive disclosure (Show more / Show less)
- Light/dark theme toggle with persisted user preference via `next-themes`
- Strong typing for resume content through shared TypeScript types

## Tech stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- `next-themes`
- `@heroicons/react`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

- `src/app/page.tsx`: main page composition and section layout
- `src/data/resume.ts`: resume content (headline, summary, experience, skills, education)
- `src/types/resume.ts`: TypeScript types for resume data
- `src/components/experience-card.tsx`: responsive experience card with mobile expand/collapse behavior
- `src/components/theme-toggle.tsx`: theme switcher UI
- `src/app/providers.tsx`: theme provider setup
- `src/app/globals.css`: design tokens, theme variables, and global styles

## Customization

1. Update resume content in `src/data/resume.ts`.
2. Update the hero name/year/LinkedIn URL in `src/app/page.tsx`.
3. Update page metadata in `src/app/layout.tsx`.

## Scripts

- `npm run dev`: start dev server
- `npm run build`: create production build
- `npm run start`: run production server
- `npm run lint`: run ESLint

## Deploy (Vercel)

- Framework preset: Next.js
- Root directory: repository root
- Environment variables: none required
