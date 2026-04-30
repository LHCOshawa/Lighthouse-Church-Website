# ✦ Lighthouse Church Website — v2.0

**Oshawa, ON · lhcoshawa.ca**  
A modern church website with Google Calendar API integration, polished B&W design, and full mobile optimization.

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18.0.0
- Your `service-account.json` file (Google Cloud service account key)

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Service Account Key
Place your Google service account JSON file in the project root:
```
service-account.json   ← same folder as server.js
```
> ⚠️ Already in `.gitignore` — will NEVER be committed to git.

### 3. Configure Environment (Optional)
```bash
cp .env.example .env
# Edit PORT or CALENDAR_ID if needed
```

### 4. Share Calendar With Service Account
In Google Calendar settings, share your calendar with:
`lhcwebcalendar@booming-entity-494601-p8.iam.gserviceaccount.com`
(grant "See all event details" / Reader access)

### 5. Run
```bash
npm start        # production
npm run dev      # development (auto-restart)
```
Site: **http://localhost:3000**

---

## 📁 File Structure

```
lighthouse-church/
├── server.js                ← Node.js backend (Google Calendar API)
├── package.json
├── .gitignore               ← service-account.json is protected
├── .env.example
├── service-account.json     ← YOUR KEY HERE (never commit!)
├── index.html               ← Home page
├── about.html
├── giving.html
├── womens-ministry.html
├── mens-ministry.html
├── childrens-ministry.html
├── fellowship.html
├── styles.css               ← Main stylesheet
├── mobile-enhancements.css  ← Mobile-first improvements (NEW)
└── main.js                  ← Frontend JS (API + ICS fallback)
```

---

## 🔐 Security

- `service-account.json` — in `.gitignore`, never committed
- `.env` — in `.gitignore`, never committed
- All Google credentials are **server-side only**, never exposed to the browser
- `/api/events` returns only safe, formatted event data

---

## 📅 Google Calendar Integration

**How it works:**

1. `server.js` authenticates with Google Calendar using the service account,
   fetches upcoming events (cached 5 min), serves them at `/api/events`
2. `main.js` tries `/api/events` first, then falls back to ICS proxies
   (so the site works even on static hosting)

**API Endpoints:**

| Endpoint | Description |
|----------|-------------|
| `GET /api/events` | Next 5 upcoming events |
| `GET /api/events?max=10` | Next 10 events |
| `GET /api/health` | Health check |

---

## 📱 Mobile Enhancements (NEW in v2.0)

`mobile-enhancements.css` adds 21 improvement sections:

- Safe area insets (iPhone notch/home bar)
- Fluid `clamp()` typography
- Full-screen mobile menu with staggered animation
- Native scroll snap for events carousel
- Bottom-sheet style modals
- 48px WCAG touch targets
- iOS form zoom prevention
- Print stylesheet

---

## 🌐 Deployment

**With Node.js** (Railway, Render, Fly.io, Heroku):
- Set env vars: `CALENDAR_ID`, `PORT`
- Add `service-account.json` via host secrets/file manager (NOT via git)

**Static only** (Netlify, GitHub Pages):
- Works automatically via ICS proxy fallback
- No server-side calendar features

---

© 2025 Lighthouse Christian Fellowship · Oshawa, ON
