# Dr. Ahmed Abdelsalam — 3D Personal Website

A modern 3D professional website at the intersection of law, arbitration, AI, data and LegalTech.

## Stack

- React 19 + TypeScript
- Vite 8
- Three.js via React Three Fiber + Drei
- Motion for interface animation
- Cloudflare Vite plugin + Cloudflare Workers

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare Workers

```bash
npm run deploy
```

For automatic deployment, connect the GitHub repository from Cloudflare **Workers & Pages → Create application → Import a repository**. Production branch: `main`.

## Current architecture

- `/src/components/LegalScene.tsx`: real-time WebGL 3D hero scene
- `/src/App.tsx`: homepage structure and content
- `/src/styles.css`: visual design system and responsive layout
- `/worker/index.ts`: optional Cloudflare Worker API (currently `/api/health`)
- `/wrangler.jsonc`: Cloudflare deployment config

## Next milestones

1. Replace placeholder contact email.
2. Add Arabic/English language switching.
3. Add About, Arbitration, AI & LegalTech, Research and Labs routes.
4. Add a CMS/data layer for research and selected work.
5. Add contact API, Turnstile and mail delivery.
6. Optimize 3D assets and run Lighthouse/Web Vitals testing.
