# SENIOR MISCHIEF 😎
### Interactive AI Farewell Experience • MCA 2nd Batch (2024–2026)
**Faculty of Computing and IT • GM University**

---

## 🌟 Overview
**SENIOR MISCHIEF** is an exclusive farewell web application crafted for **71 MCA seniors**. 

### 🎭 The User Journey:
1. **ENTER NAME**: Senior enters their name before starting.
2. **UPLOAD PHOTO**: Upload a clear solo or group photo (JPG/PNG/WEBP, up to 10 MB).
3. **AI PROCESSING**: Interactive scrapbook scanner & fun progress updates.
4. **CARTOON TRANSFORMATION**: Random caricature transformation applying one of 24+ curated farewell themes.
5. **DRAMATIC REVEAL**: Celebratory confetti, custom keepsake artwork, funny caption, and official GMU batch signature.
6. **FAREWELL INVITATION**: Personalized invitation reveal featuring date, venue, FCIT dignitaries, and junior message.
7. **SAVE & SHARE**: Download PNG keepsake or share directly.

---

## 🏗️ Architecture & Project Structure

The project is structured into **`frontend`** (Frontend) and **`backend`** (Backend):

```text
Farewell/
├── frontend/                   # FRONTEND (React 19 + TypeScript + Vite + Tailwind CSS)
│   ├── public/                 # Static assets (favicons, vector caricatures)
│   ├── src/
│   │   ├── components/         # UI Screen Components (Landing, Upload, Processing, Reveal, Invitation, Container)
│   │   ├── config/             # Themes & API Configuration (api.config.ts, themes.ts)
│   │   ├── store/              # Zustand Global State Management (useMischiefStore.ts)
│   │   ├── types/              # TypeScript Type Definitions
│   │   ├── App.tsx             # Main App Layout Container
│   │   ├── index.css           # Custom Scrapbook Styles & Fonts
│   │   └── main.tsx            # React App Entry Point
│   ├── .env.example            # Frontend Environment Variables Template
│   ├── vercel.json             # Vercel Deployment Routing Config
│   ├── vite.config.ts          # Vite Config + Dev Server API Proxy
│   └── package.json            # Frontend Dependencies & Build Scripts
│
├── backend/                    # BACKEND (Node.js + Express + TypeScript)
│   ├── data/                   # Quota Persistence Storage (limit.json)
│   ├── public/                 # Static Generated Artwork Assets
│   ├── src/
│   │   ├── config/             # App Environment Config (environment.ts)
│   │   ├── middleware/         # Rate Limiting & Multer Upload Validation
│   │   ├── routes/             # Express API Routers (mischief.routes.ts)
│   │   ├── services/           # Business Logic Services (AI, Limit, Storage, Theme)
│   │   └── index.ts            # Server Entry Point & Error Handler
│   ├── .env.example            # Backend Environment Variables Template
│   ├── render.yaml             # Render Cloud Deployment Blueprint
│   ├── tsconfig.json           # TypeScript Compiler Settings
│   └── package.json            # Backend Dependencies & Build Scripts
│
├── package.json                # Root Workspace Commands (npm run dev, dev:backend, install:all, build)
└── README.md                   # Full Project Guide & Architecture Documentation
```

---

## 🔒 Quota & Production Limit Architecture
- **Total Seniors:** Exactly 71
- **Production Limit:** 100 total AI generations (71 guaranteed + 29 reserved for retries)
- **Limit Enforcement:** Enforced atomically on the backend via `limit.service.ts` and persisted to disk so server restarts never erase event state.
- **Limit Reached UX:** Displays a commemorative *"The Mischief Machine is Taking a Little Break 😭"* screen.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom Scrapbook Textures & Fonts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** Zustand
- **Export / Share:** `html-to-image` + `canvas-confetti` + Web Share API

### Backend (`/backend`)
- **Runtime:** Node.js + Express (TypeScript / TSX)
- **Uploads:** Multer (Max 10 MB, MIME validation)
- **Security:** Helmet, CORS, and Express Rate Limit
- **AI Service:** Isolated Image-to-Image AI service with Gemini multimodal transformation & mock fallbacks
- **Storage Service:** Storage abstraction with Cloudinary support & automatic temp cleanup

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
# In the root directory:
npm run install:all
```

### 2. Start Services

#### Run Frontend App:
```bash
npm run dev
# Running on http://localhost:5173 (or 5174)
```

#### Run Backend API:
```bash
npm run dev:backend
# Running on http://localhost:5000
```

---

## ☁️ Deployment Guide

### Frontend Deployment (Vercel)
1. Push this repository to GitHub.
2. Link the repository on [Vercel](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Add Environment Variable:
   - `VITE_API_URL=https://your-backend-api.onrender.com`
5. Deploy! *(Vercel will use `frontend/vercel.json` for SPA routing).*

### Backend Deployment (Render)
1. Create a new **Web Service** or **Blueprint** on [Render](https://render.com).
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install && npm run build`.
4. Set **Start Command** to `npm start`.
5. Add Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `FRONTEND_URL=https://your-frontend.vercel.app`
   - `MAX_GENERATIONS=100`
   - `MOCK_AI=true` (or `false` when using live Gemini)
   - `GEMINI_API_KEY=your_key`
6. Deploy! *(Render blueprint configuration is in `backend/render.yaml`).*

---

## 🎓 Made with Love by MCA Juniors (GM University)
Dedicated to the legendary **MCA 2nd Batch (2024–2026)**.

---

## 🎓 Made with Love by MCA Juniors (GM University)
Dedicated to the legendary **MCA 2nd Batch (2024–2026)**.
