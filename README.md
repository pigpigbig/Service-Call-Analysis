# Service Call Analysis

Take-home for Service Call Recording Analysis.

## What’s here
- Transcript: `transcript/transcript.txt` (human-friendly) and `transcript/raw_transcript.json` (AssemblyAI response).
- Analysis data: `web/src/data/analysis.ts` (stage verdicts/notes) and `web/src/data/transcript.json` (timestamped utterances).
- Frontend: React + TypeScript + Vite in `web/`.

## Run locally
```bash
cd web
npm install   # first time
npm run dev   # visit http://localhost:5173
```

## Deploy
GitHub Actions builds and publishes to GitHub Pages on push to `main` using `web/dist`. Vite `base` is set for `/Service-Call-Analysis/`.

## License
MIT
