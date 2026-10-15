# DevOps Project Showcase — Event Sponsorship Tracker

A standalone, static landing page presenting the DevOps implementation of the
[Containerized Event Sponsorship Tracker](https://github.com/PRASHIRAWAL/event-sponsorship-tracker).

Built with React and Vite. All content is static: no backend, API, or database is required.

## Sections
Hero · Project overview & objectives · DevOps architecture · Technology stack ·
Nine-stage CI/CD workflow · Verified results · Application features · Timeline · Lessons learned

## Run locally
```bash
npm install
npm run dev      # development server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deploy to Vercel
Import this repository in Vercel. The Vite preset is detected automatically
(build command `npm run build`, output directory `dist`); `vercel.json` pins these settings.

## Editing content
All text lives in `src/data.js`, so results, stages and timeline entries can be updated without touching components.
