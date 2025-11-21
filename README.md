# Service Call Analysis

Take-home for Service Call Recording Analysis.

## Contents
- Assignment brief: transcribe provided service call; score compliance (intro, diagnosis, solution explanation, upsell, maintenance plan, closing); label call type; summarize sales insights.
- Deliverables: hosted web app with transcript + annotations, live URL, source code link.

## App scaffold
- React + TypeScript + Vite in `web/`.
- Run: `cd web && npm install` (first time) then `npm run dev`.

## Next steps
- Pull in audio (`Takehome/39472_N_Darner_Dr_2.m4a`) and transcribe (local Whisper or API).
- Write compliance + sales analysis mapped to call stages.
- Build simple web UI to present transcript and annotations; plan to deploy (GitHub Pages/Vercel/etc).
- Add license and basic tooling once stack is chosen.
