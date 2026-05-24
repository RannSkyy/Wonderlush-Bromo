An elegant, high-contrast, robust full-stack landing page and interactive booking management system for Mount Bromo expeditions. Replicated exactly from high-end premium
design grids with desktop-first precision, fully fluid mobile responsiveness, an interactive geo-topographical contour coordinate map, and an active Admin Console to monitor 
incoming client inquiries and review live SMTP transmission simulation telemetry.

## 🌟 Key Features

* **Visual Luxury Interface:** Custom "Twilight Glow" theme with gorgeous Inter font pairings, dark background gradients, and stylized cards matching elite resort aesthetics.
* **Full-stack Express Core:** An active Express helper service running on port `3000` to manage incoming traveler requests with full REST API operations.
* **Live Automated SMTP Logs Simulator:** Submitting a booking immediately renders real-time transport handshake cycles (connecting, TLS handshake, MTA authentication, packaging headers, target queue to `rionxee@gmail.com`).
* **Interactive Terrain Coordinates Map:** Direct vector-style graphic topographic contour map where users click map indicators to get live elevation statistics, minimum microclimate temperatures, and specific tour guides.
* **Unified Admin Panel:** Includes KPI status widgets (Response rate, unread alerts, total inbox counters), fuzzy keyword searches, manual read/unread triggers, message database deletion, and outbound answer mail pipelines.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root workspace (copying `.env.example`):
```env
GEMINI_API_KEY="YOUR_ACTUAL_SECRETS_HERE_IF_NEEDED"
APP_URL="http://localhost:3000"
```

### 3. Run Development Server (Full-Stack)
Starts the Express server with live Vite middlewares:
```bash
npm run dev
```

### 4. Build and Compile for Production
Generates optimized React client files in `dist/` and compiles the backend into a high-performance, self-contained CommonJS file `dist/server.cjs` using `esbuild`:
```bash
npm run build
```

### 5. Start Production Server
```bash
npm run start
