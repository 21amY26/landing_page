## Prognos.ai

Prognos.ai is a Next.js app that provides an AI-powered health check chat experience (text + images) with **risk-level triage** and **actionable next steps**.

### What’s in this repo

- Landing page at `/` (product overview + UI sections)
- Health check app at `/check`
- Chat API powered by Google Gemini (`/api/chat`)
- “Prognos Cart” fulfillment UI that renders recommended OTC items and fetches purchase options via `/api/search`

### Key features (current implementation)

- **Text + image input**: attach one or more images and ask for a triage assessment
- **Risk badge**: responses are tagged as `[ROUTINE]`, `[URGENT]`, or `[EMERGENCY]`
- **Verified mode toggle**: UI toggle that asks the model to be “extra thorough”
- **Emergency cue**: shows an emergency alert when `[EMERGENCY]` is detected; includes an SOS phone link (`tel:112`)
- **Fulfillment recommendations**: the model can append a hidden `_CART_DATA_..._CART_DATA_` JSON block; the UI parses it and shows product cards

> Medical note: Prognos.ai is an assessment/triage helper and is **not** a substitute for professional medical advice or diagnosis.

## Getting Started

### Prerequisites

- Node.js (recommended: Node 20+)
- An API key for Gemini (see environment variables below)

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env.local` in the repo root:

```bash
GEMINI_API_KEY="YOUR_GEMINI_KEY"
```

### 3) Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Tech stack

- Next.js (`next@16.2.2`)
- React (`react@19.2.4`)
- Tailwind CSS (`tailwindcss@4`) via `@tailwindcss/postcss`
- Google GenAI SDK (`@google/genai`) for Gemini calls
- UI/animation: `lucide-react`, `framer-motion`

## Contributing / dev notes

- This repo uses **Next.js 16.x**; if you’re making code changes, prefer referencing the bundled docs in `node_modules/next/dist/docs/` since conventions may differ from older Next.js releases.

## Project structure

```text
src/
  app/
    page.tsx                # Landing page (/)
    check/page.tsx          # Health check app (/check)
    api/
      chat/route.ts         # POST /api/chat (Gemini)
      search/route.ts       # GET /api/search?q=... (mock search + sorting)
  components/               # Chat UI, landing sections, fulfillment UI
  lib/                      # Types + helpers (risk parsing, etc.)
public/                     # Static assets (logo, icons)
```

## API overview

### `POST /api/chat`

Accepts:

```json
{
  "message": "string",
  "images": [{ "data": "base64", "mimeType": "image/png" }],
  "isVerifiedMode": true
}
```

Returns:

```json
{ "response": "string" }
```

Notes:

- Requires `GEMINI_API_KEY`
- Uses `gemini-2.5-flash`
- The system prompt enforces a leading risk tag and (optionally) a `_CART_DATA_..._CART_DATA_` block for recommended products

### `GET /api/search?q=...`

Returns mocked fulfillment products (Amazon/Blinkit/Tata 1mg/Zepto) and sorts by price ascending.

## Deployment

- Works on any Next.js-compatible platform (Vercel, Node server, containers).
- Set `GEMINI_API_KEY` in the deployment environment.
