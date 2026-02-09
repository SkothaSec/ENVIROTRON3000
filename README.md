# ENVIROTRON3000

An interactive cyber-operations simulator and dashboard that visualizes environments, users, networks, threats, and security logs. Built with React 18, TypeScript, Vite, MUI, Chart.js/Recharts, Leaflet, and Zustand state.

## Quick start
```bash
npm ci          # install deps
npm run dev     # start the dev server (http://localhost:5173)
```

## Scripts
- `npm run build` – type-check then create a production bundle
- `npm run lint` – run ESLint across the project
- `npm run preview` – serve the production build locally

## Project highlights
- Landing, dashboard, and simulator flows with mock data generators
- Interactive charts, maps, and tables for activity, threats, users, and assets
- Detail dialogs for logs, users, and machines plus saved query examples

## Structure
- `src/pages` – entry pages (Landing, Dashboard, Simulator, Credits)
- `src/components` – UI building blocks and dashboard widgets
- `src/data` – mock datasets and generators
- `src/store/simulatorStore.ts` – centralized simulator state
