# DevOps Project Showcase — Event Sponsorship Tracker

A standalone, static landing page presenting the DevOps implementation of the
[Containerized Event Sponsorship Tracker](https://github.com/PRASHIRAWAL/event-sponsorship-tracker).

Built with React and Vite, with no other runtime dependencies. All content is static: no backend, API, or database is required.
Figures match Jenkins build #13 (18 Oct 2026, v2 release on `main`).

## Sections
Hero with a replay of build #13 · Toolchain marquee · Overview & objectives · Animated architecture diagram ·
Interactive 8-stage pipeline with real console output · Build history chart (#3–#13) and Jenkins screenshots ·
Testing (142 unit/integration + 14 Selenium, per class) · Docker images, deployment and Ansible ·
App screenshots (light/dark) · v2 features and code stats · Timeline · Lessons learned

Animations respect `prefers-reduced-motion`.

## Screenshots
`public/screens/` holds WebP screenshots of the v2 app, taken from its `dev` profile with demo data,
and of the Jenkins job, the build #13 test report and the build #13 console.

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
