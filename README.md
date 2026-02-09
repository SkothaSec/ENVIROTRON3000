# ENVIROTRON3000

ENVIROTRON3000 is an interactive security environment simulator and analytics dashboard. It lets you spin up a fictional org, generate users, networks, and logs, then explore the data through rich charts, maps, and detail views—ideal for tabletop exercises, demos, or teaching security concepts.

## Features
- **Environment simulator**: Configure org profile and instantly generate users, hosts, networks, and event logs.
- **Dashboards**: Executive overview cards, severity charts, timeline of alerts, and log analytics views.
- **Map + geo**: Leaflet map of user distribution backed by geo datasets.
- **Log exploration**: Saved query examples, per-source log breakdowns, detail dialogs for users, hosts, and events.
- **Theming/UI**: MUI-based layout with animated “cyber-grid” styling and responsive tabs for desktop/mobile.

## Tech stack
- React 18 + TypeScript, Vite 5
- MUI, Emotion styling
- Chart.js/Recharts for charts
- Leaflet + react-leaflet for maps
- Zustand for state, faker-based data generation

## Getting started
Prereqs: Node 18+ (Node 20 LTS recommended), npm.

```bash
npm ci             # install dependencies
npm run dev        # start dev server (http://localhost:5173)
```

## Scripts
- `npm run build`   – type-check then create production bundle
- `npm run preview` – serve the built app locally
- `npm run lint`    – run ESLint

## App structure
- `src/pages`                 – Landing, Simulator, Dashboard, Credits
- `src/components`            – shared UI and dashboard widgets
- `src/components/environment`– environment overview panels
- `src/components/dashboard`  – executive/log analytics widgets
- `src/data`                  – mock datasets and images
- `src/utils` / `src/store`   – data generators and Zustand store

## How simulation works
- Org setup happens in `Simulator` (`src/pages/Simulator.tsx`) using `OrgForm`.
- Data generation lives in `src/utils/*` (users, infrastructure, logs, threats, geo helpers).
- Generated state is stored in `src/store/simulatorStore.ts` and read by dashboard components.

## Routes
- `/` Landing
- `/simulator` Environment builder and data viewers
- `/dashboard` Analytics once data is generated
- `/credits` Attribution page

## Notes
- Maps pull OpenStreetMap tiles; an internet connection is required for the map layer.
- No backend or persistence is included—data lives in-memory per session.
