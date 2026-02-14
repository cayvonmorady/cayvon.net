# Privacy-Safe Resume (Next.js + Tailwind)

Single-page resume site built with the Next.js App Router, TypeScript, and Tailwind CSS. The UI intentionally omits personal identifiers (name, contact info, location, or social links) and stores all display content in a typed data module.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Customize the resume content

Edit `src/data/resume.ts` to update the headline, summary, experience, skills, and education entries. No personal or contact identifiers should be added.

## Theme behavior

- First visit follows the system theme.
- A light/dark toggle is provided and the selection persists across visits.

## Deploy to Vercel

- Framework preset: Next.js
- Root directory: repo root
- Environment variables: none

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`